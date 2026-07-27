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

      {/* Single Master Music Toggle Button */}
      <div className={`fixed bottom-6 ${isRtl ? 'right-6' : 'left-6'} z-50`}>
        <motion.button
          onClick={handleSingleButtonClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center space-x-2.5 px-4 py-3 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 cursor-pointer ${
            soundEnabled && isPlaying
              ? 'bg-dark/95 text-gold border-gold/60 shadow-gold/30'
              : 'bg-dark/80 text-ivory/60 border-ivory/20 hover:border-gold/40 hover:text-gold'
          }`}
          title={soundEnabled ? "Shutdown Music" : "Play Spiritual Ambient Music"}
        >
          {soundEnabled && isPlaying ? (
            <>
              <Volume2 size={16} className="text-gold animate-pulse" />
              <span className="font-sans text-[11px] font-semibold tracking-wider uppercase pr-1">
                {lang === 'ar' ? 'الموسيقى : شغال' : lang === 'fr' ? 'Musique : Activée' : 'Music : Playing'}
              </span>
              <span className="flex space-x-0.5 items-end h-3 ml-0.5">
                <span className="w-0.5 bg-gold h-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-0.5 bg-gold h-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-0.5 bg-gold h-full animate-bounce"></span>
              </span>
            </>
          ) : (
            <>
              <VolumeX size={16} className="text-ivory/50" />
              <span className="font-sans text-[11px] font-medium tracking-wider uppercase pr-1">
                {lang === 'ar' ? 'الموسيقى : متوقفة' : lang === 'fr' ? 'Musique : Désactivée' : 'Music : Off'}
              </span>
              <Music size={12} className="text-ivory/40" />
            </>
          )}
        </motion.button>
      </div>
    </>
  );
}
