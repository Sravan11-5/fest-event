"use client";

import { useState, useMemo } from "react";
import { students } from "@/lib/students";
import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import SearchBar from "@/components/SearchBar";
import StudentTable from "@/components/StudentTable";
import CertificateModal from "@/components/CertificateModal";
import type { Student } from "@/lib/students";

export default function HomePage() {
  const [query,    setQuery]    = useState("");
  const [selected, setSelected] = useState<Student | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q)    ||
        s.rollNo.toLowerCase().includes(q)  ||
        s.email.toLowerCase().includes(q)   ||
        s.certId.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <StatsBar total={students.length} filtered={filtered.length} />

        <div className="mt-6">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="mt-8 animate-fade-in">
          <StudentTable students={filtered} onView={(s) => setSelected(s)} />
        </div>

        {/* Hypertext legend */}
        <div className="mt-10 glass-card p-6 glow-border animate-slide-up">
          <h3 className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">
            Hypertext Naming Convention
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Each certificate is accessible through its unique hypertext identifier
            following the standard convention:
          </p>
          <div className="font-mono text-brand-300 text-center text-lg tracking-widest bg-brand-900/60 border border-brand-700 rounded-xl py-4 px-6">
            <span className="text-white">ROLLNO</span>
            <span className="text-brand-500 mx-1">_</span>
            <span className="text-yellow-400">XX</span>
            <span className="text-brand-500 mx-1">_</span>
            <span className="text-green-400">CERTIFICATE</span>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-400">
            <div className="bg-brand-900/40 rounded-lg p-3 text-center">
              <div className="text-white font-semibold mb-1">ROLLNO</div>
              <div>Student&apos;s unique roll number issued by the institution</div>
            </div>
            <div className="bg-brand-900/40 rounded-lg p-3 text-center">
              <div className="text-yellow-400 font-semibold mb-1">XX</div>
              <div>Two-digit sequential registry index (01–99)</div>
            </div>
            <div className="bg-brand-900/40 rounded-lg p-3 text-center">
              <div className="text-green-400 font-semibold mb-1">CERTIFICATE</div>
              <div>Suffix identifying the hypertext as a certificate record</div>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <CertificateModal student={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
