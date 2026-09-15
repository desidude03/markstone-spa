import { NextResponse } from "next/server";
import { CoreServicesService } from "@/services/CoreServicesService";

export async function GET() {
  const services = await CoreServicesService.getInstance().getCoreServices();
  return NextResponse.json({ services });
}