"use client";

import { Users, CheckCircle, Link2 } from "lucide-react";

interface Props {
  total:    number;
  filtered: number;
}

export default function StatsBar({ total, filtered }: Props) {
  const stats = [
    { icon: <Users    size={18} />, value: total,    label: "Total Students",       color: "text-brand-400"  },
    { icon: <CheckCircle size={18}/>,value: total,   label: "Certs Completed",      color: "text-green-400"  },
    { icon: <Link2    size={18} />, value: total,    label: "HyperLinks Generated", color: "text-yellow-400" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-6 animate-slide-up">
      {stats.map(({ icon, value, label, color }) => (
        <div key={label} className="glass-card p-4 sm:p-5 text-center group hover:glow-border transition-all duration-300">
          <div className={`flex justify-center mb-2 ${color}`}>{icon}</div>
          <div className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</div>
          <div className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{label}</div>
        </div>
      ))}
    </div>
  );
}
