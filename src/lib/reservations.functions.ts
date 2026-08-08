import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const itemSchema = z.object({
  productName: z.string().trim().min(1).max(80),
  size: z.string().trim().min(1).max(10),
  colour: z.string().trim().min(1).max(40),
});

const reservationSchema = z.object({
  reservationId: z
    .string()
    .trim()
    .regex(/^AB-\d{6}-[A-Z0-9]{4}$/, "Invalid reservation reference")
    .optional(),
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  mobile: z.string().trim().min(10).max(20),
  email: z.string().trim().max(255).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  whatsappOptIn: z.boolean(),
  termsAccepted: z.literal(true),
  items: z.array(itemSchema).min(1, "Select at least one product").max(10),
});

export type ReservationInput = z.input<typeof reservationSchema>;

export type ReservationResult =
  | { status: "created"; reservationId: string }
  | { status: "duplicate"; reservationId: string | null };

export const submitReservation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => reservationSchema.parse(data))
  .handler(async ({ data }): Promise<ReservationResult> => {
    const { PRODUCTS } = await import("@/data/products");
    const { PRODUCT_SPECS } = await import("@/lib/product-specs");
    const { getValues, appendValues } = await import("@/lib/sheets.server");
    const { normalizeMobile, makeReservationId } = await import("@/lib/reservation-utils");

    const mobile = normalizeMobile(data.mobile);
    if (!mobile) throw new Error("Enter a valid 10-digit Indian mobile number");

    // Validate every item against the live catalogue.
    const items = data.items.map((item) => {
      const product = PRODUCTS.find((p) => p.name === item.productName);
      if (!product) throw new Error("Unknown product selected");
      if (!product.sizes.includes(item.size)) throw new Error("Unavailable size selected");
      if (!product.colors.includes(item.colour)) throw new Error("Unavailable colour selected");
      return {
        name: product.name,
        spec: PRODUCT_SPECS[product.name] ?? product.fabric,
        size: item.size,
        colour: item.colour,
      };
    });

    // Duplicate check on the normalised mobile number.
    const existing = await getValues("Reservations!A2:D");
    const match = existing.find((row) => normalizeMobile(row[3] ?? "") === mobile);
    if (match) return { status: "duplicate", reservationId: match[0] ?? null };

    const reservationId = data.reservationId ?? makeReservationId();

    // Idempotency: skip item rows already written by a previous failed attempt.
    const itemRows = await getValues("'Reservation Items'!A2:A");
    const itemsAlreadyWritten = itemRows.some((row) => row[0] === reservationId);

    if (!itemsAlreadyWritten) {
      await appendValues(
        "'Reservation Items'!A:E",
        items.map((i) => [reservationId, i.name, i.spec, i.size, i.colour]),
      );
    }

    await appendValues("Reservations!A:J", [
      [
        reservationId,
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.fullName,
        mobile,
        data.email || "",
        data.city || "",
        data.whatsappOptIn ? "Yes" : "No",
        "Yes",
        "Registered",
        "",
      ],
    ]);

    return { status: "created", reservationId };
  });
