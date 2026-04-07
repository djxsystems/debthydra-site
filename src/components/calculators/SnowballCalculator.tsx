"use client";

import { useRef, useState } from "react";
import { calculateSnowball, formatCurrency, formatMonths } from "@/lib/calculators";
import { trackCalculatorCompleted, trackCalculatorStarted } from "@/lib/analytics";
import type { Debt, DebtPayoffResult } from "@/types";
import { useSharedDebts, type DebtRow } from "@/hooks/useSharedDebts";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormField from "@/components/ui/FormField";

export default function SnowballCalculator() {
  const [debts, setDebts] = useSharedDebts();
  const [extraPayment, setExtraPayment] = useState("100");
  const [result, setResult] = useState<DebtPayoffResult | null>(null);
  const hasTrackedStart = useRef(false);

  function markStarted() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackCalculatorStarted("snowball", { debtCount: debts.length });
  }

  function addDebt() {
    markStarted();
    setDebts((prev) => [
      ...prev,
      { id: Date.now().toString(), name: `Debt ${prev.length + 1}`, balance: "", interestRate: "", minimumPayment: "" },
    ]);
  }

  function removeDebt(id: string) {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }

  function updateDebt(id: string, field: keyof DebtRow, value: string) {
    markStarted();
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  }

  function calculate() {
    markStarted();
    const parsed: Debt[] = debts.map((d) => ({
      id: d.id,
      name: d.name,
      balance: parseFloat(d.balance) || 0,
      interestRate: parseFloat(d.interestRate) || 0,
      minimumPayment: parseFloat(d.minimumPayment) || 0,
    }));
    const monthlyExtra = parseFloat(extraPayment) || 0;
    const calculation = calculateSnowball(parsed, monthlyExtra);
    setResult(calculation);
    trackCalculatorCompleted("snowball", {
      debtCount: parsed.length,
      monthlyExtra,
      payoffMonths: calculation.payoffMonths,
    });
  }

  return (
    <div className="space-y-6">
      {/* Debts table */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Debts</h2>

        {/* Mobile: card-per-debt */}
        <div className="flex flex-col gap-3 sm:hidden">
          {debts.map((debt, i) => (
            <div key={debt.id} className="border border-gray-100 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Debt {i + 1}</span>
                <button onClick={() => removeDebt(debt.id)} className="text-gray-400 hover:text-red-500 text-xs" aria-label={`Remove ${debt.name}`}>✕ Remove</button>
              </div>
              <input value={debt.name} onChange={(e) => updateDebt(debt.id, "name", e.target.value)} placeholder="Name (e.g. Visa)" className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" aria-label="Debt name" />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-0.5 block">Balance ($)</label>
                  <input type="number" min={0} value={debt.balance} onChange={(e) => updateDebt(debt.id, "balance", e.target.value)} className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-0.5 block">Rate (%)</label>
                  <input type="number" min={0} step={0.01} value={debt.interestRate} onChange={(e) => updateDebt(debt.id, "interestRate", e.target.value)} className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-0.5 block">Min. ($)</label>
                  <input type="number" min={0} value={debt.minimumPayment} onChange={(e) => updateDebt(debt.id, "minimumPayment", e.target.value)} className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Balance ($)</th>
                <th className="pb-2 font-medium">Rate (%)</th>
                <th className="pb-2 font-medium">Min. Payment ($)</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {debts.map((debt) => (
                <tr key={debt.id}>
                  <td className="py-2 pr-2">
                    <input value={debt.name} onChange={(e) => updateDebt(debt.id, "name", e.target.value)} className="w-full rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" aria-label="Debt name" />
                  </td>
                  <td className="py-2 pr-2">
                    <input type="number" min={0} value={debt.balance} onChange={(e) => updateDebt(debt.id, "balance", e.target.value)} className="w-24 rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" aria-label="Balance" />
                  </td>
                  <td className="py-2 pr-2">
                    <input type="number" min={0} step={0.01} value={debt.interestRate} onChange={(e) => updateDebt(debt.id, "interestRate", e.target.value)} className="w-20 rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" aria-label="Interest rate" />
                  </td>
                  <td className="py-2 pr-2">
                    <input type="number" min={0} value={debt.minimumPayment} onChange={(e) => updateDebt(debt.id, "minimumPayment", e.target.value)} className="w-24 rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" aria-label="Minimum payment" />
                  </td>
                  <td className="py-2">
                    <button onClick={() => removeDebt(debt.id)} className="text-gray-400 hover:text-red-500 text-xs" aria-label={`Remove ${debt.name}`}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button variant="ghost" size="sm" onClick={addDebt} className="mt-3 text-teal-600">
          + Add another debt
        </Button>
      </Card>

      {/* Extra payment */}
      <Card>
        <div className="max-w-xs">
          <FormField
            label="Extra monthly payment"
            hint="Any extra cash you can throw at debt each month on top of minimums."
            prefix="$"
            type="number"
            min={0}
            value={extraPayment}
            onChange={(e) => {
              markStarted();
              setExtraPayment(e.target.value);
            }}
          />
        </div>
        <Button onClick={calculate} size="lg" className="mt-4">
          Calculate Payoff Plan
        </Button>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Debt-Free In</p>
              <p className="text-2xl font-bold text-teal-600">{formatMonths(result.payoffMonths)}</p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Interest</p>
              <p className="text-2xl font-bold text-orange-500">
                {formatCurrency(result.totalInterestPaid)}
              </p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Paid</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(result.totalPaid)}
              </p>
            </Card>
          </div>

          <Card>
            <h3 className="font-semibold text-gray-800 mb-2">Payoff Order (Snowball)</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              {result.debtPayoffOrder.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ol>
            <p className="text-xs text-gray-500 mt-3">
              Each debt&apos;s freed-up payment rolls into the next one — that&apos;s the snowball effect.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
