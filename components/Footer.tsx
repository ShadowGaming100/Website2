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
      <div className="container-default section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-bold text-[rgb(var(--text))] mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl gradient-bg text-white">
                <FontAwesomeIcon icon={['fas', 'bolt']} className="text-sm" />
              </div>
              <span className="font-semibold tracking-tight">FreeHosts</span>
            </Link>
            <p className="text-[rgb(var(--muted))] body-small mb-6 max-w-xs">
              The trusted directory for finding verified free hosting solutions. Built by developers, for developers.
            </p>
            
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-[rgb(var(--muted)/0.08)] hover:bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] transition-all"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[rgb(var(--muted))]">
              &copy; 2023&ndash;{currentYear} FreeHosts. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-[rgb(var(--muted))]">
              <Link href="/tos" className="hover:text-[rgb(var(--text))] transition-colors">
                Terms
              </Link>
              <Link href="/privacy-policy" className="hover:text-[rgb(var(--text))] transition-colors">
                Privacy
              </Link>
              <a href="mailto:support@freehosts.space" className="hover:text-[rgb(var(--text))] transition-colors">
                Contact
              </a>
              <div className="border-l border-[rgb(var(--border))] pl-6 ml-2">
                <TrustpilotWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
