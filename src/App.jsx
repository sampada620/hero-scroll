import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "WELCOME ITZFIZZ".split("");

const STATS = [
  { value: 58, text: "Increase in pick up point use", row: "top", color: "text-cyan-300", glow: "shadow-[0_0_40px_-10px_rgba(34,211,238,0.6)]" },
  { value: 27, text: "Increase in pick up point use", row: "top", color: "text-lime-300", glow: "shadow-[0_0_40px_-10px_rgba(190,242,100,0.6)]" },
  { value: 23, text: "Decreased in customer phone calls", row: "bottom", color: "text-pink-400", glow: "shadow-[0_0_40px_-10px_rgba(244,114,182,0.6)]" },
  { value: 40, text: "Decreased in customer phone calls", row: "bottom", color: "text-amber-300", glow: "shadow-[0_0_40px_-10px_rgba(252,211,77,0.6)]" },
];

function StatCard({ s }) {
  return (
    <div
      className={`stat rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md px-4 py-3 md:px-9 md:py-6 ${s.glow}`}
    >
      <p className={`text-3xl md:text-6xl font-extrabold ${s.color}`}>
        <span className="count" data-value={s.value}>0</span>%
      </p>
      <p className="text-xs md:text-lg mt-1 text-slate-200">{s.text}</p>
    </div>
  );
}

export default function App() {
  const root = useRef(null);
  const stripRef = useRef(null);
  const carRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1) Page load animation
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".letter", { y: 40, opacity: 0, duration: 0.9, stagger: 0.06 })
        .from(".strip", { opacity: 0, scaleY: 0.6, duration: 0.8 }, "-=0.6")
        .from(".stat", { y: 40, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.2");

      // Count-up numbers
      gsap.utils.toArray(".count").forEach((el, i) => {
        const obj = { n: 0 };
        gsap.to(obj, {
          n: Number(el.dataset.value),
          duration: 1.3,
          delay: 1.6 + i * 0.2,
          ease: "power2.out",
          onUpdate: () => (el.textContent = Math.round(obj.n)),
        });
      });

      // 2) Scroll animation (scrub = scroll progress se tied)
      const W = () => stripRef.current.offsetWidth;
      const CW = () => carRef.current.offsetWidth;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        // car left -> right
        .fromTo(".car-wrap", { x: 0 }, { x: () => W() - CW(), ease: "none" }, 0)
        // neon trail car ke peeche
        .fromTo(
          ".trail",
          { scaleX: () => (CW() * 0.5) / W() },
          { scaleX: () => (W() - CW() * 0.5) / W(), ease: "none" },
          0
        )
        // cards halka parallax
        .to(".cards-top", { y: -30, ease: "none" }, 0)
        .to(".cards-bottom", { y: 30, ease: "none" }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="text-white bg-[#0a0a1f] bg-[radial-gradient(ellipse_at_top,#2a1458_0%,#0a0a1f_60%)]"
    >
      <section className="hero h-screen flex flex-col overflow-hidden">
        {/* Top cards */}
        <div className="flex-1 min-h-0 flex items-end justify-end px-4 md:pr-[8%] pb-6 md:pb-12">
          <div className="cards-top flex gap-4 md:gap-6 will-change-transform">
            {STATS.filter((s) => s.row === "top").map((s, i) => (
              <StatCard key={i} s={s} />
            ))}
          </div>
        </div>

        {/* Road strip */}
        <div
          ref={stripRef}
          className="strip relative w-full h-[130px] md:h-[250px] bg-[#14122e] overflow-hidden border-y border-white/10"
        >
          {/* Road lane dashed line */}
          <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 opacity-40 bg-[repeating-linear-gradient(90deg,#fff_0_40px,transparent_40px_80px)]" />

          {/* Neon trail */}
          <div className="trail absolute inset-y-0 left-0 w-full origin-left will-change-transform bg-gradient-to-r from-[#ff2e93] via-[#ff6a3d] to-[#ffb703] opacity-90" />

          {/* Headline */}
          <h1 className="absolute inset-0 z-10 flex items-center pl-[4vw] font-black whitespace-nowrap text-white text-[clamp(1.4rem,7vw,7.5rem)] tracking-[0.12em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {HEADLINE.map((ch, i) => (
              <span key={i} className="letter inline-block">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>

          {/* Car */}
          <div
            ref={carRef}
            className="car-wrap absolute left-0 top-0 z-20 h-full will-change-transform"
          >
            <img
              src={`${import.meta.env.BASE_URL}car.png`}
              alt="car"
              className="car h-full w-auto max-w-none drop-shadow-[0_0_25px_rgba(255,180,0,0.55)]"
              onLoad={() => ScrollTrigger.refresh()}
            />
          </div>
        </div>

        {/* Bottom cards */}
        <div className="flex-1 min-h-0 flex items-start justify-end px-4 md:pr-[12%] pt-6 md:pt-12">
          <div className="cards-bottom flex gap-4 md:gap-6 will-change-transform">
            {STATS.filter((s) => s.row === "bottom").map((s, i) => (
              <StatCard key={i} s={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center text-2xl text-slate-300">
        Next Section
      </section>
    </div>
  );
}
