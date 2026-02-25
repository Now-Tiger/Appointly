"use client";

import { Suspense, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Eye, EyeOff, Mail } from "lucide-react";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { handleGoogleLogin } from "@/lib/google-oauth/login";
import { getAuthCallbackUrl } from "@/lib/app-url";
import { slideUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AuthPageWrapper() {
  return (
    <Suspense>
      <AuthPage />
    </Suspense>
  );
}

type AuthMode = "signin" | "register";

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"] as const;

const fieldVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0, overflow: "hidden" as const },
  visible: { opacity: 1, height: "auto", marginTop: 16, overflow: "visible" as const },
};

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "signin";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isRegister = mode === "register";
  const strength = getPasswordStrength(password);

  const switchMode = useCallback((newMode: AuthMode) => {
    setMode(newMode);
    setError("");
    setFieldErrors({});
    setEmailNotConfirmed(false);
    window.history.replaceState(
      null,
      "",
      newMode === "register" ? "/login?mode=register" : "/login"
    );
  }, []);

  function validateField(name: string, value: string) {
    switch (name) {
      case "businessName":
        return value.length < 2 ? "Business name is required" : "";
      case "fullName":
        return value.length < 2 ? "Full name is required" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Enter a valid email"
          : "";
      case "password":
        return value.length < 8 ? "Password must be at least 8 characters" : "";
      case "confirmPassword":
        return value !== password ? "Passwords do not match" : "";
      default:
        return "";
    }
  }

  function handleBlur(name: string, value: string) {
    const err = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setEmailNotConfirmed(false);

    if (isRegister) {
      const fields = { businessName, fullName, email, password, confirmPassword };
      const errors: Record<string, string> = {};
      for (const [key, val] of Object.entries(fields)) {
        const err = validateField(key, val);
        if (err) errors[key] = err;
      }
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
    } else {
      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }
    }

    setIsLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();

      if (isRegister) {
        console.log("[Auth] Attempting sign-up for:", email);
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getAuthCallbackUrl(),
            data: {
              full_name: fullName,
              business_name: businessName,
            },
          },
        });

        if (signUpError) {
          console.error("[Auth] Sign-up error:", signUpError.message, signUpError);
          if (signUpError.message.toLowerCase().includes("rate limit")) {
            setError(
              "Too many sign-up attempts. Please wait a few minutes before trying again."
            );
          } else {
            setError(signUpError.message);
          }
          return;
        }

        console.log("[Auth] Sign-up successful:", data.user?.id ?? "no user returned");

        if (data.user && !data.session) {
          console.log("[Auth] Email confirmation required for:", email);
          setConfirmationEmail(email);
          return;
        }

        router.push("/dashboard");
      } else {
        console.log("[Auth] Attempting sign-in for:", email);
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({ email, password });

        if (signInError) {
          console.error("[Auth] Sign-in error:", signInError.message, signInError);
          if (signInError.message === "Email not confirmed") {
            setEmailNotConfirmed(true);
            return;
          }
          if (signInError.status === 429) {
            setError("Too many attempts. Please try again later.");
          } else {
            setError("Invalid email or password.");
          }
          return;
        }

        console.log("[Auth] Sign-in successful:", data.user?.id ?? "no user returned");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("[Auth] Unexpected error:", err);
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendConfirmation() {
    setIsResending(true);
    try {
      console.log("[Auth] Resending confirmation email to:", email);
      const supabase = getSupabaseBrowserClient();
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      });
      if (resendError) {
        console.error("[Auth] Resend error:", resendError.message);
        setError(resendError.message);
      } else {
        setEmailNotConfirmed(false);
        setError("Confirmation email resent. Check your inbox.");
      }
    } catch (err) {
      console.error("[Auth] Resend unexpected error:", err);
      setError("Failed to resend. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  async function onGoogleLogin() {
    setIsGoogleLoading(true);
    try {
      await handleGoogleLogin();
    } catch (err) {
      console.error("[Auth] Google login error:", err);
      setError(
        err instanceof Error ? err.message : "Google sign-in failed. Please try again."
      );
      setIsGoogleLoading(false);
    }
  }

  // Email confirmation sent screen
  if (confirmationEmail) {
    return (
      <motion.div
        {...slideUp}
        className="w-full max-w-sm border border-border rounded-lg bg-card p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Mail className="h-5 w-5 text-muted-foreground" />
        </div>
        <h1 className="font-soria text-2xl font-normal text-foreground">
          Check your email
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a confirmation link to{" "}
          <span className="font-medium text-foreground">{confirmationEmail}</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Click the link in the email to activate your account, then sign in.
        </p>
        <Button
          variant="outline"
          className="mt-6 w-full"
          onClick={() => {
            setConfirmationEmail("");
            switchMode("signin");
          }}
        >
          Go to sign in
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...slideUp}
      layout
      transition={{ layout: { duration: 0.25, ease: "easeOut" } }}
      className="w-full max-w-sm border border-border rounded-lg bg-card p-8"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
        >
          <h1 className="font-soria text-2xl font-normal text-foreground">
            {isRegister ? "Create your account" : "Welcome back."}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isRegister
              ? "Start managing appointments."
              : "Sign in to your account."}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={onGoogleLogin}
          disabled={isGoogleLoading || isLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          Continue with Google
        </Button>
      </div>

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
          or
        </span>
      </div>

      {emailNotConfirmed && (
        <div className="mb-4 rounded-md border border-border bg-muted p-3">
          <p className="text-sm text-foreground font-medium">
            Email not confirmed
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Check your inbox for a confirmation link. Didn&apos;t receive it?
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={handleResendConfirmation}
            disabled={isResending}
          >
            {isResending && <Loader2 className="h-3 w-3 animate-spin" />}
            Resend confirmation email
          </Button>
        </div>
      )}

      {error && !emailNotConfirmed && (
        <p className={cn(
          "mb-4 text-sm",
          error.includes("resent") ? "text-foreground" : "text-destructive"
        )}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Register-only fields */}
        <AnimatePresence initial={false}>
          {isRegister && (
            <motion.div
              key="register-fields"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, height: 0 },
                visible: { opacity: 1, height: "auto" },
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-4 overflow-hidden"
            >
              <div className="space-y-1.5">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    if (fieldErrors.businessName)
                      setFieldErrors((p) => ({ ...p, businessName: "" }));
                  }}
                  onBlur={() => handleBlur("businessName", businessName)}
                  placeholder="Acme Salon"
                />
                {fieldErrors.businessName && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.businessName}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fieldErrors.fullName)
                      setFieldErrors((p) => ({ ...p, fullName: "" }));
                  }}
                  onBlur={() => handleBlur("fullName", fullName)}
                  placeholder="Jane Doe"
                />
                {fieldErrors.fullName && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shared fields */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email)
                setFieldErrors((p) => ({ ...p, email: "" }));
            }}
            onBlur={() => handleBlur("email", email)}
            placeholder="jane@example.com"
          />
          {fieldErrors.email && (
            <p className="text-xs text-destructive">{fieldErrors.email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password)
                  setFieldErrors((p) => ({ ...p, password: "" }));
              }}
              onBlur={() => handleBlur("password", password)}
              placeholder={isRegister ? "Min. 8 characters" : ""}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Password strength (register only) */}
          <AnimatePresence initial={false}>
            {isRegister && password.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fieldVariants}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 w-5 rounded-full transition-colors ${
                        level <= strength ? "bg-foreground" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {strengthLabels[strength]}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {fieldErrors.password && (
            <p className="text-xs text-destructive">{fieldErrors.password}</p>
          )}

          {/* Forgot password (signin only) */}
          {!isRegister && (
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-xs text-muted-foreground underline"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </div>

        {/* Confirm password (register only) */}
        <AnimatePresence initial={false}>
          {isRegister && (
            <motion.div
              key="confirm-password"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fieldVariants}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-1.5"
            >
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (fieldErrors.confirmPassword)
                    setFieldErrors((p) => ({ ...p, confirmPassword: "" }));
                }}
                onBlur={() => handleBlur("confirmPassword", confirmPassword)}
              />
              {fieldErrors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading || isGoogleLoading}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isRegister ? "Create account" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isRegister ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => switchMode("signin")}
              className="underline text-foreground"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => switchMode("register")}
              className="underline text-foreground"
            >
              Create one
            </button>
          </>
        )}
      </p>
    </motion.div>
  );
}
