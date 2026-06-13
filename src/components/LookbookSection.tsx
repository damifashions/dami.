import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { DamiLanguage } from '../types';
import { LOOKBOOK_ITEMS, TRANSLATIONS } from '../data';

interface LookbookSectionProps {
  lang: DamiLanguage;
}

export function LookbookSection({ lang }: LookbookSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isRtl = lang === 'ar';

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % LOOKBOOK_ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length);
  };

  return (
    <section className="py-24 bg-dark text-ivory relative overflow-hidden" id="lookbook">
      {/* Structural decoration mimic plaster arches */}
      <div className="absolute left-10 top-20 w-44 h-96 rounded-t-full border border-ivory/5 pointer-events-none hidden lg:block" />
      <div className="absolute right-10 bottom-20 w-44 h-96 rounded-t-full border border-ivory/5 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-sand font-bold block mb-3">
            {lang === 'ar' ? 'رحلة بصرية للأزياء والملابس' : 'THE LUXURY CAPSULE VISUALS'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-wide font-light">
            {TRANSLATIONS.lookbookTitle[lang]}
          </h2>
          <p className="font-sans text-xs md:text-sm font-light text-ivory/60 max-w-2xl mx-auto mt-4 tracking-widest leading-relaxed">
            {TRANSLATIONS.lookbookSubtitle[lang]}
          </p>
          <div className="w-16 h-[1px] bg-sand/40 mx-auto mt-6" />
        </div>

        {/* Magazine-Style Layout (Double Column) */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start`}>
          
          {/* Column 1: Immersive image with slow zoom and scale transition (Left side, takes 7cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-zinc-900 border border-sand/20 shadow-2xl relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={LOOKBOOK_ITEMS[activeIndex].imageUrl}
                  alt={LOOKBOOK_ITEMS[activeIndex].title[lang]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Ambient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Custom arrow switchers mounted on the card corner */}
            <div className={`absolute bottom-4 ${isRtl ? 'left-4' : 'right-4'} flex bg-dark border border-ivory/20 shadow-2xl`}>
              <button 
                onClick={handlePrev} 
                className="p-4 hover:bg-sand hover:text-dark transition-colors cursor-pointer border-r border-ivory/10"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNext} 
                className="p-4 hover:bg-sand hover:text-dark transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Column 2: Journal Description & Designer Quotes (Right side, takes 5cols) */}
          <div className={`lg:col-span-5 space-y-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                transition={{ duration: 0.7 }}
                className="space-y-6"
              >
                {/* Location indicator */}
                <div className="flex items-center space-x-2 text-sand text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold">
                  <Compass size={12} className="text-gold" />
                  <span>{LOOKBOOK_ITEMS[activeIndex].setting[lang]}</span>
                </div>

                {/* Looking title */}
                <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light leading-tight tracking-wide">
                  {LOOKBOOK_ITEMS[activeIndex].title[lang]}
                </h3>

                {/* Subtitle location context */}
                <p className="font-sans text-xs sm:text-sm font-light text-ivory/70 leading-relaxed tracking-wider">
                  {LOOKBOOK_ITEMS[activeIndex].subtitle[lang]}
                </p>

                {/* Large visual designer quotes */}
                <div className={`p-6 bg-[#1A1A1A] ${isRtl ? 'border-r-2 text-right' : 'border-l-2 text-left'} border-gold space-y-3 relative`}>
                  <span className="absolute right-4 top-2 opacity-5 text-ivory pointer-events-none">
                    <Quote size={40} />
                  </span>
                  <p className="font-serif italic text-sm text-sand/95 leading-relaxed tracking-wide">
                    "{LOOKBOOK_ITEMS[activeIndex].designerQuote[lang]}"
                  </p>
                  <p className="font-sans text-[8px] tracking-widest text-[#B89B5E] font-bold uppercase">
                    — Maison Dami Creative Director
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Custom index trackers */}
            <div className={`flex items-center gap-2 pt-4 border-t border-ivory/10 ${isRtl ? 'justify-end' : ''}`}>
              {LOOKBOOK_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-[2px] transition-all cursor-pointer ${
                    activeIndex === i ? 'w-10 bg-gold' : 'w-4 bg-ivory/25 hover:bg-gold/50'
                  }`}
                  title={`Page ${i + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
