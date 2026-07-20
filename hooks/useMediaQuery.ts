'use client';

import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, string> = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

/**
 * Returns true when the given media query or Tailwind breakpoint matches.
 *
 * @example
 * const isMobile = !useMediaQuery('md');
 * const isDesktop = useMediaQuery('lg');
 * const isCustom = useMediaQuery('(min-width: 900px)');
 */
export function useMediaQuery(query: Breakpoint | string): boolean {
  const mediaQuery = breakpoints[query as Breakpoint] ?? query;

  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(mediaQuery).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(mediaQuery);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [mediaQuery]);


  return matches;
}
