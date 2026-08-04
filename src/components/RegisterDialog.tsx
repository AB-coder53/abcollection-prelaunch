import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, MessageCircle } from "lucide-react";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PRODUCTS, SIZES, type Product } from "@/data/products";
import { registerInterest } from "@/lib/leads.functions";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
};

type Errors = Partial<Record<string, string>>;

export function RegisterDialog({ open, onOpenChange, product }: Props) {
  const submit = useServerFn(registerInterest);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [products, setProducts] = useState<string[]>([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [terms, setTerms] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ discountCode: string } | null>(null);

  useEffect(() => {
    if (!open) return;
    setDone(null);
    setErrors({});
    setProducts(product ? [product.name] : []);
    setSize("");
    setColor(product?.colors[0] ?? "");
  }, [open, product]);

  const colorOptions = useMemo(() => {
    const selected = PRODUCTS.filter((p) => products.includes(p.name));
    const pool = selected.length ? selected : product ? [product] : PRODUCTS;
    return Array.from(new Set(pool.flatMap((p) => p.colors)));
  }, [products, product]);

  const sizeOptions = useMemo(() => {
    const selected = PRODUCTS.filter((p) => products.includes(p.name));
    const pool = selected.length ? selected : product ? [product] : PRODUCTS;
    return SIZES.filter((s) => pool.every((p) => p.sizes.includes(s)));
  }, [products, product]);

  useEffect(() => {
    if (size && !sizeOptions.includes(size)) setSize("");
  }, [sizeOptions, size]);


  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Errors = {};
    if (fullName.trim().length < 2) next["fullName"] = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(mobile.trim()))
      next["mobile"] = "Enter a valid 10-digit Indian mobile number.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next["email"] = "Enter a valid email address.";
    if (products.length === 0) next["products"] = "Select at least one piece.";
    if (!terms) next["terms"] = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const result = await submit({
        data: {
          fullName: fullName.trim(),
          mobile: mobile.trim(),
          email: email.trim(),
          city: city.trim(),
          products,
          size,
          color,
          quantity,
          whatsappOptIn,
          marketingConsent,
          source: "landing_page",
        },
      });
      setDone({ discountCode: result.discountCode });
    } catch {
      setErrors({ form: "Something went wrong. Please try again in a moment." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-none border-border bg-background p-0 sm:max-w-3xl sm:rounded-none [&>button:last-child]:z-20 [&>button:last-child]:bg-background/80 [&>button:last-child]:p-2">


        {done ? (
          <div className="px-8 py-16 text-center sm:px-16">
            <DialogTitle asChild>
              <h2 className="sr-only">Registration confirmed</h2>
            </DialogTitle>
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-olive text-olive-foreground">
              <Check className="size-5" strokeWidth={1.5} />
            </div>
            <p className="eyebrow mt-8">You're on the list</p>
            <p className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Your 10% launch
              <br />
              discount is reserved.
            </p>
            <DialogDescription asChild>
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Thank you, {fullName.split(" ")[0]}. Your interest is registered — no payment was
                taken, and nothing is charged today.
              </p>
            </DialogDescription>

            <div className="mx-auto mt-10 max-w-sm border border-border bg-muted/60 p-6">
              <p className="eyebrow">Your reserved code</p>
              <p className="mt-3 font-display text-3xl tracking-wide">{done.discountCode}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Valid for 72 hours from launch, on your selected pieces. We'll send it again by
                {whatsappOptIn ? " WhatsApp" : " message"} so you don't have to remember it.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-md space-y-4 text-left">
              <p className="eyebrow text-center">What happens next</p>
              {[
                "You'll get a confirmation message within a few minutes.",
                "48 hours before launch, we send you early access — before the public.",
                "On launch day, your code applies at checkout. Prepaid only, delivered pan-India.",
              ].map((step, index) => (
                <div key={step} className="flex gap-4 border-t border-border pt-4">
                  <span className="font-display text-lg text-muted-foreground">0{index + 1}</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-none px-8 text-xs tracking-[0.2em] uppercase"
              >
                <a
                  href="https://instagram.com/abcollection.co.in"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Follow the launch
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-12 rounded-none px-8 text-xs tracking-[0.2em] uppercase"
              >
                Keep browsing
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-[0.85fr_1.15fr]">
            <aside className="hidden flex-col justify-between bg-muted/60 p-8 md:flex">
              <div>
                <p className="eyebrow">Registering interest in</p>
                {product ? (
                  <>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      width={1120}
                      height={1408}
                      className="mt-6 aspect-[4/5] w-full object-cover"
                    />
                    <h3 className="mt-6 text-2xl leading-snug">{product.name}</h3>
                    <p className="mt-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                      {product.fabric}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">{product.price}</p>
                  </>
                ) : (
                  <h3 className="mt-6 text-2xl leading-snug">The first collection</h3>
                )}
              </div>
              <div className="mt-10 border-t border-border pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  No payment today. This reserves your{" "}
                  <span className="text-foreground">10% launch discount</span> and your early access
                  window.
                </p>
              </div>
            </aside>

            <form onSubmit={handleSubmit} className="p-8 sm:p-10">
              <DialogTitle asChild>
                <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                  Reserve your 10%
                </h2>
              </DialogTitle>
              <DialogDescription asChild>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Takes under a minute. We'll only contact you about the launch.
                </p>
              </DialogDescription>

              <div className="mt-8 space-y-6">
                <Field label="Full name" error={errors["fullName"]} htmlFor="fullName">
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="off"
                    maxLength={100}
                    placeholder="Abbas Badwahwala"
                    className="h-11 rounded-none border-0 border-b border-input bg-transparent px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
                  />
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Mobile number" error={errors["mobile"]} htmlFor="mobile">
                    <Input
                      id="mobile"
                      inputMode="numeric"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      autoComplete="off"
                      placeholder="9876543210"
                      className="h-11 rounded-none border-0 border-b border-input bg-transparent px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
                    />
                  </Field>
                  <Field label="City" htmlFor="city" optional>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      autoComplete="off"
                      maxLength={80}
                      placeholder="Indore"
                      className="h-11 rounded-none border-0 border-b border-input bg-transparent px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
                    />
                  </Field>
                </div>

                <Field
                  label="Email"
                  error={errors["email"]}
                  htmlFor="email"
                  hint="Recommended — your discount code is emailed as a backup."
                  optional
                >
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    maxLength={255}
                    placeholder="you@email.com"
                    className="h-11 rounded-none border-0 border-b border-input bg-transparent px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
                  />
                </Field>

                <fieldset>
                  <legend className="eyebrow">Interested pieces</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {PRODUCTS.map((p) => {
                      const active = products.includes(p.name);
                      return (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => setProducts((prev) => toggle(prev, p.name))}
                          aria-pressed={active}
                          className={`border px-4 py-3 text-left text-sm transition-colors ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "border-input hover:border-foreground"
                          }`}
                        >
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                  {errors["products"] ? (
                    <p className="mt-2 text-xs text-destructive">{errors["products"]}</p>
                  ) : null}
                </fieldset>

                <div className="grid gap-6 sm:grid-cols-2">
                  <fieldset>
                    <legend className="eyebrow">Preferred size</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SIZES.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setSize(s === size ? "" : s)}
                          aria-pressed={s === size}
                          className={`size-10 border text-xs transition-colors ${
                            s === size
                              ? "border-foreground bg-foreground text-background"
                              : "border-input hover:border-foreground"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="eyebrow">Preferred colour</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {colorOptions.map((c) => (
                        <button
                          type="button"
                          key={c}
                          onClick={() => setColor(c === color ? "" : c)}
                          aria-pressed={c === color}
                          className={`border px-3 py-2 text-xs transition-colors ${
                            c === color
                              ? "border-foreground bg-foreground text-background"
                              : "border-input hover:border-foreground"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div>
                  <span className="eyebrow">Quantity</span>
                  <div className="mt-3 flex w-32 items-center justify-between border border-input">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="h-10 w-10 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      −
                    </button>
                    <span className="text-sm">{quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="h-10 w-10 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3 border-t border-border pt-6">
                  <Consent
                    id="whatsapp"
                    checked={whatsappOptIn}
                    onChange={setWhatsappOptIn}
                    label="Send my launch code and updates on WhatsApp"
                    icon
                  />
                  <Consent
                    id="marketing"
                    checked={marketingConsent}
                    onChange={setMarketingConsent}
                    label="Email me new drops and restocks occasionally"
                  />
                  <Consent
                    id="terms"
                    checked={terms}
                    onChange={setTerms}
                    label="I accept the Terms and Privacy Policy"
                    error={errors["terms"]}
                  />
                </div>

                {errors["form"] ? (
                  <p className="text-sm text-destructive">{errors["form"]}</p>
                ) : null}

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-13 w-full rounded-none py-4 text-xs tracking-[0.2em] uppercase"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Reserving
                    </>
                  ) : (
                    "Reserve my 10% discount"
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  No payment today · Registration takes 40 seconds · Unsubscribe anytime
                </p>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="eyebrow">
        {label}
        {optional ? <span className="ml-2 normal-case opacity-60">optional</span> : null}
      </Label>
      <div className="mt-2">{children}</div>
      {hint && !error ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
      {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function Consent({
  id,
  checked,
  onChange,
  label,
  icon,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  icon?: boolean;
  error?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(value) => onChange(value === true)}
          className="mt-0.5 rounded-none"
        />
        <span className="leading-relaxed text-muted-foreground">
          {icon ? <MessageCircle className="mr-1 inline size-3.5 align-[-2px]" /> : null}
          {label}
        </span>
      </label>
      {error ? <p className="mt-1 ml-7 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
