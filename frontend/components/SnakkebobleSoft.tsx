export default function SnakkebobleSoft({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="backdrop-blur-sm bg-white/90 border-[4px] border-joda-green text-lg p-8 rounded-[40px] shadow-xl max-w-sm relative animate-fade-pop text-skifer"
    >
      <style jsx>{`
        div::before {
          content: '';
          position: absolute;
          left: -20px;
          top: 40px;
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.9);
          border-left: 4px solid #4AAE9B;
          border-bottom: 4px solid #4AAE9B;
          transform: rotate(45deg);
          border-radius: 2px;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }
      `}</style>
      {children}
    </div>
  );
} 