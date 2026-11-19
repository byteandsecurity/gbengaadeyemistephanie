import Link from "next/link";
import { Container } from "@/components/layout";

export default function OfflinePage() {
    return (
        <div className="bg-paper py-20 text-ink transition-colors duration-300">
            <Container className="max-w-2xl">
                <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-muted">
                        <span className="h-2 w-2 rounded-full bg-emerald" />
                        <span>Offline Mode</span>
                    </div>

                    <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                        You&apos;re currently offline.
                    </h1>
                    <p className="mt-3 text-base leading-relaxed text-muted">
                        This page hasn&apos;t been cached on your device yet, or your connection dropped.
                        Any pages you&apos;ve already opened are still available offline.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/"
                            className="rounded-xl bg-ink px-5 py-2.5 font-display text-sm font-bold text-paper transition-transform hover:scale-[1.02]"
                        >
                            Go to Home
                        </Link>
                        <Link
                            href="/works"
                            className="rounded-xl border border-line bg-paper px-5 py-2.5 font-display text-sm font-semibold text-ink transition-colors hover:border-emerald"
                        >
                            Browse Works
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}