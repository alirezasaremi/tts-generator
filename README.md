
# 🎙️ TTS Generator

[![GitHub stars](https://img.shields.io/github/stars/alirezasaremi/tts-generator?style=social)](https://github.com/alirezasaremi/tts-generator)
[![GitHub forks](https://img.shields.io/github/forks/alirezasaremi/tts-generator?style=social)](https://github.com/alirezasaremi/tts-generator)
[![GitHub issues](https://img.shields.io/github/issues/alirezasaremi/tts-generator)](https://github.com/alirezasaremi/tts-generator/issues)
[![License](https://img.shields.io/github/license/alirezasaremi/tts-generator)](https://github.com/alirezasaremi/tts-generator)

## 🧠 About

**TTS Generator** is an open-source app that helps you convert text into high-quality audio using AI.

You can use it to generate:

- 🎧 Podcasts
- 🎤 Mock interviews
- 📖 Stories
- 🧠 Learning content

Built with Next.js and powered by OpenAI TTS models.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/alirezasaremi/tts-generator.git
cd tts-generator
```

### 2. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

### 3. Setup environment variables

Rename the example file:

```bash
cp env.example .env
```

Then update the values inside `.env`:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_TTS_MODEL=gpt-4o-mini-tts
```

---

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open:
👉 http://localhost:3000

---

## 🛠️ Tech Stack

- Next.js (App Router)
- TypeScript
- OpenAI TTS (gpt-4o-mini-tts)

---

## 📦 Features

- Multi-voice generation (Interviewer / Interviewee)
- Podcast-style audio output
- MP3 generation and download
- Simple API-based architecture

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

---

## 📄 License

This project is open-source and available under the MIT License.
