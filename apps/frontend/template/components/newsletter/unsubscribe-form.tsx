"use client";

import Link from "next/link";
import { useState } from "react";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { GlowButton } from "@/components/ui/glow-button";
import { toast } from "@/hooks/use-toast";

import { Button } from "../ui/button";

export default function UnsubscribeForm({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error.includes("Token expired")) {
          toast({
            title: "Token Expired",
            description: "A new unsubscribe link has been sent to your email.",
          });
        } else {
          throw new Error(data.error || "Failed to unsubscribe.");
        }
        return;
      }

      setIsSuccess(true);
      toast({
        title: "Unsubscription Successful",
        description: "You've been removed from our mailing list.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Unsubscription Failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-auto p-6 bg-background rounded-lg border border-border max-w-[556px] w-full mb-10 [&_svg]:size-6 [&_svg]:shrink-0">
        <Logo />
        <h2 className="text-xl font-gilroy mt-5">You're Unsubscribed</h2>
        <p className="text-muted-foreground mt-3 text-sm">
          We're sorry to see you go. Your preferences have been updated.
        </p>
        <p className="text-sm text-muted-foreground">
          Changed your mind? You can{" "}
          <Link
            href="/newsletter"
            className="text-blue-600 hover:underline underline-offset-2"
          >
            resubscribe
          </Link>{" "}
          anytime.
        </p>

        <Button className="mt-6 justify-center rounded-md text-sm font-light bg-background border h-8 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          Home
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-6 bg-background rounded-lg border border-border max-w-[556px] w-full mb-10 [&_svg]:size-6 [&_svg]:shrink-0"
    >
      <Logo />
      <h2 className="text-xl font-gilroy text-primary mt-6">
        We're Sorry to See You Go...
      </h2>

      <p className="text-muted-foreground mt-3 mb-6 text-balance text-sm">
        To stop receiving our emails, please enter your email address below.
        This will immediately remove you from our mailing list.
      </p>

      <GlowButton
        type="submit"
        disabled={isLoading}
        className="mt-8 justify-center"
      >
        {isLoading ? (
          <Icons.spinner className="animate-spin h-3 w-3" />
        ) : (
          "Confirm Unsubscription"
        )}
      </GlowButton>
    </form>
  );
}
