
![Описание GIF](путь/к/файлу.gif)

[Example created localhost server](https://github.com/moneymessgame/AIrine/blob/main/media/show-android-localhost.gif)


# Tiny Llama API Server



An API server for connecting to a local Tiny Llama language model using Express.js.

## Features

- TypeScript for type safety
- REST API with Express.js
- Internationalization (i18n) supporting Russian and English languages
- Integration with local Tiny Llama model
- Customizable generation parameters
- Mock mode for development without model

## Requirements

- Node.js 14+
- Local Tiny Llama model (when not using mock mode)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Download the model:
```bash
npm run download-model
```

This script will download the Tiny Llama model from Hugging Face and save it to the `models/tiny-llama-model` directory.

4. Copy .env.example to .env (if not already created by the download script):
```bash
cp .env.example .env
```

## Configuration

Edit the `.env` file to configure environment variables:

```
# Server configuration
PORT=3000
NODE_ENV=development

# Operating mode
# Set to true to run server without loading the model (demo mode)
BYPASS_MODEL_CHECK=true

# Model paths
MODEL_PATH=./models/tiny-llama-model/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf

# Generation parameters
MAX_TOKENS=512
TEMPERATURE=0.7
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Watch Mode (auto-reload on file changes)
```bash
npm run dev:watch
```

### Production Build and Run
```bash
npm run build
npm start
```

## API Endpoints

### GET /
Root endpoint providing basic information about the API.

**Response:**
```json
{
  "message": "Welcome to Tiny Llama API",
  "docs": "/api-docs",
  "version": "1.0.0"
}
```

### GET /api/status
Returns the model status.

**Query Parameters:**
- `locale` (optional): `ru` or `en` - response language (default: `ru`)

**Example Response:**
```json
{
  "status": "Success",
  "model_status": {
    "loaded": true,
    "name": "Tiny Llama",
    "path": "./models/tiny-llama-model/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf"
  }
}
```

### POST /api/generate
Generates text based on a prompt.

**Request Body:**
```json
{
  "prompt": "Tell me about language models",
  "maxTokens": 512,
  "temperature": 0.7,
  "locale": "en"
}
```

**Parameters:**
- `prompt` (required): The input text prompt
- `maxTokens` (optional): Maximum number of tokens to generate
- `temperature` (optional): Generation temperature (affects randomness)
- `locale` (optional): `ru` or `en` - response language (default: `ru`)

**Example Response:**
```json
{
  "generated_text": "Language models are computational systems designed to understand and generate human language...",
  "stats": {
    "inference_time_ms": 1234,
    "tokens_generated": 156
  }
}
```

## Mock Mode

For development purposes, you can run the server in mock mode without loading the actual model:

1. Set `BYPASS_MODEL_CHECK=true` in your `.env` file
2. Run the server normally

In mock mode, the API will return predefined responses for demonstration purposes.

## Development

The project uses a feature-based folder structure:

```
/src
  /config      - Server configuration
  /controllers - API controllers
  /services    - Model services
  /types       - TypeScript types
  /i18n        - Internationalization
  /scripts     - Utility scripts
```

## Error Handling

The API uses standard HTTP error codes and consistent error response formats:

```json
{
  "error": "error_code",
  "message": "Human-readable error message"
}
```

## Deployment on Android with Termux

You can run this server on an Android device using Termux, which provides a Linux environment on Android. Follow these step-by-step instructions:

### 1. Install Termux

1. Download and install [Termux](https://f-droid.org/en/packages/com.termux/) from F-Droid (recommended) or Play Store.
2. Launch Termux and update its packages:
   ```bash
   pkg update && pkg upgrade -y
   ```

### 2. Install Required Dependencies

1. Install Node.js, git, and other essential packages:
   ```bash
   pkg install nodejs-lts git python make clang -y
   ```

2. Verify Node.js installation:
   ```bash
   node -v
   npm -v
   ```

### 3. Set Up Storage Access

1. Request storage permission (to access your device's storage):
   ```bash
   termux-setup-storage
   ```
   This will prompt you to grant Termux storage access.

2. Create a directory for your project:
   ```bash
   mkdir -p ~/projects
   cd ~/projects
   ```

### 4. Clone and Configure the Project

1. Clone the repository:
   ```bash
   git clone <repository-url> tiny-llama-server
   cd tiny-llama-server
   ```

2. Install dependencies (this may take some time on a mobile device):
   ```bash
   npm install
   ```

3. Create a .env file:
   ```bash
   cp .env.example .env
   ```

4. Edit the .env file to enable mock mode (highly recommended for Android, as model loading can be resource-intensive):
   ```bash
   nano .env
   ```
   
   Ensure `BYPASS_MODEL_CHECK=true` is set.

### 5. Running with Mock Mode (Recommended for Android)

1. Start the server:
   ```bash
   npm run dev
   ```

2. Access the API from other apps or a browser on your device at `http://localhost:3000`

### 6. Running with the Actual Model (Advanced, for Powerful Devices)

**Note:** Running an LLM on Android requires significant resources. This is only recommended for high-end devices with at least 6GB of RAM.

1. Download a smaller quantized version of Tiny Llama:
   ```bash
   mkdir -p models/tiny-llama-model
   cd models/tiny-llama-model
   curl -L https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q2_K.gguf -o tinyllama.gguf
   cd ../..
   ```

2. Update your .env file to point to the model and disable mock mode:
   ```bash
   nano .env
   ```
   
   Update these values:
   ```
   BYPASS_MODEL_CHECK=false
   MODEL_PATH=./models/tiny-llama-model/tinyllama.gguf
   ```

3. Start the server (be patient, loading may take time):
   ```bash
   npm run dev
   ```

### 7. Running the Server in the Background

1. To keep the server running after closing Termux, use `nohup`:
   ```bash
   nohup npm run dev > server.log 2>&1 &
   ```

2. To check the running process:
   ```bash
   ps | grep node
   ```

3. To terminate the server:
   ```bash
   kill <PID>
   ```
   Where `<PID>` is the process ID from the previous command.

### 8. Accessing from Other Devices

To access the API from other devices on the same network:

1. Find your Android device IP address:
   ```bash
   ifconfig
   ```
   Look for the `inet` address in the `wlan0` interface.

2. Edit your code to listen on all interfaces:
   ```bash
   nano src/index.ts
   ```
   
   Change the listen call to:
   ```typescript
   app.listen(config.port, '0.0.0.0', () => {
     // existing code
   });
   ```

3. Restart the server and access it from other devices using `http://<android-ip>:3000`

### Troubleshooting

- If you encounter memory issues, make sure to use mock mode or a highly quantized model
- Close other apps to free up memory
- Try reducing the MAX_TOKENS value in your .env file
- For Node.js compilation errors, ensure you have the latest Termux version and updated packages

## License

ISC
