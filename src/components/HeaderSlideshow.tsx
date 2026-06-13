import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles, Sliders } from 'lucide-react';
import { DamiLanguage } from '../types';
import { TRANSLATIONS } from '../data';

interface HeaderSlideshowProps {
  lang: DamiLanguage;
  onShopClick: () => void;
  onStoryClick: () => void;
}

interface Slide {
  id: number;
  url: string;
  titles: Record<DamiLanguage, string>;
  claims: Record<DamiLanguage, string>;
  settings: Record<DamiLanguage, string>;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    url: 'https://cdn.corenexis.com/f/BoAGz8OuGjq.jpg', // Under Crafted Heritage. Worn Today background image requested by user
    titles: {
      en: "Crafted Heritage. Worn Today.",
      fr: "Héritage Artisanal. Porté Aujourd'hui.",
      ar: "تراث مصاغ. نرتديه اليوم."
    },
    claims: {
      en: "Traditional elegance redefined for a contemporary global audience.",
      fr: "L'élégance traditionnelle marocaine réinventée dans des coupes épurées.",
      ar: "نُعيد صياغة الأناقة التقليدية بأبعاد معاصرة تناسب الحاضر."
    },
    settings: {
      en: "The Medina Streets, Marrakech",
      fr: "Les Rues de la Médina, Marrakech",
      ar: "شوارع المدينة القديمة، مراكش"
    }
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1920&auto=format&fit=crop', // Beautiful pure golden sand dunes of the Merzouga Sahara desert
    titles: {
      en: "The Golden Dunes.",
      fr: "Les Dunes d'Or.",
      ar: "الكثبان الذهبية."
    },
    claims: {
      en: "Endless waves of pure Sahara sand sculpted by hot desert winds.",
      fr: "Vagues infinies du Sahara marocain sculptées par le vent du désert.",
      ar: "أمواج غير متناهية من رمال الصحراء الذهبية يُشكلها نسيم مرزوكة."
    },
    settings: {
      en: "Golden Sand Dunes, Merzouga",
      fr: "Dunes d'Or, Merzouga",
      ar: "كثبان مرزوكة الذهبية"
    }
  }
];

export function HeaderSlideshow({ lang, onShopClick, onStoryClick }: HeaderSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isRtl = lang === 'ar';

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 7000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <header className="relative h-screen w-full overflow-hidden flex flex-col justify-center bg-dark" id="home">
      {/* Background Slideshow with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_SLIDES[currentIndex].url})` }}
          />
        </AnimatePresence>
        
        {/* Subtle Luxury Overlays: Cinematic Shadow, Warm Light, Plaster Pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-dark/40 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(17,17,17,0.7)_100%)] z-10" />
        
        {/* Fine sand-grain textured mesh */}
        <div className="absolute inset-0 bg-repeat opacity-[0.03] pointer-events-none z-15" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* Hero Content with Responsive Arabic/Latin Typography */}
      <div className={`relative z-20 px-6 md:px-12 lg:px-24 text-ivory max-w-5xl -mt-10 md:-mt-16 ${isRtl ? 'text-right mr-auto w-full' : 'text-left'}`}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${currentIndex}-${lang}`}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Setting Location indicator */}
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-sand font-medium inline-flex items-center mb-5 gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {HERO_SLIDES[currentIndex].settings[lang]}
            </span>
            
            {/* Majestic Serif Header */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-wide mb-6 font-light drop-shadow-sm max-w-4xl">
              {HERO_SLIDES[currentIndex].titles[lang]}
            </h1>
            
            {/* Refined claim */}
            <p className="font-sans text-sm sm:text-base md:text-lg font-light text-ivory/80 mb-10 tracking-widest leading-relaxed max-w-2xl">
              {HERO_SLIDES[currentIndex].claims[lang]}
            </p>

            {/* Premium Buttons */}
            <div className={`flex flex-wrap gap-4 mb-2 ${isRtl ? 'justify-start lg:flex-row-reverse' : ''}`}>
              <button
                onClick={onShopClick}
                className="group relative px-8 py-4 bg-sand text-dark hover:bg-white hover:text-dark font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xl cursor-pointer"
              >
                {TRANSLATIONS.shopCollection[lang]}
                <span className="absolute -inset-0.5 border border-gold/40 scale-105 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
              </button>
              
              <button
                onClick={onStoryClick}
                className="px-8 py-4 bg-dark/40 text-ivory hover:bg-dark/70 border border-ivory/30 hover:border-sand font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm cursor-pointer"
              >
                {TRANSLATIONS.discoverDami[lang]}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Controls & Progress */}
      <div className={`absolute bottom-10 left-6 right-6 md:left-12 md:right-12 z-30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Brand Authenticity Note */}
        <div className={`flex flex-col gap-1 ${isRtl ? 'items-end' : 'items-start'}`}>
          <span className="font-serif italic text-xs tracking-wider text-sand/80">
            Dami Maison de Couture
          </span>
          <span className="font-sans text-[8px] md:text-[10px] tracking-[0.15em] text-ivory/50 uppercase">
            {lang === 'ar' ? 'فاس · مراكش · دبي · باريس' : 'Fez · Marrakech · Paris · Dubai'}
          </span>
        </div>

        {/* Dynamic Controls Grid */}
        <div className={`flex items-center space-x-6 bg-dark/60 backdrop-blur-md px-6 py-3 border border-ivory/10 ${isRtl ? 'flex-row-reverse' : ''}`}>
          
          {/* Pause / Play Trigger */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-ivory/70 hover:text-sand transition-colors cursor-pointer p-1"
            title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>

          {/* Atmospheric Soundtrack Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-ivory/70 hover:text-sand transition-colors cursor-pointer p-1 relative"
            title="Toggle Ambient Oasis Sound"
          >
            {soundEnabled ? (
              <>
                <Volume2 size={14} className="text-gold" />
                <span className="absolute -top-1.5 -right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
                </span>
              </>
            ) : (
              <VolumeX size={14} />
            )}
          </button>

          {/* Previous Slide Button */}
          <button
            onClick={handlePrev}
            className="text-ivory/70 hover:text-sand transition-colors cursor-pointer p-1"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Progress Indicators */}
          <div className="flex items-center space-x-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => selectSlide(idx)}
                className="group relative h-6 flex items-center cursor-pointer"
                title={`Product View ${idx + 1}`}
              >
                {/* Indicator Line */}
                <div className="w-8 h-[1px] bg-ivory/20 overflow-hidden transition-all duration-300 group-hover:bg-ivory/40">
                  {idx === currentIndex && (
                    <motion.div
                      layoutId="activeSlideProgress"
                      className="h-full bg-gold"
                      initial={{ width: '0%' }}
                      animate={{ width: isPlaying ? '100%' : '105%' }}
                      transition={{ 
                        duration: isPlaying ? 7 : 0.4, 
                        ease: isPlaying ? "linear" : "easeOut" 
                      }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Next Slide Button */}
          <button
            onClick={handleNext}
            className="text-ivory/70 hover:text-sand transition-colors cursor-pointer p-1"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Atmospheric Soundtrack Box */}
      <AnimatePresence>
        {soundEnabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed bottom-28 z-50 bg-dark/95 border border-gold/30 text-ivory p-4 shadow-2xl backdrop-blur-xl max-w-xs ${isRtl ? 'left-6 md:left-12' : 'right-6 md:right-12'}`}
          >
            <div className="flex items-start space-x-3">
              <div className="bg-gold/10 p-1.5 rounded-full text-gold shrink-0">
                <Sparkles size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[10px] font-semibold text-gold uppercase tracking-widest">
                  {lang === 'ar' ? 'صدى الصحراء الأصيل' : 'DESERT WIND SOUNDTRACK'}
                </p>
                <p className="font-serif text-xs italic mt-1 text-ivory/90 truncate">
                  "Oud Reverie & Golden Sands Breeze"
                </p>
                <p className="font-sans text-[9px] text-ivory/60 mt-1 leading-relaxed">
                  {lang === 'ar' 
                    ? 'صوت نسيم رملي هادئ مع عزف عود خافت لتجربة مغربية ساحرة.'
                    : 'A soothing acoustic oud harmony layered with soft dunes winds allows full collection immersion.'}
                </p>
              </div>
              <button 
                onClick={() => setSoundEnabled(false)}
                className="text-ivory/50 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>
            
            {/* Audio wave animation */}
            <div className="flex items-end justify-center space-x-1 mt-4 h-4">
              {[1, 2, 3, 4, 3, 2, 4, 3, 2, 1, 3, 2, 4, 1].map((val, i) => (
                <motion.div
                  key={i}
                  className="w-[1.5px] bg-gold rounded-full"
                  animate={{ height: [`${val * 2}px`, `${(val + 1.5) * 3}px`, `${val * 2}px`] }}
                  transition={{
                    duration: 0.7 + (i % 3) * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
