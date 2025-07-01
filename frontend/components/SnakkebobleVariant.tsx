interface Props {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'neutral';
}

const variants = {
  info: {
    border: 'border-joda-teal',
    text: 'text-skifer',
    bg: 'bg-white',
    shadow: 'shadow-lg',
  },
  success: {
    border: 'border-joda-green',
    text: 'text-skifer',
    bg: 'bg-white',
    shadow: 'shadow-md',
  },
  warning: {
    border: 'border-joda-yellow',
    text: 'text-skifer',
    bg: 'bg-white',
    shadow: 'shadow-sm',
  },
  neutral: {
    border: 'border-joda-orange',
    text: 'text-skifer',
    bg: 'bg-white',
    shadow: 'shadow',
  },
};

export default function SnakkebobleVariant({ children, variant = 'info' }: Props) {
  const style = variants[variant];

  return (
    <div
      className={`rounded-[28px] max-w-sm p-6 relative animate-fade-pop
        border-2 ${style.border} ${style.text} ${style.bg} ${style.shadow}
        before:content-[''] before:absolute before:left-[-12px] before:top-6 
        before:w-5 before:h-5 before:bg-white before:border-l-2 before:border-b-2 
        before:${style.border} before:rotate-45 before:rounded-sm`}
    >
      {children}
    </div>
  );
} 