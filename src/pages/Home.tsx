// Placeholder shown until the first build replaces this page. Keep the hidden
// "Your App Starts Here" line: it is how the platform tells an unbuilt site.
const css = `
@keyframes ph-drift { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(4%, -3%) scale(1.08) } }
@keyframes ph-shine { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
@keyframes ph-rise { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
.ph-orb { animation: ph-drift 14s ease-in-out 0s 9999 }
.ph-bar { background: linear-gradient(90deg, rgba(15,23,42,.06) 25%, rgba(15,23,42,.13) 50%, rgba(15,23,42,.06) 75%); background-size: 200% 100%; animation: ph-shine 2.4s linear 0s 9999 }
.ph-rise { animation: ph-rise .9s cubic-bezier(.2,.7,.2,1) both }
@media (prefers-reduced-motion: reduce) { .ph-orb, .ph-bar, .ph-rise { animation: none } }
`

function Bar({ w, h = 'h-3', d = 0 }: { w: string; h?: string; d?: number }) {
  return <div className={`ph-bar rounded-full ${h} ${w}`} style={{ animationDelay: `${d}ms` }} />
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbfaf8] text-slate-900 antialiased">
      <style>{css}</style>
      <span className="sr-only">Your App Starts Here</span>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="ph-orb absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-[#4F98FB]/25 blur-3xl" />
        <div className="ph-orb absolute -bottom-48 -right-24 h-[38rem] w-[38rem] rounded-full bg-fuchsia-300/30 blur-3xl" style={{ animationDelay: '-7s' }} />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(15,23,42,.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16">
        <div className="ph-rise text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-3.5 py-1.5 text-[13px] text-slate-600 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4F98FB] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4F98FB]" />
            </span>
            Getting your site ready
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.035em] sm:text-7xl">
            Something good is <span className="bg-gradient-to-r from-[#4F98FB] to-fuchsia-500 bg-clip-text text-transparent">on its way.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-pretty text-lg leading-relaxed text-slate-500">
            Your pages, words and pictures will appear right here in a moment.
          </p>
        </div>

        <div className="ph-rise mt-14 w-full max-w-3xl" style={{ animationDelay: '180ms' }}>
          <div className="rounded-[28px] border border-slate-900/10 bg-white/80 p-2 shadow-[0_30px_80px_-30px_rgba(15,23,42,.35)] backdrop-blur-xl">
            <div className="rounded-[22px] border border-slate-900/5 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <Bar w="w-24" h="h-4" />
                <div className="hidden gap-3 sm:flex"><Bar w="w-12" d={100} /><Bar w="w-14" d={200} /><Bar w="w-10" d={300} /></div>
              </div>
              <div className="mt-10 grid items-center gap-8 sm:grid-cols-[1.2fr_1fr]">
                <div className="space-y-3">
                  <Bar w="w-11/12" h="h-6" d={150} />
                  <Bar w="w-3/4" h="h-6" d={250} />
                  <div className="pt-2 space-y-2"><Bar w="w-full" d={350} /><Bar w="w-5/6" d={450} /></div>
                  <div className="flex gap-3 pt-4"><Bar w="w-28" h="h-9" d={550} /><Bar w="w-24" h="h-9" d={650} /></div>
                </div>
                <div className="ph-bar aspect-[4/3] rounded-2xl" style={{ animationDelay: '300ms' }} />
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-2 rounded-2xl border border-slate-900/5 p-4">
                    <div className="ph-bar h-8 w-8 rounded-xl" style={{ animationDelay: `${i * 120}ms` }} />
                    <Bar w="w-3/4" d={i * 120 + 100} /><Bar w="w-1/2" h="h-2.5" d={i * 120 + 200} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}