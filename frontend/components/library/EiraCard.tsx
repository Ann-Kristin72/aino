import Image from 'next/image';

interface EiraCardProps {
  variant?: 'neutral' | 'thinking' | 'warning' | 'error';
  alt?: string;
  className?: string;
}

const variantToImage: Record<string, string> = {
  neutral: '/eira/eira-neutral.png',
  thinking: '/eira/eira-thinking.png',
  warning: '/eira/eira-warning.png',
  error: '/eira/eira-error.png',
};

export default function EiraCard({ variant = 'neutral', alt = 'Eira', className = '' }: EiraCardProps) {
  const src = variantToImage[variant] || variantToImage['neutral'];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={256}
        height={256}
        onError={(e) => {
          (e.target as HTMLImageElement).src = variantToImage['neutral'];
        }}
        className="rounded-full border-4 border-blue-100 bg-white"
        priority
      />
      <span className="mt-2 font-semibold text-lg">Eira</span>
    </div>
  );
} 