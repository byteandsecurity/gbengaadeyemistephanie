import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Gbenga Adeyemi Stephanie: Engineering & GRC",
        short_name: "S.G.A",
        description:
            "Full-stack software engineering and cybersecurity GRC portfolio with offline access.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#0B0F19",
        theme_color: "#10B981",
        icons: [
            {
                src: "/icon.svg",
                sizes: "192x192",
                type: "image/svg+xml",
            },
            {
                src: "/icon.svg",
                sizes: "512x512",
                type: "image/svg+xml",
            },
            {
                src: "/icon.svg",
                sizes: "512x512",
                type: "image/svg+xml",
                purpose: "maskable",
            },
        ],
    };
}