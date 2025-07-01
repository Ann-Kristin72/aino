export default function SnakkebobleSoft({ children }: { children: React.ReactNode }) {
  return (
    <div className="backdrop-blur-sm bg-white/90 border-2 border-joda-green text-skifer text-lg p-6 rounded-[28px] shadow-lg max-w-sm relative animate-fade-pop
      before:content-[''] before:absolute before:left-[-12px] before:top-6 
      before:w-5 before:h-5 before:bg-white/90 before:border-l-2 before:border-b-2 
      before:border-joda-green before:rotate-45 before:rounded-sm drop-shadow-md">
      {children}
    </div>
  );
} 