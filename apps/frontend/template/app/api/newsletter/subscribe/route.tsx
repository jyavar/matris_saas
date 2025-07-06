import { render } from "@react-email/render";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

import { NewsletterWelcome } from "@/emails/newsletter-welcome";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/send-email";
import { newsletterSchema } from "@/schema/newsletter";

const rateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60 * 5,
  blockDuration: 60 * 5,
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const rawIp =
      req.headers.get("x-forwarded-for") || (req as any).socket?.remoteAddress;
    const cleanIp = rawIp?.split(/,|:/)[0].trim() || "unknown-ip";

    try {
      await rateLimiter.consume(cleanIp);
    } catch (rateLimiterRes) {
      return new Response(
        JSON.stringify({ error: "Too many attempts. Please try again later." }),
        {
          status: 429,
          headers: {
            "Retry-After": "300",
            "X-RateLimit-Reset": new Date(Date.now() + 300000).toISOString(),
          },
        },
      );
    }

    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: validation.error.errors[0].message }),
        { status: 400 },
      );
    }

    let subscriber = await db.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      subscriber = await db.newsletterSubscriber.create({
        data: { email },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "This email is already registered." }),
        { status: 409 },
      );
    }

    const unsubscribeToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await db.unsubscribeToken.create({
      data: {
        token: unsubscribeToken,
        expiresAt,
        subscriberId: subscriber.id,
      },
    });

    const unsubscribeLink = `${process.env.NEXT_PUBLIC_APP_URL}/newsletter/unsubscribe?token=${unsubscribeToken}`;
    const emailHtml = await render(
      <NewsletterWelcome unsubscribeLink={unsubscribeLink} />,
      { pretty: true },
    );

    const emailResponse = await sendEmail(
      email,
      "Welcome to Badtz Newsletter!",
      emailHtml,
    );

    if (!emailResponse.success) {
      return NextResponse.json(
        { error: "Failed to send confirmation email" },
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({ message: "Successful registration!" }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    return new Response(
      JSON.stringify({ error: "Internal error. Please try again." }),
      { status: 500 },
    );
  }
}
