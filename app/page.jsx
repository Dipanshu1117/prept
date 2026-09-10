import Image from "next/image";
import { Button } from "../components/ui/button";
import {
  GoldTitle,
  GrayTitle,
  SectionHeading,
  SectionLabel,
} from "@/components/reusable";
import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";
import Link from "next/link";
import { AI_TAGS, AVATARS, LOGOS, ROLES, SLOTS } from "@/lib/data";
import { CodeDemo } from "@/components/demo-components-animate-code";
import BentoCard from "@/components/BentoCard";
import { Bot, BotIcon, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MockUI } from "@/components/MockUI";
import { PricingTable } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="bg-black overflow-x-hidden">
      {/* Hero  */}
      <section className="pt-28 sm:pt-32 relative min-h-screen grid grid-cols-1 lg:grid-cols-5 px-4 sm:px-8 pb-20 overflow-hidden">
        <StarsBackgroundDemo />

        <div className="col-span-full lg:col-span-3 flex flex-col items-center justify-center text-center lg:-rotate-2">
          <Badge variant="gold">powered by Ai - Now in Beta</Badge>

          <h1 className="font-serif relative text-5xl sm:text-6xl lg:text-7xl tracking-tight max-w-4xl">
            <GrayTitle>Ace your next Interview</GrayTitle>
            <br />
            <GoldTitle>with real experts</GoldTitle>
          </h1>

          <p className="relative text-sm sm:text-base md:text-lg text-stone-400 max-w-xl mt-6 leading-relaxed">
            Book 1:1 mock interview with senior engineers with top companies.
            Get AI powered feedback, role-specific questions, and the confidence
            to land your dream job.
          </p>

          <div className="relative flex justify-center gap-2 sm:gap-4 mt-10 sm:w-auto">
            <Link href={"/onboarding"}>
              <Button variant="gold" size="hero">
                {" "}
                Get Started
              </Button>
            </Link>
            <Link href={"/explore"}>
              <Button variant="outline" size="hero">
                Browse Interview
              </Button>
            </Link>
          </div>

          <div className="relative flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-16">
            <div className="flex">
              {AVATARS.map((av, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-[#0a0a0b] overflow-hidden ${i > 0 ? "-ml-2" : ""}`}
                >
                  <Image
                    src={av.src}
                    alt="user avatar "
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-stone-500 text-center sm:text-left">
              <strong className="text-stone-400 font-medium">
                2,400+ engineers
              </strong>{" "}
              cracked FAANG interviews via Prept
            </p>
          </div>
        </div>

        <div className="col-span-full lg:col-span-2 flex items-center justify-center lg:justify-start mt-12 lg:mt-0 lg:rotate-3">
          <CodeDemo duration={30000} writing />
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 py-14">
        <p className="text-center text-xs font-medium text-stone-600 tracking-widest uppercase mb-8">
          Interviewees landed roles at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-24 px-6">
          {LOGOS.map((l) => (
            <Image
              key={l.alt}
              src={l.src}
              alt={l.alt}
              width={50}
              height={50}
              className="h-6 w-auto opacity-60 grayscale"
            />
          ))}
        </div>
      </section>
      {/* feature section  and Card section  */}
      <section className="relative z-10 py-28 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Feature </SectionLabel>
          <SectionHeading
            gray="Everything you need,"
            gold="nothing you don't"
          />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7">
            <BentoCard
              icon={<Bot size={20} className="text-amber-400" />}
              title={<GrayTitle>AI Question Generator</GrayTitle>}
              desc="Interviewers get a live AI co-pilot generating role-specific questions on demand — system design, behavioural, DSA — all tailored to the candidate's level."
            >
              <div className="flex flex-wrap gap-2 mt-5">
                {AI_TAGS.map((t) => (
                  <Badge key={t.label} variant={t.active ? "gold" : "outline"}>
                    {t.label}
                  </Badge>
                ))}
              </div>
            </BentoCard>
          </div>

          <div className="col-span-12 md:col-span-5">
            <BentoCard
              icon={<Wallet size={16} className="text-amber-400" />}
              title={<GrayTitle>Credit System</GrayTitle>}
              desc="Subscribe for monthly credits. Book sessions. Interviewers earn and withdraw any time."
            >
              <div className="mt-5 rounded-xl bg-[#141417] border border-white/10 p-5 flex justify-between items-end">
                <div>
                  <p className="text-xs text-stone-600 mb-1">Your balance</p>
                  <p className="font-serif text-4xl leading-none bg-linear-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent">
                    28
                  </p>
                  <p className="text-xs text-stone-600 mt-1">
                    credits remaining
                  </p>
                </div>

                <Badge variant="secondary">+10 this month</Badge>
              </div>
            </BentoCard>
          </div>

          <div className="col-span-12 md:col-span-4">
            <BentoCard
              icon="📹"
              title="HD Video Calls"
              desc="Powered by Stream. Screen sharing, recording, and instant playback links — all built in."
            >
              <MockUI rows={3} />
            </BentoCard>
          </div>

          <div className="col-span-12 md:col-span-4">
            <BentoCard
              icon="💬"
              title="Persistent Chat"
              desc="Message your interviewer before and after the call. Share resources, prep notes, and follow-ups in one thread."
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <BentoCard
              icon="🔒"
              title="Security by Arcjet"
              desc="Bot protection, rate limiting, and abuse prevention baked into every API route."
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <BentoCard
              icon="📊"
              title={<GrayTitle>AI Feedback Reports</GrayTitle>}
              desc="Post-interview analysis by Gemini with actionable insights."
            >
              <MockUI rows={5} />
            </BentoCard>
          </div>

          <div className="col-span-12 md:col-span-6">
            <BentoCard
              icon="🗓️"
              title={<GoldTitle>Slot-based Scheduling</GoldTitle>}
              desc="Interviewers set availability once. Interviewees pick from open slots and confirm with one click — no back-and-forth needed."
            >
              <div className="flex flex-wrap gap-2 mt-5">
                {SLOTS.map((s) => (
                  <span
                    key={s.label}
                    className={`text-xs px-3 py-1.5 rounded-lg border ${s.cls}`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Roles Section  */}
      <section className="relative z-10 pb-28 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel> who it&apos;s for</SectionLabel>
          <SectionHeading
            gray="Built for both sides"
            gold="of the table"
          ></SectionHeading>
          <div className="grid md:grid-cols-2 gap-6">
            {ROLES.map((role) => (
              <div
                key={role.label}
                className="relative bg-[#0f0f11] border border-white/10 hover:border-amber-400/20 rounded-2xl p-12 h-full transition duration-300 overflow-hidden"
              >
                <span className="inline-block text-xs font-semibold text-amber-400 tracking-widest uppercase border border-amber-400/20 bg-amber-400/10 rounded-full px-3 py-1.5 mb-5">
                  {role.label}
                </span>
                <h3 className="font-serif text-2xl tracking-tight mb-4">
                  {role.title}
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed mb-8">
                  {role.desc}
                </p>
                <ul>
                  {role.perks.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-stone-400">
                      <span className="mt-0.5 min-w-4 h-4 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-xs text-amber-400  ">
                        🗸
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price section  */}
      <section className="relative z-10 pb-28 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Pricing</SectionLabel>
          <SectionHeading
            gray="Simple, transparent"
            gold="credit-based plans"
          ></SectionHeading>
          <p className="text-stone-400 mt-3 text-sm">
            Each credit = one session. Unused credits roll over.
          </p>
        </div>

        {/* this one is import from the clerk */}
        <PricingTable checkoutProps={{
          appearance:{
            elements:{
              drawerRoot:{
                zIndex:2000,
                            }
            }
          }
        }}/>
      </section>

      {/* CTA section  */}
      <section className="relative z-10 pb-28 max-w-5xl mx-auto px-6">
        <div className="relative border border-amber-400/20 rounded-3xl px-3 sm:px-16 
        py-20 bg-linear-to-br from-amber-400/5 text-center overflow-hidden">
          <StarsBackgroundDemo />
          <h2
            className="font-serif relative text-4xl md:text-5xl leading-tight
          tracking-tight mb-4"
          >
            <GrayTitle>Your next interview</GrayTitle>
            <br />
            <GoldTitle>starts here </GoldTitle>
          </h2>
          <p className="relative text-stone-400 font-light text-sm mb-11">
            Join thousand of engineers alredy levelling up on Prept.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 ">
            <Link href="onboarding" className="relative">
              <Button variant="gold" size="hero">
                Get started
              </Button>
            </Link>
            <Link href="/explore" className="relative">
              <Button variant="outline" size="hero">
                Browse Interviewers →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
