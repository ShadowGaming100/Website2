import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'section';
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[rgb(var(--card))] border border-[rgb(var(--border))]',
  elevated: 'bg-[rgb(var(--card))] shadow-medium',
  outlined: 'bg-transparent border border-[rgb(var(--border))]',
  glass: 'glass border border-[rgb(var(--border)/0.5)]',
  gradient: 'gradient-border',
};

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false, 
  padding = 'none',
  as = 'div'
}: CardProps) {
  const baseStyles = 'rounded-2xl overflow-hidden';
  const hoverStyles = hover ? 'card-hover cursor-pointer' : '';

  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    hoverStyles,
    paddingStyles[padding],
    className,
  ].filter(Boolean).join(' ');

  const Component = as;

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={combinedClassName}
      >
        {children}
      </motion.div>
    );
  }

  return <Component className={combinedClassName}>{children}</Component>;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
}

export function CardHeader({ children, className = '', withBorder = true }: CardHeaderProps) {
  return (
    <div className={`p-6 ${withBorder ? 'border-b border-[rgb(var(--border))]' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-6 ${className}`.trim()}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
}

export function CardFooter({ children, className = '', withBorder = true }: CardFooterProps) {
  return (
    <div className={`p-6 ${withBorder ? 'border-t border-[rgb(var(--border))]' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}

interface InteractiveCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
}

export function InteractiveCard({ 
  children, 
  className = '', 
  variant = 'default',
  ...motionProps 
}: InteractiveCardProps) {
  const baseStyles = 'rounded-2xl overflow-hidden cursor-pointer';

  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    'transition-all duration-300',
    className,
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={combinedClassName}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

interface FeaturedCardProps {
  children: ReactNode;
  className?: string;
}

export function FeaturedCard({ children, className = '' }: FeaturedCardProps) {
  return (
    <div className={`relative p-[1px] rounded-2xl bg-gradient-to-br from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] ${className}`}>
      <div className="bg-[rgb(var(--card))] rounded-2xl h-full">
        {children}
      </div>
    </div>
  );
}
