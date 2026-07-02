"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ChevronDown,
  Heart,
  MapPin,
  Phone,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CSSProperties, Suspense, useEffect, useRef, useState } from "react";
import type { Mesh } from "three";
import { events, story, wedding } from "@/constants/wedding";
import { useCountdown } from "@/hooks/use-countdown";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useLenis } from "@/hooks/use-lenis";
import { cn } from "@/lib/cn";

const easing = [0.22, 1, 0.36, 1] as const;

export function CinematicInvitation() {
  const [loaded, setLoaded] = useState(false);
  const [opened, setOpened] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 260, damping: 28 });
  const smoothY = useSpring(cursorY, { stiffness: 260, damping: 28 });

  useLenis();
  useGsapReveal();

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    cursorX.set(event.clientX - 18);
    cursorY.set(event.clientY - 18);
  }

  return (
    <main className="site-shell" onPointerMove={onPointerMove}>
      <CustomCursor x={smoothX} y={smoothY} />
      <ScrollProgress />
      <LuxuryLoader onComplete={() => setLoaded(true)} />
      <AnimatePresence>
        {loaded && !opened ? <InvitationGate onOpen={() => setOpened(true)} /> : null}
      </AnimatePresence>
      <FloatingAmbience />
      <HeroSection visible={opened} />
      {/* <DecadeLoveSection /> */}
      <InvitationCardsSection />
      <StorySection />
      <PreWeddingVideoSection />
      <EventsSection />
      <CountdownSection />
      <VenueSection />
      <FamilySection />
      <Footer />
    </main>
  );
}

function LuxuryLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    let completeTimer = 0;
    const timer = window.setInterval(() => {
      value += Math.ceil(Math.random() * 9);
      setProgress(Math.min(100, value));
      if (value >= 100) {
        window.clearInterval(timer);
        completeTimer = window.setTimeout(onComplete, 450);
      }
    }, 90);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div className="loader" animate={{ opacity: progress >= 100 ? 0 : 1 }} transition={{ duration: 0.5 }}>
      <div className="loader-particles" aria-hidden="true" />
      <motion.div
        className="loader-mark"
        animate={{ borderRadius: ["42% 58% 49% 51%", "62% 38% 55% 45%", "42% 58% 49% 51%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        A&N
      </motion.div>
      <div className="loader-bar">
        <motion.span animate={{ width: `${progress}%` }} />
      </div>
      <p>{progress}%</p>
    </motion.div>
  );
}

function InvitationGate({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.section className="gate" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8, ease: easing }}>
      <motion.button
        className="invitation-card"
        onClick={onOpen}
        initial={{ rotateX: 16, y: 40, opacity: 0 }}
        animate={{ rotateX: 0, y: 0, opacity: 1 }}
        whileHover={{ rotateX: -7, rotateY: 6, y: -8 }}
        transition={{ duration: 1.1, ease: easing }}
      >
        <span className="card-floral" />
        <span className="gate-kicker">Wedding Invitation of</span>
        <span className="gate-names">{wedding.bride} & {wedding.groom}</span>
        <span className="gate-date">{wedding.displayDate}</span>
        <span className="gate-action">Open Invitation</span>
      </motion.button>
    </motion.section>
  );
}

function HeroSection({
  visible,
}: {
  visible: boolean;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const flareX = useTransform(mouseX, [-400, 400], [-18, 18]);
  const flareY = useTransform(mouseY, [-400, 400], [-12, 12]);

  return (
    <section
      className="hero"
      onMouseMove={(event) => {
        mouseX.set(event.clientX - window.innerWidth / 2);
        mouseY.set(event.clientY - window.innerHeight / 2);
      }}
    >
      <motion.div className="hero-bg" animate={{ scale: visible ? 1.08 : 1 }} transition={{ duration: 14, ease: "linear" }} />
      <motion.div className="lens-flare" style={{ x: flareX, y: flareY }} aria-hidden="true" />
      <div className="mandala" aria-hidden="true" />
      <div className="hero-rings" aria-label="3D rotating wedding rings">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={1.3} />
            <pointLight position={[3, 3, 4]} intensity={40} color="#f8e7c7" />
            <RingPair />
          </Canvas>
        </Suspense>
      </div>
      <motion.div className="hero-content" initial={false} animate={visible ? "show" : "hide"} variants={{ hide: {}, show: {} }}>
        <motion.p variants={splitReveal(0.15)} className="eyebrow">Our Beginning. Our Journey. Our Forever.</motion.p>
        <motion.h1 variants={splitReveal(0.28)}>
          <span>{wedding.bride}</span>
          <Heart aria-hidden="true" />
          <span>{wedding.groom}</span>
        </motion.h1>
        <motion.div variants={splitReveal(0.45)} className="hero-meta">
          <span>{wedding.displayDate}</span>
          <span>{wedding.venue}</span>
        </motion.div>
        <motion.a variants={splitReveal(0.62)} className="primary-cta magnetic" href="#story">
          Begin Our Story
          <ChevronDown size={18} />
        </motion.a>
      </motion.div>
    </section>
  );
}

function RingPair() {
  const left = useRef<Mesh>(null);
  const right = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (left.current) left.current.rotation.y += delta * 0.45;
    if (right.current) right.current.rotation.y -= delta * 0.38;
  });

  return (
    <group rotation={[0.8, 0.1, -0.18]}>
      <mesh ref={left} position={[-0.55, 0, 0]} rotation={[0, 0.55, 0]}>
        <torusGeometry args={[0.78, 0.07, 32, 90]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.18} />
      </mesh>
      <mesh ref={right} position={[0.55, 0.02, 0]} rotation={[0, -0.55, 0]}>
        <torusGeometry args={[0.78, 0.07, 32, 90]} />
        <meshStandardMaterial color="#f8e7c7" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function DecadeLoveSection() {
  return (
    <section className="decade-love-section">
      <div className="decade-love-content" data-reveal>
        <p>A decade written in light</p>
        <h2>
          <EncryptedText text="AKHILA WEDS NAVEEN" revealDelayMs={65} flipDelayMs={42} />
        </h2>
        <span>wintness the decade of love</span>
      </div>
    </section>
  );
}

function EncryptedText({
  text,
  revealDelayMs = 50,
  flipDelayMs = 50
}: {
  text: string;
  revealDelayMs?: number;
  flipDelayMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [revealCount, setRevealCount] = useState(0);
  const [scrambled, setScrambled] = useState(() => scrambleText(text));

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    let lastFlip = 0;
    const start = performance.now();

    const update = (now: number) => {
      const elapsed = now - start;
      const nextRevealCount = Math.min(text.length, Math.floor(elapsed / Math.max(1, revealDelayMs)));
      setRevealCount(nextRevealCount);

      if (nextRevealCount < text.length && now - lastFlip >= flipDelayMs) {
        setScrambled((current) =>
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < nextRevealCount) return char;
              return randomEncryptedCharacter(current[index]);
            })
            .join("")
        );
        lastFlip = now;
      }

      if (nextRevealCount < text.length) {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [flipDelayMs, isInView, revealDelayMs, text]);

  return (
    <span ref={ref} aria-label={text} role="text">
      {text.split("").map((char, index) => (
        <span className={index < revealCount ? "encrypted-revealed" : "encrypted-hidden"} key={`${char}-${index}`}>
          {index < revealCount ? char : char === " " ? " " : scrambled[index]}
        </span>
      ))}
    </span>
  );
}

const encryptedCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+-=?";

function randomEncryptedCharacter(previous?: string) {
  let next = encryptedCharset[Math.floor(Math.random() * encryptedCharset.length)];
  if (next === previous) next = encryptedCharset[(encryptedCharset.indexOf(next) + 7) % encryptedCharset.length];
  return next;
}

function scrambleText(text: string) {
  return text
    .split("")
    .map((char) => (char === " " ? " " : randomEncryptedCharacter()))
    .join("");
}

function StorySection() {
  return (
    <section id="story" className="section story-section">
      <SectionHeader eyebrow="Love Story" title="A film told in glances" copy="Every chapter arrives as a memory: softly lit, deeply felt, and a little larger than life." />
      <div className="timeline">
        <span className="timeline-line" />
        {story.map((chapter, index) => (
          <article className={cn("story-card", index % 2 ? "story-card-right" : "story-card-left")} key={chapter.title} data-reveal>
            <div className="story-image" style={{ backgroundImage: chapter.image }} data-parallax />
            <div className="story-copy">
              <span>{chapter.date}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PreWeddingVideoSection() {
  return (
    <section className="section prewedding-video-section">
      <SectionHeader
        eyebrow="Pre Wedding Film"
        title="A Love Story, Coming Soon"
        copy="Our pre-wedding film is in the making. Until then, let these moments tell our story."
      />

      <div className="video-coming-soon">
        <div className="play-button">
          <div className="play-pulse" />
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        <h3>Coming Soon</h3>

        <p>
          Our cinematic pre-wedding film is almost ready.
          Stay tuned for a beautiful journey through our love story.
        </p>

        <div className="loading-line">
          <span />
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section className="section events-section">
      <SectionHeader eyebrow="Celebrations" title="The sacred wedding details" copy="The muhurtham, venue, and lunch details shaped like formal invitation cards." />
      <div className="events-grid">
        {events.map((event) => (
          <motion.article className="event-card" key={event.title} whileHover={{ y: -10, rotateX: 3, rotateY: -3 }} data-reveal>
            <span className="corner corner-tl" />
            <span className="corner corner-br" />
            <event.icon size={26} style={{ color: event.palette }} />
            <p>{event.date} / {event.time}</p>
            <h3>{event.title}</h3>
            <strong>{event.venue}</strong>
            <span>{event.description}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CountdownSection() {
  const parts = useCountdown(wedding.date);

  return (
    <section className="section countdown-section">
      <div className="starfield" aria-hidden="true" />
      <SectionHeader eyebrow="Countdown" title="Until the mandap glows" copy="The clock is quietly keeping our favorite secret." />
      <div className="countdown-grid" data-reveal>
        {Object.entries(parts).map(([label, value]) => (
          <div className="count-box" key={label}>
            <motion.strong key={value} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              {String(value).padStart(2, "0")}
            </motion.strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const invitationCards = [
  {
    side: "Groom Side",
    invitedBy: "Smt & Sri. Mitta Manjula-Rajender",
    blessing: "Near & Dear",
    relation: "With best compliments from",
    quote: "We solicit your gracious presence with your friends & family on the auspicious occasion of the marriage of",
    brideLine: "Naveen",
    brideNote: "",
    groomLine: "Akhila",
    groomNote: "",
    parentLine: "Only daughter of Smt & Sri. Anumatla Manjula-Ravi Garu",
    venue: "SVR Gardens, Satavahana University Road, Malkapur, Karimnagar",
    date: "Thursday, 9th July, 2026",
    time: "11:20 a.m.",
    muhurtham: "Ashwini Nakshatram, Kanya Lagnam",
    lunch: "Lunch follows"
  },
  {
    side: "Bride Side",
    invitedBy: "Smt & Sri. Anumatla Manjula-Ravi",
    blessing: "Near & Dear",
    relation: "With best compliments from",
    quote: "We solicit your gracious presence with your friends & family on the auspicious occasion of the marriage of",
    brideLine: "Akhila",
    brideNote: "",
    groomLine: "Naveen",
    groomNote: "",
    parentLine: "Only son of Smt & Sri. Mitta Manjula-Rajender Garu",
    venue: "SVR Gardens, Satavahana University Road, Malkapur, Karimnagar",
    date: "Thursday, 9th July, 2026",
    time: "11:20 a.m.",
    muhurtham: "Ashwini Nakshatram, Kanya Lagnam",
    lunch: "Lunch follows"
  }
];

function InvitationCardsSection() {
  return (
    <section className="section invitation-cards-section">
      <SectionHeader
        eyebrow="Invitation Cards"
        title="Two families, one sacred invitation"
        copy="Royal digital recreations of the bride-side and groom-side wedding cards, carrying the same ceremony details in an elegant heirloom style."
      />
      <div className="royal-card-grid">
        {invitationCards.map((card) => (
          <motion.article className="royal-card" key={card.side} whileHover={{ y: -10, rotateX: 2, rotateY: -2 }} data-reveal>
            <span className="royal-corner royal-corner-tl" />
            <span className="royal-corner royal-corner-tr" />
            <span className="royal-corner royal-corner-bl" />
            <span className="royal-corner royal-corner-br" />
            <div className="royal-card-inner">
              <p className="royal-side">{card.side}</p>
              <div className="royal-symbol">ॐ</div>
              <p className="royal-topline">Sri Subhamasthu &nbsp; | &nbsp; Kalyanamastu</p>
              <h3>Wedding Invitation</h3>
              <span className="royal-divider" />
              <p className="royal-quote">{card.quote}</p>
              <div className="royal-couple">
                <div>
                  <strong>{card.brideLine}</strong>
                  <small>{card.brideNote}</small>
                </div>
                <Heart aria-hidden="true" />
                <div>
                  <strong>{card.groomLine}</strong>
                  <small>{card.groomNote}</small>
                </div>
              </div>
              <p className="royal-parent">{card.parentLine}</p>
              <dl className="royal-details">
                <div>
                  <dt>Sumuhurtham</dt>
                  <dd>{card.date} at {card.time}</dd>
                </div>
                <div>
                  <dt>Muhurtham</dt>
                  <dd>{card.muhurtham}</dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>{card.venue}</dd>
                </div>
                <div>
                  <dt>Lunch</dt>
                  <dd>{card.lunch}</dd>
                </div>
              </dl>
              <div className="royal-invited">
                <span>Invited by</span>
                <strong>{card.invitedBy}</strong>
                <em>{card.relation}: {card.blessing}</em>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function VenueSection() {
  return (
    <section className="section venue-section">
      <SectionHeader eyebrow="Venue" title={wedding.venue} copy="SVR Gardens on Satavahana University Road, Malkapur, Karimnagar welcomes family and friends for the muhurtham and lunch." />
      <div className="venue-layout">
        <div className="venue-visual" data-reveal>
          <div className="route-line" />
          <MapPin size={42} />
        </div>
        <div className="venue-panel" data-reveal>
          <iframe title="Wedding venue map" src={wedding.mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="venue-actions">
            <a className="secondary-cta" href={`tel:${wedding.phone.replaceAll(" ", "")}`}>
              <Phone size={18} /> Call Host
            </a>
          </div>
          <ul>
            <li>Sumuhurtham on Thursday, 9th July, 2026 at 11:20 a.m.</li>
            <li>Ashwini Nakshatram, Kanya Lagnam.</li>
            <li>Lunch follows at SVR Gardens.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function FamilySection() {
  return (
    <section className="section family-section">
      <SectionHeader eyebrow="Families" title="With love from both homes" copy="The people who made this story possible, gathered in one warm frame." />
      <div className="family-photo-frame" data-reveal>
        <img src="/images/family.JPG" alt="Akhila and Naveen families together" loading="lazy" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Thank You</p>
      <h2>Our forever begins here.</h2>
      <div>
        <span>{wedding.hashtag}</span>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <header className="section-header" data-reveal>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{copy}</span>
    </header>
  );
}

function FloatingAmbience() {
  return (
    <div className="ambience" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => <span key={index} style={{ "--i": index } as CSSProperties} />)}
    </div>
  );
}

function CustomCursor({ x, y }: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> }) {
  return <motion.div className="custom-cursor" style={{ x, y }} aria-hidden="true" />;
}

function ScrollProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScale(max <= 0 ? 0 : window.scrollY / max);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <span className="scroll-progress" style={{ transform: `scaleX(${scale})` }} />;
}

function splitReveal(delay: number) {
  return {
    hide: { y: 56, opacity: 0, filter: "blur(16px)" },
    show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.05, delay, ease: easing } }
  };
}
