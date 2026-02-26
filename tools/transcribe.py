#!/usr/bin/env python3
"""
transcribe.py — Voice message transcription using Groq's Whisper API.

Transcribes audio files (.ogg, .mp3, .wav, .m4a, etc.) via the
whisper-large-v3-turbo model hosted on Groq.

Usage:
    python3 transcribe.py <audio_file>
    python3 transcribe.py voice_message.ogg
    python3 transcribe.py recording.mp3 --language en
    python3 transcribe.py audio.wav --output result.txt

Options:
    <audio_file>          Path to the audio file to transcribe (required)
    --language LANG       Language code hint, e.g. "en", "es", "fr" (optional)
    --output FILE         Save transcription to a text file (optional)
    --api-key KEY         Groq API key (overrides GROQ_API_KEY env var)
    --verbose             Print extra info (file name, duration hint, etc.)
"""

import argparse
import os
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Supported audio formats (Groq / OpenAI Whisper compatible)
# ---------------------------------------------------------------------------
SUPPORTED_EXTENSIONS = {".ogg", ".mp3", ".wav", ".m4a", ".flac", ".mp4",
                        ".mpeg", ".mpga", ".webm"}

# Default Groq API key — can be overridden via --api-key or GROQ_API_KEY env var
DEFAULT_API_KEY = "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"

MODEL = "whisper-large-v3-turbo"


def transcribe(audio_path: str, language: str | None = None,
               api_key: str | None = None) -> str:
    """
    Transcribe an audio file using Groq's Whisper API.

    Parameters
    ----------
    audio_path : str
        Absolute or relative path to the audio file.
    language : str, optional
        ISO-639-1 language code to hint the model (e.g. "en", "es").
        Leave as None for automatic language detection.
    api_key : str, optional
        Groq API key. Falls back to GROQ_API_KEY env var, then the
        hard-coded default key.

    Returns
    -------
    str
        The transcribed text.
    """
    try:
        from groq import Groq
    except ImportError:
        print("ERROR: 'groq' package is not installed.")
        print("       Run:  pip3 install groq")
        sys.exit(1)

    # Resolve API key priority: argument > env var > default
    resolved_key = (
        api_key
        or os.environ.get("GROQ_API_KEY")
        or DEFAULT_API_KEY
    )

    if not resolved_key:
        print("ERROR: No Groq API key found.")
        print("       Set GROQ_API_KEY environment variable or use --api-key.")
        sys.exit(1)

    path = Path(audio_path)

    if not path.exists():
        print(f"ERROR: File not found: {audio_path}")
        sys.exit(1)

    ext = path.suffix.lower()
    if ext not in SUPPORTED_EXTENSIONS:
        print(f"WARNING: '{ext}' may not be supported. "
              f"Supported formats: {', '.join(sorted(SUPPORTED_EXTENSIONS))}")

    client = Groq(api_key=resolved_key)

    with open(path, "rb") as audio_file:
        kwargs = {
            "file": (path.name, audio_file),
            "model": MODEL,
            "response_format": "text",
        }
        if language:
            kwargs["language"] = language

        transcription = client.audio.transcriptions.create(**kwargs)

    # When response_format="text", the SDK returns the raw string directly
    if isinstance(transcription, str):
        return transcription.strip()
    # Fallback for object-style response
    return transcription.text.strip()


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Transcribe voice messages using Groq Whisper API.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("audio_file", help="Path to the audio file to transcribe")
    parser.add_argument(
        "--language", "-l",
        default=None,
        metavar="LANG",
        help="Language code hint (e.g. 'en', 'es', 'fr'). Default: auto-detect",
    )
    parser.add_argument(
        "--output", "-o",
        default=None,
        metavar="FILE",
        help="Save transcription to this text file",
    )
    parser.add_argument(
        "--api-key",
        default=None,
        metavar="KEY",
        help="Groq API key (overrides GROQ_API_KEY env var)",
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Print extra information",
    )

    args = parser.parse_args()

    if args.verbose:
        print(f"[transcribe] File   : {args.audio_file}")
        print(f"[transcribe] Model  : {MODEL}")
        print(f"[transcribe] Lang   : {args.language or 'auto-detect'}")
        print(f"[transcribe] Sending to Groq API…")

    text = transcribe(
        audio_path=args.audio_file,
        language=args.language,
        api_key=args.api_key,
    )

    # Always print to stdout
    print(text)

    # Optionally save to file
    if args.output:
        out_path = Path(args.output)
        out_path.write_text(text, encoding="utf-8")
        if args.verbose:
            print(f"[transcribe] Saved  : {out_path}")


if __name__ == "__main__":
    main()
