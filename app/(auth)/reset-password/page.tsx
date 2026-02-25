"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { slideUp } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // Token is valid, user can update password
      }
    });

    const hash = window.location.hash;
    if (!hash.includes("access_token") && !hash.includes("type=recovery")) {
      const params = new URLSearchParams(window.location.search);
      if (!params.get("code")) {
        setTokenError(true);
      }
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        if (
          updateError.message.toLowerCase().includes("expired") ||
          updateError.message.toLowerCase().includes("invalid")
        ) {
          setTokenError(true);
        } else {
          setError(updateError.message);
        }
        return;
      }

      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (tokenError) {
    return (
      <motion.div
        {...slideUp}
        className="w-full max-w-sm border border-border rounded-lg bg-card p-8 text-center"
      >
        <h1 className="font-soria text-2xl font-normal text-foreground">
          Link expired
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This password reset link has expired or is invalid.
        </p>
        <Link href="/forgot-password">
          <Button variant="outline" className="mt-6 w-full">
            Request a new link
          </Button>
        </Link>
      </motion.div>
    );
  }

  if (isSuccess) {
    return (
      <motion.div
        {...slideUp}
        className="w-full max-w-sm border border-border rounded-lg bg-card p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <CheckCircle2 className="h-5 w-5 text-foreground" />
        </div>
        <h1 className="font-soria text-2xl font-normal text-foreground">
          Password updated
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Redirecting you to sign in...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...slideUp}
      className="w-full max-w-sm border border-border rounded-lg bg-card p-8"
    >
      <h1 className="font-soria text-2xl font-normal text-foreground">
        Set new password
      </h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Enter your new password below.
      </p>

      {error && (
        <p className="mb-4 text-sm text-destructive">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Update password
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to login
        </Link>
      </div>
    </motion.div>
  );
}
