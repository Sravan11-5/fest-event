"use client";

import { useEffect } from "react";
import { X, ExternalLink, Copy, CheckCircle, Calendar, Mail, Award, Link2 } from "lucide-react";
import { useState } from "react";
import type { Student } from "@/lib/students";

interface Props {
  student: Student;
  onClose: () => void;
}

export default function CertificateModal({ student: s, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const copy = async () => {
    await navigator.clipboard.writeText(s.certId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl animate-slide-up">
        <div className="glass-card glow-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-brand-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center">
                <Award size={18} className="text-brand-300" />
              </div>
              <div>
                <h2 className="font-bold text-white">{s.name}</h2>
                <span className="font-mono text-xs text-brand-400">{s.rollNo}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Info strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5">
            {[
              { icon: <Mail      size={12} />, label: "Email",   value: s.email,         cls: "text-gray-300" },
              { icon: <Calendar  size={12} />, label: "Joined",  value: s.dateOfJoining, cls: "text-gray-300" },
              { icon: <CheckCircle size={12}/>, label:"Status",  value: "Completed",     cls: "text-green-400" },
              { icon: <Link2     size={12} />, label: "Registry",value: `#${String(s.serialNo).padStart(2,"0")}`, cls: "text-brand-300" },
            ].map(({ icon, label, value, cls }) => (
              <div key={label} className="bg-brand-950/60 px-4 py-2.5">
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-0.5">{icon}{label}</div>
                <div className={`text-xs font-medium truncate ${cls}`}>{value}</div>
              </div>
            ))}
          </div>

          {/* Cert ID hypertext */}
          <div className="px-5 pt-4 pb-2 bg-brand-900/20">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Hypertext Certificate Identifier</div>
            <div className="flex items-center gap-3">
              <a
                href={s.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 font-mono text-sm font-bold text-brand-300 bg-brand-900/60 border border-brand-700 hover:border-brand-400 rounded-lg px-4 py-2.5 truncate transition-colors hover:text-white"
                title="Open certificate"
              >
                {s.certId}
              </a>
              <button
                onClick={copy}
                className="flex items-center gap-1.5 text-xs px-3 py-2.5 bg-brand-600/20 hover:bg-brand-600 border border-brand-700 hover:border-brand-400 text-brand-300 hover:text-white rounded-lg transition-all"
              >
                {copied ? <><CheckCircle size={12} className="text-green-400" /> Copied!</> : <><Copy size={12} /> Copy</>}
              </button>
              <a
                href={s.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
              >
                <ExternalLink size={12} /> Open
              </a>
            </div>
          </div>

          {/* Certificate Preview */}
          <div className="px-5 pb-5 pt-3">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Certificate Preview</div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 relative">
              <div className="aspect-[4/3] w-full">
                <iframe
                  src={s.previewUrl}
                  className="w-full h-full"
                  allow="autoplay"
                  title={`Certificate of ${s.name}`}
                />
              </div>
              {/* Fallback overlay — shown only by CSS if iframe fails via pointer-events trick */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-950/0 pointer-events-none">
                <div className="shimmer-bg absolute inset-0 opacity-0" />
              </div>
            </div>

            <p className="text-gray-600 text-xs mt-2 text-center">
              Preview not loading?{" "}
              <a href={s.viewUrl} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 underline">
                Open certificate directly in Google Drive
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
