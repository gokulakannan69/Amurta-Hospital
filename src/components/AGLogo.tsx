import React from 'react';

interface AGLogoProps {
    className?: string;
}

export const AGLogo: React.FC<AGLogoProps> = ({ className = "w-12 h-12" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="#059669" strokeWidth="1" />
        <circle cx="50" cy="50" r="44" stroke="#1e40af" strokeWidth="2" />
        <path d="M35 70L45 35L55 70M38 60H52" stroke="#1e40af" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 35C35 25 45 20 48 32" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        <path d="M42 22C45 18 55 22 45 35" fill="#059669" />
        <path d="M75 50C75 35 60 35 55 45C50 55 55 75 70 70C75 68 75 60 65 60H55" stroke="#1e40af" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M60 75C60 85 68 85 68 75C68 65 60 75 60 75Z" fill="#f59e0b" />
        <path d="M48 45H56M52 41V49" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
    </svg>
);
