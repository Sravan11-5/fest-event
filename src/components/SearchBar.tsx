"use client";

import { Search, X } from "lucide-react";

interface Props {
  value:    string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, roll number, email or certificate ID…"
        className="w-full bg-white/5 border border-white/10 hover:border-brand-600/50 focus:border-brand-500
                   rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500
                   outline-none transition-all duration-200 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.25)]"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
