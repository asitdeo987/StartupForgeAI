"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

export default function Navbar() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className={`max-w-7xl mx-auto transition-all duration-300 ${
                scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg' : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md'
            } rounded-2xl border border-white/20 dark:border-gray-700/30`}>
                
                <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        
                        <div className="min-w-0">
                            <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent truncate">
                                StartupForge
                            </h1>
                            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hidden xs:block">
                                AI Startup Simulator
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-6">
                        {/* User Info */}
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[120px] lg:max-w-[200px]">
                                {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px] lg:max-w-[200px]">
                                {user?.email}
                            </p>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 active:scale-95"
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden sm:inline">Logout</span>
                            </span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
                            <span className={`block h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`} />
                            <span className={`block h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                                isMobileMenuOpen ? 'opacity-0' : ''
                            }`} />
                            <span className={`block h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`} />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${
                    isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 border-t border-gray-200/50 dark:border-gray-700/50">
                        {/* User Info - Mobile */}
                        <div className="pt-3">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
                                {user?.email}
                            </p>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-500/25 active:scale-95 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}