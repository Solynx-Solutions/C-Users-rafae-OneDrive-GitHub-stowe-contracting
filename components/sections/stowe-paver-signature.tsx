'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './stowe-paver-signature.module.css';

const COLUMNS = 10;
const ROWS = 4;
const tiles = Array.from({ length: COLUMNS * ROWS }, (_, index) => {
  const column = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  return {
    '--x': `${(column / (COLUMNS - 1)) * 100}%`,
    '--y': `${(row / (ROWS - 1)) * 100}%`,
    '--delay': `${(column * 0.18 + row * 0.24).toFixed(2)}s`,
    '--drift': `${(column - 4.5) * 8}px`,
    '--turn': `${(index % 3 - 1) * 7}deg`,
  } as CSSProperties;
});

/** A new masonry interpretation using Stowe's authentic logo, not recovered footage. */
export function StowePaverSignature() {
  const section = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<'static' | 'playing' | 'finished'>('static');
  const [run, setRun] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finishForPreference = () => {
      if (preference.matches) setPhase('static');
    };
    preference.addEventListener('change', finishForPreference);
    if (preference.matches || !('IntersectionObserver' in window)) {
      return () => preference.removeEventListener('change', finishForPreference);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPhase('playing');
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', finishForPreference);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    const timeout = window.setTimeout(() => setPhase('finished'), 4600);
    return () => window.clearTimeout(timeout);
  }, [phase, run]);

  return (
    <section ref={section} className={styles.section} aria-labelledby="paver-signature-title" data-phase={phase}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>The Stowe signature</p>
        <h2 id="paver-signature-title">Built with care.<br />Set in stone.</h2>
        <p className={styles.description}>From the first stone to the finishing detail, craftsmanship is what brings a project together.</p>
      </div>
      <div className={styles.presentation}>
        <div className={styles.perspective}>
          <div className={styles.slab}>
            {/* Plain image intentionally provides a complete, unanimated no-JS fallback. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.logo} src="/images/stowe-logo.jpg" alt="Stowe Contracting, Inc." width={175} height={75} />
            <div key={run} className={styles.tiles} aria-hidden="true">
              {tiles.map((style, index) => <span key={index} className={styles.tile} style={style} />)}
            </div>
          </div>
        </div>
        <div className={styles.caption}>
          <span>Piece by piece. A lasting impression.</span>
          {phase === 'finished' && <button type="button" onClick={() => { setRun((value) => value + 1); setPhase('playing'); }} className={styles.replay} aria-label="Replay Stowe logo stone assembly">Replay <span aria-hidden="true">↻</span></button>}
        </div>
      </div>
    </section>
  );
}
