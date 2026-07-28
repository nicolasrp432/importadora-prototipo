"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealVariant = "fade-up" | "scale-up" | "clip-reveal";

const fromByVariant: Record<RevealVariant, gsap.TweenVars> = {
  "fade-up": { opacity: 0, y: 32 },
  "scale-up": { opacity: 0, scale: 0.94, transformOrigin: "50% 100%" },
  "clip-reveal": { clipPath: "inset(100% 0 0 0)" },
};

const toByVariant: Record<RevealVariant, gsap.TweenVars> = {
  "fade-up": { opacity: 1, y: 0 },
  "scale-up": { opacity: 1, scale: 1 },
  "clip-reveal": { clipPath: "inset(0% 0 0 0)" },
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useSectionReveal<T extends HTMLElement>(variant: RevealVariant) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, fromByVariant[variant], {
        ...toByVariant[variant],
        duration: 0.8,
        ease: "reveal",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    });

    return () => ctx.revert();
  }, [variant]);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const items = el.querySelectorAll<HTMLElement>("[data-stagger-item]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "reveal",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useCountUp(target: number, suffix = "") {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: target,
        duration: 1.4,
        ease: "standard",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value)}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [target, suffix]);

  return ref;
}
