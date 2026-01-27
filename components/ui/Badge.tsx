import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'subtle';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: IconProp;
  pill?: boolean;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[rgb(var(--muted)/0.1)] text-[rgb(var(--muted))]',
  primary: 'bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]',
  secondary: 'bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--text))]',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  danger: 'bg-red-500/10 text-red-600 dark:text-red-400',
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  subtle: 'bg-[rgb(var(--muted)/0.05)] text-[rgb(var(--muted))]',
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'text-[10px] px-1.5 py-0.5 gap-1',
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-xs px-2.5 py-1 gap-1.5',
  lg: 'text-sm px-3 py-1.5 gap-2',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-[rgb(var(--muted))]',
  primary: 'bg-[rgb(var(--accent))]',
  secondary: 'bg-[rgb(var(--muted))]',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  subtle: 'bg-[rgb(var(--muted))]',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  pill = true,
  dot = false,
  className = '',
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium';
  const variantClass = variantStyles[variant];
  const sizeClass = sizeStyles[size];
  const shapeClass = pill ? 'rounded-full' : 'rounded-lg';

  const combinedClassName = `${baseStyles} ${variantClass} ${sizeClass} ${shapeClass} ${className}`.trim();

  return (
    <span className={combinedClassName}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {icon && <FontAwesomeIcon icon={icon} className="text-current" />}
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  label?: string;
  className?: string;
}

const statusConfig = {
  online: { color: 'bg-emerald-500', label: 'Online', bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-600 dark:text-emerald-400' },
  offline: { color: 'bg-slate-400', label: 'Offline', bgColor: 'bg-slate-500/10', textColor: 'text-slate-600 dark:text-slate-400' },
  away: { color: 'bg-amber-500', label: 'Away', bgColor: 'bg-amber-500/10', textColor: 'text-amber-600 dark:text-amber-400' },
  busy: { color: 'bg-red-500', label: 'Busy', bgColor: 'bg-red-500/10', textColor: 'text-red-600 dark:text-red-400' },
};

export function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.color} ${status === 'online' ? 'animate-pulse' : ''}`} />
      {label || config.label}
    </span>
  );
}
