# Tools

Utility scripts for automating tasks.

---

## `transcribe.py` — Voice Message Transcription

Transcribes audio files using [Groq's Whisper API](https://console.groq.com/docs/speech-text) (`whisper-large-v3-turbo` model). Designed for transcribing Telegram voice messages (`.ogg`) and other common audio formats.

### Supported formats

`.ogg`, `.mp3`, `.wav`, `.m4a`, `.flac`, `.mp4`, `.mpeg`, `.mpga`, `.webm`

### Requirements

```bash
pip3 install groq
```

### Usage

```bash
# Basic transcription (prints to stdout)
python3 transcribe.py voice_message.ogg

# With language hint (faster, slightly more accurate)
python3 transcribe.py voice_message.ogg --language en

# Save output to a text file
python3 transcribe.py voice_message.mp3 --output transcript.txt

# Verbose mode (shows file info and progress)
python3 transcribe.py recording.wav --verbose

# Override API key at runtime
python3 transcribe.py audio.m4a --api-key YOUR_GROQ_API_KEY
```

### Environment variable

You can set your Groq API key as an environment variable instead of hard-coding it:

```bash
export GROQ_API_KEY="your_groq_api_key_here"
python3 transcribe.py voice_message.ogg
```

### Example output

```
Hi Rachael, just a quick reminder about our meeting tomorrow at 3pm.
```
