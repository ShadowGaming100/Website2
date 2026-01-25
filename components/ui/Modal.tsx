'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  icon?: IconProp;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export function Modal({ isOpen, onClose, title, children, icon, footer, size = 'md' }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`relative bg-[rgb(var(--card))] border border-[rgb(var(--border))] w-full ${sizeStyles[size]} rounded-2xl shadow-large overflow-hidden`}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-5 border-b border-[rgb(var(--border))]">
          <h2 className="text-lg font-semibold flex items-center gap-3 text-[rgb(var(--text))]">
            {icon && (
              <div className="w-9 h-9 rounded-xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center">
                <FontAwesomeIcon icon={icon} className="text-[rgb(var(--accent))]" />
              </div>
            )}
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-[rgb(var(--muted)/0.1)] text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={['fas', 'xmark']} />
          </button>
        </div>
        
        <div className="p-5 text-[rgb(var(--text))]">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end gap-3 p-5 border-t border-[rgb(var(--border))] bg-[rgb(var(--muted)/0.02)]">
            {footer}
          </div>
        )}
      </motion.div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(<AnimatePresence>{isOpen && content}</AnimatePresence>, document.body);
}
