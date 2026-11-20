import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { Logo } from "@/components/Logo";
import { ActivityIcon, ChartIcon, ListIcon } from "@/icons";

export const metadata: Metadata = { title: "Sign in" };

const FEATURES = [
  { icon: ActivityIcon, text: "Live call monitoring for agents and supervisors" },
  { icon: ListIcon, text: "Queue and user management" },
  { icon: ChartIcon, text: "Recordings and reports" },
];

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-wrap">
      <aside className="flex min-w-0 flex-[1_1_420px] flex-col gap-10 bg-surface px-12 py-10">
        <Logo size="lg" />

        <div className="my-auto flex max-w-[420px] flex-col gap-4">
          <h2 className="text-[34px] leading-[1.15] font-semibold tracking-[-0.02em]">Your call center, in one place.</h2>
          <p className="text-[15px] leading-[1.55] text-ink-soft">
            Monitor live calls, manage queues and users, and review recordings and reports from a single panel.
          </p>
          <ul className="flex flex-col gap-2.5 pt-2">
            {FEATURES.map(({ icon: FeatureIcon, text }) => (
              <li key={text} className="flex items-center gap-2.5 text-sm">
                <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-white text-link">
                  <FeatureIcon size={16} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <span className="text-xs text-faint">© CallBook</span>
      </aside>

      <main className="flex min-w-0 flex-[999_1_560px] items-center justify-center px-6 py-10">
        <LoginForm />
      </main>
    </div>
  );
}
