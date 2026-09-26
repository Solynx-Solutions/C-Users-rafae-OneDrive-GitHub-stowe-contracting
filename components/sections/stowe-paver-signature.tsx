'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import styles from './stowe-paver-signature.module.css';

// Geometry follows the larger authentic Facebook mark: three wide top pavers,
// alternating square/vertical stones below, and the distinctive stepped edge.
const stones = [
  { x: 0, y: 0, width: 30, height: 18, delay: 0 },
  { x: 30, y: 0, width: 30, height: 18, delay: 0.2 },
  { x: 60, y: 0, width: 30, height: 18, delay: 0.4 },
  { x: 0, y: 18, width: 20, height: 18, delay: 0.85 },
  { x: 20, y: 18, width: 20, height: 27, delay: 1.05 },
  { x: 40, y: 18, width: 20, height: 18, delay: 1.25 },
  { x: 60, y: 18, width: 20, height: 18, delay: 1.45 },
  { x: 0, y: 36, width: 20, height: 18, delay: 1.9 },
  { x: 40, y: 36, width: 20, height: 18, delay: 2.1 },
  { x: 20, y: 45, width: 20, height: 27, delay: 2.65 },
  { x: 0, y: 54, width: 20, height: 18, delay: 2.85 },
];

/** Local review interpretation of the original paver symbol, not recovered footage or a global rebrand. */
export function StowePaverSignature() {
  const section = useRef<HTMLElement>(null);
  const id = useId().replace(/:/g, '');
  const [phase, setPhase] = useState<'waiting' | 'static' | 'playing' | 'finished'>('waiting');
  const [run, setRun] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreference = () => { if (preference.matches) setPhase('static'); };
    preference.addEventListener('change', onPreference);
    let observer: IntersectionObserver | undefined;
    const frame = window.requestAnimationFrame(() => {
      if (preference.matches || !('IntersectionObserver' in window)) {
        setPhase('static');
        return;
      }
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setPhase(preference.matches ? 'static' : 'playing');
          observer?.disconnect();
        }
      }, { threshold: 0.3 });
      if (section.current) observer.observe(section.current);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      preference.removeEventListener('change', onPreference);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    const timeout = window.setTimeout(() => setPhase('finished'), 4500);
    return () => window.clearTimeout(timeout);
  }, [phase, run]);

  return (
    <section ref={section} className={styles.section} aria-labelledby={`${id}-heading`} data-phase={phase}>
      <noscript><style>{`.${styles.stone}{opacity:1!important;transform:none!important}`}</style></noscript>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>The Stowe signature</p>
        <h2 id={`${id}-heading`}>Built with care.<br />Set in stone.</h2>
        <p className={styles.description}>From the first stone to the finishing detail, craftsmanship is what brings a project together.</p>
      </div>
      <div className={styles.presentation}>
        <div className={styles.brand}>
          <svg className={styles.symbol} viewBox="-10 -24 112 115" role="img" aria-labelledby={`${id}-symbol`}>
            <title id={`${id}-symbol`}>Stowe stepped paving-stone symbol</title>
            <defs>
              <linearGradient id={`${id}-face`} x1="0" y1="0" x2="0.7" y2="1">
                <stop offset="0" stopColor="#f4eee1" /><stop offset="0.55" stopColor="#ddd3bf" /><stop offset="1" stopColor="#b9ac93" />
              </linearGradient>
              <linearGradient id={`${id}-edge`} x2="0" y2="1"><stop stopColor="#82745e" /><stop offset="1" stopColor="#4a4c48" /></linearGradient>
            </defs>
            <g key={run}>
              {stones.map(({ x, y, width, height, delay }, index) => (
                <g key={index} className={styles.stone} style={{ '--delay': `${delay}s`, '--drift': `${index % 2 ? 6 : -6}px` } as CSSProperties}>
                  <rect x={x + 0.8} y={y + 3} width={width - 1.6} height={height - 1.6} rx="1" fill={`url(#${id}-edge)`} />
                  <rect x={x + 0.8} y={y + 0.8} width={width - 1.6} height={height - 1.6} rx="1" fill={`url(#${id}-face)`} stroke="#80394e" strokeWidth="1.15" />
                  <path d={`M${x + 2},${y + height - 3}V${y + 2}H${x + width - 2}`} fill="none" stroke="#fffaf0" strokeWidth="0.85" opacity="0.75" />
                  <path d={`M${x + 3},${y + height - 2}H${x + width - 2}V${y + 3}`} fill="none" stroke="#84765e" strokeWidth="0.75" opacity="0.6" />
                </g>
              ))}
            </g>
          </svg>
          <div className={styles.wordmark} aria-label="Stowe Contracting, Inc.">
            <span className={styles.name}>STOWE</span>
            <span className={styles.company}>CONTRACTING, INC.</span>
          </div>
        </div>
        <div className={styles.caption}>
          <span>Piece by piece. A lasting impression.</span>
          {phase === 'finished' && <button type="button" onClick={() => { setRun((value) => value + 1); setPhase('playing'); }} className={styles.replay} aria-label="Replay Stowe paving-stone assembly">Replay <span aria-hidden="true">↻</span></button>}
        </div>
      </div>
    </section>
  );
}
