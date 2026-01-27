'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { resolvedTheme, toggleTheme } = useTheme();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        if (sidebar && overlay) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
        }
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-[rgb(var(--bg)/0.85)] backdrop-blur-xl border-b border-[rgb(var(--border))] shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="container-default">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl hover:bg-[rgb(var(--muted)/0.1)] transition-colors active:scale-95"
                        aria-label="Open menu"
                    >
                        <FontAwesomeIcon icon={['fas', 'bars']} className="text-xl text-[rgb(var(--muted))]" />
                    </button>

                    <Link
                        href="/"
                        className="flex items-center gap-2.5 group"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: -5 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="flex items-center justify-center w-10 h-10 rounded-xl gradient-bg text-white shadow-lg shadow-[rgb(var(--accent)/0.25)]"
                        >
                            <FontAwesomeIcon icon={['fas', 'bolt']} className="text-base" />
                        </motion.div>
                        <span className="text-xl font-bold text-[rgb(var(--text))] tracking-tight">
                            Free<span className="gradient-text">Hosts</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main">
                        <NavItem href="/hosts" icon={['fas', 'server']}>
                            Hosts
                        </NavItem>

                        <DropdownNav label="Submit" icon={['fas', 'plus']}>
                            <DropdownItem href="/submit-host" icon={['fas', 'plus']} description="Add a new hosting provider">
                                Submit Host
                            </DropdownItem>
                            <DropdownItem href="/submit-layout" icon={['fas', 'pencil']} description="Suggest design improvements">
                                Submit Layout
                            </DropdownItem>
                            <DropdownItem href="/submission-rules" icon={['fas', 'list-check']} description="Review our guidelines">
                                Rules
                            </DropdownItem>
                        </DropdownNav>

                        <DropdownNav label="Resources" icon={['fas', 'book']}>
                            <DropdownItem href="/about" icon={['fas', 'circle-info']} description="Learn about our mission">
                                About Us
                            </DropdownItem>
                            <DropdownItem href="/staff" icon={['fas', 'users']} description="Meet the team">
                                Staff
                            </DropdownItem>
                            <DropdownItem href="/faq" icon={['fas', 'circle-question'] as IconProp} description="Common questions">
                                FAQ
                            </DropdownItem>
                            <DropdownItem href="/server-rules" icon={['fas', 'shield']} description="Community guidelines">
                                Server Rules
                            </DropdownItem>
                        </DropdownNav>

                        <DropdownNav label="Policy" icon={['fas', 'file-shield']}>
                            <DropdownItem href="/privacy-policy" icon={['fas', 'user-shield']} description="How we handle data">
                                Privacy Policy
                            </DropdownItem>
                            <DropdownItem href="/tos" icon={['fas', 'file-contract']} description="Terms of service">
                                ToS
                            </DropdownItem>
                        </DropdownNav>

                        <NavItem href="/other-free-hosts" icon={['fas', 'list']}>
                            Other Hosts
                        </NavItem>
                    </nav>

                    <div className="flex items-center gap-2">
                        <a
                            href="https://www.trustpilot.com/review/freehosts.space"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--muted)/0.08)] transition-all"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#00b67a]" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span className="font-medium">4.8</span>
                        </a>

                        {mounted && (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleTheme}
                                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[rgb(var(--muted)/0.1)] transition-colors"
                                aria-label="Toggle theme"
                            >
                                <FontAwesomeIcon
                                    icon={['fas', resolvedTheme === 'dark' ? 'sun' : 'moon']}
                                    className="text-lg text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
                                />
                            </motion.button>
                        )}

                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="https://discord.gg/QbeZ3b5CQd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 gradient-bg text-white font-medium rounded-xl hover:shadow-glow transition-all text-sm"
                        >
                            <FontAwesomeIcon icon={['fab', 'discord']} />
                            <span>Discord</span>
                        </motion.a>
                    </div>
                </div>
            </div>
        </header>
    );
}

function NavItem({ href, icon, children }: { href: string; icon: IconProp; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 px-3.5 py-2.5 text-[15px] font-semibold text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--muted)/0.08)] rounded-xl transition-all"
        >
            <FontAwesomeIcon icon={icon} className="text-xs opacity-70" />
            <span>{children}</span>
        </Link>
    );
}

function DropdownNav({ label, icon, children }: { label: string; icon: IconProp; children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="flex items-center gap-2 px-3.5 py-2.5 text-[15px] font-semibold text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--muted)/0.08)] rounded-xl transition-all">
                <FontAwesomeIcon icon={icon} className="text-xs opacity-70" />
                <span>{label}</span>
                <FontAwesomeIcon
                    icon={['fas', 'chevron-down']}
                    className={`text-[10px] opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 w-64 p-2 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-large overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DropdownItem({ href, icon, description, children }: { href: string; icon: IconProp; description?: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-start gap-3 px-3 py-2.5 text-sm hover:bg-[rgb(var(--muted)/0.08)] rounded-xl transition-all group"
        >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] group-hover:bg-[rgb(var(--accent)/0.15)] transition-colors mt-0.5">
                <FontAwesomeIcon icon={icon} className="text-sm" />
            </div>
            <div className="flex-1 min-w-0">
                <span className="font-medium text-[rgb(var(--text))] block">{children}</span>
                {description && (
                    <span className="text-xs text-[rgb(var(--muted))] line-clamp-1">{description}</span>
                )}
            </div>
        </Link>
    );
}
