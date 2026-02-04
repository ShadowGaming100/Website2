'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Terminal from '@/components/Terminal';
import TrustpilotWidget from '@/components/TrustpilotWidget';

const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export default function HomePage() {
    const [count, setCount] = useState({ hosts: 0, users: 0, uptime: 0 });

    // Animated counter effect
    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        const targets = { hosts: 100, users: 5000, uptime: 99.9 };
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            setCount({
                hosts: Math.floor(targets.hosts * progress),
                users: Math.floor(targets.users * progress),
                uptime: Number((targets.uptime * progress).toFixed(1))
            });

            if (step >= steps) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
    }, []);

    const stats = [
        { value: `${count.hosts}+`, label: 'Verified Hosts', icon: ['fas', 'server'] as IconProp },
        { value: `${count.users.toLocaleString()}+`, label: 'Active Users', icon: ['fas', 'users'] as IconProp },
        { value: `${count.uptime}%`, label: 'Avg Uptime', icon: ['fas', 'signal'] as IconProp },
    ];

    const features = [
        {
            icon: ['fas', 'shield'] as IconProp,
            title: 'Verified & Trusted',
            description: 'Every host undergoes rigorous testing. No scams, no hidden fees.',
        },
        {
            icon: ['fas', 'bolt'] as IconProp,
            title: 'High Performance',
            description: 'Modern infrastructure with NVMe SSDs and optimized networks.',
        },
        {
            icon: ['fas', 'users'] as IconProp,
            title: 'Community Driven',
            description: 'Built by developers. Real reviews from real users.',
        },
        {
            icon: ['fas', 'search'] as IconProp,
            title: 'Smart Filtering',
            description: 'Find the perfect host by tech stack, location, or resources.',
        },
        {
            icon: ['fas', 'rotate'] as IconProp,
            title: 'Always Updated',
            description: 'Real-time monitoring ensures accurate, current information.',
        },
        {
            icon: ['fas', 'book'] as IconProp,
            title: 'Expert Guides',
            description: 'Comprehensive tutorials for deployment and optimization.',
        },
    ];

    const hostingTypes = [
        { title: 'Static Sites', description: 'HTML, CSS, JS with CDN', icon: ['fas', 'code'] as IconProp },
        { title: 'Discord Bots', description: '24/7 bot hosting', icon: ['fab', 'discord'] as IconProp },
        { title: 'Node.js', description: 'Full-stack apps', icon: ['fab', 'node-js'] as IconProp },
        { title: 'Databases', description: 'SQL & NoSQL', icon: ['fas', 'database'] as IconProp },
        { title: 'Python', description: 'Django, Flask', icon: ['fab', 'python'] as IconProp },
        { title: 'Cloud & VPS', description: 'Root access', icon: ['fas', 'cloud'] as IconProp },
    ];

    return (
        <div className="min-h-screen bg-[rgb(var(--bg))]">
            {/* Hero Banner Section */}
            <section className="relative pt-12 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
                <div className="container-default relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            {/* Trust Badges */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgb(var(--accent)/0.1)] border border-[rgb(var(--accent)/0.2)]">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-sm font-medium text-[rgb(var(--accent))]">
                                        5,000+ developers trust us
                                    </span>
                                </div>
                                <div className="hidden sm:block">
                                    <TrustpilotWidget />
                                </div>
                            </div>

                            <h1 className="heading-1 text-[rgb(var(--text))] mb-6 text-balance">
                                Find the Perfect <span className="text-[rgb(var(--accent))]">Free Hosting</span> for Your Project
                            </h1>

                            <p className="body-default text-[rgb(var(--muted))] mb-8 max-w-xl mx-auto lg:mx-0 text-balance font-medium">
                                The most comprehensive directory of verified free hosting providers. Deploy apps without spending a dime.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify- center lg:justify-start w-full">
                                <Link
                                    href="/hosts"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold shadow-medium hover:opacity-90 transition-all active:scale-[0.98] w-full sm:w-auto"
                                >
                                    <span>Browse Hosts</span>
                                    <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-sm" />
                                </Link>
                                <Link
                                    href="/about"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[rgb(var(--border))] text-[rgb(var(--text))] font-semibold hover:bg-[rgb(var(--muted)/0.05)] hover:border-[rgb(var(--accent)/0.5)] transition-all active:scale-[0.98] w-full sm:w-auto"
                                >
                                    <span>Learn More</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Content - Terminal */}
                        <div className="hidden lg:block">
                            <Terminal />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]">
                <div className="container-default">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center text-center p-4"
                            >
                                <div className="text-3xl font-bold text-[rgb(var(--text))] mb-2">{stat.value}</div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-[rgb(var(--muted))] uppercase tracking-wider">
                                    <FontAwesomeIcon icon={stat.icon} className="text-[rgb(var(--accent))]" />
                                    <span>{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Sections */}
            <div>
                {/* Hosting Types Section */}
                <section className="section-padding bg-[rgb(var(--bg))]">
                    <div className="container-default">
                        <div className="text-center mb-16">
                            <h2 className="heading-2 text-[rgb(var(--text))] mb-4">
                                Every Type of Hosting
                            </h2>
                            <p className="body-default text-[rgb(var(--muted))] max-w-2xl mx-auto">
                                From simple static sites to complex full-stack applications, we verify them all.
                            </p>
                        </div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                        >
                            {hostingTypes.map((type, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="group p-5 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.5)] transition-all text-center card-hover"
                                >
                                    <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-[rgb(var(--muted)/0.1)] flex items-center justify-center group-hover:bg-[rgb(var(--accent)/0.1)] group-hover:text-[rgb(var(--accent))] transition-colors">
                                        <FontAwesomeIcon icon={type.icon} className="text-lg" />
                                    </div>
                                    <h3 className="font-semibold text-[rgb(var(--text))] text-sm mb-1">{type.title}</h3>
                                    <p className="text-xs text-[rgb(var(--muted))]">{type.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="section-padding bg-[rgb(var(--card))] border-y border-[rgb(var(--border))]">
                    <div className="container-default">
                        <div className="text-center mb-16">
                            <span className="inline-block px-3 py-1 rounded-full bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] text-sm font-medium mb-4">
                                Why FreeHosts
                            </span>
                            <h2 className="heading-2 text-[rgb(var(--text))] mb-4">
                                Everything You Need
                            </h2>
                            <p className="body-default text-[rgb(var(--muted))] max-w-2xl mx-auto">
                                Reliable, transparent, and built for developers.
                            </p>
                        </div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-8 rounded-xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.3)] transition-all"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[rgb(var(--accent)/0.1)] flex items-center justify-center mb-6 text-[rgb(var(--accent))]">
                                        <FontAwesomeIcon icon={feature.icon} className="text-xl" />
                                    </div>
                                    <h3 className="heading-4 text-[rgb(var(--text))] mb-3">{feature.title}</h3>
                                    <p className="body-default text-[rgb(var(--muted))]">{feature.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="section-padding bg-[rgb(var(--bg))]">
                    <div className="container-default">
                        <div className="text-center mb-16">
                            <h2 className="heading-2 text-[rgb(var(--text))] mb-4">
                                How It Works
                            </h2>
                            <p className="body-default text-[rgb(var(--muted))] max-w-2xl mx-auto">
                                Finding the right free hosting is simple with FreeHosts.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                            {[
                                { step: '01', title: 'Browse Directory', description: 'Explore our curated directory of verified free hosting providers', icon: ['fas', 'search'] as IconProp },
                                { step: '02', title: 'Compare Features', description: 'Filter by features, resources, and technology stack', icon: ['fas', 'filter'] as IconProp },
                                { step: '03', title: 'Deploy Project', description: 'Sign up and launch your project in minutes', icon: ['fas', 'rocket'] as IconProp },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="relative text-center group"
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--text))] shadow-sm group-hover:border-[rgb(var(--accent))] transition-colors">
                                        <FontAwesomeIcon icon={item.icon} className="text-2xl" />
                                    </div>
                                    <div className="text-xs font-bold text-[rgb(var(--accent))] mb-3 tracking-widest uppercase">{item.step}</div>
                                    <h3 className="heading-4 text-[rgb(var(--text))] mb-3">{item.title}</h3>
                                    <p className="body-small text-[rgb(var(--muted))]">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-padding pt-0">
                    <div className="container-default">
                        <div className="relative overflow-hidden rounded-2xl bg-[rgb(var(--accent))] text-white p-12 md:p-20 text-center">
                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="heading-2 mb-6 text-white">
                                    Join Our Community
                                </h2>
                                <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                                    Connect with thousands of developers. Share experiences, get recommendations, and stay updated on the latest free hosting solutions.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="https://discord.gg/QbeZ3b5CQd"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[rgb(var(--accent))] font-semibold shadow-large hover:opacity-90 transition-all active:scale-[0.98]"
                                    >
                                        <FontAwesomeIcon icon={['fab', 'discord']} />
                                        <span>Join Discord</span>
                                    </a>
                                    <Link
                                        href="/hosts"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all active:scale-[0.98]"
                                    >
                                        <span>Browse Hosts</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
