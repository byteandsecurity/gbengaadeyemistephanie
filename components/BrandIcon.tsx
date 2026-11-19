"use client";

import { useId } from "react";

export function BrandIcon({ className = "h-8 w-8 shrink-0" }: { className?: string }) {
    const uid = useId().replace(/:/g, "");

    const clipId = `${uid}-brand-clip`;
    const emeraldGlowId = `${uid}-brand-e`;
    const violetGlowId = `${uid}-brand-v`;
    const sheenId = `${uid}-brand-s`;
    const rimId = `${uid}-brand-r`;
    const topGradId = `${uid}-brand-g-top`;
    const botGradId = `${uid}-brand-g-bot`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            role="img"
            aria-hidden="true"
            className={className}
        >
            <defs>
                <clipPath id={clipId}>
                    <rect width="64" height="64" rx="14" />
                </clipPath>
                <radialGradient id={emeraldGlowId} cx="40" cy="22" r="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#34D399" stopOpacity=".34" />
                    <stop offset="1" stopColor="#34D399" stopOpacity="0" />
                </radialGradient>
                <radialGradient id={violetGlowId} cx="24" cy="44" r="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#A78BFA" stopOpacity=".34" />
                    <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
                </radialGradient>
                <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity=".1" />
                    <stop offset=".42" stopColor="#fff" stopOpacity=".02" />
                    <stop offset=".43" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id={rimId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#34D399" stopOpacity=".55" />
                    <stop offset=".5" stopColor="#fff" stopOpacity=".18" />
                    <stop offset="1" stopColor="#A78BFA" stopOpacity=".55" />
                </linearGradient>
                <linearGradient id={topGradId} x1="20" y1="30" x2="44" y2="14" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#10B981" />
                    <stop offset="1" stopColor="#34D399" />
                </linearGradient>
                <linearGradient id={botGradId} x1="20" y1="30" x2="44" y2="14" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#A78BFA" />
                </linearGradient>
            </defs>

            <g clipPath={`url(#${clipId})`}>
                <rect width="64" height="64" fill="#0B0F19" />
                <rect width="64" height="64" fill={`url(#${emeraldGlowId})`} />
                <rect width="64" height="64" fill={`url(#${violetGlowId})`} />
                <path
                    d="M4 0V64M0 4H64M8 0V64M0 8H64M12 0V64M0 12H64M16 0V64M0 16H64M20 0V64M0 20H64M24 0V64M0 24H64M28 0V64M0 28H64M32 0V64M0 32H64M36 0V64M0 36H64M40 0V64M0 40H64M44 0V64M0 44H64M48 0V64M0 48H64M52 0V64M0 52H64M56 0V64M0 56H64M60 0V64M0 60H64"
                    fill="none"
                    stroke="#fff"
                    strokeOpacity=".05"
                    strokeWidth=".5"
                />
                <rect width="64" height="64" fill={`url(#${sheenId})`} />
            </g>

            <path
                d="M32.32 28.24L32.7 35.73A13.75 13.75 0 1 1 44.29 15.83L38.22 22.56A6.25 6.25 0 1 0 32.32 28.24Z"
                fill={`url(#${topGradId})`}
            />
            <path
                d="M32.32 28.24L32.7 35.73A13.75 13.75 0 1 1 44.29 15.83L38.22 22.56A6.25 6.25 0 1 0 32.32 28.24Z"
                fill={`url(#${botGradId})`}
                transform="rotate(180 32 32)"
            />
            <rect
                x=".5"
                y=".5"
                width="63"
                height="63"
                rx="13.5"
                fill="none"
                stroke={`url(#${rimId})`}
            />
        </svg>
    );
}