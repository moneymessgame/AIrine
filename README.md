# AIrine

AIrine is a decentralized local node system designed for Android devices in technically limited regions. Each node runs a lightweight Express.js server that exposes an open API, enabling local access to essential AI tools and data without an internet connection. A Next.js client leverages WebRTC to interact with AI agents, simplifying the user interface through real-time streaming. Built to operate with limited hardware resources and non-GPU models, AIrine ensures a secure, autonomous, and offline-capable environment while supporting seamless updates when connectivity is available.

## Demo starting localhost server on Android

<img src="https://github.com/moneymessgame/AIrine/blob/main/media/show-android-localhost.gif" width="250">

## How AIrine Works:

- Node Setup: The Android app runs a local Express.js server with open API endpoints for offline AI tools and data access.
- Local Server Operation: The server uses lightweight, non-GPU AI models to maintain autonomy and efficiency.
- Client Interaction: A Next.js frontend connects to the local API via WebRTC, allowing real-time interaction with the AI agent.
- Request Handling: The server processes API requests through a local LLM, returning responses directly to the client.
- Offline Mode: All data is stored locally, ensuring access without an internet connection.
- Updates & Syncing: When online, the system syncs with other nodes, updating models and data seamlessly.
- Security & Privacy: The closed, self-contained system protects user data by avoiding external servers.


## 
