import Link from 'next/link';
import {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconProp;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: never;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'gradient-bg text-white font-medium hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'bg-[rgb(var(--card))] text-[rgb(var(--text))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--muted)/0.05)]',
  ghost:
    'bg-transparent text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--muted)/0.08)]',
  outline:
    'bg-transparent text-[rgb(var(--accent))] border border-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))] hover:text-white',
  danger:
    'bg-red-500 text-white font-medium hover:bg-red-600 hover:shadow-lg',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'text-xs px-2.5 py-1.5 gap-1.5',
  sm: 'text-sm px-3 py-2 gap-2',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-base px-5 py-3 gap-2.5',
  xl: 'text-base px-6 py-3.5 gap-3',
};

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  xs: 'w-7 h-7',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-11 h-11',
  xl: 'w-12 h-12',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
  xl: 'text-base',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  iconOnly = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2';

  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconClass = iconSizeStyles[size];

  const content = (
    <>
      {loading && (
        <FontAwesomeIcon icon={['fas', 'spinner']} spin className={iconClass} />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <FontAwesomeIcon icon={icon} className={iconClass} />
      )}
      {!iconOnly && children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'right' && (
        <FontAwesomeIcon icon={icon} className={iconClass} />
      )}
    </>
  );

  if ('href' in props) {
    const { href, ...anchorProps } = props as ButtonAsLink;

    if (href.startsWith('http')) {
      return (
        <a
          href={href}
          className={combinedClassName}
          target="_blank"
          rel="noopener noreferrer"
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={combinedClassName}
        {...anchorProps}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      type="button"
      className={combinedClassName}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {content}
    </button>
  );
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  ...props
}: Omit<ButtonProps, 'children' | 'iconOnly'> & { 'aria-label': string }) {
  return (
    <Button
      variant={variant}
      size={size}
      icon={icon}
      iconOnly
      className={className}
      aria-label={ariaLabel}
      {...(props as ButtonProps)}
    />
  );
}
