import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().min(3).max(255).email(),
});

export type EarlyAccessResult = { status: "created" | "existing"; email: string };

export const joinEarlyAccess = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }): Promise<EarlyAccessResult> => {
    const { getValues, appendValues } = await import("@/lib/sheets.server");

    const email = data.email.trim().toLowerCase();
    const rows = await getValues("'Early Access Leads'!A2:A");
    const exists = rows.some((row) => (row[0] ?? "").trim().toLowerCase() === email);
    if (exists) return { status: "existing", email };

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    await appendValues("'Early Access Leads'!A:B", [[email, timestamp]]);
    return { status: "created", email };
  });
