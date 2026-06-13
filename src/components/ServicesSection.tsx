import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Heart, Anchor, Scissors } from 'lucide-react';
import { DamiLanguage } from '../types';
import { TRANSLATIONS } from '../data';

interface ServicesSectionProps {
  lang: DamiLanguage;
}

const STORY_TEXTS = {
  quote: {
    en: "Dami was born from a desire to preserve Moroccan elegance while redefining it for a new generation.",
    fr: "Dami est née de la volonté de préserver l'élégance marocaine tout en la redéfinissant pour une nouvelle génération.",
    ar: "ولدت دامي من رغبة صادقة في الحفاظ على الأناقة المغربية العريقة مع إعادة صياغتها لتناسب جيلاً جديداً."
  },
  body1: {
    en: "We believe that true luxury is patience. By collaborating directly with independent family cooperatives in Fez, Marrakech, and High Atlas mountain villages, we protect centuries-old hand-weaving, silk-spinning, and calligraphy sewing techniques from the modern fast-fashion cycle.",
    fr: "Nous croyons que le vrai luxe réside dans la patience. En collaborant directement avec des coopératives artisanales familiales indépendantes, nous protégeons des techniques séculaires de tissage à la main, de filage de soie et de couture de sfifa royale face aux pressions de la mode éphémère.",
    ar: "نحن نؤمن بأن الفخامة الحقيقية تكمن في الصبر والتأني. من خلال تعاوننا المباشر مع تعاونيات عائلية مستقلة، نحمي التقنيات التقليدية التي توارثتها الأجيال لقرون طائفة من الزمان من زحف الموضة السريعة الرخيصة."
  },
  body2: {
    en: "Each Dami garment carries a unique spiritual stamp: lines inspired by modern Moroccan architecture, plaster textures, and high-altitude desert light. It is an invitation to wear heritage confidently, with shapes constructed to breathe and flow with the human body.",
    fr: "Chaque vêtement Dami porte une empreinte unique : des lignes inspirées de l'architecture brutaliste des nouveaux riads, du toucher de la chaux tadelakt et de la lumière dorée du Sahara. Un hommage vibrant à porter l'histoire avec assurance.",
    ar: "تحمل كل قطعة من دامي طابعاً روحياً خاصاً وتفاصيل معمارية مذهلة مستوحاة من جدران التادلاكت العاتية وزوايا الضوء والظل في واحات الجنوب."
  }
};

const VALUES = [
  {
    icon: <Scissors className="text-gold" size={20} />,
    title: {
      en: "Bespoke Geometry",
      fr: "Coupe Géométrique",
      ar: "قصّات معمارية"
    },
    desc: {
      en: "Constructed with minimal waste, respecting fabric boundaries to create elegant fluid shapes for all frames.",
      fr: "Conçus dans un respect absolu de la matière pour offrir un drapé noble et majestueux.",
      ar: "نصمم قصاتنا بهندسة مريحة منسدلة بأقل قدر من مخلفات الأقمشة."
    }
  },
  {
    icon: <Sparkles className="text-gold" size={20} />,
    title: {
      en: "Traceable Fez Silk & Gold Thread",
      fr: "Savoir-Faire Impérial de Fès",
      ar: "حرير وخيوط مذهبة أصلية"
    },
    desc: {
      en: "We source wild mulberry silk and work alongside premium thread makers who handcraft the golden borders.",
      fr: "Nous approvisionnons nos ateliers en fils d'or pur cousus délicatement avec de la soie fine de Mûrier.",
      ar: "نقتني الحرير العضوي وخيوط الصقلي الأصلية لتهدي من يرتديها فخامة الملوك."
    }
  },
  {
    icon: <Heart className="text-gold" size={20} />,
    title: {
      en: "Fair Atelier Cooperatives",
      fr: "Commerce Équitable Humain",
      ar: "تمكين الحرفيين الأخلاقي"
    },
    desc: {
      en: "Uncompromised work standards. We pay above market rates, allowing ancient artisan lineages to thrive.",
      fr: "Respect absolu du temps de travail. Nous garantissons des revenus dignes aux maitres artisans.",
      ar: "توفير بيئة عمل عادلة بمدخول كريم يليق بكرامة صانعي حضارتنا الأصيلة."
    }
  }
];

export function ServicesSection({ lang }: ServicesSectionProps) {
  const isRtl = lang === 'ar';

  return (
    <section className="py-24 px-6 md:px-12 bg-[#F6F2EB] relative overflow-hidden" id="story">
      {/* Structural Backdrop decor */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-ivory/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className={`mb-16 border-b border-sand/40 pb-6 flex flex-col md:flex-row justify-between items-start md:items-baseline ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <div>
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold block mb-2 font-semibold">
              {lang === 'ar' ? 'فلسفة دامي' : 'LA MAISON & ARTISANAT'}
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-dark tracking-wide font-light">
              {TRANSLATIONS.ourStoryTitle[lang]}
            </h3>
          </div>
          <span className="font-serif italic text-xs md:text-sm text-dark/50 mt-2 md:mt-0 tracking-wider">
            {lang === 'ar' ? 'توازن معاصر مع التراث المغربي' : 'Preserving the Invisible Heritage'}
          </span>
        </div>

        {/* Large Luxury Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Editorial Plaster & Loom Focus Imagery */}
          <div className="col-span-1 lg:col-span-5 relative">
            
            {/* Main Immersive image representing natural light & hand woven texturing */}
            <div className="aspect-[3/4] overflow-hidden bg-[#EAE3D6] border border-sand/40 shadow-xl relative group">
              <img 
                src="https://cdn.corenexis.com/f/5xn7qKzdXpm.png" // User-requested image under modern moroccan minimalism
                alt="Dami premium warm linen tailored details" 
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Symmetrical shadow filter */}
              <div className="absolute inset-0 bg-[#4D5643]/10 mix-blend-multiply pointer-events-none" />
            </div>

            {/* Accent Floating Image representing riad architectural space under sunlight */}
            <div className="absolute -bottom-10 -right-6 lg:-right-10 w-2/5 aspect-[3/4] bg-white border-2 border-[#FAF8F5] shadow-2xl hidden sm:block overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1549556250-3a529711f33a?q=80&w=600&auto=format&fit=crop" // User image 3: Riad column pool
                alt="Dami luxury riad reflecting pool couture" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Fine decorative sand text line */}
            <div className={`absolute -top-6 ${isRtl ? 'left-6' : 'right-6'} font-mono text-[8px] text-dark/30 tracking-widest uppercase`}>
              {lang === 'ar' ? 'نموذج الكوتور المغربي' : 'MODERN MOROCCAN MINIMALISM'}
            </div>
          </div>

          {/* RIGHT COLUMN: The Luxury Redefinition Narrative */}
          <div className={`col-span-1 lg:col-span-7 space-y-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            {/* Headline statement */}
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-dark font-light leading-relaxed tracking-wide text-gold italic border-l-2 border-gold pl-6 py-2">
              "{STORY_TEXTS.quote[lang]}"
            </blockquote>

            <div className="space-y-6 font-sans text-xs sm:text-sm font-light text-dark/80 leading-relaxed tracking-wide">
              <p>
                {STORY_TEXTS.body1[lang]}
              </p>
              <p>
                {STORY_TEXTS.body2[lang]}
              </p>
            </div>

            {/* Pillars Grid */}
            <div className="pt-6 border-t border-sand/40 space-y-6">
              {VALUES.map((val, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className="bg-white p-2.5 shadow-sm border border-sand/30 text-gold shrink-0 mt-1">
                    {val.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-medium text-dark tracking-wide">
                      {val.title[lang]}
                    </h4>
                    <p className="font-sans text-xs font-light text-dark/60 leading-relaxed mt-1">
                      {val.desc[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
