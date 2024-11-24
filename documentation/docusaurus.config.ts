import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

const config: Config = {
    title: "Source 2 TypeScript",
    tagline: "Documentation for the S2TS Counter Strike 2 TypeScript bundler and library",
    favicon: "img/favicon.ico",
    url: "https://s2ts.netlify.app",
    baseUrl: "/build/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    i18n: {
        defaultLocale: "en",
        locales: ["en"]
    },
    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    editUrl: "https://github.com/Peterclark1996/s2ts/tree/main/documentation/"
                },
                theme: {
                    customCss: "./src/css/custom.css"
                }
            } satisfies Preset.Options
        ]
    ],
    themeConfig: {
        image: "img/s2ts.png",
        navbar: {
            title: "Source 2 TypeScript",
            logo: {
                alt: "s2ts",
                src: "img/icon.svg"
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "docSidebar",
                    position: "left",
                    label: "CS2 Documentation"
                },
                {
                    href: "https://github.com/Peterclark1996/s2ts",
                    label: "GitHub",
                    position: "right"
                }
            ]
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula
        }
    } satisfies Preset.ThemeConfig
}

export default config
