'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function Sidebar() {
    const { theme, setTheme } = useTheme();

    const closeSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        if (sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    return (
        <>
            <div
                id="overlay"
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 opacity-0 invisible transition-all duration-300 [&.active]:opacity-100 [&.active]:visible"
                onClick={closeSidebar}
                aria-hidden="true"
            />

            <aside
                id="sidebar"
                className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[rgb(var(--bg))] z-50 flex flex-col overflow-y-auto -translate-x-full transition-transform duration-300 ease-out [&.open]:translate-x-0 shadow-large"
                aria-hidden="true"
            >
                <div className="flex items-center justify-between p-5 border-b border-[rgb(var(--border))]">
                    <Link
                        href="/"
                        onClick={closeSidebar}
                        className="flex items-center gap-2.5 text-lg font-semibold text-[rgb(var(--text))]"
                    >
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl gradient-bg text-white">
                            <FontAwesomeIcon icon={['fas', 'bolt']} className="text-sm" />
                        </div>
                        <span>FreeHosts</span>
                    </Link>
                    <button
                        onClick={closeSidebar}
                        className="flex items-center justify-center w-11 h-11 rounded-xl hover:bg-[rgb(var(--muted)/0.1)] transition-colors active:scale-95"
                        aria-label="Close menu"
                    >
                        <FontAwesomeIcon icon={['fas', 'xmark']} className="text-xl text-[rgb(var(--muted))]" />
                    </button>
                </div>

                <nav className="flex flex-col gap-1 p-4 flex-1" role="navigation">
                    <SidebarLink href="/hosts" icon={['fas', 'server']} onClick={closeSidebar}>
                        Browse Hosts
                    </SidebarLink>

                    <SidebarDropdown label="Submit" icon={['fas', 'plus-circle']}>
                        <SidebarLink href="/submit-host" icon={['fas', 'plus']} onClick={closeSidebar} nested>
                            Submit a Host
                        </SidebarLink>
                        <SidebarLink href="/submit-layout" icon={['fas', 'pencil']} onClick={closeSidebar} nested>
                            Submit Layout
                        </SidebarLink>
                        <SidebarLink href="/submission-rules" icon={['fas', 'list-check']} onClick={closeSidebar} nested>
                            Submission Rules
                        </SidebarLink>
                    </SidebarDropdown>

                    <SidebarDropdown label="Resources" icon={['fas', 'book-open']}>
                        <SidebarLink href="/about" icon={['fas', 'circle-info']} onClick={closeSidebar} nested>
                            About
                        </SidebarLink>
                        <SidebarLink href="/staff" icon={['fas', 'users']} onClick={closeSidebar} nested>
                            Staff
                        </SidebarLink>
                        <SidebarLink href="/faq" icon={['fas', 'circle-question']} onClick={closeSidebar} nested>
                            FAQ
                        </SidebarLink>
                        <SidebarLink href="/server-rules" icon={['fas', 'shield-halved']} onClick={closeSidebar} nested>
                            Server Rules
                        </SidebarLink>
                        <SidebarLink href="/other-free-hosts" icon={['fas', 'arrow-up-right-from-square']} onClick={closeSidebar} nested>
                            Other Free Hosts
                        </SidebarLink>
                    </SidebarDropdown>

                    <SidebarDropdown label="Legal" icon={['fas', 'scale-balanced']}>
                        <SidebarLink href="/tos" icon={['fas', 'file-contract']} onClick={closeSidebar} nested>
                            Terms of Service
                        </SidebarLink>
                        <SidebarLink href="/privacy-policy" icon={['fas', 'user-shield']} onClick={closeSidebar} nested>
                            Privacy Policy
                        </SidebarLink>
                    </SidebarDropdown>

                    <div className="my-2 border-t border-[rgb(var(--border))]" />

                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex items-center gap-3 px-4 py-3 text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--muted)/0.08)] rounded-xl transition-all text-left w-full"
                    >
                        <div className="w-9 h-9 rounded-lg bg-[rgb(var(--muted)/0.08)] flex items-center justify-center">
                            <FontAwesomeIcon icon={['fas', theme === 'dark' ? 'sun' : 'moon']} className="text-sm" />
                        </div>
                        <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-[rgb(var(--border))]">
                    <a
                        href="https://discord.gg/QbeZ3b5CQd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3.5 gradient-bg text-white font-medium rounded-xl hover:shadow-glow transition-all"
                        onClick={closeSidebar}
                    >
                        <FontAwesomeIcon icon={['fab', 'discord']} />
                        <span>Join Discord</span>
                    </a>
                </div>
            </aside>
        </>
    );
}

function SidebarLink({
    href,
    icon,
    onClick,
    children,
    nested = false,
}: {
    href: string;
    icon: IconProp;
    onClick?: () => void;
    children: React.ReactNode;
    nested?: boolean;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--muted)/0.08)] rounded-xl transition-all ${nested ? 'pl-14' : ''}`}
        >
            <div className={`${nested ? 'w-6 h-6' : 'w-9 h-9'} rounded-lg bg-[rgb(var(--muted)/0.08)] flex items-center justify-center flex-shrink-0`}>
                <FontAwesomeIcon icon={icon} className={nested ? 'text-xs' : 'text-sm'} />
            </div>
            <span className="font-medium">{children}</span>
        </Link>
    );
}

function SidebarDropdown({ label, icon, children }: { label: string; icon: IconProp; children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-3 text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--muted)/0.08)] rounded-xl transition-all text-left w-full"
            >
                <div className="w-9 h-9 rounded-lg bg-[rgb(var(--muted)/0.08)] flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={icon} className="text-sm" />
                </div>
                <span className="font-medium flex-1">{label}</span>
                <FontAwesomeIcon
                    icon={['fas', 'chevron-down']}
                    className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-1 mt-1 overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
