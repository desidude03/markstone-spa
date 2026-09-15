import { create } from "zustand";
import type { InquiryDTO } from "@/types";

type InquiryStatus = "idle" | "submitting" | "success" | "error";

interface InquiryState {
  form: InquiryDTO;
  status: InquiryStatus;
  error?: string;
  setField: <K extends keyof InquiryDTO>(field: K, value: InquiryDTO[K]) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

const initialForm: InquiryDTO = {
  fullName: "",
  email: "",
  phone: "",
  serviceCategory: "",
  message: "",
};

export const useInquiryStore = create<InquiryState>()((set, get) => ({
  form: initialForm,
  status: "idle",
  error: undefined,
  setField: (field, value) =>
    set((s) => ({ form: { ...s.form, [field]: value } })),
  submit: async () => {
    set({ status: "submitting", error: undefined });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(get().form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Failed to submit inquiry");
      }
      set({ status: "success", form: initialForm });
    } catch (err) {
      set({
        status: "error",
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  },
  reset: () => set({ status: "idle", form: initialForm, error: undefined }),
}));