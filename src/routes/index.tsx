import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Mail,
  Minus,
  Plus,
  Truck,
  Shield,
  Ruler,
} from "lucide-react";

import heroAsset from "@/assets/hero-beige.png.asset.json";
import fabricImage from "@/assets/fabric.jpg";
import { PRODUCTS, type Product } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import { RegisterDialog } from "@/components/RegisterDialog";
import { Button } from "@/components/ui/button";

const TITLE = "AB Collection — Premium Everyday Essentials, Launching Soon";
const DESCRIPTION =
  "Register your interest in AB Collection's first drop of 240 GSM premium cotton tees and reserve an exclusive 10% launch discount. No payment today.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Brand",
          name: "AB Collection",
          description: DESCRIPTION,
          email: "abbasbadwahwala53@gmail.com",
          sameAs: ["https://instagram.com/abcollection.co.in"],
        }),
      },
    ],
  }),
  component: Landing,
});

const LAUNCH_LABEL = "Launching soon";

function Landing() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const register = (product: Product | null) => {
    setSelected(product);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onRegister={() => register(null)} />
      <main>
        <Hero onRegister={() => register(null)} />
        <Marquee />
        <Manifesto />
        <Products onRegister={register} />
        <FabricStory onRegister={() => register(null)} />
        <Offer onRegister={() => register(null)} />
        <Founder />
        <Faq onRegister={() => register(null)} />
      </main>
      <Footer />
      <RegisterDialog open={open} onOpenChange={setOpen} product={selected} />
    </div>
  );
}

function Header({ onRegister }: { onRegister: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="/" className="font-display text-xl tracking-[0.18em] uppercase">
          AB Collection
        </a>
        <nav className="hidden items-center gap-10 text-xs tracking-[0.18em] uppercase md:flex">
          <a href="#collection" className="text-muted-foreground transition-colors hover:text-foreground">
            Collection
          </a>
          <a href="#craft" className="text-muted-foreground transition-colors hover:text-foreground">
            Craft
          </a>
          <a href="#faq" className="text-muted-foreground transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>
        <Button
          onClick={onRegister}
          className="h-10 rounded-none px-5 text-[0.65rem] tracking-[0.2em] uppercase"
        >
          Reserve 10%
        </Button>
      </div>
    </header>
  );
}

function Hero({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl items-stretch gap-0 px-0 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col justify-center px-6 py-20 lg:px-10 lg:py-32">
          <p className="eyebrow">{LAUNCH_LABEL} · First collection</p>
          <h1 className="mt-8 font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            Essentials worth
            <br />
            wearing every day.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Heavyweight 240-300 GSM cotton, cut for real Indian weather and real everyday life.
            Premium quality, honestly priced, no logos shouting, nothing you have to think about.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              onClick={onRegister}
              className="h-14 rounded-none px-10 text-xs tracking-[0.2em] uppercase"
            >
              Reserve your 10% <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
            </Button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              No payment today.
              <br className="hidden sm:block" /> Registration takes under a minute.
            </p>
          </div>

          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              ["240–300", "GSM heavyweight"],
              ["S–XXL", "Every fit"],
              ["10%", "Launch discount"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-2xl">{value}</p>
                <p className="mt-1 text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[60vh] overflow-hidden bg-muted lg:min-h-[86vh]">
          <img
            src={heroAsset.url}
            alt="Man wearing a warm beige oversized premium cotton t-shirt from AB Collection"
            width={1067}
            height={1600}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "100% COMBED COTTON",
    "Pre-shrunk & colour locked",
    "Made in India",
    "\u00a0 \u00a0 \u00a0 \u00a0 \u00a0PAN-INDIA DELIVERY",
    "\n",
  ];
  return (
    <div className="border-y border-border bg-ink py-4 text-ink-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-6 text-[0.65rem] tracking-[0.2em] uppercase">
        {items.map((item) => (
          <span key={item} className="opacity-80">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <p className="eyebrow">Why we exist</p>
          <div>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Most everyday clothing asks you to compromise. Either it feels good and falls apart,
              or it lasts and never feels like yours.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
              AB Collection is built for the in-between: premium construction without luxury pricing.
              We spent months on fabric weight, shrinkage and neck ribbing so you never have to think
              about any of it. Buy fewer things. Wear them for years.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {[
                ["Comfort first", "Every decision starts with how it feels on the third wash."],
                ["Timeless design", "Neutral palettes and clean cuts that outlive trends."],
                ["Honest pricing", "Direct to you. No retail markup, no inflated MRPs."],
              ].map(([title, body]) => (
                <div key={title} className="border-t border-border pt-5">
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Products({ onRegister }: { onRegister: (product: Product) => void }) {
  return (
    <section id="collection" className="border-t border-border bg-muted/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">The first collection</p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                Six pieces. Nothing extra.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Select the pieces you want and we'll hold your 10% for them. You can choose more than
              one.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.id} delay={index * 80}>
              <article className="group">
                <div className="relative overflow-hidden bg-background">
                  {product.images && product.images.length > 1 ? (
                    <ImageSlider product={product} />
                  ) : (
                    <img
                      src={product.image}
                      alt={`${product.name} — ${product.fabric}`}
                      loading="lazy"
                      width={1120}
                      height={1408}
                      className="img-zoom aspect-[4/5] w-full object-cover"
                    />
                  )}
                  <span className="absolute top-4 left-4 z-10 bg-background/90 px-3 py-1 text-[0.6rem] tracking-[0.18em] uppercase">
                    {LAUNCH_LABEL}
                  </span>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl leading-snug">{product.name}</h3>
                    <p className="mt-1 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                      {product.fabric}
                    </p>
                  </div>
                  <p className="shrink-0 pt-1 text-sm text-muted-foreground">{product.price}</p>
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {product.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-olive" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-muted-foreground">
                  <span className="text-foreground">Colours:</span> {product.colors.join(" · ")}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="text-foreground">Sizes:</span> {product.sizes.join(" · ")}
                </p>
                <Button
                  onClick={() => onRegister(product)}
                  variant="outline"
                  className="mt-6 h-12 w-full rounded-none border-foreground text-xs tracking-[0.2em] uppercase transition-colors hover:bg-foreground hover:text-background"
                >
                  Register interest
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageSlider({ product }: { product: Product }) {
  const images = product.images ?? [product.image];
  const [index, setIndex] = useState(0);
  const go = (dir: number) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden">
      <div
        className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${product.name} — ${product.colors[i] ?? product.fabric}`}
            loading="lazy"
            width={1120}
            height={1408}
            className="h-full w-full shrink-0 object-cover"
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous colour"
        onClick={() => go(-1)}
        className="absolute top-1/2 left-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center bg-background/85 text-foreground transition-opacity hover:bg-background"
      >
        <ChevronLeft className="size-4" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label="Next colour"
        onClick={() => go(1)}
        className="absolute top-1/2 right-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center bg-background/85 text-foreground transition-opacity hover:bg-background"
      >
        <ChevronRight className="size-4" strokeWidth={1.5} />
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`View ${product.colors[i] ?? `image ${i + 1}`}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-6 transition-colors ${i === index ? "bg-foreground" : "bg-foreground/25"}`}
          />
        ))}
      </div>
    </div>
  );
}

function FabricStory({ onRegister }: { onRegister: () => void }) {
  return (
    <section id="craft" className="grid lg:grid-cols-2">
      <div className="relative min-h-[50vh] overflow-hidden">
        <img
          src={fabricImage}
          alt="Macro close-up of heavyweight 240 GSM cotton jersey fabric"
          loading="lazy"
          width={1408}
          height={1008}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center bg-ink px-6 py-24 text-ink-foreground lg:px-16">
        <Reveal>
          <p className="eyebrow text-ink-foreground/60">The detail obsession</p>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            240 GSM isn't a number.
            <br />
            It's how long it lasts.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-foreground/70">
            Most fast-fashion tees sit at 160–180 GSM: light, thin, and see-through after a season.
            We chose heavyweight combed cotton, bio-washed for softness and pre-shrunk so the fit you
            buy is the fit you keep.
          </p>
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {[
              ["Shoulder taping", "Reinforced so the neckline never sags."],
              ["Ribbed collar", "2×2 rib that recovers its shape after every wash."],
              ["Colour lock", "Reactive dyes tested for 40+ wash cycles."],
              ["True sizing", "Fit tested on real Indian body types, S to XXL."],
            ].map(([term, detail]) => (
              <div key={term} className="border-t border-ink-foreground/15 pt-4">
                <dt className="text-base">{term}</dt>
                <dd className="mt-2 text-xs leading-relaxed text-ink-foreground/60">{detail}</dd>
              </div>
            ))}
          </dl>
          <Button
            onClick={onRegister}
            variant="outline"
            className="mt-12 h-13 rounded-none border-ink-foreground/40 bg-transparent px-8 text-xs tracking-[0.2em] text-ink-foreground uppercase hover:bg-ink-foreground hover:text-ink"
          >
            Reserve your 10%
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Offer({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="border-y border-border bg-sand text-sand-foreground">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
        <Reveal>
          <p className="eyebrow">Pre-launch privilege</p>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-6xl">
            10% off, reserved
            <br />
            before anyone else.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed opacity-75">
            This isn't a sale. It's a thank-you to the people who back us before day one. Register
            your interest and we'll hold your discount, your size, and 48 hours of early access
            before the collection opens publicly.
          </p>
          <div className="mx-auto mt-14 grid max-w-2xl gap-8 sm:grid-cols-3">
            {[
              [Shield, "Nothing charged today", "Interest registration only."],
              [Ruler, "Your size held first", "Early access before public launch."],
              [Truck, "Prepaid, delivered pan-India", "Tracked shipping from launch day."],
            ].map(([Icon, title, body]) => {
              const Component = Icon as typeof Shield;
              return (
                <div key={title as string}>
                  <Component className="mx-auto size-5 opacity-70" strokeWidth={1.25} />
                  <p className="mt-4 text-sm">{title as string}</p>
                  <p className="mt-1 text-xs leading-relaxed opacity-65">{body as string}</p>
                </div>
              );
            })}
          </div>
          <Button
            onClick={onRegister}
            className="mt-14 h-14 rounded-none px-12 text-xs tracking-[0.2em] uppercase"
          >
            Reserve my 10% discount
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <p className="eyebrow">From the founder</p>
          <div>
            <blockquote className="font-display text-2xl leading-snug sm:text-3xl">
              "I kept buying tees that looked right in a photo and felt wrong by the third wash. So
              we built the one I wanted to own; heavier cotton, honest pricing, and a fit that
              works whether you're in a lecture hall or a client meeting. That's the whole point."
            </blockquote>
            <p className="mt-8 text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Abbas Badwahwala · Founder, AB Collection
            </p>
            <div className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {[
                ["Made in India", "Produced with partner units we visit ourselves."],
                ["7-day exchange", "Product defect? Swap it, no questions."],
                ["Direct to you", "No middlemen, so quality goes into the fabric."],
              ].map(([title, body]) => (
                <div key={title}>
                  <p className="text-sm">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const FAQS = [
  ["When will the collection launch?", "Very soon. Register your interest to be the first to know, registered customers get 48 hours of early access before the public."],
  ["How does the pre-launch offer work?", "Register before launch and we reserve an exclusive 10% launch discount on your selected pieces. You'll receive your code by WhatsApp and email."],
  ["Am I paying anything today?", "No. This is only an interest registration. Nothing is charged now, and you'll receive purchase instructions when the collection launches."],
  ["Can I select multiple products?", "Yes. Select as many pieces as you like — your discount applies across your selection."],
  ["Will my size be available?", "The 240 GSM Oversized Tee and the Regular Fit Tee launch in S to XXL. All other pieces launch in S to XL. Registering early helps us produce the right sizes in the right quantities."],
  ["Is Cash on Delivery available?", "Payment will be prepaid only at launch. This keeps costs down and pricing honest — savings we pass back to you."],
  ["How will you use my details?", "Only to tell you about the launch and fulfil your order. We never sell your data, and you can unsubscribe at any time."],
];

function Faq({ onRegister }: { onRegister: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-border bg-muted/40 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.4fr_0.6fr] lg:px-10">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Everything you
            <br />
            might ask.
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Still unsure? Write to us at{" "}
            <a
              href="mailto:abbasbadwahwala53@gmail.com"
              className="text-foreground underline underline-offset-4"
            >
              abbasbadwahwala53@gmail.com
            </a>
            .
          </p>
        </div>

        <div>
          <div className="border-t border-border">
            {FAQS.map(([question, answer], index) => {
              const expanded = openIndex === index;
              return (
                <div key={question} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(expanded ? null : index)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-base">{question}</span>
                    {expanded ? (
                      <Minus className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.25} />
                    ) : (
                      <Plus className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.25} />
                    )}
                  </button>
                  {expanded ? (
                    <p className="max-w-xl pb-6 text-sm leading-relaxed text-muted-foreground">
                      {answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <Button
            onClick={onRegister}
            className="mt-10 h-13 rounded-none px-10 text-xs tracking-[0.2em] uppercase"
          >
            Reserve your 10%
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-display text-3xl tracking-[0.16em] uppercase">AB Collection</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-foreground/60">
              Premium everyday essentials for men; exceptional comfort, timeless design and honest
              pricing. {LAUNCH_LABEL}.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-sm lg:items-end">
            <a
              href="https://instagram.com/abcollection.co.in"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 text-ink-foreground/70 transition-colors hover:text-ink-foreground"
            >
              <Instagram className="size-4" strokeWidth={1.5} /> @abcollection.co.in
            </a>
            <a
              href="mailto:abbasbadwahwala53@gmail.com"
              className="flex items-center gap-3 text-ink-foreground/70 transition-colors hover:text-ink-foreground"
            >
              <Mail className="size-4" strokeWidth={1.5} /> abbasbadwahwala53@gmail.com
            </a>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-ink-foreground/15 pt-8 text-[0.65rem] tracking-[0.16em] text-ink-foreground/50 uppercase sm:flex-row">
          <p>© {new Date().getFullYear()} AB Collection. All rights reserved.</p>
          <p>Made in India</p>
        </div>
      </div>
    </footer>
  );
}
