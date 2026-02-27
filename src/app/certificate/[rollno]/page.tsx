import { students, getStudentByRollNo } from "@/lib/students";
import { notFound }                       from "next/navigation";
import Link                               from "next/link";
import { Award, ArrowLeft, ExternalLink, Mail, Calendar, Link2 } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ rollno: string }>;
}

export function generateStaticParams() {
  return students.map((s) => ({ rollno: s.rollNo }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rollno } = await params;
  const s = getStudentByRollNo(rollno);
  if (!s) return { title: "Certificate Not Found" };
  return {
    title: `${s.certId} — PromptCraft 2026`,
    description: `Certificate of ${s.name} (${s.rollNo}) — PromptCraft 2026 HyperText Competition`,
  };
}

export default async function CertificatePage({ params }: Props) {
  const { rollno } = await params;
  const s = getStudentByRollNo(rollno);
  if (!s) notFound();

  return (
    <main className="min-h-screen gradient-bg px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Registry
        </Link>

        {/* Card */}
        <div className="glass-card glow-border overflow-hidden">
          {/* Top banner */}
          <div className="h-2 bg-gradient-to-r from-brand-600 via-purple-500 to-brand-400" />

          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center flex-shrink-0">
                <Award size={24} className="text-brand-300" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">{s.name}</h1>
                <div className="font-mono text-brand-400 text-sm mt-0.5">{s.rollNo}</div>
                <div className="text-green-400 text-xs mt-1 flex items-center gap-1">
                  ✓ Assessment Completed — Certificate Verified
                </div>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                { icon: <Mail     size={14} />, label: "Email",  value: s.email         },
                { icon: <Calendar size={14} />, label: "Joined", value: s.dateOfJoining },
                { icon: <Link2    size={14} />, label: "Registry Index", value: `#${String(s.serialNo).padStart(2, "0")}` },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-brand-900/40 rounded-xl p-3 border border-brand-800/50">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">{icon} {label}</div>
                  <div className="text-white text-sm font-medium break-all">{value}</div>
                </div>
              ))}
            </div>

            {/* Hypertext ID */}
            <div className="mb-6">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Hypertext Certificate ID</div>
              <a
                href={s.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-base sm:text-lg font-bold text-brand-300 bg-brand-900/60 border border-brand-600 hover:border-brand-400 rounded-xl px-5 py-4 text-center transition-all hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                id={s.certId}
              >
                {s.certId}
              </a>
            </div>

            {/* Certificate preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-500 uppercase tracking-widest">Certificate Preview</div>
                <a
                  href={s.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs flex items-center gap-1 text-brand-400 hover:text-brand-300"
                >
                  <ExternalLink size={11} /> Open in Drive
                </a>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3]">
                <iframe
                  src={s.previewUrl}
                  className="w-full h-full"
                  allow="autoplay"
                  title={`Certificate of ${s.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
