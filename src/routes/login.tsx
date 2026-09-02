import { createFileRoute, Link } from "@tanstack/react-router";
import { Pill } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { roleDefinitions } from "@/data/users";

const title = "Sign In — MediTrack";
const description = "Mock sign-in for the MediTrack pharmacy portal with role selection.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-soft/40 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-elevated">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Pill className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold text-foreground">MediTrack</span>
        </Link>

        <h1 className="mt-6 text-xl font-semibold text-foreground">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Medicines you need. Stock you can trust.
        </p>

        {/* TODO: Connect authentication provider */}
        {/* TODO: Implement secure sessions/JWT */}
        <div className="mt-6 space-y-3">
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Button className="w-full">Sign In</Button>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Continue as
          </p>
          <div className="mt-2 grid gap-2">
            {roleDefinitions.map((role) => (
              <Link key={role.role} to={role.role === "customer" ? "/" : "/admin"}>
                <Button variant="outline" className="w-full justify-between">
                  {role.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
