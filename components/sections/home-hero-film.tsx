'use client';

import { useEffect, useRef, useState } from 'react';

/** Authentic Sean/Amber house film; playback is optional and never blocks the page. */
export function HomeHeroFilm({ showCaption = true }: { showCaption?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const player = video.current;
    const applyPreference = () => {
      if (preference.matches) player?.pause();
      else void player?.play().catch(() => {});
    };
    applyPreference();
    preference.addEventListener('change', applyPreference);
    return () => preference.removeEventListener('change', applyPreference);
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[#222522]">
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-contain"
        poster="/media/stowe-house-poster-hd.jpg"
        muted loop playsInline preload="none"
        aria-label="Stowe Contracting house and outdoor living project film"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src="/media/stowe-house-hero-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
        <source src="/media/stowe-house-hero-hd.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      {showCaption && <p className="absolute bottom-6 left-6 max-w-[55%] text-xs font-semibold tracking-[.15em] text-white uppercase">Crafted for life outdoors</p>}
      {!failed && <button
        type="button"
        className="absolute right-5 bottom-5 min-h-11 rounded-full border border-white/70 bg-black/60 px-5 text-sm font-medium text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        aria-label={playing ? 'Pause project film' : 'Play project film'}
        onClick={() => { const player = video.current; if (player?.paused) void player.play().catch(() => {}); else player?.pause(); }}
      >{playing ? 'Pause film' : 'Play film'}</button>}
    </div>
  );
}

