"use client";

import { requestWithdrawal } from "@/actions/dashboard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import { CircleCheck, TrendingUp, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EarningsSection = ({ stats, initialHistory }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false); // For requesting payout
  const [credits, setCredits] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [paymentDetail, setPaymentDetail] = useState("");
  const { data, loading, fn: requestWithdrawalFn } = useFetch(requestWithdrawal);

  const balance = (stats?.creditBalance ?? 0) * 5;
  const totalEarnedDollars = (stats?.totalEarned ?? 0) * 5;

  const submitWithdrawal = async (event) => {
    event.preventDefault();
    await requestWithdrawalFn({
      credits: Number(credits),
      paymentMethod,
      paymentDetail,
    });
    setOpen(false);
    setCredits("");
    setPaymentDetail("");
    router.refresh();
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Credit balance",
            value: stats?.creditBalance ?? 0,
            unit: "credits",
            gold: true,
            icon: <Wallet size={16} className="text-amber-400" />,
            dollarValue: balance,
          },
          {
            label: "Total earned",
            value: stats?.totalEarned ?? 0,
            unit: "credits",
            gold: false,
            icon: <TrendingUp size={16} className="text-stone-400" />,
            dollarValue: totalEarnedDollars,
          },
          {
            label: "Sessions done",
            value: stats?.completedSessions ?? 0,
            unit: "completed",
            gold: false,
            icon: <CircleCheck size={16} className="text-stone-400" />,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0f0f11] border border-white/10 rounded-2xl p-6 flex flex-col gap-2"
          >
            <span className="text-lg">{stat.icon}</span>

            <p
              className={`font-serif text-4xl leading-none tracking-tight ${
                stat.gold
                  ? "bg-linear-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent"
                  : "bg-linear-to-br from-stone-100 to-stone-400 bg-clip-text text-transparent"
              }`}
            >
              {stat.value}
            </p>

            <p className="text-xs text-stone-600">{stat.unit}</p>

            <p className="text-xs text-stone-500">
              {stat.label}{" "}
              {stat.dollarValue !== undefined
                ? `($${stat?.dollarValue?.toFixed(2)})`
                : ""}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-amber-200/10 bg-[#0f0f11] p-5">
        <div>
          <p className="text-sm text-stone-300">Ready to withdraw?</p>
          <p className="mt-1 text-xs text-stone-600">
            Available balance: {stats?.creditBalance ?? 0} credits
          </p>
        </div>
        <Button
          type="button"
          variant="gold"
          onClick={() => setOpen(true)}
          disabled={!stats?.creditBalance}
        >
          Withdraw
        </Button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f0f11] p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-300">Withdrawal history</p>
            <p className="mt-1 text-xs text-stone-600">Your recent payout requests</p>
          </div>
          <span className="text-xs text-stone-600">{initialHistory.length} total</span>
        </div>

        {initialHistory.length === 0 ? (
          <p className="text-sm text-stone-600">No withdrawal requests yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-white/5">
            {initialHistory.map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm text-stone-300">
                    {withdrawal.credits} credits · {withdrawal.paymentMethod}
                  </p>
                  <p className="mt-1 text-xs text-stone-600">
                    {new Date(withdrawal.createdAt).toLocaleDateString()} · {withdrawal.paymentDetail}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-amber-400">
                    ${withdrawal.netAmount.toFixed(2)}
                  </p>
                  <p className={`mt-1 text-xs ${withdrawal.status === "PROCESSED" ? "text-emerald-400" : "text-amber-500"}`}>
                    {withdrawal.status === "PROCESSED" ? "Processed" : "Processing"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-amber-200/10 bg-[#0f0f11] text-stone-100">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Request withdrawal</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitWithdrawal} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="withdrawal-credits">Credits</Label>
              <Input
                id="withdrawal-credits"
                type="number"
                min="1"
                max={stats?.creditBalance ?? 0}
                value={credits}
                onChange={(event) => setCredits(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="payment-method">Payment method</Label>
              <Input
                id="payment-method"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="payment-detail">Payment detail</Label>
              <Input
                id="payment-detail"
                placeholder="PayPal email or bank details"
                value={paymentDetail}
                onChange={(event) => setPaymentDetail(event.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="gold" disabled={loading}>
              {loading ? "Submitting..." : "Submit withdrawal"}
            </Button>
            {data?.success && (
              <p className="text-sm text-emerald-400">
                Withdrawal request submitted.
              </p>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EarningsSection;