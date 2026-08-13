import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  size?: 'sm' | 'md';
  className?: string;
}

const sizeClasses = {
  sm: 'h-14 w-auto',
  md: 'h-11 w-auto sm:h-12',
};

/** Supplied Stowe Contracting logo, reserved for brand-lockup placements. */
export function BrandLogo({ size = 'md', className }: BrandLogoProps) {
  return (
    <Image
      src="/images/stowe-logo.jpg"
      alt=""
      width={175}
      height={75}
      className={cn(sizeClasses[size], className)}
    />
  );
}
