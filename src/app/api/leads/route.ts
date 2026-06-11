import { NextResponse } from "next/server";
import { persistLead, validateLead, type LeadInput } from "@/lib/leads";

export async function POST(request: Request) {
  let body: Partial<LeadInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  const error = validateLead(body);
  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 422 });
  }

  const lead = await persistLead(body as LeadInput);

  return NextResponse.json({ ok: true, id: lead.id });
}
