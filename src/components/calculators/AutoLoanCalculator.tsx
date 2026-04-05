"use client";

import { useState } from "react";
import { calculateAutoLoan, formatCurrency } from "@/lib/calculators";
import type { AutoLoanResult } from "@/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormField from "@/components/ui/FormField";

export default function AutoLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(6.9);
  const [termMonths, setTermMonths] = useState(60);
  const [result, setResult] = useState<AutoLoanResult | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  function calculate() {
    setResult(calculateAutoLoan(loanAmount, interestRate, termMonths));
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Loan Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField
            label="Loan amount"
            prefix="$"
            type="number"
            min={0}
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
          />
          <FormField
            label="Annual interest rate"
            suffix="%"
            type="number"
            min={0}
            step={0.01}
            value={interestRate}
            hint="Check your loan offer or credit union rate."
            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Loan term</label>
            <select
              value={termMonths}
              onChange={(e) => setTermMonths(parseInt(e.target.value))}
              className="rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value={24}>24 months (2 years)</option>
              <option value={36}>36 months (3 years)</option>
              <option value={48}>48 months (4 years)</option>
              <option value={60}>60 months (5 years)</option>
              <option value={72}>72 months (6 years)</option>
              <option value={84}>84 months (7 years)</option>
            </select>
          </div>
        </div>
        <Button onClick={calculate} size="lg" className="mt-5">
          Calculate Monthly Payment
        </Button>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Monthly Payment</p>
              <p className="text-3xl font-bold text-teal-600">
                {formatCurrency(result.monthlyPayment)}
              </p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Interest</p>
              <p className="text-2xl font-bold text-orange-500">
                {formatCurrency(result.totalInterest)}
              </p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Cost</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(result.totalPaid)}</p>
            </Card>
          </div>

          <Card>
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-semibold text-gray-800">Full Amortisation Schedule</span>
              <span className="text-teal-600 text-sm">{showSchedule ? "Hide ▲" : "Show ▼"}</span>
            </button>

            {showSchedule && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs text-gray-700">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-2 font-medium">Month</th>
                      <th className="pb-2 font-medium">Payment</th>
                      <th className="pb-2 font-medium">Principal</th>
                      <th className="pb-2 font-medium">Interest</th>
                      <th className="pb-2 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {result.schedule.map((row) => (
                      <tr key={row.month}>
                        <td className="py-1">{row.month}</td>
                        <td className="py-1">{formatCurrency(row.payment)}</td>
                        <td className="py-1">{formatCurrency(row.principal)}</td>
                        <td className="py-1 text-orange-500">{formatCurrency(row.interest)}</td>
                        <td className="py-1">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
