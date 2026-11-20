"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, fieldStyles } from "@/components/ui/Field";
import { useSession } from "@/hooks/useSession";
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "@/icons";
import { cn } from "@/lib/utils";

/** Demo sign-in: any submit goes straight to the supervisor home. */
export function LoginForm() {
  const router = useRouter();
  const { setRole } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setRole("supervisor");
        router.push("/home");
      }}
      className="flex w-full max-w-[420px] flex-col gap-5 rounded-xl border border-line bg-white p-8"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-semibold tracking-[-0.015em]">Sign in</h1>
        <span className="text-sm text-muted">Enter your credentials to access the admin panel</span>
      </div>

      <Field id="login-email" label="Email">
        <Input id="login-email" type="email" autoComplete="username" placeholder="name@company.com" />
      </Field>

      <Field
        id="login-password"
        label="Password"
        aside={
          <Link href="#" className="text-[13px] font-medium text-link hover:text-link-hover">
            Forgot password?
          </Link>
        }
      >
        <div className={cn(fieldStyles(), "flex h-11 items-center focus-within:border-accent")}>
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-full min-w-0 flex-1 bg-transparent pl-3 outline-none"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((v) => !v)}
            className="flex h-full w-11 flex-none cursor-pointer items-center justify-center text-ink-soft"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </Field>

      <label htmlFor="login-remember" className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
        <input id="login-remember" type="checkbox" defaultChecked className="size-[18px] cursor-pointer accent-accent" />
        Keep me signed in
      </label>

      <Button type="submit">
        Sign in
        <ArrowRightIcon size={16} />
      </Button>

      <div className="border-t border-line-soft pt-4 text-center text-[13px] text-muted">
        Don&apos;t have an account? Ask your administrator for access.
      </div>
    </form>
  );
}
