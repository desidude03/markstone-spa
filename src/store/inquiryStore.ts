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
      const { fullName, email, phone, serviceCategory, message } = get().form;
      const subject = encodeURIComponent(
        `Inquiry from ${fullName} - ${serviceCategory}`
      );
      const body = encodeURIComponent(
        `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nService Category: ${serviceCategory}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:info@markstoneksa.com?subject=${subject}&body=${body}`;
      set({ status: "success", form: initialForm });
    } catch {
      set({
        status: "error",
        error: "Failed to open email client",
      });
    }
  },
  reset: () => set({ status: "idle", form: initialForm, error: undefined }),
}));