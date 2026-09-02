import { createFileRoute, Link } from "@tanstack/react-router";
import { Pill } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

const title = "Create Account — MediTrack";
const description = "Mock signup screen for the MediTrack pharmacy portal.";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-soft/40 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-elevated">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Pill className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold text-foreground">MediTrack</span>
        </Link>

        <h1 className="mt-6 text-xl font-semibold text-foreground">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Shop medicines with verified stock.</p>

        {/* TODO: Connect authentication provider */}
        {/* TODO: Implement API-level authorization */}
        <div className="mt-6 space-y-3">
          <Input label="Full name" placeholder="Your name" />
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Phone" placeholder="+91 90000 00000" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Button className="w-full">Create Account</Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
