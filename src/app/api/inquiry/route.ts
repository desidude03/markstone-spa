import { NextRequest, NextResponse } from "next/server";
import { InquiryService } from "@/services/InquiryService";
import type { InquiryDTO } from "@/types";

const REQUIRED_FIELDS: (keyof InquiryDTO)[] = [
  "fullName",
  "email",
  "phone",
  "serviceCategory",
  "message",
];

export async function POST(req: NextRequest) {
  let body: InquiryDTO;
  try {
    body = (await req.json()) as InquiryDTO;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || body[field].trim() === "") {
      return NextResponse.json(
        { success: false, error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    const result = await new InquiryService().submitInquiry(body);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Failed to submit inquiry";
    return NextResponse.json({ success: false, error }, { status: 503 });
  }
}