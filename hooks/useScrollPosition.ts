'use client';

import { useState, useEffect } from 'react';

/**
 * Tracks scroll position and returns:
 * - scrollY: current vertical scroll position in pixels
 * - scrollDirection: 'up' | 'down' | null
 * - isAtTop: true when scrollY is below the threshold (default 10px)
 *
 * Useful for hide-on-scroll headers, sticky CTAs, and scroll-triggered animations.
 *
 * @example
 * const { isAtTop, scrollDirection } = useScrollPosition();
 * const headerVisible = isAtTop || scrollDirection === 'up';
 */
export function useScrollPosition(threshold = 10) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setScrollY(currentScrollY);
      setIsAtTop(currentScrollY < threshold);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY, threshold]);

  return { scrollY, scrollDirection, isAtTop };
}
