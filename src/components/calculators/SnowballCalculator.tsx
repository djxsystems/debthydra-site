"use client";

import { useState } from "react";
import { calculateSnowball, formatCurrency, formatMonths } from "@/lib/calculators";
import type { Debt, DebtPayoffResult } from "@/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormField from "@/components/ui/FormField";

const EMPTY_DEBT: Omit<Debt, "id"> = {
  name: "",
  balance: 0,
  interestRate: 0,
  minimumPayment: 0,
};

export default function SnowballCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: "1", name: "Credit Card A", balance: 3200, interestRate: 22.99, minimumPayment: 64 },
    { id: "2", name: "Credit Card B", balance: 1400, interestRate: 19.99, minimumPayment: 35 },
    { id: "3", name: "Personal Loan", balance: 5500, interestRate: 12.5, minimumPayment: 130 },
  ]);
  const [extraPayment, setExtraPayment] = useState(100);
  const [result, setResult] = useState<DebtPayoffResult | null>(null);

  function addDebt() {
    setDebts((prev) => [
      ...prev,
      { ...EMPTY_DEBT, id: Date.now().toString(), name: `Debt ${prev.length + 1}` },
    ]);
  }

  function removeDebt(id: string) {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }

  function updateDebt(id: string, field: keyof Omit<Debt, "id">, value: string) {
    setDebts((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, [field]: field === "name" ? value : parseFloat(value) || 0 }
          : d
      )
    );
  }

  function calculate() {
    setResult(calculateSnowball(debts, extraPayment));
  }

  return (
    <div className="space-y-6">
      {/* Debts table */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Debts</h2>
        <div className="overflow-x-auto">
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
            onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
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
