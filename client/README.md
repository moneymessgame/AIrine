# AIrine

## About the Project

**AIrine** is a groundbreaking decentralized system designed to bridge the digital divide in regions with limited technical infrastructure. By deploying local nodes on Android devices, AIrine creates an autonomous network that provides critical access to AI tools and information without requiring internet connectivity.

Each AIrine node functions as a complete, self-contained unit that:

- **Operates a Local Server**: Runs a lightweight Express.js server directly on Android devices, exposing API endpoints that can be accessed locally from the same device
- **Functions Completely Offline**: Delivers full AI capabilities and information access in environments with limited or no internet connectivity
- **Optimizes for Resource Constraints**: Utilizes specialized non-GPU language models specifically designed for hardware-limited Android devices
- **Synchronizes When Possible**: Automatically updates and shares data with other nodes when internet connectivity becomes available

The client interface, built with Next.js, leverages WebRTC technology to enable intuitive voice interaction with AI agents. This dramatically simplifies the user experience by eliminating complex text inputs, making powerful AI tools accessible to users with varying levels of technical literacy.

### Technical Architecture

**Server Component:**
- Express.js backend deployed on Android devices
- Local language model integration optimized for mobile hardware
- RESTful API endpoints providing structured access to AI functionality
- Robust data synchronization mechanisms supporting mesh networking

**Client Component:**
- Responsive Next.js frontend application
- WebRTC integration enabling real-time voice transcription and processing
- Voice-driven interface that significantly reduces interaction barriers
- Multi-language support with adaptive design principles

By creating a "boxed solution" that works without external dependencies, AIrine effectively addresses the challenge of information access in technically constrained environments, providing an autonomous, secure, and resilient AI infrastructure where traditional solutions fail.

## Main Features

- **Voice Control**: Control the presentation with voice commands in Russian and English
- **Slide Navigation**: Navigate to a specific slide by number or name
- **Time Information**: Get the current time by voice command
- **Multilingual Support**: Full support for Russian and English for the interface and voice commands
- **Project Information**: Access detailed information about the AIrine project through voice commands

## Technologies

- **TypeScript**: Ensures type safety and a better development experience
- **Next.js 15**: Framework for server-side rendering and API routes
- **OpenAI Realtime API**: Processes and recognizes voice commands in real-time
- **WebRTC**: Technology for streaming audio data
- **Tailwind CSS**: Component styling
- **Framer Motion**: Smooth animation creation
- **shadcn/ui**: User interface component library
- **next-intl**: Application localization and internationalization

## Requirements

- **Node.js** (version 18 or higher)
- OpenAI API key with access to the Realtime API Beta
- Modern browser with WebRTC support

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/moneymessgame/airine.git
cd airine
```

### 2. Set up the environment
Create a `.env` file in the project root directory:
```env
OPENAI_API_KEY=your-openai-api-key
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the application
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. Open the app in the browser: `http://localhost:3000`
2. Allow microphone access when prompted by the browser
3. Start the voice control session by clicking the microphone button
4. Use the following voice commands:
   - "Go to slide [number]" — Navigate to a specific slide
   - "Next slide" / "Previous slide" — Move between slides
   - "What time is it?" — Display the current time
   - "Change theme" — Switch between light and dark themes
   - "Party mode" — Activate an animated background
   - "Tell me about the project" — Get information about the AIrine project

## Development Team

- **Igor Sokolov** — Project Lead and Senior Developer
- **Irina Semichasova** — Developer and Designer

## Deployment on Vercel

**One-click deployment**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmoneymessgame%2Fairine&env=OPENAI_API_KEY&envDescription=OpenAI%20Key%20(Realtime%20API%20Beta%20access)&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&project-name=airine&repository-name=airine-clone&demo-title=AIrine%20-%20Voice%20Assistant%20for%20Presentations&demo-description=Intelligent%20voice%20assistant%20for%20presentations%20using%20OpenAI%20Realtime%20API)

## FAQ

### What hardware is required to run an AIrine node?
AIrine nodes are designed to run on standard Android smartphones and tablets. The system is optimized to work on devices with limited processing power, making it viable even on older or entry-level devices that cannot run GPU-intensive applications.

### How does data synchronization work between nodes?
When an AIrine node detects an internet connection, it can securely connect to other known nodes to download updates and share local data. This mesh networking approach ensures that information propagates through the network gradually, without requiring all nodes to have simultaneous connectivity.

### Can AIrine work in areas with intermittent connectivity?
Yes, AIrine is specifically designed for regions with unreliable or limited connectivity. The system provides full functionality offline and opportunistically synchronizes when connections become available, making it ideal for remote areas with occasional access to mobile networks or satellite internet.

### What types of AI capabilities are available offline?
The local node provides access to essential AI tools including natural language processing, voice recognition, information retrieval, and basic generative AI features - all without requiring internet connectivity. The specific capabilities are optimized to run efficiently on mobile hardware.

### What languages are supported?
Currently, AIrine supports Russian (primary) and English. The modular architecture allows for relatively simple addition of new languages as the project develops.

## License
This project is distributed under the MIT License. See the `LICENSE` file for more details.

## Acknowledgements
- [OpenAI](https://openai.com/) for their API and models
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Framer Motion](https://www.framer.com/motion/) for animations
