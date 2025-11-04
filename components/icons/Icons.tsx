import React from 'react';

export const PlayIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

export const PauseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1H8zm3 0a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-1z" clipRule="evenodd" />
    </svg>
);

export const AmbulanceIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v2a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

export const BrainCircuitIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10V6a3 3 0 013-3h0a3 3 0 013 3v4m-3 4v4m0 0a3 3 0 01-3 3h0a3 3 0 01-3-3m3 3a3 3 0 003-3h0a3 3 0 003-3m-3 3v-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4v4H3v-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 10h4v4h-4v-4z" />
    </svg>
);

export const SpeedIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

export const LogIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

export const LeafIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

export const XIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ArrowUp: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
);

export const ArrowRight: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

export const HeatmapIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 10.5a1.5 1.5 0 113 0v1a1.5 1.5 0 01-3 0v-1zM2 4.5a1.5 1.5 0 113 0v1a1.5 1.5 0 01-3 0v-1zM4 10a1 1 0 00-1-1H2a1 1 0 000 2h1a1 1 0 001-1zM4 4a1 1 0 00-1-1H2a1 1 0 000 2h1a1 1 0 001-1zM18 10.5a1.5 1.5 0 11-3 0v1a1.5 1.5 0 013 0v-1zM18 4.5a1.5 1.5 0 11-3 0v1a1.5 1.5 0 013 0v-1zM16 10a1 1 0 001-1h1a1 1 0 100-2h-1a1 1 0 00-1 1zM16 4a1 1 0 001-1h1a1 1 0 100-2h-1a1 1 0 00-1 1z" />
      <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM9 15a1 1 0 011-1h0a1 1 0 011 1v1a1 1 0 11-2 0v-1z" clipRule="evenodd" />
      <path d="M7 10.5a1.5 1.5 0 113 0v1a1.5 1.5 0 01-3 0v-1zM7 4.5a1.5 1.5 0 113 0v1a1.5 1.5 0 01-3 0v-1zM9 10a1 1 0 00-1-1H7a1 1 0 000 2h1a1 1 0 001-1zM9 4a1 1 0 00-1-1H7a1 1 0 000 2h1a1 1 0 001-1z" />
      <path d="M12 10.5a1.5 1.5 0 113 0v1a1.5 1.5 0 01-3 0v-1zM12 4.5a1.5 1.5 0 113 0v1a1.5 1.5 0 013 0v-1zM14 10a1 1 0 00-1-1h-1a1 1 0 100 2h1a1 1 0 001-1zM14 4a1 1 0 00-1-1h-1a1 1 0 100 2h1a1 1 0 001-1z" />
    </svg>
);

export const SettingsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const SunIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const RainIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-2-9.75M15 12a3 3 0 01-6 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v1.5m-3.25-2.5l-1 1.5m6.5-1.5l-1 1.5" />
    </svg>
);

export const FogIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-2-9.75M15 12a3 3 0 01-6 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 18h18M4 21h17" />
    </svg>
);

export const CarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2m-4-4h4m-4 8v4m-4-4h4m-4 0v4m-4-4h4m-4 0v4m0 0h12a2 2 0 002-2v-6a2 2 0 00-2-2h-1.333a2 2 0 00-1.667 1L6 9v2a2 2 0 002 2h1" />
    </svg>
);

export const BikeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a2 2 0 100-4 2 2 0 000 4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21a2 2 0 100-4 2 2 0 000 4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17l-1-4-4-2-2 4h10zM4 17h.01" />
    </svg>
);

export const BusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-6.364-1.396l12.728 0M20.364 18.253l-2.728-5.455M3.636 18.253l2.727-5.455m11.273-5.455l-2.727 5.455M6.364 7.343l2.727 5.455" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18v8H3z" />
    </svg>
);

export const EyeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);