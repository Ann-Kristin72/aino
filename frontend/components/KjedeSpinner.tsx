'use client';

export default function KjedeSpinner() {
  return (
    <div className="flex gap-3 items-center justify-center animate-spin-slow">
      <Ring color="joda-teal" delay="0s" />
      <Ring color="joda-peach" delay="0.2s" />
      <Ring color="joda-orange" delay="0.4s" />
    </div>
  );
}

function Ring({ color, delay }: { color: string; delay: string }) {
  return (
    <div
      className={`w-6 h-6 border-[3px] border-${color} rounded-full animate-ring-scale`}
      style={{ animationDelay: delay }}
    ></div>
  );
} 