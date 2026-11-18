export function BrandIcon({ className = "h-8 w-8 shrink-0" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            role="img"
            aria-hidden="true"
            className={className}
        >
            <defs>
                <clipPath id="brand-clip">
                    <rect width="64" height="64" rx="14" />
                </clipPath>
                <radialGradient id="brand-e" cx="40" cy="22" r="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#34D399" stopOpacity=".32" />
                    <stop offset="1" stopColor="#34D399" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="brand-v" cx="24" cy="44" r="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#A78BFA" stopOpacity=".32" />
                    <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="brand-s" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity=".09" />
                    <stop offset=".42" stopColor="#fff" stopOpacity=".02" />
                    <stop offset=".43" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="brand-r" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity=".42" />
                    <stop offset=".45" stopColor="#fff" stopOpacity=".06" />
                    <stop offset="1" stopColor="#fff" stopOpacity=".16" />
                </linearGradient>
                <linearGradient id="brand-g-top" x1="20" y1="30" x2="44" y2="14" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#10B981" />
                    <stop offset="1" stopColor="#34D399" />
                </linearGradient>
                <linearGradient id="brand-g-bot" x1="20" y1="30" x2="44" y2="14" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#A78BFA" />
                </linearGradient>
            </defs>
            <g clipPath="url(#brand-clip)">
                <rect width="64" height="64" fill="#0B0F19" />
                <rect width="64" height="64" fill="url(#brand-e)" />
                <rect width="64" height="64" fill="url(#brand-v)" />
                <path
                    d="M4 0V64M0 4H64M8 0V64M0 8H64M12 0V64M0 12H64M16 0V64M0 16H64M20 0V64M0 20H64M24 0V64M0 24H64M28 0V64M0 28H64M32 0V64M0 32H64M36 0V64M0 36H64M40 0V64M0 40H64M44 0V64M0 44H64M48 0V64M0 48H64M52 0V64M0 52H64M56 0V64M0 56H64M60 0V64M0 60H64"
                    fill="none"
                    stroke="#fff"
                    strokeOpacity=".05"
                    strokeWidth=".5"
                />
                <rect width="64" height="64" fill="url(#brand-s)" />
            </g>
            <path
                d="M32.32 28.24L32.7 35.73A13.75 13.75 0 1 1 44.29 15.83L38.22 22.56A6.25 6.25 0 1 0 32.32 28.24Z"
                fill="url(#brand-g-top)"
            />
            <path
                d="M32.32 28.24L32.7 35.73A13.75 13.75 0 1 1 44.29 15.83L38.22 22.56A6.25 6.25 0 1 0 32.32 28.24Z"
                fill="url(#brand-g-bot)"
                transform="rotate(180 32 32)"
            />
            <rect x=".5" y=".5" width="63" height="63" rx="13.5" fill="none" stroke="url(#brand-r)" />
        </svg>
    );
}