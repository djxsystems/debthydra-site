"use client";

import { useState } from "react";
import { calculateSnowball, calculateAvalanche, formatCurrency, formatMonths } from "@/lib/calculators";
import type { Debt, DebtPayoffResult } from "@/types";
import { useSharedDebts, type DebtRow } from "@/hooks/useSharedDebts";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormField from "@/components/ui/FormField";

type Results = {
  snowball: DebtPayoffResult;
  avalanche: DebtPayoffResult;
};

export default function CompareCalculator() {
  const [debts, setDebts] = useSharedDebts();
  const [extraPayment, setExtraPayment] = useState("100");
  const [results, setResults] = useState<Results | null>(null);

  function addDebt() {
    setDebts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `Debt ${prev.length + 1}`,
        balance: "",
        interestRate: "",
        minimumPayment: "",
      },
    ]);
  }

  function removeDebt(id: string) {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }

  function updateDebt(id: string, field: keyof DebtRow, value: string) {
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  }

  function compare() {
    const parsed: Debt[] = debts.map((d) => ({
      id: d.id,
      name: d.name,
      balance: parseFloat(d.balance) || 0,
      interestRate: parseFloat(d.interestRate) || 0,
      minimumPayment: parseFloat(d.minimumPayment) || 0,
    }));
    const extra = parseFloat(extraPayment) || 0;
    setResults({
      snowball: calculateSnowball(parsed, extra),
      avalanche: calculateAvalanche(parsed, extra),
    });
  }

  const interestDiff = results
    ? results.snowball.totalInterestPaid - results.avalanche.totalInterestPaid
    : 0;
  const monthDiff = results
    ? results.snowball.payoffMonths - results.avalanche.payoffMonths
    : 0;

  return (
    <div className="space-y-6">
      {/* Debt table — card-per-row on mobile, table on sm+ */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Debts</h2>

        {/* Mobile: card layout */}
        <div className="flex flex-col gap-3 sm:hidden">
          {debts.map((debt, i) => (
            <div key={debt.id} className="border border-gray-100 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Debt {i + 1}</span>
                <button
                  onClick={() => removeDebt(debt.id)}
                  className="text-gray-400 hover:text-red-500 text-xs"
                  aria-label={`Remove ${debt.name}`}
                >
                  ✕ Remove
                </button>
              </div>
              <input
                value={debt.name}
                onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                placeholder="Name (e.g. Visa)"
                className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                aria-label="Debt name"
              />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-0.5 block">Balance ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={debt.balance}
                    onChange={(e) => updateDebt(debt.id, "balance", e.target.value)}
                    className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-0.5 block">Rate (%)</label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={debt.interestRate}
                    onChange={(e) => updateDebt(debt.id, "interestRate", e.target.value)}
                    className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-0.5 block">Min. ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={debt.minimumPayment}
                    onChange={(e) => updateDebt(debt.id, "minimumPayment", e.target.value)}
                    className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table layout */}
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
                    <input
                      value={debt.name}
                      onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                      className="w-full rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      aria-label="Debt name"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min={0}
                      value={debt.balance}
                      onChange={(e) => updateDebt(debt.id, "balance", e.target.value)}
                      className="w-24 rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      aria-label="Balance"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={debt.interestRate}
                      onChange={(e) => updateDebt(debt.id, "interestRate", e.target.value)}
                      className="w-20 rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      aria-label="Interest rate"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min={0}
                      value={debt.minimumPayment}
                      onChange={(e) => updateDebt(debt.id, "minimumPayment", e.target.value)}
                      className="w-24 rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      aria-label="Minimum payment"
                    />
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => removeDebt(debt.id)}
                      className="text-gray-400 hover:text-red-500 text-xs"
                      aria-label={`Remove ${debt.name}`}
                    >
                      ✕
                    </button>
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

      <Card>
        <div className="max-w-xs">
          <FormField
            label="Extra monthly payment"
            hint="Applied on top of minimums — same amount used for both methods."
            prefix="$"
            type="number"
            min={0}
            value={extraPayment}
            onChange={(e) => setExtraPayment(e.target.value)}
          />
        </div>
        <Button onClick={compare} size="lg" className="mt-4">
          Compare Both Methods
        </Button>
      </Card>

      {results && (
        <div className="space-y-4">
          {/* Winner banner */}
          {interestDiff !== 0 && (
            <div className="rounded-xl bg-teal-50 border border-teal-100 px-5 py-4">
              {interestDiff > 0 ? (
                <p className="text-sm text-teal-800">
                  <strong>Avalanche saves you {formatCurrency(interestDiff)} in interest</strong>
                  {monthDiff > 0 && ` and pays off ${monthDiff} month${monthDiff > 1 ? "s" : ""} sooner`}.
                  That&apos;s the cost of the snowball&apos;s motivational advantage.
                </p>
              ) : (
                <p className="text-sm text-teal-800">
                  <strong>Both methods give identical results</strong> — your debts are ordered the
                  same way by both balance and interest rate.
                </p>
              )}
            </div>
          )}

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* Snowball */}
            <Card className="border-2 border-blue-100">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">
                ❄️ Snowball
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Debt-free in</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatMonths(results.snowball.payoffMonths)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total interest</p>
                  <p className="text-xl font-bold text-orange-500">
                    {formatCurrency(results.snowball.totalInterestPaid)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total paid</p>
                  <p className="text-base font-semibold text-gray-700">
                    {formatCurrency(results.snowball.totalPaid)}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-600 mb-1">Payoff order</p>
                  <ol className="list-decimal list-inside text-xs text-gray-600 space-y-0.5">
                    {results.snowball.debtPayoffOrder.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </Card>

            {/* Avalanche */}
            <Card className="border-2 border-teal-100">
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-3">
                🏔️ Avalanche
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Debt-free in</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatMonths(results.avalanche.payoffMonths)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total interest</p>
                  <p className="text-xl font-bold text-orange-500">
                    {formatCurrency(results.avalanche.totalInterestPaid)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total paid</p>
                  <p className="text-base font-semibold text-gray-700">
                    {formatCurrency(results.avalanche.totalPaid)}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-600 mb-1">Payoff order</p>
                  <ol className="list-decimal list-inside text-xs text-gray-600 space-y-0.5">
                    {results.avalanche.debtPayoffOrder.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
