"use client";

import { useState } from "react";

interface ContactComposerProps {
    email: string;
    whatsappNumber?: string; // e.g., "2348012345678" (digits only, no +)
}

export function ContactComposer({ email, whatsappNumber = "" }: ContactComposerProps) {
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("Software Engineering");
    const [message, setMessage] = useState("");

    const formattedBody = `Hi Stephanie,\n\n${message.trim() || "I'd love to connect regarding a role or project."}${
        name.trim() ? `\n\n— ${name.trim()}` : ""
    }`;

    const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
        `[${topic}] Portfolio Inquiry${name.trim() ? ` from ${name.trim()}` : ""}`
    )}&body=${encodeURIComponent(formattedBody)}`;

    const cleanPhone = whatsappNumber.replace(/\D/g, "");
    const whatsappHref = cleanPhone
        ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedBody)}`
        : `https://wa.me/?text=${encodeURIComponent(formattedBody)}`;

    return (
        <div className="rounded-2xl border border-[#1E2230] bg-[#11131A] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-white">Send a quick note</h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#34D399]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse" />
          Direct dispatch
        </span>
            </div>

            <div className="mt-4 space-y-3.5">
                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <label htmlFor="footer-name" className="sr-only">
                            Your name
                        </label>
                        <input
                            id="footer-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full rounded-xl border border-[#1E2230] bg-[#090A0F] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-[#A78BFA] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="footer-topic" className="sr-only">
                            Focus area
                        </label>
                        <select
                            id="footer-topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full rounded-xl border border-[#1E2230] bg-[#090A0F] px-3.5 py-2.5 text-sm text-slate-200 focus:border-[#A78BFA] focus:outline-none"
                        >
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Cybersecurity & GRC">Cybersecurity &amp; GRC</option>
                            <option value="Byte & Security">Byte &amp; Security</option>
                            <option value="General / Role">Role / General Inquiry</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="footer-message" className="sr-only">
                        Message
                    </label>
                    <textarea
                        id="footer-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a brief message about a role, audit, or build..."
                        className="w-full resize-none rounded-xl border border-[#1E2230] bg-[#090A0F] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-[#A78BFA] focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
                    <a
                        href={mailtoHref}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/15 px-4 py-2.5 font-display text-sm font-semibold text-[#A78BFA] transition-all hover:border-[#A78BFA] hover:bg-[#8B5CF6]/25 hover:text-white"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        Send via Email
                    </a>

                    <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#10B981]/40 bg-[#10B981]/15 px-4 py-2.5 font-display text-sm font-semibold text-[#34D399] transition-all hover:border-[#34D399] hover:bg-[#10B981]/25 hover:text-white"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        Send via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}