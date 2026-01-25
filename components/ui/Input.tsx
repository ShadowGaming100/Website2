import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: IconProp;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  inputSize?: InputSize;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-4 py-3 text-base',
};

const iconPaddingLeft: Record<InputSize, string> = {
  sm: 'pl-9',
  md: 'pl-10',
  lg: 'pl-11',
};

const iconPaddingRight: Record<InputSize, string> = {
  sm: 'pr-9',
  md: 'pr-10',
  lg: 'pr-11',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  inputSize = 'md',
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const hasError = !!error;

  const inputStyles = [
    'w-full rounded-xl bg-[rgb(var(--card))] border',
    'text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted)/0.6)]',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:ring-offset-0 focus:border-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    hasError ? 'border-red-500 focus:ring-red-500' : 'border-[rgb(var(--border))]',
    sizeStyles[inputSize],
    icon && iconPosition === 'left' ? iconPaddingLeft[inputSize] : '',
    icon && iconPosition === 'right' ? iconPaddingRight[inputSize] : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[rgb(var(--text))]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))]">
            <FontAwesomeIcon icon={icon} className="text-sm" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputStyles}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))]">
            <FontAwesomeIcon icon={icon} className="text-sm" />
          </div>
        )}
      </div>
      {hint && !error && (
        <p className="text-xs text-[rgb(var(--muted))]">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <FontAwesomeIcon icon={['fas', 'circle-exclamation']} className="text-[10px]" />
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  inputSize?: InputSize;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  hint,
  fullWidth = false,
  inputSize = 'md',
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const hasError = !!error;

  const textareaStyles = [
    'w-full rounded-xl bg-[rgb(var(--card))] border min-h-[120px] resize-y',
    'text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted)/0.6)]',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:ring-offset-0 focus:border-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    hasError ? 'border-red-500 focus:ring-red-500' : 'border-[rgb(var(--border))]',
    sizeStyles[inputSize],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[rgb(var(--text))]">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={textareaStyles}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-[rgb(var(--muted))]">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <FontAwesomeIcon icon={['fas', 'circle-exclamation']} className="text-[10px]" />
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

interface SearchInputProps extends Omit<InputProps, 'icon' | 'iconPosition'> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  onClear,
  value,
  ...props
}, ref) => {
  return (
    <div className="relative">
      <Input
        ref={ref}
        icon={['fas', 'magnifying-glass']}
        iconPosition="left"
        value={value}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
        >
          <FontAwesomeIcon icon={['fas', 'xmark']} className="text-sm" />
        </button>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
