import { CoreServiceItem } from "@/types";

const CONTENT_SERVICE_URL = process.env.CONTENT_SERVICE_URL;

async function fetchApi<T>(path: string, fallback: T): Promise<T> {
  if (!CONTENT_SERVICE_URL) return fallback;
  try {
    const res = await fetch(`${CONTENT_SERVICE_URL}${path}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return (await res.json()) as T;
  } catch {
    // Content service unreachable — degrade gracefully to the local catalogue.
  }
  return fallback;
}

export class CoreServicesService {
  private static instance: CoreServicesService;

  private constructor() {}

  public static getInstance(): CoreServicesService {
    if (!CoreServicesService.instance) {
      CoreServicesService.instance = new CoreServicesService();
    }
    return CoreServicesService.instance;
  }

  async getCoreServices(): Promise<CoreServiceItem[]> {
    return fetchApi("/services", [
      {
        id: "trading",
        title: "TRADING",
        description:
          "Supplying quality products across multiple industries with reliability and efficiency.",
        category: "trading",
      },
      {
        id: "logistics",
        title: "LOGISTICS",
        description:
          "End-to-end logistics solutions that ensure timely, safe, and cost-effective delivery.",
        category: "logistics",
      },
      {
        id: "manpower",
        title: "MANPOWER",
        description:
          "Skilled and reliable workforce solutions tailored to meet your operational needs.",
        category: "manpower",
      },
      {
        id: "equipment",
        title: "EQUIPMENT RENTAL",
        description:
          "Flexible equipment rental services that support productivity and project success.",
        category: "equipment",
      },
    ]);
  }
}