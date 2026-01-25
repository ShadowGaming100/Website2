import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ 
  title, 
  description, 
  breadcrumbs, 
  children,
  className = '' 
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden border-b border-[rgb(var(--border))] bg-gradient-to-b from-[rgb(var(--muted)/0.02)] to-transparent ${className}`}
    >
      <div className="container-default py-12 lg:py-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center gap-2 text-sm text-[rgb(var(--muted))]" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-[rgb(var(--text))] transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-[rgb(var(--text))]">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-[rgb(var(--muted)/0.5)]">/</span>
                )}
              </span>
            ))}
          </nav>
        )}
        
        <h1 className="heading-1 text-[rgb(var(--text))] mb-4">
          {title}
        </h1>
        
        {description && (
          <p className="body-large text-[rgb(var(--muted))] max-w-3xl">
            {description}
          </p>
        )}
        
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}
