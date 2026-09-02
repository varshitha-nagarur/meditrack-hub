import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cartItems } from "@/data/orders";
import { CustomerLayout } from "@/layouts/CustomerLayout";
import { currentCustomer } from "@/data/users";
import { formatINR } from "@/utils/format";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/types/order";

const title = "Checkout — MediTrack";
const description = "Address, prescription verification, order summary and mock payment options.";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CheckoutPage,
});

const steps = [
  "Delivery Address",
  "Prescription Verification",
  "Order Summary",
  "Payment",
] as const;

const paymentMethods: Array<{ id: PaymentMethod; label: string }> = [
  { id: "upi", label: "UPI" },
  { id: "debit-card", label: "Debit Card" },
  { id: "credit-card", label: "Credit Card" },
  { id: "net-banking", label: "Net Banking" },
];

function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<PaymentMethod>("upi");

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;
  const defaultAddress = currentCustomer.addresses[0];

  return (
    <CustomerLayout>
      <div className="container-page py-10">
        <SectionHeading title="Checkout" description="UI only — no payment is processed." />

        <ol className="mb-8 grid gap-2 sm:grid-cols-4">
          {steps.map((label, index) => (
            <li
              key={label}
              className={cn(
                "rounded-lg border px-4 py-3 text-sm",
                index === step
                  ? "border-primary bg-primary-soft font-medium text-primary"
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              <span className="text-xs">Step {index + 1}</span>
              <p>{label}</p>
            </li>
          ))}
        </ol>

        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <section className="rounded-xl border border-border bg-card p-5 shadow-card">
            {step === 0 ? (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground">Delivery Address</h2>
                <Input label="Full name" defaultValue={currentCustomer.name} />
                <Input label="Phone" defaultValue={currentCustomer.phone} />
                <Input label="Address line 1" defaultValue={defaultAddress?.line1 ?? ""} />
                <Input label="City" defaultValue={defaultAddress?.city ?? ""} />
                <Input label="Pincode" defaultValue={defaultAddress?.pincode ?? ""} />
              </div>
            ) : null}

            {step === 1 ? (
              <div>
                <h2 className="text-sm font-semibold text-foreground">Prescription Verification</h2>
                {/* TODO: Connect prescription verification backend */}
                <p className="mt-2 text-sm text-muted-foreground">
                  Rx medicines in this order need pharmacist approval before dispatch.
                </p>
                <ul className="mt-4 space-y-2">
                  {cartItems.map((item) => (
                    <li
                      key={item.medicineId}
                      className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm"
                    >
                      <span className="text-foreground">{item.name}</span>
                      <StatusBadge tone={item.prescriptionRequired ? "warning" : "success"}>
                        {item.prescriptionRequired ? "Pending Review" : "Not Required"}
                      </StatusBadge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <h2 className="text-sm font-semibold text-foreground">Order Summary</h2>
                <ul className="mt-4 divide-y divide-border">
                  {cartItems.map((item) => (
                    <li key={item.medicineId} className="flex justify-between py-3 text-sm">
                      <span className="text-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-muted-foreground">
                        {formatINR(item.unitPrice * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <h2 className="text-sm font-semibold text-foreground">Payment</h2>
                {/* TODO: Connect payment gateway */}
                {/* TODO: Implement transactional inventory update */}
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {paymentMethods.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setMethod(option.id)}
                      className={cn(
                        "flex items-center justify-between rounded-lg border px-4 py-3 text-sm",
                        method === option.id
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border text-foreground hover:bg-muted",
                      )}
                    >
                      {option.label}
                      {method === option.id ? <CheckCircle2 className="h-4 w-4" /> : null}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                disabled={step === 0}
                onClick={() => setStep((value) => Math.max(0, value - 1))}
              >
                Back
              </Button>
              <Button
                onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))}
                disabled={step === steps.length - 1}
              >
                {step === steps.length - 2 ? "Continue to Payment" : "Continue"}
              </Button>
            </div>
          </section>

          <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-card">
            <h2 className="text-sm font-semibold text-foreground">Totals</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="text-foreground">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="text-foreground">{formatINR(deliveryFee)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold text-foreground">
                <dt>Total</dt>
                <dd>{formatINR(total)}</dd>
              </div>
            </dl>
            <Button className="mt-5 w-full" disabled={step !== steps.length - 1}>
              Pay {formatINR(total)}
            </Button>
          </aside>
        </div>
      </div>
    </CustomerLayout>
  );
}
