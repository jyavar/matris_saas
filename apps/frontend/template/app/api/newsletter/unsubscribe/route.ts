import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

import { db } from "@/lib/db";
import { sendEmail } from "@/lib/send-email";

const rateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60 * 5,
  blockDuration: 60 * 5,
});

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

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

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Missing unsubscribe token" }),
        { status: 400 },
      );
    }

    const unsubscribeToken = await db.unsubscribeToken.findUnique({
      where: { token },
      include: { subscriber: true },
    });

    if (!unsubscribeToken) {
      console.error("❌ Invalid token:", token);
      return new Response(JSON.stringify({ error: "Invalid token." }), {
        status: 400,
      });
    }

    if (unsubscribeToken.expiresAt < new Date()) {
      const newToken = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

      await db.unsubscribeToken.delete({
        where: { id: unsubscribeToken.id },
      });

      await db.unsubscribeToken.create({
        data: {
          token: newToken,
          expiresAt,
          subscriberId: unsubscribeToken.subscriberId,
        },
      });

      const unsubscribeLink = `${process.env.NEXT_PUBLIC_APP_URL}/newsletter/unsubscribe?token=${newToken}`;

      await sendEmail(
        unsubscribeToken.subscriber.email,
        "New Unsubscribe Link",
        `Your unsubscribe token has expired. Here is a new one: <a href="${unsubscribeLink}">${unsubscribeLink}</a>`,
      );

      return new Response(
        JSON.stringify({
          error: "Token expired. A new one has been sent to your email.",
        }),
        { status: 400 },
      );
    }

    await db.unsubscribeToken.deleteMany({
      where: { subscriberId: unsubscribeToken.subscriberId },
    });

    await db.newsletterSubscriber.delete({
      where: { id: unsubscribeToken.subscriberId },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
