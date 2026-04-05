"use client";

import { useState } from "react";
import { calculateEmergencyFund, formatCurrency, formatMonths } from "@/lib/calculators";
import type { EmergencyFundResult } from "@/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormField from "@/components/ui/FormField";

export default function EmergencyFundCalculator() {
  const [targetBalance, setTargetBalance] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(300);
  const [annualRate, setAnnualRate] = useState(4.5);
  const [initialBalance, setInitialBalance] = useState(0);
  const [result, setResult] = useState<EmergencyFundResult | null>(null);

  function calculate() {
    setResult(
      calculateEmergencyFund(targetBalance, monthlyContribution, annualRate, initialBalance)
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Fund Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Savings goal"
            prefix="$"
            hint="Most experts suggest 3–6 months of expenses."
            type="number"
            min={0}
            value={targetBalance}
            onChange={(e) => setTargetBalance(parseFloat(e.target.value) || 0)}
          />
          <FormField
            label="Monthly contribution"
            prefix="$"
            hint="How much you can set aside each month."
            type="number"
            min={0}
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
          />
          <FormField
            label="Current savings"
            prefix="$"
            hint="Leave at 0 if you're starting from scratch."
            type="number"
            min={0}
            value={initialBalance}
            onChange={(e) => setInitialBalance(parseFloat(e.target.value) || 0)}
          />
          <FormField
            label="Annual interest rate"
            suffix="%"
            hint="High-yield savings accounts currently pay 4–5%."
            type="number"
            min={0}
            step={0.1}
            value={annualRate}
            onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
          />
        </div>
        <Button onClick={calculate} size="lg" className="mt-5">
          Calculate Growth Plan
        </Button>
      </Card>

      {result && (
        <div className="space-y-4">
          {result.months >= 600 ? (
            <Card>
              <p className="text-orange-600 font-medium">
                At your current contribution rate, you won&apos;t reach your goal within 50 years.
                Try increasing your monthly contribution.
              </p>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Goal Reached In
                  </p>
                  <p className="text-2xl font-bold text-teal-600">
                    {formatMonths(result.months)}
                  </p>
                </Card>
                <Card className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Interest Earned
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.totalInterestEarned)}
                  </p>
                </Card>
                <Card className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Total Contributions
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {formatCurrency(result.totalContributions)}
                  </p>
                </Card>
              </div>

              <Card>
                <h3 className="font-semibold text-gray-800 mb-3">Year-by-Year Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-700">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-100">
                        <th className="pb-2 font-medium">Year</th>
                        <th className="pb-2 font-medium">Contributions</th>
                        <th className="pb-2 font-medium">Interest</th>
                        <th className="pb-2 font-medium">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.schedule
                        .filter((_, i) => (i + 1) % 12 === 0 || i === result.schedule.length - 1)
                        .map((row) => (
                          <tr key={row.month}>
                            <td className="py-1.5">Year {Math.ceil(row.month / 12)}</td>
                            <td className="py-1.5">
                              {formatCurrency(
                                Math.min(row.month, result.months) * monthlyContribution
                              )}
                            </td>
                            <td className="py-1.5 text-green-600">
                              {formatCurrency(
                                result.schedule
                                  .slice(0, row.month)
                                  .reduce((s, r) => s + r.interest, 0)
                              )}
                            </td>
                            <td className="py-1.5 font-medium">{formatCurrency(row.balance)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
}
