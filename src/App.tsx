import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Heart, ShoppingBag, Globe, Trash2, Plus, Minus, 
  Sparkles, Instagram, Check, Compass, Mail, ChevronRight,
  Info, ArrowUpRight
} from 'lucide-react';

// Subcomponents
import { HeaderSlideshow } from './components/HeaderSlideshow';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ServicesSection } from './components/ServicesSection';
import { LookbookSection } from './components/LookbookSection';
import { InteractiveContact } from './components/InteractiveContact';
import { LegalModal } from './components/LegalModal';

// Domain data and constants
import { DamiLanguage, DamiCurrency, Product, CartItem } from './types';
import { TRANSLATIONS, PRODUCTS, TESTIMONIALS, INSTAGRAM_POSTS } from './data';

export default function App() {
  // Locale States
  const [lang, setLang] = useState<DamiLanguage>('en');
  const [currency, setCurrency] = useState<DamiCurrency>('EUR');

  // Navigation Panel state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Cart / Bag drawer state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Testimonial sliding index
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Legal Modals state
  const [activeLegalModal, setActiveLegalModal] = useState<'impressum' | 'datenschutz' | null>(null);

  // Checkout process simulation state
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Contact prefill state
  const [prefilledProductTitle, setPrefilledProductTitle] = useState<string>('');

  // Newsletter subscription states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const isRtl = lang === 'ar';

  // Monitor Scroll for clean backdrop trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatic slide timing for testimonial catalog
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  // Sync Wishlist from primitive local database cache
  useEffect(() => {
    const saved = localStorage.getItem('dami_wishlist');
    if (saved) {
      try { setWishlist(JSON.parse(saved)); } catch (e) {}
    }
    const savedCart = localStorage.getItem('dami_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }
  }, []);

  // Toggle Item inside Wishlist helper
  const handleToggleWishlist = (id: string) => {
    const updated = wishlist.includes(id)
      ? wishlist.filter(item => item !== id)
      : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem('dami_wishlist', JSON.stringify(updated));
  };

  // Add Item to Shopping bag helper
  const handleAddToBag = (product: Product, size: string) => {
    const existingIdx = cart.findIndex(
      item => item.product.id === product.id && item.selectedSize === size
    );

    let updated: CartItem[];
    if (existingIdx > -1) {
      updated = [...cart];
      updated[existingIdx].quantity += 1;
    } else {
      updated = [...cart, { product, selectedSize: size, quantity: 1 }];
    }

    setCart(updated);
    localStorage.setItem('dami_cart', JSON.stringify(updated));
    setIsCartOpen(true); // Open the drawer immediately on addition
  };

  // Adjust Shopping Bag item quantities
  const handleUpdateCartQuantity = (id: string, size: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.product.id === id && item.selectedSize === size) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, nextQty) };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem('dami_cart', JSON.stringify(updated));
  };

  // Delete Item from Shopping bag altogether
  const handleRemoveFromCart = (id: string, size: string) => {
    const updated = cart.filter(item => !(item.product.id === id && item.selectedSize === size));
    setCart(updated);
    localStorage.setItem('dami_cart', JSON.stringify(updated));
  };

  // Clear all cart items
  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('dami_cart');
  };

  // Calculate sum of order
  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price[currency] * item.quantity), 0);
  };

  // Currency symbol printer helper
  const getCurrencySymbol = (curr: DamiCurrency) => {
    if (curr === 'EUR') return '€';
    if (curr === 'USD') return '$';
    return ' DH';
  };

  // Smooth scroll helper
  const scrollToIdHandler = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trigger Custom inquiry prefill on custom fitting clicks
  const triggerFittingPrefill = (productTitle: string) => {
    setPrefilledProductTitle(productTitle);
    scrollToIdHandler('contact');
  };

  // Handle Simulated checkout
  const handleStartSimulatedCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      handleClearCart();
    }, 2000);
  };

  return (
    <div className={`bg-[#FDFBF7] text-dark font-sans antialiased selection:bg-gold selection:text-white relative min-h-screen ${isRtl ? 'rtl' : 'ltr'}`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* A. GRAND THE ART OF MODERN HERITAGE PORTICO */}
      <div className="bg-dark text-ivory pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-12 text-center select-none relative border-b border-gold/20 overflow-hidden z-20">
        {/* User requested background image with fine subtle dark overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none" 
          style={{ backgroundImage: 'url("https://cdn.corenexis.com/f/3Zo4PeTNDRI.jpg")' }} 
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        {/* Subtle background lines/glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,155,94,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-repeat opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto flex flex-col items-center justify-center relative z-10"
        >
          <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold font-bold mb-4 block">
            {lang === 'ar' ? 'بيان الهوية والتراث' : 'Maison de l\'Élégance'}
          </span>
          <h2 className="font-serif font-extralight tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] leading-tight text-sand max-w-5xl uppercase select-text text-[36px] sm:text-[44px] md:text-[68px] lg:text-[80px] xl:text-[90px]">
            {lang === 'ar' ? 'فن التراث الحديث' : 'The Art of Modern Heritage'}
          </h2>
          <div className="w-16 h-[1px] bg-gold/40 my-6 md:my-8" />
          <p className="font-sans text-[11px] sm:text-xs md:text-sm font-light tracking-[0.2em] uppercase text-ivory/60 max-w-xl">
            {lang === 'ar' ? 'تآلف صامت بين الحرفية الملكية ونقاء المعاصرة' : 'A Silent Synergy of Royal Craft & Contemporary Structure'}
          </p>
        </motion.div>
      </div>
      {/* B. FIXED HEADER ARCHITECTURE */}
      <nav className={`fixed top-0 left-0 w-full z-45 transition-all duration-[600ms] flex flex-col ${
        scrolled 
          ? 'bg-[#F8F5F0] text-[#111111] border-b border-[#111111]/5' 
          : 'bg-transparent text-[#F8F5F0] border-b border-white/5'
      }`}>
        {/* Extremely thin Top Bar (Rail) */}
        <div className={`h-[34px] w-full overflow-hidden flex items-center relative font-sans text-[10px] tracking-[0.25em] uppercase font-medium border-b shrink-0 transition-colors duration-[600ms] ${
          scrolled ? 'bg-[#111111] text-[#F8F5F0]/85 border-[#111111]/10' : 'bg-dark/40 text-[#F8F5F0]/80 border-white/5'
        }`}>
          <div className="marquee-container w-full">
            <div className="marquee-scroll flex gap-20 shrink-0">
              {Array(6).fill(null).map((_, i) => (
                <span key={i} className="flex items-center gap-4 shrink-0">
                  <span>✦ Inspired by Morocco. Refined for the World.</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Row: Logo & Side Utilities */}
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 pt-4 pb-2.5 flex items-center justify-between relative">
          {/* Leftside: Language and Currency switches (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-[9px] font-sans tracking-[0.2em] uppercase">
            {/* Currency selector drops */}
            <div className="flex gap-2">
              {(['EUR', 'USD', 'MAD'] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`hover:text-gold transition-colors font-semibold select-none ${
                    currency === curr ? 'text-gold underline underline-offset-4 decoration-1 font-bold' : 'opacity-65 text-current'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <span className="opacity-30">|</span>

            {/* Language Switchers */}
            <div className="flex gap-2.5">
              {(['en', 'fr', 'ar'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`hover:text-gold transition-colors font-bold select-none ${
                    lang === l ? 'text-gold underline underline-offset-4 decoration-1' : 'opacity-65 text-current'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Symmetrical Left Mobile Burger Menu */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 hover:text-gold cursor-pointer text-current focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>

          {/* Centered Brand Name Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToIdHandler('home'); }}
              className="font-serif text-3xl sm:text-[34px] tracking-[0.45em] uppercase hover:text-gold transition-colors font-light select-none pl-[0.45em]"
            >
              DAMI
            </a>
          </div>

          {/* Right side: Cart & Wishlist */}
          <div className="flex items-center gap-4.5 md:gap-6 text-current">
            {/* Quick Wishlist icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative hover:text-gold transition-colors p-1"
              title="Wishlist catalog"
            >
              <Heart size={16} className={wishlist.length > 0 ? "fill-gold text-gold" : "text-current"} />
              {wishlist.length > 0 && (
                <span className={`absolute -top-1 -right-1 text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border ${
                  scrolled ? 'bg-[#111111] text-ivory border-[#F8F5F0]' : 'bg-gold text-dark border-dark'
                }`}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Quick Bags Shopping icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-gold transition-colors p-1"
              title="Shopping Bag"
            >
              <ShoppingBag size={16} />
              {cart.length > 0 && (
                <span className={`absolute -top-1 -right-1 text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border ${
                  scrolled ? 'bg-[#111111] text-[#F8F5F0] border-[#F8F5F0]' : 'bg-gold text-dark border-dark'
                }`}>
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Secondary Row: Symmetrical centered navigation links (Desktop only) */}
        <div className="hidden lg:flex justify-center items-center gap-12 text-[10px] sm:text-[11px] font-sans tracking-[0.3em] uppercase font-semibold pt-1 pb-4">
          <a href="#shop" onClick={(e) => { e.preventDefault(); scrollToIdHandler('shop'); }} className="hover:text-gold transition-colors custom-underline">{TRANSLATIONS.all[lang]}</a>
          <a href="#shop" onClick={(e) => { e.preventDefault(); scrollToIdHandler('shop'); }} className="hover:text-gold transition-colors custom-underline">{lang === 'ar' ? 'المجموعات' : 'Collections'}</a>
          <a href="#lookbook" onClick={(e) => { e.preventDefault(); scrollToIdHandler('lookbook'); }} className="hover:text-gold transition-colors custom-underline">{TRANSLATIONS.lookbookTitle[lang]}</a>
          <a href="#story" onClick={(e) => { e.preventDefault(); scrollToIdHandler('story'); }} className="hover:text-gold transition-colors custom-underline">{lang === 'ar' ? 'القصة والأثر' : 'Story & Legacy'}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToIdHandler('contact'); }} className="hover:text-gold transition-colors custom-underline">{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</a>
        </div>
      </nav>

      {/* C. SLIDE OVER DRAWER FOR FULL MENU (MOBILE AND DEEP NAVIGATION LINKS) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            className="fixed inset-0 z-40 bg-dark text-ivory flex flex-col lg:flex-row justify-between"
          >
            {/* Left Column Decor */}
            <div className={`hidden lg:flex w-2/5 p-16 flex-col justify-between border-r border-ivory/10 bg-gradient-to-tr from-dark/95 to-zinc-900 relative`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,215,195,0.06)_0%,transparent_75%)] pointer-events-none" />
              <div>
                <span className="font-serif italic text-gold text-sm tracking-wider block mb-2">Heritage Over Time.</span>
                <h4 className="font-serif text-4xl lg:text-5xl font-light uppercase text-sand max-w-sm leading-tight">
                  Crafted Heritage. Worn Today.
                </h4>
                <p className="font-sans text-xs font-light text-ivory/60 leading-relaxed mt-4 max-w-xs">
                  We invite you to experience the silent confidence of handcrafted clothing preserved within historic Moroccan spaces, tailored for modern global living.
                </p>
              </div>

              <div className="space-y-2 text-sans text-[10px] text-ivory/50 uppercase tracking-widest">
                <p>© 2026 Dami Luxury S.A.R.L.</p>
                <p>Marrakech Ateliers · Fez Medinas</p>
              </div>
            </div>

            {/* Right link collection (takes full screen on small viewport) */}
            <div className="w-full lg:w-3/5 p-8 md:p-20 flex flex-col justify-between pt-32 overflow-y-auto min-h-screen">
              
              {/* Responsive selectors drawer for mobile view (hidden in desktop navbar) */}
              <div className="flex sm:hidden flex-col gap-3 py-4 border-b border-ivory/10 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-wider text-sand uppercase">Currency:</span>
                  <div className="flex bg-[#1b1916] border border-ivory/15 p-0.5">
                    {(['EUR', 'USD', 'MAD'] as const).map(curr => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`px-3 py-1.5 text-[9px] font-sans tracking-wider ${
                          currency === curr ? 'text-dark bg-sand' : 'text-ivory'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-wider text-sand uppercase">Language:</span>
                  <div className="flex bg-[#1b1916] border border-ivory/15 p-0.5">
                    {(['en', 'fr', 'ar'] as const).map(l => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1.5 text-[9px] font-sans tracking-wider font-bold ${
                          lang === l ? 'text-dark bg-sand' : 'text-ivory'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold block font-semibold">NAVIGATION INDEX</span>
                <ul className={`space-y-4 md:space-y-6 font-serif text-3xl sm:text-5xl ${isRtl ? 'text-right' : 'text-left'}`}>
                  {[
                    { label: TRANSLATIONS.all[lang], href: '#shop', target: 'shop' },
                    { label: lang === 'ar' ? 'قصة العلامة وتراثنا' : 'Heritage & Artisans', href: '#story', target: 'story' },
                    { label: TRANSLATIONS.lookbookTitle[lang], href: '#lookbook', target: 'lookbook' },
                    { label: lang === 'ar' ? 'حجز موعد قياس كوتور' : 'Bespoke Fitting & Contact', href: '#contact', target: 'contact' }
                  ].map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.href}
                        onClick={() => scrollToIdHandler(item.target)}
                        className="inline-block relative font-light hover:text-gold transition-all duration-300 hover:translate-x-1 group"
                      >
                        <span className="font-sans text-xs text-gold/45 mr-3 inline-block font-bold">0{idx + 1}</span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick action info banner inside mobile drawer */}
              <div className="pt-8 border-t border-ivory/15 mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-sans text-ivory/60">
                <p>{lang === 'ar' ? 'هل تود استشارة خاصة بمقاساتك؟' : 'Need remote sizing guidance from Fez weavers?'}</p>
                <button
                  onClick={() => scrollToIdHandler('contact')}
                  className="bg-sand text-dark hover:bg-white px-6 py-3 uppercase text-[10px] tracking-widest font-sans font-bold cursor-pointer transition-colors"
                >
                  {lang === 'ar' ? 'طلب كوتور مخصص' : 'Inscribe Custom Request'}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* D. MAJESTIC HEADER HERO SLIDESHOW */}
      <HeaderSlideshow 
        lang={lang} 
        onShopClick={() => scrollToIdHandler('shop')} 
        onStoryClick={() => scrollToIdHandler('story')} 
      />

      {/* E. BRAND VISION & WELCOME SUMMARY CARD */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-ivory text-dark relative" id="heritage">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold font-bold block">
              {lang === 'ar' ? 'ملمس الأصالة ومطرزات التراث' : 'MAISON DE COUTURE MOROC'}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark tracking-wide font-light max-w-3xl mx-auto">
              Dami
            </h2>
            <div className="w-12 h-[1px] bg-gold/50 mx-auto my-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8 font-sans font-light text-base sm:text-lg md:text-xl leading-relaxed text-dark/80 max-w-3xl mx-auto"
          >
            <p>
              {lang === 'ar' 
                ? 'علامة مغربية رائدة للأزياء الفاخرة، صُممت خصيصاً لتجمع بين أناقة القياصرة وهيبة التراث اليدوي العريق وجمالية التبسيط المعاصر.' 
                : 'Dami is a premium Moroccan clothing house combining ancestral royal garments with contemporary, clean structural shapes.'
              }
            </p>
            
            <p className="font-serif text-xl sm:text-2xl md:text-3xl italic text-gold tracking-wide leading-relaxed max-w-2xl mx-auto">
              {lang === 'ar'
                ? '«التصاميم صُنعت لتتنفس بحرية، والخطوط مستوحاة من الأقواس المعمارية لفسيفساء رياض مراكش.»'
                : '“Timeless silhouettes constructed in sand-washed wild silks, Flanders raw linen, and golden sfifa borders—woven to endure for centuries.”'
              }
            </p>

            <p className="text-xs sm:text-sm text-dark/70 leading-relaxed max-w-xl mx-auto font-light">
              {lang === 'ar' 
                ? 'تُمثل كل قطعة تحفة فنية حية مرقمة، يُبذل في حياكتها وتطريزها يدوياً ما يزيد عن ١٤ ساعة عمل متواصل لإحياء تراث النسيج العريق.' 
                : 'Every piece is a collectible certified layout, crafted alongside independent families inside local cooperatives to sustain timeless heritages.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* F. PRODUCT DISPLAY INTERFACE WITH TRANSLATION ENGINE */}
      <PortfolioGrid 
        lang={lang} 
        currency={currency} 
        wishlist={wishlist} 
        onToggleWishlist={handleToggleWishlist} 
        onAddToBag={handleAddToBag} 
      />

      {/* G. VISUAL HERITAGE NARRATIVE & SPLIT SCREEN STORY */}
      <ServicesSection lang={lang} />

      {/* H. COUTURE BOOKLET SECTION */}
      <LookbookSection lang={lang} />

      {/* I. CHRONOLOGY TESTIMONIAL CAROUSEL */}
      <section className="py-24 px-6 bg-[#FAF7F2] border-y border-sand/30 flex items-center justify-center overflow-hidden">
        <div className="max-w-4xl text-center relative px-4 flex flex-col items-center">
          
          <div className="bg-sand/30 p-4 rounded-full text-gold shrink-0 mb-6 border border-sand/40">
            <Sparkles size={20} className="text-gold" />
          </div>

          <div className="min-h-[220px] sm:min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIdx}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Quote Text */}
                <p className="font-serif text-xl sm:text-2xl leading-relaxed text-dark tracking-wide italic max-w-3xl">
                  "{TESTIMONIALS[activeTestimonialIdx].quote[lang]}"
                </p>
                
                {/* Author Credentials */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] font-semibold text-dark">
                    — {TESTIMONIALS[activeTestimonialIdx].author}
                  </p>
                  <p className="font-serif italic text-xs text-gold mt-1.5 font-light">
                    Maison Member · {TESTIMONIALS[activeTestimonialIdx].city}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav dots */}
          <div className="flex space-x-1.5 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonialIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeTestimonialIdx ? 'bg-gold scale-125' : 'bg-sand/60 hover:bg-gold/50'
                }`}
                title={`Patron testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* J. THE ROYAL PORTFOLIO PHOTO */}
      <section className="grid grid-cols-1 md:grid-cols-2 bg-ivory border-b border-sand/30" id="philosophy">
        {/* Grayscale vintage image background container */}
        <div className="relative min-h-[400px] md:h-auto overflow-hidden group">
          <img 
            src="https://cdn.corenexis.com/f/dnGY8UBkkSr.jpg" 
            alt="Handwoven luxury Moroccan craftsmanship" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-transform duration-[2000ms] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-40" />
          
          <div className="absolute bottom-6 left-6 text-ivory">
            <span className="font-sans text-[9px] tracking-widest text-gold uppercase">MAISON DE COUTURE ATELIER</span>
            <p className="font-serif italic text-sm text-ivory/95">"Simplicity is the safe sanctuary of royal beauty."</p>
          </div>
        </div>

        {/* Editorial Text Content */}
        <div className={`p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-[#F6F2EB] ${isRtl ? 'text-right' : 'text-left'}`}>
          <span className="font-sans text-xs uppercase tracking-widest text-gold mb-3 block font-semibold">
            {lang === 'ar' ? 'فلسفة الصنع الروحية' : 'SLOW FASHION RESOLUTION'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-dark tracking-wide mb-8 font-light">
            {lang === 'ar' ? 'روح هادئة، تفاصيل فخمة' : 'The Invisible Thread'}
          </h2>
          
          <div className="space-y-6 font-sans font-light text-xs sm:text-sm text-dark/85 leading-relaxed tracking-wide">
            <p>
              {lang === 'ar' 
                ? 'نؤمن في دار دامي بأن كل نسيج وثوب يروي تاريخاً. لا نسعى لإنتاج المئات من القطع، بل نتطلع لتوفير بضعة إصدارات محدودة تمثل ملاذاً دافئاً للباحثين عن هيبة الحضور والتفرد.' 
                : 'We believe that luxury stands in total discretion. We refuse fast clothing trends, focusing purely on 15 to 20 highly engineered capsule pieces per summer season. Our tailors handcraft every seams, selecting certified threads of real gold.'
              }
            </p>
            <p>
              {lang === 'ar' 
                ? 'يسري عملنا ببطء ووقار وهدوء. نأخذ للتصميم حقه لتليق بمواصفات عملاء التادلاكت والرمال الذهبية وأعالي الأطلس.' 
                : 'For more than 10 years, our collaborative weavers have guarded classical Moroccan stitch configurations. Wearing Dami is not merely showing luxury attire; it is carrying historic landmarks on-the-go.'
              }
            </p>
            <p className="font-serif text-gold italic text-lg sm:text-xl">
              {lang === 'ar'
                ? '«دامي ليست حلة عادية، إنما ذكريات مغزولة بالذهب تتباهى بها مفاخر الوجود.»'
                : '“No fast cycles. Only precious heirloom collections crafted to breathe with secure natural luxury.”'
              }
            </p>
          </div>

          <div className={`mt-8 flex items-center space-x-6 border-t border-sand/35 pt-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="text-center font-sans">
              <span className="font-serif text-2xl text-dark block font-semibold">100%</span>
              <span className="font-sans text-[8px] sm:text-[9px] uppercase text-dark/50 tracking-wider">
                {lang === 'ar' ? 'مواد عضوية معتمدة' : 'Organic Loom Fibers'}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-sand/50" />
            <div className="text-center font-sans">
              <span className="font-serif text-2xl text-dark block font-semibold">14 Hrs</span>
              <span className="font-sans text-[8px] sm:text-[9px] uppercase text-dark/50 tracking-wider">
                {lang === 'ar' ? 'حياكة يدوية كاملة' : 'Stitched by Hand'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* K. THE ACTIVE BESPOKE FORM & CONSOLE GATE */}
      <InteractiveContact 
        lang={lang} 
        prefilledProductTitle={prefilledProductTitle} 
        onClearPrefill={() => setPrefilledProductTitle('')} 
      />

      {/* L. INSTAGRAM ARCHIVES ACCENT */}
      <section className="py-24 bg-[#FCFBF8] border-t border-sand/30" id="instagram">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <a 
              href="https://www.instagram.com/dami.maroc/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold inline-flex justify-center items-center gap-1.5 hover:text-dark transition-colors group"
            >
              <Instagram size={14} className="text-gold group-hover:scale-110 transition-transform" />
              <span>@dami.maroc</span>
            </a>
            <p className="font-serif text-2xl text-dark font-light mt-2 tracking-wide">
              {lang === 'ar' ? 'تفضل بزيارة معرض الدار البصري' : 'Atelier Journals & Guest Archives'}
            </p>
          </div>

          {/* Symmetrical luxury grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {INSTAGRAM_POSTS.map((post) => (
              <a 
                key={post.id} 
                href="https://www.instagram.com/dami.maroc/"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square bg-ivory overflow-hidden border border-sand/20 group relative shadow-sm block cursor-pointer"
              >
                <img 
                  src={post.url} 
                  alt="Dami editorial lifestyle focus" 
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 filter group-hover:brightness-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[10px] tracking-widest uppercase font-bold font-sans">View Profile</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* M. BEAUTIFUL MAISON COUTURE FOOTER */}
      <footer className="bg-dark text-ivory pt-20 pb-12 px-6 md:px-12 border-t border-gold/25 relative overflow-hidden">
        
        {/* Subtle grid elements */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-ivory/10 pb-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <h4 className="font-serif text-3xl tracking-[0.25em] text-sand font-light">DAMI</h4>
            <p className="font-sans text-xs font-light text-ivory/60 leading-relaxed">
              Moroccan luxury fashion house dedicated to preserving imperial artisanal hand-weaving, silk work, and noble geometric cuts.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 font-sans text-xs">
            <h5 className="font-semibold text-gold uppercase tracking-widest text-[9px]">EXPLORE MAISON</h5>
            <ul className="space-y-2 text-ivory/75 font-light tracking-wider">
              <li><a href="#shop" onClick={() => scrollToIdHandler('shop')} className="hover:text-gold transition-colors">{TRANSLATIONS.all[lang]}</a></li>
              <li><a href="#story" onClick={() => scrollToIdHandler('story')} className="hover:text-gold transition-colors">{lang === 'ar' ? 'قصّة وتاريخ الدار' : 'Heritage & Cooperatives'}</a></li>
              <li><a href="#lookbook" onClick={() => scrollToIdHandler('lookbook')} className="hover:text-gold transition-colors">{TRANSLATIONS.lookbookTitle[lang]}</a></li>
              <li><a href="#contact" onClick={() => scrollToIdHandler('contact')} className="hover:text-gold transition-colors">{lang === 'ar' ? 'خدمة التفصيل والكوتور' : 'Premium Sizing Assistance'}</a></li>
            </ul>
          </div>

          {/* Sizing & Custom requests */}
          <div className="space-y-4 font-sans text-xs">
            <h5 className="font-semibold text-gold uppercase tracking-widest text-[9px]">CLIENT ASSISTANCE</h5>
            <ul className="space-y-2 text-ivory/75 font-light tracking-wider">
              <li><a href="#contact" onClick={() => scrollToIdHandler('contact')} className="hover:text-gold transition-colors">{lang === 'ar' ? 'حجز موعد قياس كوتور بالرياض' : 'Private Riad Fitting Session'}</a></li>
              <li><a href="#shop" onClick={() => scrollToIdHandler('shop')} className="hover:text-gold transition-colors">{lang === 'ar' ? 'التحقق من المقاسات والقياس' : 'Virtual size guide verification'}</a></li>
              <li><a href="#contact" onClick={() => scrollToIdHandler('contact')} className="hover:text-gold transition-colors">{lang === 'ar' ? 'تسجيلات المراسلات والمقترحات' : 'Atelier Commission Registry'}</a></li>
            </ul>
          </div>

          {/* Newsletter Form section */}
          <div className="space-y-4">
            <h5 className="font-sans font-semibold text-gold uppercase tracking-widest text-[9px]">{TRANSLATIONS.newsletterTitle[lang]}</h5>
            <p className="font-sans text-xs text-ivory/65 leading-relaxed font-light">
              {TRANSLATIONS.newsletterSub[lang]}
            </p>
            
            {/* Quick newsletter signup */}
            {newsletterSuccess ? (
              <div className="p-3 bg-[#1A1A1A] border border-gold/40 text-gold text-xs font-light rounded">
                {TRANSLATIONS.successSubscribe[lang]}
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
                    return;
                  }
                  setNewsletterSubmitting(true);
                  fetch("https://formspree.io/f/mykabwnz", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: JSON.stringify({
                      email: newsletterEmail,
                      subject: "Newsletter Circle Subscription"
                    })
                  })
                  .then(() => {
                    setNewsletterSubmitting(false);
                    setNewsletterSuccess(true);
                    setNewsletterEmail('');
                  })
                  .catch((error) => {
                    console.error("Newsletter submission error:", error);
                    setNewsletterSubmitting(false);
                    setNewsletterSuccess(true);
                    setNewsletterEmail('');
                  });
                }}
                className="flex bg-[#1A1A1A] border border-sand/30 p-1"
              >
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={TRANSLATIONS.placeholderEmail[lang]} 
                  required
                  disabled={newsletterSubmitting}
                  className="w-full bg-transparent text-xs text-ivory px-3 py-2 border-none focus:outline-none placeholder-ivory/30 focus:ring-0"
                />
                <button 
                  type="submit"
                  disabled={newsletterSubmitting}
                  className="bg-sand text-dark hover:bg-white disabled:opacity-50 text-[10px] font-sans font-bold uppercase tracking-wider px-4 transition-colors cursor-pointer shrink-0"
                >
                  {newsletterSubmitting 
                    ? (lang === 'ar' ? 'انتظار...' : 'Joining...') 
                    : (lang === 'ar' ? 'انضمام' : 'Join')
                  }
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Closing details and legal modals triggers */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest uppercase text-ivory/50 font-sans">
          <p>© 2026 DAMI LUXURY ENTERPRISE. ALL ARTISANS PRESERVED WITH HONOUR.</p>
          
          <div className="space-x-5 mt-4 md:mt-0 font-sans font-semibold flex items-center">
            <button 
              onClick={() => setActiveLegalModal('impressum')}
              className="hover:text-gold transition-colors cursor-pointer text-[10px] tracking-wider font-semibold uppercase"
            >
              {lang === 'ar' ? 'تفاصيل الدار' : 'Impressum'}
            </button>
            <span>·</span>
            <button 
              onClick={() => setActiveLegalModal('datenschutz')}
              className="hover:text-gold transition-colors cursor-pointer text-[10px] tracking-wider font-semibold uppercase"
            >
              {lang === 'ar' ? 'ميثاق الخصوصية' : 'Heritage Policy'}
            </button>
          </div>
        </div>
      </footer>

      {/* N. PERSISTENT SLIDE OUT BAG / SHOPPING CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden select-none">
            {/* Backdrop black overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-dark/70 backdrop-blur-xs cursor-pointer"
            />

            <div className={`absolute inset-y-0 ${isRtl ? 'left-0 border-r' : 'right-0 border-l'} max-w-full flex`}>
              <motion.div 
                initial={{ x: isRtl ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: isRtl ? '-100%' : '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 220 }}
                className="w-screen max-w-md bg-ivory text-dark flex flex-col justify-between shadow-2xl relative border-sand/40"
              >
                
                {/* Drawer Header */}
                <div className={`p-6 border-b border-sand/35 flex justify-between items-center bg-white/45 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <ShoppingBag size={18} className="text-gold" />
                    <h3 className="font-serif text-2xl font-light text-dark tracking-wide">
                      {TRANSLATIONS.cart[lang]}
                    </h3>
                    <span className="font-sans text-xs bg-dark text-sand px-2 py-0.5 font-bold">
                      {cart.reduce((st, it) => st + it.quantity, 0)}
                    </span>
                  </div>

                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 text-dark/75 hover:text-gold cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Simulated Checkout Success Screen */}
                <AnimatePresence mode="wait">
                  {checkoutSuccess ? (
                    <motion.div 
                      key="succ"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-6 bg-white"
                    >
                      <div className="bg-gold/15 p-4 rounded-full text-gold border border-gold/45 animate-bounce">
                        <Check size={36} />
                      </div>
                      <h4 className="font-serif text-3xl font-light text-dark tracking-wide">
                        {lang === 'ar' ? 'شاكرين لجميل ثقتكم بالدار' : 'Couture Spec Secure'}
                      </h4>
                      <p className="font-sans text-xs text-dark/70 font-light leading-relaxed max-w-xs">
                        {lang === 'ar'
                          ? 'لقد تم تقييد طلبيتك بمقاساتها المطلوبة وسيصلك إشعار شحن دولي برمز التتبع تليفونياً ومراسلتك.'
                          : 'Your order is recorded securely under royal artisan verification. Pre-transit custom clearances will verify sizing calculations before express flight courier allocates parcel space.'
                        }
                      </p>
                      
                      <button
                        onClick={() => {
                          setCheckoutSuccess(false);
                          setIsCartOpen(false);
                        }}
                        className="bg-dark hover:bg-gold text-sand hover:text-dark px-10 py-3.5 text-xs uppercase tracking-widest font-sans font-bold transition-all cursor-pointer shadow-md"
                      >
                        {TRANSLATIONS.backToShopping[lang]}
                      </button>
                    </motion.div>
                  ) : (
                    /* Drawer Cart List */
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-4">
                          <ShoppingBag size={32} className="text-sand/70" />
                          <p className="font-serif italic text-sm text-dark/65">
                            {TRANSLATIONS.emptyCart[lang]}
                          </p>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="bg-dark text-sand px-6 py-2.5 text-xs font-sans uppercase tracking-widest cursor-pointer hover:bg-gold hover:text-dark transition-all"
                          >
                            Browse Silk Kimonos
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {cart.map((item, idx) => (
                            <div 
                              key={`${item.product.id}-${item.selectedSize}`} 
                              className={`flex gap-4 p-4 bg-white border border-sand/20 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                              {/* Product Thumbnail */}
                              <div className="w-20 h-24 bg-ivory overflow-hidden border border-sand/30 shrink-0">
                                <img src={item.product.imageMain} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                              </div>

                              {/* Item actions & detail */}
                              <div className={`flex-1 flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'}`}>
                                <div>
                                  <div className={`flex justify-between items-start gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                    <h4 className="font-serif text-base text-dark leading-tight line-clamp-1">{item.product.title[lang]}</h4>
                                    
                                    <button 
                                      onClick={() => handleRemoveFromCart(item.product.id, item.selectedSize)}
                                      className="text-dark/40 hover:text-red-650 cursor-pointer p-0.5"
                                      title="Remove"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                  
                                  <div className={`flex gap-4 text-[10px] text-dark/50 font-sans tracking-wide mt-1 uppercase ${isRtl ? 'justify-end' : ''}`}>
                                    <span>{lang === 'ar' ? 'المقاس:' : 'Size:'} <strong className="font-bold text-gold">{item.selectedSize}</strong></span>
                                    <span>{item.product.categoryLabel[lang]}</span>
                                  </div>
                                </div>

                                {/* Quantity Incremental Switcher */}
                                <div className={`flex justify-between items-center mt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                  <div className="flex border border-sand/40 bg-[#FAF8F5] p-0.5 items-center">
                                    <button 
                                      onClick={() => handleUpdateCartQuantity(item.product.id, item.selectedSize, -1)}
                                      className="p-1 text-dark/70 hover:text-gold cursor-pointer"
                                    >
                                      <Minus size={10} />
                                    </button>
                                    <span className="font-mono text-xs px-3 font-semibold text-dark">{item.quantity}</span>
                                    <button 
                                      onClick={() => handleUpdateCartQuantity(item.product.id, item.selectedSize, 1)}
                                      className="p-1 text-dark/70 hover:text-gold cursor-pointer"
                                    >
                                      <Plus size={10} />
                                    </button>
                                  </div>

                                  <span className="font-serif text-sm font-semibold text-dark text-right">
                                    {(item.product.price[currency] * item.quantity).toLocaleString()}{getCurrencySymbol(currency)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </AnimatePresence>

                {/* Drawer Sticky Footer summary */}
                {cart.length > 0 && !checkoutSuccess && (
                  <div className="p-6 bg-white border-t border-sand/35 space-y-4">
                    <div className={`flex justify-between font-serif text-lg tracking-wide border-b border-sand/15 pb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span>{lang === 'ar' ? 'المجموع الكلي:' : 'Atelier Subtotal:'}</span>
                      <span className="font-bold text-gold">
                        {calculateCartTotal().toLocaleString()}{getCurrencySymbol(currency)}
                      </span>
                    </div>

                    <p className="font-sans text-[9px] text-dark/50 leading-relaxed text-center italic">
                      {lang === 'ar' 
                        ? '* الأسعار شاملة الجمارك، ورسوم النقل المضمون المغلق عبر الجو.' 
                        : '* VAT and prestige customized border duty clears are included. Fast Priority air shipment allocated.'}
                    </p>

                    <button
                      onClick={handleStartSimulatedCheckout}
                      disabled={isCheckingOut}
                      className="w-full bg-dark hover:bg-gold text-sand hover:text-dark py-4 text-xs font-sans uppercase tracking-[0.25em] font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
                    >
                      {isCheckingOut ? (
                        <>
                          <span className="w-3 h-3 border-2 border-sand/30 border-t-gold rounded-full animate-spin" />
                          <span>{lang === 'ar' ? 'جاري التحقق المالي...' : 'Pre-authorizing Secure Checkout...'}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={12} className="text-gold" />
                          <span>{TRANSLATIONS.checkout[lang]}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* O. SLIDE OUT WISHLIST DRAWER */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden select-none">
            {/* Backdrop cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="absolute inset-0 bg-dark/70 backdrop-blur-xs cursor-pointer"
            />

            <div className={`absolute inset-y-0 ${isRtl ? 'left-0 border-r' : 'right-0 border-l'} max-w-full flex`}>
              <motion.div 
                initial={{ x: isRtl ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: isRtl ? '-100%' : '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 220 }}
                className="w-screen max-w-md bg-ivory text-dark flex flex-col justify-between shadow-2xl relative border-sand/40"
              >
                
                {/* Wishlist Header */}
                <div className={`p-6 border-b border-sand/35 flex justify-between items-center bg-white/45 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Heart size={16} className="text-gold fill-gold" />
                    <h3 className="font-serif text-2xl font-light text-dark tracking-wide">
                      {TRANSLATIONS.wishlist[lang]}
                    </h3>
                    <span className="font-sans text-xs bg-dark text-sand px-2 py-0.5 font-bold">
                      {wishlist.length}
                    </span>
                  </div>

                  <button 
                    onClick={() => setIsWishlistOpen(false)}
                    className="p-1 text-dark/75 hover:text-gold cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Wishlist list body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {wishlist.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-4">
                      <Heart size={28} className="text-sand" />
                      <p className="font-serif italic text-sm text-dark/75">
                        {lang === 'ar' ? 'صالة مفضلاتك فارغة حالياً.' : 'Your luxury wishlist has not been allocated yet.'}
                      </p>
                      <button
                        onClick={() => setIsWishlistOpen(false)}
                        className="bg-dark text-sand px-6 py-2.5 text-xs font-sans uppercase tracking-widest cursor-pointer hover:bg-gold hover:text-dark transition-all"
                      >
                        Discover Tunics &amp; Sets
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {wishlist.map(productId => {
                        const product = PRODUCTS.find(p => p.id === productId);
                        if (!product) return null;
                        return (
                          <div 
                            key={product.id} 
                            className={`flex gap-4 p-4 bg-white border border-sand/20 justify-between items-center ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}
                          >
                            <div className={`flex gap-3 items-center ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                              {/* Thumbnail */}
                              <div className="w-14 h-18 bg-ivory overflow-hidden border border-sand/30 shrink-0">
                                <img src={product.imageMain} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                              </div>

                              <div className={isRtl ? 'text-right' : 'text-left'}>
                                <h4 className="font-serif text-sm font-semibold text-dark line-clamp-1">{product.title[lang]}</h4>
                                <span className="text-[10px] text-gold font-serif mt-0.5 block">{product.price[currency].toLocaleString()}{getCurrencySymbol(currency)}</span>
                              </div>
                            </div>

                            {/* Actions block */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => {
                                  handleAddToBag(product, product.sizes[0] || 'M');
                                  handleToggleWishlist(product.id);
                                  setIsWishlistOpen(false);
                                }}
                                className="bg-dark text-[8px] font-sans tracking-widest hover:bg-gold hover:text-dark text-sand px-3 py-2 uppercase font-bold shrink-0 transition-all cursor-pointer"
                              >
                                {lang === 'ar' ? 'أضف للحقيبة' : 'Add to Bag'}
                              </button>

                              <button
                                onClick={() => handleToggleWishlist(product.id)}
                                className="text-red-500 hover:text-red-650 p-1.5 cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="p-6 bg-white border-t border-sand/35 text-center">
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      scrollToIdHandler('shop');
                    }}
                    className="w-full border border-dark text-dark hover:bg-dark hover:text-sand py-3 text-[10px] font-sans uppercase tracking-widest font-bold transition-all cursor-pointer"
                  >
                    {lang === 'ar' ? 'استمرار تصفح الموديلات' : 'Continue Sifting Capsule'}
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* P. GLOBAL MODAL FOR LEGAL TERMS */}
      <LegalModal 
        type={activeLegalModal}
        lang={lang}
        onClose={() => setActiveLegalModal(null)} 
      />

    </div>
  );
}
