export const en = {
    projectInfo: {
        general: '{name} {version} - {description}. Release date: {releaseDate}.',
        features: 'Main features of the AIrine project:',
        technologies: 'Technologies used in the AIrine project:',
        team: 'AIrine development team:',
        faq: 'Frequently asked questions about AIrine:',
        commands: 'Available voice commands in AIrine:',
        examples: 'Command examples'
    },
    broadcast: {
        end: "End Broadcasting",
        live: "Live",
        start: "Start Broadcasting"
    },
    header: {
        title: "About",
        about: "This is a project that aims to demonstrate how to use OpenAI Realtime API with WebRTC in a modern Next 15 project. It has shadcn/ui components already installed and the WebRTC audio session hook already implemented. Clone the project and define your own tools.",
        banner: "Realtime AImodel API with WebRTC",
        bannerLink: "Learn more →",
        beta: "Beta",
        dark: "Dark",
        github: "Star on GitHub",
        language: "Language",
        light: "Light",
        logo: "AIrine",
        system: "System",
        theme: "Toggle theme",
        twitter: "Follow on"
    },
    hero: {
        badge: "Next.js + shadcn/ui",
        subtitle: "Demo by clicking the button below and try available tools",
        title: "AIrine"
    },
    messageControls: {
        content: "Content",
        filter: "Filter by type",
        log: "Log to Console",
        logs: "Conversation Logs",
        search: "Search messages...",
        type: "Type",
        view: "View Logs"
    },
    status: {
        error: "Whoops!",
        info: "Toggling Voice Assistant...",
        language: "Language switched from",
        session: "Session established",
        success: "We're live, baby!",
        toggle: "Toggling Voice Assistant..."
    },
    tokenUsage: {
        input: "Input Tokens",
        output: "Output Tokens",
        total: "Total Tokens",
        usage: "Token Usage"
    },
    tools: {
        availableTools: {
            title: "Available Tools",
            copyFn: {
                description: 'Say "Copy that to clipboard" to paste it somewhere.',
                name: "Copy Fn"
            },
            getTime: {
                description: 'Ask "Tell me what time is it?" to get current time.',
                name: "Get Time"
            },
            launchWebsite: {
                description: '"Take me to [website]" to launch a site in a new tab.',
                name: "Launch Website"
            },
            partyMode: {
                description: 'Say "Start party mode" for a dynamic confetti animation!',
                name: "Party Mode"
            },
            themeSwitcher: {
                description: 'Say "Change background" or "Switch to dark mode" or "Switch to light mode".',
                name: "Theme Switcher"
            },
            scrapeWebsite: {
                name: "Website Scraper",
                description: 'Say "Scrape [website URL]" to extract content from a webpage.'
            }
        },
        clipboard: {
            description: "You can now paste it somewhere.",
            success: "Text copied to clipboard. Ask the user to paste it somewhere.",
            toast: "Text copied to clipboard!"
        },
        launchWebsite: {
            description: "Failed to launch website",
            success: "Launched the site! Tell the user it's been launched.",
            toast: "Launching website "
        },
        partyMode: {
            description: "Failed to activate party mode",
            success: "Party mode activated",
            toast: "Party mode!",
            failed: "Failed to activate party mode",
        },
        switchTheme: "Theme switched to ",
        themeFailed: "Failed to switch theme",
        time: "Announce to user: The current time is ",
        scrapeWebsite: {
            success: "Website content extracted successfully",
            description: "Failed to scrape website content",
            toast: "Scraping website..."
        }
    },
    transcriber: {
        title: "Live Transcript"
    },
    voice: {
        select: "Select a voice",
        ash: "Ash - Gentle & Professional",
        ballad: "Ballad - Warm & Engaging",
        coral: "Coral - Clear & Friendly",
        sage: "Sage - Authoritative & Calm",
        verse: "Verse - Dynamic & Expressive"
    },
    language: "English",
    languagePrompt: "Speak and respond only in English. It is crucial that you maintain your responses in English. If the user speaks in other languages, you should still respond in English.",
    slides: {
        commands: {
            next: "Next",
            previous: "Previous",
            new: "New Slide",
            delete: "Delete Slide",
            goTo: "Go to slide:",
            title: "Card Controls",
            slideCount: "Slide {current} of {total}"
        },
        responses: {
            nextSlide: "Moved to the next slide",
            prevSlide: "Moved to the previous slide",
            goToSlide: "Moved to slide {number}",
            newSlide: "Created a new slide",
            deleted: "Slide deleted",
            cannotDelete: "Cannot delete the last slide",
            invalidSlide: "Invalid slide number"
        }
    }
}