"use client";

import { useState, useEffect } from "react";

export type DebtRow = {
  id: string;
  name: string;
  balance: string;
  interestRate: string;
  minimumPayment: string;
};

const STORAGE_KEY = "debthydra_debts";

const DEFAULT_DEBTS: DebtRow[] = [
  { id: "1", name: "Credit Card A", balance: "3200", interestRate: "22.99", minimumPayment: "64" },
  { id: "2", name: "Credit Card B", balance: "1400", interestRate: "19.99", minimumPayment: "35" },
  { id: "3", name: "Personal Loan", balance: "5500", interestRate: "12.5", minimumPayment: "130" },
];

function loadDebts(): DebtRow[] {
  if (typeof window === "undefined") return DEFAULT_DEBTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as DebtRow[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_DEBTS;
}

export function useSharedDebts() {
  const [debts, setDebtsRaw] = useState<DebtRow[]>(DEFAULT_DEBTS);

  // Load from localStorage after mount (avoid SSR mismatch)
  useEffect(() => {
    setDebtsRaw(loadDebts());
  }, []);

  function setDebts(updater: DebtRow[] | ((prev: DebtRow[]) => DebtRow[])) {
    setDebtsRaw((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  return [debts, setDebts] as const;
}
