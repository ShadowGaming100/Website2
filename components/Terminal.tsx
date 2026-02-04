'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const terminalCommands = [
    { cmd: 'freehosts search --type static', output: '✓ Found 42 static hosting providers' },
    { cmd: 'freehosts deploy ./my-app', output: '✓ Deploying to Vercel...' },
    { cmd: 'freehosts status', output: '✓ All systems operational (99.9% uptime)' },
    { cmd: 'freehosts list --free --verified', output: '✓ Showing 100+ verified free hosts' },
];

export default function Terminal() {
    const [lines, setLines] = useState<{ type: 'cmd' | 'output'; text: string }[]>([]);
    const [currentCmd, setCurrentCmd] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let cmdIndex = 0;
        let charIndex = 0;
        let isOutput = false;
        let timeoutId: NodeJS.Timeout;

        const typeWriter = () => {
            if (cmdIndex >= terminalCommands.length) {
                // Reset after showing all commands
                timeoutId = setTimeout(() => {
                    setLines([]);
                    setCurrentCmd('');
                    cmdIndex = 0;
                    charIndex = 0;
                    isOutput = false;
                    typeWriter();
                }, 4000);
                return;
            }

            const command = terminalCommands[cmdIndex];

            if (!isOutput) {
                // Typing command
                if (charIndex <= command.cmd.length) {
                    setCurrentCmd(command.cmd.slice(0, charIndex));
                    setIsTyping(true);
                    charIndex++;
                    timeoutId = setTimeout(typeWriter, 50 + Math.random() * 30);
                } else {
                    // Command finished, show output
                    setIsTyping(false);
                    setLines(prev => [...prev, { type: 'cmd', text: command.cmd }]);
                    setCurrentCmd('');
                    isOutput = true;
                    charIndex = 0;
                    timeoutId = setTimeout(typeWriter, 300);
                }
            } else {
                // Show output
                setLines(prev => [...prev, { type: 'output', text: command.output }]);
                isOutput = false;
                cmdIndex++;
                timeoutId = setTimeout(typeWriter, 1200);
            }
        };

        timeoutId = setTimeout(typeWriter, 800);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative bg-[#0d1117] rounded-xl overflow-hidden border border-[#30363d] shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b949e] text-xs font-mono">
                        <FontAwesomeIcon icon={['fas', 'terminal']} className="text-[10px]" />
                        <span>freehosts-cli</span>
                    </div>
                    <div className="w-16" />
                </div>

                {/* Terminal Body */}
                <div className="p-5 font-mono text-sm min-h-[280px] max-h-[280px] overflow-hidden text-left">
                    {lines.map((line, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${line.type === 'cmd' ? 'text-[#58a6ff]' : 'text-[#3fb950]'}`}
                        >
                            {line.type === 'cmd' ? (
                                <span>
                                    <span className="text-[#8b949e]">$</span> {line.text}
                                </span>
                            ) : (
                                <span>{line.text}</span>
                            )}
                        </div>
                    ))}

                    {/* Current typing line */}
                    <div className="text-[#58a6ff]">
                        <span className="text-[#8b949e]">$</span> {currentCmd}
                        {isTyping && (
                            <span className="inline-block w-2 h-4 bg-[#58a6ff] ml-0.5 align-middle animate-pulse" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
