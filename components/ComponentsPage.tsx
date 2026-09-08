 "use client"

import { CustomCursor } from "./CustomCursor"

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-full bg-[#174a78] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
      {children}
    </button>
  )
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-full bg-[#f1c84b] px-5 py-3 text-sm font-semibold text-[#17334e] transition-transform hover:-translate-y-0.5">
      {children}
    </button>
  )
}

export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-[#fbfcfe] px-6 py-14 text-[#12304f] md:px-12 lg:px-20">
      <CustomCursor />

      <div className="mx-auto max-w-6xl">
        <header className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2e67a3]">
              HearthAway
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-[#0f2c49] md:text-7xl">
              Component Playground
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#687d91]">
              A private space to test reusable UI and interaction details before
              they are mounted across HearthAway.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dce5ee] bg-white px-4 py-2 text-xs text-[#65798d] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#8aafcf] shadow-[0_0_0_4px_rgba(138,175,207,0.12)]" />
            Byakugan cursor · prototype
          </div>
        </header>

        <section className="mb-20">
          <div className="mb-7 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div className="flex items-baseline gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#89a7c0]">
                01
              </span>
              <h2 className="text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
                Custom Cursor
              </h2>
            </div>

            <p className="text-sm leading-6 text-[#728599]">
              Calm at rest. Slightly more awake over interactive elements.
              The Byakugan stays pale so it belongs to HearthAway&apos;s light,
              warm visual language.
            </p>
          </div>

          <div className="grid min-h-[420px] overflow-hidden rounded-[30px] border border-[#dce5ee] bg-[radial-gradient(circle_at_78%_24%,rgba(196,218,238,.34),transparent_22%),linear-gradient(135deg,#fff_0%,#f7fafc_100%)] p-8 shadow-[0_25px_80px_rgba(42,72,101,.06)] md:p-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-12">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2e67a3]">
                Default → Hover → Click
              </p>
              <h3 className="mt-4 text-4xl font-semibold leading-[1.04] tracking-[-0.055em] md:text-5xl">
                Quiet by default. Awake when you interact.
              </h3>
              <p className="mt-5 text-base leading-7 text-[#718398]">
                Move around this page and hover the controls below. The cursor
                is built from CSS and inline SVG geometry, with no external
                image asset.
              </p>
            </div>

            <div className="mx-auto grid aspect-square w-full max-w-[270px] place-items-center rounded-full border border-[#dfe8ef] bg-[#edf4fa] shadow-[0_30px_80px_rgba(57,89,117,.08)]">
              <div className="scale-[3.1]" aria-hidden="true">
                <span className="block h-[34px] w-[34px]">
                  {/* The live cursor is intentionally tested by moving the real pointer. */}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-7 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div className="flex items-baseline gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#89a7c0]">
                02
              </span>
              <h2 className="text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
                Interactive Elements
              </h2>
            </div>

            <p className="text-sm leading-6 text-[#728599]">
              Test the cursor against the same kinds of controls the product
              will use.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-4 rounded-3xl border border-[#dce5ee] bg-white p-7">
            <PrimaryButton>Get Matched</PrimaryButton>
            <SecondaryButton>Explore Homes</SecondaryButton>
            <a
              href="#all-homes"
              className="px-1 py-3 text-sm font-semibold text-[#174a78]"
            >
              View all homes ↗
            </a>

            <label className="grid w-[260px] gap-2 text-xs font-bold text-[#6f8091]">
              Search
              <input
                className="rounded-[14px] border border-[#d4dee7] bg-white px-4 py-3 font-normal text-[#193650] outline-none focus:border-[#91abc0] focus:ring-4 focus:ring-[#91abc0]/10"
                placeholder="Leeds, Manchester..."
              />
            </label>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-7 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div className="flex items-baseline gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#89a7c0]">
                03
              </span>
              <h2 className="text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
                Card Interaction
              </h2>
            </div>

            <p className="text-sm leading-6 text-[#728599]">
              The eye should complement an accommodation card without
              competing with the photography or content.
            </p>
          </div>

          <a
            id="all-homes"
            href="#all-homes"
            className="block max-w-xl overflow-hidden rounded-3xl border border-[#dce5ee] bg-white shadow-[0_24px_70px_rgba(42,72,101,.08)] transition-transform hover:-translate-y-1"
          >
            <div className="flex min-h-[280px] items-end bg-[linear-gradient(180deg,rgba(26,56,82,.02),rgba(26,56,82,.18)),linear-gradient(135deg,#ded2bd,#b7a58d_56%,#8ea2ad)] p-6 text-xl font-extrabold tracking-[-0.03em] text-white">
              HearthAway
            </div>

            <div className="flex items-start justify-between gap-6 p-6">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8a99a9]">
                  Leeds · Student home
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em]">
                  Warm, quiet and ready for move-in.
                </h3>
              </div>
              <span className="text-2xl text-[#174a78]">↗</span>
            </div>
          </a>
        </section>

        <section className="mb-16">
          <div className="mb-7 flex items-baseline gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#89a7c0]">
              04
            </span>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
              States
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Resting", "Ivory, quiet, minimal."],
              ["Hover", "More definition + soft blue-white glow."],
              ["Pressed", "Brief inward emphasis + click ripple."],
              ["Reduced motion", "Native pointer and no animation."],
            ].map(([name, caption]) => (
              <div
                key={name}
                className="min-h-[220px] rounded-3xl border border-[#dce5ee] bg-white p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#35506b]">
                  {name}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#8190a0]">
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-[#dce5ee] pt-6 text-xs text-[#8190a0] sm:flex-row sm:justify-between">
          <span>HearthAway design system</span>
          <span>Prototype · cursor not mounted outside this page</span>
        </footer>
      </div>
    </main>
  )
}
