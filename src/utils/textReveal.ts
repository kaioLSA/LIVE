import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text in an element into individual word spans for animation.
 * Handles child elements like <em>, <strong>, etc.
 */
export function splitWords(el: HTMLElement): void {
  const nodes = Array.from(el.childNodes);
  el.innerHTML = '';

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = node.textContent?.split(/(\s+)/) || [];
      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          el.appendChild(document.createTextNode(' '));
        } else if (part) {
          el.appendChild(createWordSpan(part));
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const elem = node as HTMLElement;
      const clone = elem.cloneNode(false) as HTMLElement;
      const innerParts = elem.textContent?.split(/(\s+)/) || [];
      innerParts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          clone.appendChild(document.createTextNode(' '));
        } else if (part) {
          clone.appendChild(createWordSpan(part));
        }
      });
      el.appendChild(clone);
    }
  });
}

function createWordSpan(word: string): HTMLSpanElement {
  const outer = document.createElement('span');
  outer.style.display = 'inline-block';
  outer.style.overflow = 'hidden';
  outer.style.verticalAlign = 'bottom';
  const inner = document.createElement('span');
  inner.className = 'word-reveal';
  inner.style.display = 'inline-block';
  inner.style.willChange = 'transform';
  inner.textContent = word;
  outer.appendChild(inner);
  return outer;
}

/**
 * Applies a word-by-word reveal animation to a heading element, controlled by scroll.
 */
export function animateHeadingReveal(
  el: HTMLElement,
  trigger: HTMLElement,
  options?: { start?: string; end?: string; scrub?: number }
): void {
  splitWords(el);
  const words = el.querySelectorAll('.word-reveal');
  if (!words.length) return;

  gsap.fromTo(
    words,
    { yPercent: 120, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      stagger: 0.04,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: options?.start || 'top 80%',
        end: options?.end || 'top 40%',
        scrub: options?.scrub ?? 1,
      },
    }
  );
}

/**
 * Animates a label with letter-spacing expansion effect.
 */
export function animateLabelReveal(
  el: HTMLElement,
  trigger: HTMLElement,
  options?: { start?: string; end?: string }
): void {
  gsap.fromTo(
    el,
    { opacity: 0, letterSpacing: '12px', x: -20 },
    {
      opacity: 1,
      letterSpacing: '4px',
      x: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger,
        start: options?.start || 'top 85%',
        end: options?.end || 'top 55%',
        scrub: 1,
      },
    }
  );
}
