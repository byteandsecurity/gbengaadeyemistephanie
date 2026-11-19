"use client";

import { useEffect, useState } from "react";

export function OfflineBadge() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const syncStatus = () => {
            setIsOffline(!navigator.onLine);
        };

        syncStatus();

        window.addEventListener("online", syncStatus);
        window.addEventListener("offline", syncStatus);

        return () => {
            window.removeEventListener("online", syncStatus);
            window.removeEventListener("offline", syncStatus);
        };
    }, []);

    if (!isOffline) {
        return null;
    }

    return (
        <span
            role="status"
            aria-live="polite"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink"
        >
      <span className="h-2 w-2 rounded-full bg-amber-500" />
      <span>Offline</span>
    </span>
    );
}