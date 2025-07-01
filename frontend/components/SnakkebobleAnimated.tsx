export default function SnakkebobleAnimated({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border-2 border-joda-green text-skifer text-lg p-6 rounded-[24px] shadow-md max-w-sm relative animate-fade-pop
        before:content-[''] before:absolute before:left-[-12px] before:top-6 before:w-5 before:h-5 before:bg-white 
        before:border-l-2 before:border-b-2 before:border-joda-green before:rotate-45">
      {children}
    </div>
  );
} 