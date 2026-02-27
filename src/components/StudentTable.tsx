"use client";

import { ExternalLink, Eye, Award, Calendar, Mail } from "lucide-react";
import type { Student } from "@/lib/students";

interface Props {
  students: Student[];
  onView:   (s: Student) => void;
}

export default function StudentTable({ students, onView }: Props) {
  if (students.length === 0) {
    return (
      <div className="glass-card py-16 text-center">
        <div className="text-gray-600 text-4xl mb-3">🔍</div>
        <p className="text-gray-400">No students match your search.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block glass-card overflow-hidden glow-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-brand-900/40">
                {["#", "Roll Number", "Student Name", "Email", "Joined", "Cert Hypertext ID", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-brand-400"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr
                  key={s.rollNo}
                  className={`table-row-hover border-b border-white/5 last:border-0 ${
                    i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                  }`}
                >
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{String(s.serialNo).padStart(2, "0")}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-bold text-brand-300 bg-brand-900/50 border border-brand-800 px-2 py-1 rounded">
                      {s.rollNo}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{s.name}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    <span className="flex items-center gap-1">
                      <Mail size={10} className="text-brand-500 flex-shrink-0" />
                      {s.email}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} className="text-brand-500 flex-shrink-0" />
                      {s.dateOfJoining}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={s.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-link"
                      title={`Open certificate: ${s.certId}`}
                    >
                      {s.certId}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView(s)}
                        className="flex items-center gap-1 text-xs bg-brand-600/20 hover:bg-brand-600 border border-brand-700 hover:border-brand-400 text-brand-300 hover:text-white px-2 py-1 rounded transition-all duration-150"
                      >
                        <Eye size={11} /> Preview
                      </button>
                      <a
                        href={s.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white px-2 py-1 rounded transition-all duration-150"
                      >
                        <ExternalLink size={11} /> Open
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {students.map((s) => (
          <div key={s.rollNo} className="glass-card p-4 hover:glow-border transition-all duration-300 animate-slide-up">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs text-gray-500 font-mono">#{String(s.serialNo).padStart(2, "0")}</span>
                <h3 className="font-semibold text-white text-sm mt-0.5">{s.name}</h3>
              </div>
              <span className="font-mono text-xs font-bold text-brand-300 bg-brand-900/50 border border-brand-800 px-2 py-1 rounded">
                {s.rollNo}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-gray-400 mb-3">
              <div className="flex items-center gap-1.5">
                <Mail size={10} className="text-brand-500" />
                {s.email}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={10} className="text-brand-500" />
                Joined: {s.dateOfJoining}
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={10} className="text-green-500" />
                Assessment Completed
              </div>
            </div>

            {/* Cert ID */}
            <a
              href={s.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-link block text-center mb-3"
            >
              {s.certId}
            </a>

            <button
              onClick={() => onView(s)}
              className="w-full flex items-center justify-center gap-1.5 text-xs bg-brand-600/20 hover:bg-brand-600 border border-brand-700 hover:border-brand-400 text-brand-300 hover:text-white py-2 rounded-lg transition-all duration-150"
            >
              <Eye size={12} /> Preview Certificate
            </button>
          </div>
        ))}
      </div>

      <p className="text-gray-600 text-xs text-center mt-4">
        Showing {students.length} of 17 records
      </p>
    </>
  );
}
