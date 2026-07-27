import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { DamiLanguage } from '../types';

interface BackgroundAudioProps {
  lang: DamiLanguage;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
  audioUrl?: string;
}

// Top curated high-reliability direct MP3 streams for oriental spiritual/oud ambient music similar to "Ruhi"
const AUDIO_SOURCES = [
  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=arabic-ambient-112520.mp3",
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8872b78.mp3?filename=middle-eastern-oriental-ambient-14406.mp3",
  "https://cdn.pixabay.com/download/audio/2022/10/14/audio_993188d8b9.mp3?filename=arabic-meditation-oud-122978.mp3"
];

export function BackgroundAudio({ lang, soundEnabled, onToggleSound, audioUrl }: BackgroundAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);

  // Web Audio Synthesizer ref (binaural oriental oud ambient generator fallback)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<any[]>([]);

  const currentAudioSource = audioUrl || AUDIO_SOURCES[sourceIndex];
  const isRtl = lang === 'ar';

  const playAudio = () => {
    if (!soundEnabled) return;

    if (audioRef.current) {
      audioRef.current.volume = 0.35;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            stopAmbientSynth();
          })
          .catch((err) => {
            console.warn("Audio playback gesture lock or network delay, starting ambient synth fallback:", err);
            startAmbientSynth();
          });
      }
    } else {
      startAmbientSynth();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopAmbientSynth();
    setIsPlaying(false);
  };

  // Synchronize playback with soundEnabled prop
  useEffect(() => {
    if (soundEnabled) {
      playAudio();
    } else {
      pauseAudio();
    }
  }, [soundEnabled, sourceIndex]);

  // Global user interaction listener to unlock audio on first click or touch
  useEffect(() => {
    const handleFirstGesture = () => {
      if (soundEnabled && !isPlaying) {
        playAudio();
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };
  }, [soundEnabled, isPlaying]);

  // Web Audio Synth Fallback (Spiritual Pentatonic Oud Drone)
  const startAmbientSynth = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }

      if (audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        stopAmbientSynth();

        // Spiritual Arabic Maqam Rast / Bayati pitch harmony (D, F, G, A)
        const freqs = [146.83, 174.61, 196.00, 220.00, 293.66];
        const ctx = audioCtxRef.current;
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
        masterGain.connect(ctx.destination);

        const nodes: any[] = [masterGain];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle pitch bend LFO for organic acoustic resonance
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.08 + idx * 0.03, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          gain.gain.setValueAtTime(0.05, ctx.currentTime);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start();

          nodes.push(osc, gain, lfo, lfoGain);
        });

        synthNodesRef.current = nodes;
        setIsPlaying(true);
      }
    } catch (e) {
      console.error("Web Audio fallback failed:", e);
    }
  };

  const stopAmbientSynth = () => {
    synthNodesRef.current.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    synthNodesRef.current = [];
  };

  const handleAudioError = () => {
    // Try next stream source if network fails or link expires
    if (sourceIndex < AUDIO_SOURCES.length - 1) {
      setSourceIndex(prev => prev + 1);
    } else {
      startAmbientSynth();
    }
  };

  const handleSingleButtonClick = () => {
    onToggleSound(!soundEnabled);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentAudioSource}
        loop
        preload="auto"
        onError={handleAudioError}
        onEnded={() => {
          if (soundEnabled) playAudio();
        }}
      />

      {/* Single Master Music Toggle Button - Compact Corner Audio */}
      <div className={`fixed bottom-3 sm:bottom-4 ${isRtl ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} z-40`}>
        <motion.button
          onClick={handleSingleButtonClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer ${
            soundEnabled && isPlaying
              ? 'bg-dark/90 text-gold border-gold/40 shadow-gold/20'
              : 'bg-dark/70 text-ivory/50 border-ivory/15 hover:border-gold/30 hover:text-gold'
          }`}
          title={soundEnabled ? "Mute Music" : "Play Ambient Music"}
        >
          {soundEnabled && isPlaying ? (
            <>
              <Volume2 size={13} className="text-gold animate-pulse shrink-0" />
              <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-wider uppercase">
                {lang === 'ar' ? 'موسيقى' : lang === 'fr' ? 'Musique' : 'Music'}
              </span>
              <span className="flex space-x-0.5 items-end h-2.5 ml-0.5 shrink-0">
                <span className="w-0.5 bg-gold h-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-0.5 bg-gold h-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-0.5 bg-gold h-full animate-bounce"></span>
              </span>
            </>
          ) : (
            <>
              <VolumeX size={13} className="text-ivory/40 shrink-0" />
              <span className="font-sans text-[9px] sm:text-[10px] font-medium tracking-wider uppercase opacity-75">
                {lang === 'ar' ? 'صامت' : lang === 'fr' ? 'Muet' : 'Muted'}
              </span>
              <Music size={10} className="text-ivory/30 shrink-0" />
            </>
          )}
        </motion.button>
      </div>
    </>
  );
}
