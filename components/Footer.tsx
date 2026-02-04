import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import TrustpilotWidget from './TrustpilotWidget';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        explore: [
            { label: 'Browse Hosts', href: '/hosts' },
            { label: 'About Us', href: '/about' },
            { label: 'Our Team', href: '/staff' },
            { label: 'FAQ', href: '/faq' },
        ],
        submit: [
            { label: 'Submit a Host', href: '/submit-host' },
            { label: 'Submit Layout', href: '/submit-layout' },
            { label: 'Submission Rules', href: '/submission-rules' },
        ],
        legal: [
            { label: 'Terms of Service', href: '/tos' },
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Server Rules', href: '/server-rules' },
        ],
    };

    const socialLinks = [
        { icon: ['fab', 'discord'] as IconProp, href: 'https://discord.gg/QbeZ3b5CQd', label: 'Discord' },
        { icon: ['fab', 'twitter'] as IconProp, href: 'https://x.com/freehosts_', label: 'Twitter' },
        { icon: ['fab', 'instagram'] as IconProp, href: 'https://www.instagram.com/freehosts/', label: 'Instagram' },
        { icon: ['fab', 'github'] as IconProp, href: 'https://github.com/freehostsofficial', label: 'GitHub' },
    ];

    return (
        <footer className="mt-auto border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
            <div className="container-default py-12 md:py-16 px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
                    <div className="col-span-2 md:col-span-4 lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-bold text-[rgb(var(--text))] mb-4">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgb(var(--accent))] text-white shadow-sm">
                                <FontAwesomeIcon icon={['fas', 'bolt']} className="text-sm" />
                            </div>
                            <span className="font-semibold tracking-tight">FreeHosts</span>
                        </Link>
                        <p className="text-[rgb(var(--muted))] body-small mb-6 max-w-xs">
                            The trusted directory for finding verified free hosting solutions. Built by developers, for developers.
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-[rgb(var(--muted)/0.08)] hover:bg-[rgb(var(--accent)/0.15)] text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] transition-all active:scale-95 border border-transparent hover:border-[rgb(var(--accent)/0.3)]"
                                    aria-label={social.label}
                                >
                                    <FontAwesomeIcon icon={social.icon} className="text-base" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-[rgb(var(--text))] mb-4">Explore</h4>
                        <ul className="space-y-3">
                            {footerLinks.explore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-[rgb(var(--text))] mb-4">Submit</h4>
                        <ul className="space-y-3">
                            {footerLinks.submit.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-[rgb(var(--text))] mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h4 className="text-sm font-semibold text-[rgb(var(--text))] mt-6 mb-4">Contact</h4>
                        <a
                            href="mailto:support@freehosts.space"
                            className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={['fas', 'envelope']} className="text-xs" />
                            support@freehosts.space
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[rgb(var(--border))]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                        <p className="text-sm text-[rgb(var(--muted))] text-center md:text-left order-2 md:order-1">
                            &copy; 2023&ndash;{currentYear} FreeHosts. All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[rgb(var(--muted))] order-1 md:order-2">
                            <Link href="/tos" className="hover:text-[rgb(var(--text))] transition-colors py-1">
                                Terms
                            </Link>
                            <Link href="/privacy-policy" className="hover:text-[rgb(var(--text))] transition-colors py-1">
                                Privacy
                            </Link>
                            <a href="mailto:support@freehosts.space" className="hover:text-[rgb(var(--text))] transition-colors py-1">
                                Contact
                            </a>
                            <div className="w-full sm:w-auto flex justify-center pt-2 sm:pt-0 sm:border-l sm:border-[rgb(var(--border))] sm:pl-6">
                                <TrustpilotWidget />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
