<div align="center">

# 🧠 CraftVN ⛏️

### AI-Powered Minecraft Bot Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Minecraft](https://img.shields.io/badge/Minecraft-Java%201.21.6-red.svg)](https://www.minecraft.net/)
[![LLM Support](https://img.shields.io/badge/LLMs-15+-blue.svg)](#-supported-llm-providers)

An advanced autonomous AI agent that plays Minecraft using natural language commands and Large Language Models. Features multi-agent coordination, persistent memory, vision perception, and real-time WebSocket API.

[🇬🇧 English](#english) | [🇻🇳 Tiếng Việt](#tiếng-việt)

---

</div>

## English

### 📋 Table of Contents

1. [Quick Start](#quick-start-en)
2. [Architecture Overview](#architecture-overview)
3. [Installation & Setup](#installation--setup)
4. [Configuration Guide](#configuration-guide)
5. [Bot Profiles & Customization](#bot-profiles--customization)
6. [API Documentation](#api-documentation)
7. [LLM Providers Integration](#-supported-llm-providers)
8. [Memory System](#memory-system)
9. [Code Execution & Skills](#code-execution--skills)
10. [Examples & Use Cases](#examples--use-cases)
11. [Docker Deployment](#docker-deployment)
12. [Troubleshooting](#troubleshooting)
13. [FAQ](#faq)

---

### Quick Start (EN)

**Prerequisites:**
- Minecraft Java Edition v1.21.6
- Node.js v18+ LTS
- LLM API key (OpenAI, Claude, Gemini, Groq, etc.)

**Installation:**

```bash
# Clone and install
git clone https://github.com/maitrongthinh/craftVN-.git
cd craftVN-
npm install

# Setup configuration
cp keys.example.json keys.json
# Edit keys.json with your LLM API credentials

# Launch
node main.js
```

**Default behavior:**
- MindServer UI opens at `http://localhost:8080`
- Bot connects to Minecraft server at `127.0.0.1:5000`
- Agent views render at `localhost:3000` (if `render_bot_view: true`)

---

### Architecture Overview

CraftVN uses a **micro-service architecture** with the following components:

```
┌─────────────────────────────────────────────────┐
│         MindServer (Socket.io Hub)              │
│  - Central coordination                          │
│  - Resource locking                              │
│  - Agent state management                        │
│  - REST API                                      │
└────────────┬────────────────────────────────────┘
             │
    ┌────────┼────────┐
    │        │        │
┌───▼──┐ ┌──▼────┐ ┌─▼────────┐
│Agent1│ │Agent2 │ │ AgentN... │
│(LLM) │ │ (LLM) │ │ (LLM)     │
└───┬──┘ └──┬────┘ └─┬────────┘
    │       │        │
    └───────┼────────┘
            │
      ┌─────▼─────────┐
      │ Minecraft Bot  │
      │  (Mineflayer)  │
      └────────────────┘
         Port 5000/55916
```

**Key Components:**

| Component | Purpose | Port |
|-----------|---------|------|
| **MindServer** | WebSocket hub, API endpoint, state manager | 8080 (default) |
| **Agent Process** | LLM-powered Minecraft client | 3000+ (viewers) |
| **Mineflayer Bot** | Direct Minecraft protocol handler | 5000/55916 |
| **Memory Bank** | Persistent agent memory storage | File-based |
| **Vision System** | Screenshot analysis with vision models | Internal |

**How It Works:**

1. **Agent Initialization** → Settings + LLM profile loaded
2. **Minecraft Connection** → Mineflayer connects to server
3. **State Monitoring** → Bot monitors environment, chat, inventory
4. **LLM Processing** → Natural language → Action decisions
5. **Action Execution** → Commands sent to Minecraft bot
6. **Memory Update** → Knowledge stored for future use
7. **User Interaction** → Web UI + in-game chat + API

---

### Installation & Setup

#### Full Installation Guide

**Step 1: Clone Repository**

```bash
git clone https://github.com/maitrongthinh/craftVN-.git
cd craftVN-
```

**Step 2: Install Dependencies**

```bash
npm install
```

> **Troubleshooting:** On Windows, if you get canvas build errors, make sure to select "Automatically install necessary tools" during Node.js setup.

**Step 3: Create Configuration**

```bash
# Copy example keys
cp keys.example.json keys.json

# Edit with your API credentials
# Recommended: Use nano or your editor
nano keys.json
```

**Step 4: Launch Application**

```bash
# With default settings
node main.js

# With custom profiles
node main.js --profiles ./profiles/gpt.json ./profiles/claude.json

# With task file
node main.js --task_path ./tasks/example_tasks.json --task_id task_001
```

**Step 5: Access Web Dashboard**

- Open browser to `http://localhost:8080`
- See all agents, chat with them, monitor state
- Execute commands in real-time

---

### Configuration Guide

**Main Configuration File:** `settings.js`

#### Server Connection Settings

```javascript
const settings = {
    // ========== MINECRAFT SERVER ==========
    "minecraft_version": "auto",      // auto-detect or specify "1.21.6"
    "host": "127.0.0.1",              // Server IP (localhost, your.ip, etc)
    "port": 5000,                     // Server port (-1 = auto-scan)
    "auth": "offline",                // "offline" or "microsoft"
    "spawn_timeout": 30,              // Seconds to wait for bot spawn
    
    // ========== MINDSERVER (WEB UI) ==========
    "mindserver_port": 8080,          // Dashboard port
    "auto_open_ui": true,             // Auto-open browser on startup
    
    // ========== BOT PROFILES ==========
    "base_profile": "assistant",      // Default: survival, assistant, creative, god_mode
    "profiles": [
        "./profiles/gpt.json",
        // "./profiles/claude.json",
        // "./profiles/quangdz.json",
    ],
```

#### AI & Language Model Settings

```javascript
    // ========== AI & LLM BEHAVIOR ==========
    "load_memory": true,              // Load memory from previous session
    "init_message": "Respond with hello world and your name",
    "max_messages": 15,               // Context window size
    "max_tokens": 8000,               // (per profile, overrides here)
    "num_examples": 2,                // Few-shot examples in prompt
    "relevant_docs_count": -1,        // -1 = all docs (for code completion)
    
    // ========== CODE EXECUTION SETTINGS ==========
    "allow_insecure_coding": true,    // Enable raw JS execution (!newAction)
    "allow_insecure_reflexes": true,  // Allow free-form reflex handlers
    "allow_vision": false,            // Enable vision model analysis
    "code_timeout_mins": -1,          // -1 = no timeout
    "block_place_delay": 0,           // Ms delay between block placements
    
    // ========== CHAT & COMMUNICATION ==========
    "chat_ingame": true,              // Show responses in Minecraft chat
    "chat_bot_messages": true,        // Let bots chat with each other
    "language": "en",                 // Translate to/from: en, vi, fr, etc
    "only_chat_with": [],             // Empty = chat with everyone
        
    // ========== RENDERING & VISUALIZATION ==========
    "render_bot_view": false,         // Show bot's POV at localhost:3000+
    "speak": false,                   // Text-to-speech enabled
```

#### Content Control

```javascript
    // ========== CONTENT CONTROL ==========
    "blocked_actions": [],            // Disable commands: ["!setMode"]
    "compact_prompt_context": true,   // Reduce latency & token usage
    "narrate_behavior": true,         // "Picking up item!" messages
    "show_command_syntax": "full",    // "full", "shortened", "none"
    
    // ========== LOGGING ==========
    "log_all_prompts": true,          // Log to file every prompt/response
```

#### Task Execution Settings

```javascript
    // ========== AUTONOMOUS TASKS ==========
    "recursive_task_max_depth": 4,    // Max subtask decomposition levels
    "max_commands": -1,               // -1 = no limit on consecutive commands
```

**Environment Variables Override:**

Settings can be overridden via environment:

```bash
# Override via env vars
export MINECRAFT_PORT=25565
export MINDSERVER_PORT=9000
export SETTINGS_JSON='{"max_messages": 20, "auth": "microsoft"}'

node main.js
```

---

### Bot Profiles & Customization

Bot profiles define personality, LLM model, and behavior modes.

#### Profile Structure

**File:** `profiles/custom_bot.json`

```json
{
    "name": "MyBot",
    "model": "gpt-4o",
    "provider": "openai",
    "max_tokens": 8000,
    "temperature": 0.7,
    "top_p": 0.9,
    
    "modes": {
        "self_preservation": true,
        "unstuck": true,
        "cowardice": false,
        "self_defense": true,
        "hunting": true,
        "item_collecting": true,
        "torch_placing": true,
        "elbow_room": true,
        "idle_staring": true,
        "cheat": false
    },
    
    "cooldown": 3000,
    "prefixes": ["!", "/"],
    "speak_model": "openai/tts-1/echo",
    
    "conversing": "You are an AI Minecraft bot...",
    "coding": "You are an intelligent mineflayer bot...",
    "saving_memory": "You are a minecraft bot...",
    
    "conversation_examples": [
        [
            {"role": "user", "content": "player: Hi there!"},
            {"role": "assistant", "content": "Hey player! What's up?"}
        ]
    ]
}
```

#### Available Modes

| Mode | Effect |
|------|--------|
| `self_preservation` | Avoid damage, use shields/armor |
| `unstuck` | Auto-recovery from stuck positions |
| `cowardice` | Fleeing from threats (if true) |
| `self_defense` | Combat against hostile mobs |
| `hunting` | Active mob hunting |
| `item_collecting` | Automatic item pickup |
| `torch_placing` | Place torches while exploring |
| `elbow_room` | Maintain space while moving |
| `idle_staring` | Random lookups when idle |
| `cheat` | Use creative mode (if available) |

#### Prompt Templates

Customize AI behavior with template variables:

- `$NAME` → Bot name
- `$MEMORY` → Summarized previous memory
- `$STATS` → Current health, hunger, position
- `$INVENTORY` → Current items
- `$COMMAND_DOCS` → Available commands documentation
- `$EXAMPLES` → Few-shot examples
- `$CODE_DOCS` → Programming skills documentation
- `$SELF_PROMPT` → Profile-specific prompt injection

#### Creating Custom Profiles

```bash
# Copy template
cp profiles/defaults/assistant.json profiles/my-bot.json

# Edit profile
nano profiles/my-bot.json
```

Then enable in `settings.js`:

```javascript
"profiles": [
    "./profiles/my-bot.json"
]
```

---

### API Documentation

#### REST API Endpoints

**Base URL:** `http://localhost:8080/api`

**Authentication:** No auth required (local only, recommended to secure in production)

##### Agent Management

**List All Agents**
```
GET /agents
Response: { agents: [{ name, state, position, health, ... }] }
```

**Get Agent Status**
```
GET /agents/:name
Response: { name, state, position, health, hunger, dimension, ... }
```

**Send Chat Message**
```
POST /agents/:name/chat
Body: { message: "string" }
Response: { status, output }
```

**Execute Command**
```
POST /agents/:name/command
Body: { command: "string" }
Response: { status, output }
```

**Get Agent Memory**
```
GET /agents/:name/memory
Response: { memory: "text" }
```

**Update Agent Memory**
```
POST /agents/:name/memory
Body: { memory: "text" }
Response: { status }
```

##### Resource Locking (Multi-Agent Coordination)

**Acquire Lock**
```
POST /resource-lock/acquire
Body: { 
    agent_name: "string",
    resource_key: "string",
    ttl_ms: 120000
}
Response: { ok, token, owner, expires_at }
```

**Release Lock**
```
POST /resource-lock/release
Body: {
    agent_name: "string",
    resource_key: "string",
    token: "string"
}
Response: { ok }
```

#### WebSocket Events (Socket.io)

**Connect**
```javascript
const socket = io('http://localhost:8080');

socket.on('connect', () => {
    console.log('Connected to MindServer');
});
```

**Agent State Updates**
```javascript
socket.on('agent_state', (data) => {
    // data = { name, state, health, position, ... }
});
```

**Agent Chat Messages**
```javascript
socket.on('agent_message', (data) => {
    // data = { agent, message, type }
});
```

**Resource Lock Events**
```javascript
socket.on('resource_lock_acquired', (data) => {
    // Lock acquired by another agent
});
```

#### JavaScript SDK Example

```javascript
import * as CraftVN from './src/craftVN/mindcraft.js';
import settings from './settings.js';

// Initialize MindServer
await CraftVN.init(
    false,           // host_public (localhost or public IP)
    8080,            // port
    true             // auto_open_ui
);

// Create agent with settings
const result = await CraftVN.createAgent(settings);
if (result.success) {
    console.log('Agent created successfully');
} else {
    console.error('Failed:', result.error);
}

// Control agent
CraftVN.startAgent('MyBot');
CraftVN.stopAgent('MyBot');
CraftVN.destroyAgent('MyBot');

// Get agent process
const agent = CraftVN.getAgentProcess('MyBot');
```

---

### 🤖 Supported LLM Providers

CraftVN supports **15+ LLM providers**. Configure via profile's `model` and `provider` fields.

#### OpenAI
```json
{
    "provider": "openai",
    "model": "gpt-4o",
    "max_tokens": 8000
}
```
**Models:** `gpt-4o`, `gpt-4-turbo`, `gpt-3.5-turbo`
**Key Name:** `OPENAI_API_KEY` in `keys.json`

#### Anthropic Claude
```json
{
    "provider": "anthropic",
    "model": "claude-3-5-sonnet",
    "max_tokens": 8000
}
```
**Models:** `claude-3-opus`, `claude-3-sonnet`, `claude-3-haiku`, `claude-3-5-sonnet`
**Key Name:** `CLAUDE_API_KEY` in `keys.json`

#### Google Gemini
```json
{
    "provider": "google",
    "model": "gemini-2.0-flash",
    "max_tokens": 8000
}
```
**Models:** `gemini-2.0-flash`, `gemini-1.5-pro`, `gemini-1.5-flash`
**Key Name:** `GEMINI_API_KEY` in `keys.json`

#### Groq (Fast Inference)
```json
{
    "provider": "groq",
    "model": "mixtral-8x7b-32768",
    "max_tokens": 8000
}
```
**Models:** `mixtral-8x7b-32768`, `llama-3-70b`, `llama-3-8b`
**Key Name:** `GROQ_API_KEY` in `keys.json`

#### DeepSeek
```json
{
    "provider": "deepseek",
    "model": "deepseek-chat",
    "max_tokens": 8000
}
```
**Models:** `deepseek-chat`, `deepseek-coder`
**Key Name:** `DEEPSEEK_API_KEY` in `keys.json`

#### Mistral AI
```json
{
    "provider": "mistral",
    "model": "mistral-large",
    "max_tokens": 8000
}
```
**Models:** `mistral-large`, `mistral-medium`, `mistral-small`
**Key Name:** `MISTRAL_API_KEY` in `keys.json`

#### Ollama (Local)
```json
{
    "provider": "ollama",
    "model": "llama2",
    "url": "http://localhost:11434"
}
```
**Setup:** `ollama run llama2` (downloads ~4GB)
**Models:** Any model available locally

#### Other Providers

| Provider | Model Example | Key Name |
|----------|---------------|----------|
| OpenRouter | `openrouter/auto` | `OPENROUTER_API_KEY` |
| HuggingFace | `mistralai/Mistral-7B` | `HUGGINGFACE_API_KEY` |
| Azure OpenAI | `gpt-4` | `AZURE_OPENAI_API_KEY` |
| Replicate | `meta/llama-2-70b` | `REPLICATE_API_KEY` |
| Cerebras | `llama3.1-70b` | `CEREBRAS_API_KEY` |
| Qwen (Alibaba) | `qwen-max` | `QWEN_API_KEY` |
| Local VLLM | Custom setup | Self-hosted |

**Setup Instructions:**

1. Get API key from provider
2. Add to `keys.json`:
   ```json
   {
       "OPENAI_API_KEY": "sk-...",
       "CLAUDE_API_KEY": "sk-ant-...",
       "GEMINI_API_KEY": "AIzaSy...",
       "GROQ_API_KEY": "gsk_...",
       ...
   }
   ```
3. Use in profile:
   ```json
   {
       "provider": "openai",
       "model": "gpt-4o"
   }
   ```

---

### Memory System

CraftVN's memory system allows bots to learn and retain knowledge across sessions.

#### Memory Architecture

```
┌─────────────────────────────────────┐
│     Current Conversation            │
│  (20-50 recent messages)            │
└────────────┬────────────────────────┘
             │
             ▼
    ┌─────────────────────┐
    │  Memory Summarizer  │
    │  (LLM-powered)      │
    │                     │
    │  Compress to:       │
    │  - Key facts        │
    │  - Coordinates      │
    │  - Player names     │
    │  - Decisions        │
    └────────┬────────────┘
             │
             ▼
    ┌─────────────────────┐
    │  Long-term Memory   │
    │  (File: memory.json)│
    │                     │
    │  - Locations        │
    │  - Discoveries      │
    │  - Relationships    │
    │  - Skills learned   │
    └─────────────────────┘
```

#### Memory File Structure

**Location:** `bots/{agent_name}/memory.json`

```json
{
    "personality": "...",
    "key_facts": [
        "I am AI, I can code",
        "The spawn point is at x=100, y=64, z=200"
    ],
    "locations": {
        "home_base": { "x": 100, "y": 64, "z": 200, "note": "Main base" },
        "forest": { "x": -500, "y": 65, "z": -300 }
    },
    "discovered_items": {
        "diamonds": 42,
        "iron": 256,
        "wood": 1024
    },
    "player_relationships": {
        "Steve": "Good friend",
        "Creeper_Slayer": "Unknown"
    },
    "skills_learned": [
        "Mining efficiency",
        "Building structures",
        "Combat tactics"
    ],
    "goals": "Build a castle in the forest"
}
```

#### Memory Persistence

**Enable/Disable:**
```javascript
// settings.js
"load_memory": true,    // Load on startup
"save_memory": true     // Save on shutdown (default true)
```

**Manual Save:**
```javascript
// In conversation, use:
!saveMemory "Updated memory content"
```

**Memory Summarization Process:**

1. Bot finishes task/conversation
2. LLM summarizes recent events
3. New summary merged with old memory
4. File updated on disk
5. On next startup, memory reloaded

#### Advanced Memory Features

**Spatial Memory**
```bash
bots/{agent_name}/spatial_memory.json
```
Stores map chunks, terrain, discovered structures.

**Damage Log**
```bash
bots/{agent_name}/damage_log.json
```
Tracks combat history, mob encounters.

**Learned Reflexes**
```bash
bots/{agent_name}/learned/
```
Custom code reflexes learned from !newReflex.

---

### Code Execution & Skills

CraftVN allows bots to write and execute JavaScript code for complex tasks.

#### Command Syntax

**Create Custom Action:**
```
!newAction("Description of what to do")
```
Bot writes JavaScript code block and executes it.

**Create Reflex (Auto-trigger):**
```
!newReflex("Condition when to trigger", "Action to take")
```

**Set Behavior Mode:**
```
!setMode hunting true     // Enable hunting
!setMode self_defense false   // Disable combat
```

#### Available Skills & Functions

**Navigation Skills:**
```javascript
await skills.goToPlayer('PlayerName', radius);
await skills.goToBlock(type, x, y, z, radius);
await skills.goToXZ(x, z);
await skills.stopMoving();
await skills.jump();
```

**Block Interaction:**
```javascript
await skills.dig(blockName);
await skills.place(blockName, x, y, z);
await skills.collectBlock(type, count);
await world.getBlocks(x, y, z, radius);
```

**Inventory Management:**
```javascript
await skills.equipItem(itemName);
await skills.dropItem(itemName, count);
await skills.craftItem(recipe);
```

**Combat:**
```javascript
await skills.attackEntity(entity);
await skills.equipArmor(type);
```

**Communication:**
```javascript
await skills.chat("message");
await skills.startConversation(playerName, greeting);
```

#### Code Execution Example

**User Command:**
```
Player: Go collect 10 wood
```

**Bot AI Writes & Executes:**
```javascript
// Find nearest tree and collect wood
const logs = await world.findBlocks('oak_log', 20);
if (logs.length === 0) {
    await skills.chat("No trees found nearby!");
    return;
}

for (let i = 0; i < 10; i++) {
    const log = logs[i % logs.length];
    await skills.goToBlock('oak_log', log.x, log.y, log.z, 3);
    await skills.dig('oak_log');
}

await skills.chat("Collected 10 wood!");
```

#### Error Handling

If code execution fails:
1. Error message returned to bot
2. Bot analyzes error
3. Bot writes corrected code
4. Execution retries (up to 3 attempts)

---

### Examples & Use Cases

#### Example 1: Multi-Bot Cooperation

**Setup:** Two bots gather resources, avoid conflicts via resource locking.

```javascript
// Bot 1: Gather wood
!newAction("Gather 10 oak logs from forest")
// Bot 1 acquires lock on "forest_resource"

// Bot 2: Build house
!newAction("Build a 5x5 house at spawn")
// Bot 2 requests lock on "forest_resource", waits for Bot 1
```

#### Example 2: Autonomous Exploration

```
User: "Explore the map and report what you find"

Bot Action:
1. Plans grid exploration pattern
2. Moves to chunks sequentially
3. Screenshots terrain every 50 blocks
4. Sends vision to Claude for analysis
5. Stores locations in memory
6. Reports discoveries to chat
```

#### Example 3: Building Complex Structure

```
User: "Build a 10x10 house with a roof"

Bot Process:
1. Selects building blocks from inventory
2. Navigates to build location
3. Places blocks in pattern
4. Rotates and orients correctly
5. Verifies structure integrity
6. Adjusts if needed
7. Reports completion
```

#### Example 4: Learning from Failure

```
User: "I want you to learn how to farm melons"

Session 1 - Attempt fails, bot learns
Session 2 - Bot retries with learned knowledge
Memory stores: "Plant melon seeds on tilled soil with water nearby"
Session 3+ - Bot successfully farms
```

---

### Docker Deployment

#### Quick Deploy

```bash
docker-compose up --build
```

#### Manual Docker Build

```bash
# Build image
docker build -t craftVN .

# Run container
docker run -it \
  -p 3000-3003:3000-3003 \
  -p 8080:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v $(pwd)/keys.json:/app/keys.json \
  craftVN
```

#### Docker Compose Configuration

```yaml
version: '3'
services:
  craftVN:
    build: .
    container_name: craftVN-bot
    ports:
      - "3000-3003:3000-3003"
      - "8080:8080"
    volumes:
      - ./keys.json:/app/keys.json
      - ./bots:/app/bots
      - ./profiles:/app/profiles
    environment:
      - MINECRAFT_PORT=5000
      - MINDSERVER_PORT=8080
      - NODE_ENV=production
    networks:
      - craftVN-network

networks:
  craftVN-network:
    driver: bridge
```

#### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MINECRAFT_PORT` | 5000 | Minecraft server port |
| `MINDSERVER_PORT` | 8080 | Web dashboard port |
| `NODE_ENV` | development | Environment (production/development) |
| `SETTINGS_JSON` | (none) | Override settings as JSON string |

---

### Troubleshooting

#### Connection Issues

**"Cannot connect to Minecraft server"**
- Verify Minecraft server is running
- Check host/port in `settings.js` match your server
- Ensure firewall allows connection
- Try: `node main.js` with debug logging

**"EADDRINUSE: address already in use :::8080"**
```bash
# Port already in use, change in settings.js
"mindserver_port": 9000
```

#### LLM & API Errors

**"401 Unauthorized" or API key errors**
- Check `keys.json` has correct API key
- Verify API key format (e.g., `sk-...` for OpenAI)
- Test API key with provider's CLI

**"Rate limit exceeded"**
- Wait for rate limit window (typically 1 minute)
- Consider using faster provider (Groq, etc.)
- Reduce `max_tokens` in profile

#### Bot Behavior Issues

**"Bot stuck in one place"**
- Enable unstuck mode: `"unstuck": true` in profile
- Check movement path not blocked
- Restart bot: `!restart`

**"Bot not executing commands"**
- Check bot is online: view MindServer dashboard
- Verify command syntax (most use `/` prefix)
- Check command isn't in `blocked_actions`

**"Memory not persisting"**
- Ensure `"load_memory": true` in settings
- Check file permissions on `bots/` directory
- Verify disk has free space

#### Canvas/Graphics Errors (Windows)

**"Error: Cannot find module 'canvas'"**
```bash
npm install --no-optional
# Or rebuild on Windows:
npm install --force
# If still fails, install Visual C++ Build Tools first
```

#### Performance Optimization

**High latency issues:**
- Set `"compact_prompt_context": true` (reduces token usage)
- Lower `"max_messages"` from 15 to 10
- Use faster LLM model (Groq, etc.)
- Disable `"log_all_prompts"`

**High token usage:**
- Reduce `"num_examples"` from 2 to 1
- Enable context compacting
- Shorten conversation history

---

### FAQ

#### General Questions

**Q: Is this legal? What about server terms of service?**
A: Using CraftVN on servers you own is legal. Always respect server ToS. Using on public servers without permission may violate their rules.

**Q: Can I run multiple bots on one server?**
A: Yes! Add multiple profiles to `settings.js`. Each profile spawns a separate bot. Resource locking prevents conflicts.

**Q: Does CraftVN work with modded servers?**
A: Partial support. Works with most mods, but custom items/blocks may not be recognized. Vanilla Minecraft is fully supported.

**Q: Can I host this commercially?**
A: Yes, with MIT license attribution. See LICENSE file for terms.

#### Technical Questions

**Q: How much RAM does CraftVN use?**
A: ~200-400 MB per bot instance. Multiple bots require ~800 MB - 2GB total.

**Q: What's the latency between command and action?**
A: 50-500ms typical. Depends on LLM response time (usually 1-5 seconds for API calls).

**Q: Can bots use vision models (screenshots)?**
A: Yes, enable `"allow_vision": true` and add vision models to profiles. Requires vision-capable LLM (GPT-4V, Claude, Gemini with vision).

**Q: How do I debug bot behavior?**
A: 
- Enable `"log_all_prompts": true` (logs all LLM interactions)
- Check browser console (F12) in MindServer UI
- Use `!debug` command for detailed info

**Q: Can I use local LLMs offline?**
A: Yes, use Ollama provider. No internet required.

#### Customization Questions

**Q: How do I add custom commands?**
A: Edit the conversing/coding templates in bot profiles with new commands in prompt text. Or create custom reflexes with `!newReflex`.

**Q: Can I modify the web UI?**
A: Yes, files in `src/craftVN/public/`. Modify HTML/CSS/JS and restart.

**Q: How do I create custom skills?**
A: Edit `src/agent/library/` to add new JavaScript skills. Import in agent process and expose to LLM.

#### Performance Questions

**Q: How many bots can I run on one machine?**
A: Depends on resources. Typical: 3-5 on modern CPU. More limited by LLM API rate limits.

**Q: Should I use Claude or GPT-4?**
A: Claude better at reasoning. GPT-4 better at code. Try both, pick preference.

**Q: What's the cheapest provider?**
A: Groq (free tier, fast). Deepseek (cheap, decent quality). Ollama (free, local).

---

## Tiếng Việt

### 📋 Mục Lục

1. [Khởi Động Nhanh](#khởi-động-nhanh)
2. [Tổng Quan Kiến Trúc](#tổng-quan-kiến-trúc-1)
3. [Hướng Dẫn Cài Đặt](#hướng-dẫn-cài-đặt)
4. [Hướng Dẫn Cấu Hình](#hướng-dẫn-cấu-hình)
5. [Hồ Sơ & Tùy Chỉnh Bot](#hồ-sơ--tùy-chỉnh-bot)
6. [Tài Liệu API](#tài-liệu-api)
7. [Nhà Cung Cấp LLM](#nhà-cung-cấp-llm)
8. [Hệ Thống Bộ Nhớ](#hệ-thống-bộ-nhớ)
9. [Thực Thi Code & Kỹ Năng](#thực-thi-code--kỹ-năng)
10. [Ví Dụ & Trường Hợp Sử Dụng](#ví-dụ--trường-hợp-sử-dụng)
11. [Triển Khai Docker](#triển-khai-docker)
12. [Khắc Phục Sự Cố](#khắc-phục-sự-cố)
13. [Câu Hỏi Thường Gặp](#câu-hỏi-thường-gặp)

---

### Khởi Động Nhanh

**Yêu Cầu:**
- Minecraft Java Edition v1.21.6
- Node.js v18+ LTS
- Khóa API LLM (OpenAI, Claude, Gemini, Groq, v.v.)

**Cài Đặt:**

```bash
# Clone và cài đặt
git clone https://github.com/maitrongthinh/craftVN-.git
cd craftVN-
npm install

# Thiết lập cấu hình
cp keys.example.json keys.json
# Chỉnh sửa keys.json với thông tin xác thực LLM của bạn

# Khởi chạy
node main.js
```

**Hành Vi Mặc Định:**
- Giao diện MindServer mở tại `http://localhost:8080`
- Bot kết nối tới máy chủ Minecraft tại `127.0.0.1:5000`
- Khung nhìn Agent hiển thị tại `localhost:3000` (nếu `render_bot_view: true`)

---

### Tổng Quan Kiến Trúc (1)

CraftVN sử dụng **kiến trúc micro-service** với các thành phần sau:

**Các Thành Phần Chính:**

| Thành Phần | Mục Đích | Cổng |
|-----------|---------|------|
| **MindServer** | Trung tâm WebSocket, API, quản lý trạng thái | 8080 (mặc định) |
| **Quy Trình Agent** | Client Minecraft do LLM cung cấp | 3000+ (xem) |
| **Bot Mineflayer** | Xử lý giao thức Minecraft trực tiếp | 5000/55916 |
| **Ngân Hàng Bộ Nhớ** | Lưu trữ bộ nhớ Agent bền vững | Dựa trên tập tin |
| **Hệ Thống Thị Giác** | Phân tích ảnh chụp màn hình bằng mô hình thị giác | Nội bộ |

**Cách Hoạt Động:**

1. **Khởi Tạo Agent** → Cài đặt + hồ sơ LLM được tải
2. **Kết Nối Minecraft** → Mineflayer kết nối với máy chủ
3. **Giám Sát Trạng Thái** → Bot giám sát môi trường, trò chuyện, kho
4. **Xử Lý LLM** → Ngôn ngữ tự nhiên → Quyết định hành động
5. **Thực Thi Hành Động** → Lệnh được gửi tới bot Minecraft
6. **Cập Nhật Bộ Nhớ** → Kiến thức được lưu để sử dụng trong tương lai
7. **Tương Tác Người Dùng** → Web UI + trò chuyện trong trò chơi + API

---

### Hướng Dẫn Cài Đặt

**Bước 1: Clone Kho Lưu Trữ**

```bash
git clone https://github.com/maitrongthinh/craftVN-.git
cd craftVN-
```

**Bước 2: Cài Đặt Phụ Thuộc**

```bash
npm install
```

**Bước 3: Tạo Cấu Hình**

```bash
cp keys.example.json keys.json
nano keys.json  # Chỉnh sửa với thông tin xác thực API
```

**Bước 4: Khởi Chạy**

```bash
node main.js
```

**Bước 5: Truy Cập Trang Điều Khiển Web**

- Mở trình duyệt tới `http://localhost:8080`
- Xem tất cả các agent, trò chuyện với họ, giám sát trạng thái
- Thực thi lệnh trong thời gian thực

---

### Hướng Dẫn Cấu Hình

**Tệp Cấu Hình Chính:** `settings.js`

#### Cài Đặt Kết Nối Máy Chủ

```javascript
const settings = {
    "minecraft_version": "auto",    // Phát hiện tự động hoặc chỉ định "1.21.6"
    "host": "127.0.0.1",            // IP máy chủ
    "port": 5000,                   // Cổng máy chủ
    "auth": "offline",              // "offline" hoặc "microsoft"
    
    "mindserver_port": 8080,        // Cổng bảng điều khiển
    "auto_open_ui": true,           // Tự động mở trình duyệt
    
    "base_profile": "assistant",    // Hồ sơ mặc định
    "profiles": [
        "./profiles/gpt.json",
    ],
    "load_memory": true,            // Tải bộ nhớ từ phiên trước
    "max_messages": 15,             // Kích thước cửa sổ bối cảnh
```

#### Cài Đặt AI & LLM

```javascript
    "allow_insecure_coding": true,  // Cho phép thực thi JS
    "allow_vision": false,          // Cho phép phân tích ảnh
    "chat_ingame": true,            // Phản hồi hiển thị trong trò chuyện Minecraft
    "language": "vi",               // Dịch sang tiếng Việt
```

---

### Hồ Sơ & Tùy Chỉnh Bot

Hồ sơ Bot xác định tính cách, mô hình LLM và chế độ hành vi.

**Cấu Trúc Hồ Sơ:**

```json
{
    "name": "BotCủaTôi",
    "model": "gpt-4o",
    "provider": "openai",
    "max_tokens": 8000,
    "temperature": 0.7,
    
    "modes": {
        "self_preservation": true,
        "hunting": true,
        "item_collecting": true
    },
    
    "cooldown": 3000
}
```

---

### Tài Liệu API

#### Điểm Cuối REST API

**URL Cơ Bản:** `http://localhost:8080/api`

**Liệt Kê Tất Cả Agent**
```
GET /agents
```

**Gửi Tin Nhắn Trò Chuyện**
```
POST /agents/:name/chat
Body: { message: "string" }
```

**Thực Thi Lệnh**
```
POST /agents/:name/command
Body: { command: "string" }
```

---

### Nhà Cung Cấp LLM

CraftVN hỗ trợ **15+ nhà cung cấp LLM**.

| Nhà Cung Cấp | Mô Hình Ví Dụ |
|-------------|--------------|
| OpenAI | `gpt-4o` |
| Claude | `claude-3-5-sonnet` |
| Gemini | `gemini-2.0-flash` |
| Groq | `mixtral-8x7b-32768` |
| DeepSeek | `deepseek-chat` |
| Mistral | `mistral-large` |
| Ollama | `llama2` (cục bộ) |

**Cài Đặt:**

1. Lấy khóa API từ nhà cung cấp
2. Thêm vào `keys.json`
3. Sử dụng trong hồ sơ

---

### Hệ Thống Bộ Nhớ

Hệ Thống Bộ Nhớ cho phép Bot học hỏi và giữ lại kiến thức giữa các phiên.

**Cấu Trúc Tệp Bộ Nhớ:**

**Vị Trí:** `bots/{agent_name}/memory.json`

```json
{
    "key_facts": [
        "Tôi là AI, tôi có thể viết code",
        "Điểm sinh là x=100, y=64, z=200"
    ],
    "locations": {
        "home_base": { "x": 100, "y": 64, "z": 200 }
    },
    "discovered_items": {
        "diamonds": 42,
        "iron": 256
    }
}
```

**Bật/Tắt:**
```javascript
"load_memory": true,    // Tải khi khởi động
```

---

### Thực Thi Code & Kỹ Năng

CraftVN cho phép Bot viết và thực thi JavaScript cho các tác vụ phức tạp.

**Cú Pháp Lệnh:**

```
!newAction("Mô tả những gì cần làm")
```

**Các Kỹ Năng Có Sẵn:**

```javascript
await skills.goToPlayer('PlayerName', radius);
await skills.dig(blockName);
await skills.place(blockName, x, y, z);
await skills.chat("message");
```

---

### Ví Dụ & Trường Hợp Sử Dụng

**Ví Dụ 1: Hợp Tác Bot Múltiple**

```
Bot 1: Thu thập gỗ
Bot 2: Xây dựng nhà
(Sử dụng Khóa Tài Nguyên để tránh xung đột)
```

**Ví Dụ 2: Người Dùng: "Thu Thập 10 Gỗ"**

```
Bot viết & thực thi Code:
1. Tìm cây gần nhất
2. Đi đến cây
3. Đào gỗ
4. Lặp lại 10 lần
5. Thông báo hoàn tất
```

---

### Triển Khai Docker

```bash
# Triển Khai Nhanh
docker-compose up --build

# Hoặc xây dựng thủ công
docker build -t craftVN .
docker run -it \
  -p 3000-3003:3000-3003 \
  -p 8080:8080 \
  -v $(pwd)/keys.json:/app/keys.json \
  craftVN
```

---

### Khắc Phục Sự Cố

**"Không thể kết nối với máy chủ Minecraft"**
- Xác minh máy chủ chạy trên cổng 5000
- Kiểm tra host/port trong `settings.js`

**"Lỗi xác thực API"**
- Kiểm tra `keys.json` có khóa API chính xác
- Xác minh định dạng khóa (ví dụ: `sk-...` cho OpenAI)

**"Bot kẹt tại một vị trí"**
- Bật chế độ unstuck: `"unstuck": true`
- Khởi động lại bot: `!restart`

---

### Câu Hỏi Thường Gặp

**Hỏi: Điều này có hợp pháp không?**
Trả Lời: Sử dụng trên máy chủ bạn sở hữu là hợp pháp. Luôn tôn trọng ToS máy chủ.

**Hỏi: Tôi có thể chạy nhiều bot trên một máy chủ không?**
Trả Lời: Có! Thêm nhiều hồ sơ vào `settings.js`.

**Hỏi: CraftVN tiêu thụ bao nhiêu RAM?**
Trả Lời: ~200-400 MB trên mỗi bot. Nhiều bot = 800 MB - 2GB tổng.

**Hỏi: Làm cách nào để tùy chỉnh lệnh?**
Trả Lời: Chỉnh sửa mẫu conversing trong hồ sơ bot hoặc tạo reflex tùy chỉnh.

**Hỏi: Tôi có thể sử dụng LLM cục bộ (Ollama) ngoại tuyến không?**
Trả Lời: Có! Sử dụng nhà cung cấp Ollama. Không cần internet.

---

<div align="center">

## 🎮 Ready to Build Great Things!

**Start with:** `npm install && node main.js`

**Questions?** Check [FAQ](#faq) or open an issue on [GitHub](https://github.com/maitrongthinh/craftVN-)

**License:** MIT © Thịnh

[![GitHub Stars](https://img.shields.io/github/stars/maitrongthinh/craftVN-?style=social)](https://github.com/maitrongthinh/craftVN-)
[![Contributors](https://img.shields.io/github/contributors/maitrongthinh/craftVN-?style=social)](https://github.com/maitrongthinh/craftVN-/graphs/contributors)

</div>
