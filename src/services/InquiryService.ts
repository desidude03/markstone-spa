import { InquiryDTO, InquiryResult } from "@/types";

const INQUIRY_SERVICE_URL = process.env.INQUIRY_SERVICE_URL;

export class InquiryService {
  async submitInquiry(data: InquiryDTO): Promise<InquiryResult> {
    // In production, this is replaced by a call to the Inquiry/CRM microservice.
    if (INQUIRY_SERVICE_URL) {
      const res = await fetch(`${INQUIRY_SERVICE_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`Inquiry service responded with ${res.status}`);
      }
      return (await res.json()) as InquiryResult;
    }
    return { success: true, id: `INQ-${Date.now()}` };
  }
}