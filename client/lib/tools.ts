import { getProjectInfo, getFAQ, getVoiceCommands } from './airine-data';

// Add interface for tools
interface Tool {
    type: 'function';
    name: string;
    description: string;
    parameters?: {
      type: string;
      properties: Record<string, {
        type: string;
        description: string;
      }>;
    };
}

const toolDefinitions = {
    getCurrentTime: {
        description: 'Gets the current time in the user\'s timezone',
        parameters: {}
    },
    changeBackgroundColor: {
        description: 'Changes the background color of the page', 
        parameters: {
        color: { 
            type: 'string',
            description: 'Color value (hex, rgb, or color name)'
        }
        }
    },
    partyMode: {
        description: 'Triggers a confetti animation on the page',
        parameters: {}
    },
    launchWebsite: {
        description: 'Launches a website in the user\'s browser',
        parameters: {
        url: {
            type: 'string',
            description: 'The URL to launch'
        }
        }
    },
    copyToClipboard: {
        description: 'Copies text to the user\'s clipboard',
        parameters: {
        text: {
            type: 'string',
            description: 'The text to copy'
        }
        }
    },
    takeScreenshot: {
        description: 'Takes a screenshot of the current page',
        parameters: {}
    },
    scrapeWebsite: {
        description: 'Scrapes a URL and returns content in markdown and HTML formats',
        parameters: {
            url: {
                type: 'string',
                description: 'The URL to scrape'
            }
        }
    },
    // Инструменты для управления слайдами
    nextSlide: {
        description: 'Move to the next slide in the presentation',
        parameters: {}
    },
    previousSlide: {
        description: 'Move to the previous slide in the presentation',
        parameters: {}
    },
    goToSlide: {
        description: 'Go to a specific slide by number',
        parameters: {
            slideNumber: {
                type: 'integer',
                description: 'The slide number to navigate to (1-based)'
            }
        }
    },
    addNewSlide: {
        description: 'Add a new slide to the presentation',
        parameters: {}
    },
    deleteSlide: {
        description: 'Delete the current slide',
        parameters: {}
    },
    
    // Инструменты для получения информации о проекте
    getProjectInfo: {
        description: 'Get general information about the AIrine project',
        parameters: {}
    },
    getProjectFeatures: {
        description: 'Get information about AIrine features',
        parameters: {}
    },
    getProjectTechnologies: {
        description: 'Get information about technologies used in AIrine project',
        parameters: {}
    },
    getTeamInfo: {
        description: 'Get information about the AIrine development team',
        parameters: {}
    },
    getFAQ: {
        description: 'Get frequently asked questions about AIrine',
        parameters: {
            questionIndex: {
                type: 'number',
                description: 'Optional index of a specific FAQ question to retrieve (0-based)'
            }
        }
    },
    getVoiceCommands: {
        description: 'Get information about available voice commands in AIrine',
        parameters: {
            categoryIndex: {
                type: 'number',
                description: 'Optional index of a specific command category to retrieve (0-based)'
            }
        }
    }
} as const;

const tools: Tool[] = Object.entries(toolDefinitions).map(([name, config]) => ({
    type: "function",
    name,
    description: config.description,
    parameters: {
    type: 'object',
    properties: config.parameters
    }
}));


export type { Tool };
export { tools };