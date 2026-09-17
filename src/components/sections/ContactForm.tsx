"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { useInquiryStore } from "@/store/inquiryStore";

const SERVICE_OPTIONS: { value: string; label: string }[] = [
  { value: "trading", label: "Trading" },
  { value: "logistics", label: "Logistics" },
  { value: "manpower", label: "Manpower" },
  { value: "equipment", label: "Equipment Rental" },
];

export default function ContactForm() {
  const form = useInquiryStore((s) => s.form);
  const status = useInquiryStore((s) => s.status);
  const error = useInquiryStore((s) => s.error);
  const setField = useInquiryStore((s) => s.setField);
  const submit = useInquiryStore((s) => s.submit);

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setField(field, e.target.value);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await submit();
  }

  const inputClass =
    "w-full bg-brand-dark/80 border border-brand-blue/40 rounded px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-cyan transition-colors";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="w-full max-w-lg bg-brand-navy/60 p-6 rounded-lg border border-brand-cyan/20 text-left"
    >
      <h3 className="text-xl font-bold text-brand-cyan uppercase mb-4">
        Request a Quote
      </h3>

      <div className="space-y-4">
        <input
          required
          type="text"
          placeholder="Full Name *"
          value={form.fullName}
          onChange={update("fullName")}
          className={inputClass}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            required
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={update("email")}
            className={inputClass}
          />
          <input
            required
            type="tel"
            placeholder="Phone *"
            value={form.phone}
            onChange={update("phone")}
            className={inputClass}
          />
        </div>
        <select
          required
          value={form.serviceCategory}
          onChange={update("serviceCategory")}
          className={`${inputClass} ${form.serviceCategory ? "" : "text-gray-500"}`}
        >
          <option value="" disabled className="text-gray-500">
            Service Category *
          </option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <textarea
          required
          rows={4}
          placeholder="Message *"
          value={form.message}
          onChange={update("message")}
          className={inputClass}
        />
      </div>

      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-brand-cyan"
        >
          Your email client has been opened. Please send the message to complete your inquiry.
        </motion.p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold uppercase tracking-wider py-3 rounded transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Opening Email..." : "Send Email"}
      </button>
    </motion.form>
  );
}