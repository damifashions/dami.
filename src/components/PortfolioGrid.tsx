import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, X, Ruler, Sparkles, Share2, Eye, Check, AlertCircle, MessageCircle } from 'lucide-react';
import { Product, DamiLanguage, DamiCurrency } from '../types';
import { PRODUCTS, TRANSLATIONS } from '../data';

interface PortfolioGridProps {
  lang: DamiLanguage;
  currency: DamiCurrency;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToBag: (product: Product, size: string) => void;
}

// Currency Symbol helper
const CURRENCY_SYMBOLS: Record<DamiCurrency, string> = {
  EUR: '€',
  USD: '$',
  MAD: ' DH'
};

export function PortfolioGrid({ lang, currency, wishlist, onToggleWishlist, onAddToBag }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [shareFeedback, setShareFeedback] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  const isRtl = lang === 'ar';

  const categories = [
    { id: 'all', label: TRANSLATIONS.all[lang] },
    { id: 'kimonos', label: TRANSLATIONS.kimonos[lang] },
    { id: 'abayas', label: TRANSLATIONS.abayas[lang] },
    { id: 'sets', label: TRANSLATIONS.sets[lang] },
    { id: 'limited', label: TRANSLATIONS.limited[lang] }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const formatPrice = (priceMap: Record<DamiCurrency, number>) => {
    const value = priceMap[currency];
    if (currency === 'MAD') {
      return `${value.toLocaleString()}${CURRENCY_SYMBOLS[currency]}`;
    }
    return `${CURRENCY_SYMBOLS[currency]}${value}`;
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveImage(product.imageMain);
    setSelectedSize(product.sizes[0] || 'M');
    setShowSizeGuide(false);
  };

  const handleShare = (product: Product) => {
    navigator.clipboard.writeText(`${window.location.origin}/#piece-${product.id}`);
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2000);
  };

  const currentSizeGuideData = [
    { size: 'XS', bust: '80-84cm', waist: '62-66cm', hips: '86-90cm', height: '160-165cm' },
    { size: 'S', bust: '84-88cm', waist: '66-70cm', hips: '90-94cm', height: '165-170cm' },
    { size: 'M', bust: '88-94cm', waist: '70-76cm', hips: '94-100cm', height: '168-175cm' },
    { size: 'L', bust: '94-100cm', waist: '76-82cm', hips: '100-106cm', height: '172-180cm' },
    { size: 'XL', bust: '100-108cm', waist: '82-90cm', hips: '106-114cm', height: '175-185cm' },
    { size: 'Uniques', bust: 'Free Cut', waist: 'Free Cut', hips: 'Free Cut', height: 'Universal' },
  ];

  return (
    <section className="py-24 bg-ivory px-4 md:px-12 tadelakt-shimmer border-t border-sand/30" id="shop">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-gold font-semibold block mb-3">
            {TRANSLATIONS.featuredCollections[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark tracking-wide font-light">
            {selectedCategory === 'all' 
              ? (lang === 'ar' ? 'صالة العرض الفاخرة' : 'Maison de Haute Couture')
              : (categories.find(c => c.id === selectedCategory)?.label)
            }
          </h2>
          <div className="mt-3 flex justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-red-600 bg-red-50/90 border border-red-200/80 px-3.5 py-1">
              {lang === 'ar' ? 'نفدت الكمية (Sold Out)' : 'Sold Out'}
            </span>
          </div>
          <div className="w-16 h-[1.5px] bg-gold/50 mx-auto mt-6" />
        </div>

        {/* Elegant Minimalist Pill Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 max-w-3xl mx-auto p-1.5 bg-[#FAF8F5]/80 border border-sand/40 backdrop-blur-md">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative px-5 py-3 text-xs uppercase tracking-widest font-sans font-medium transition-all duration-300 cursor-pointer text-center ${
                selectedCategory === category.id
                  ? 'text-ivory'
                  : 'text-dark/70 hover:text-dark'
              }`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <span>{category.label}</span>
                <span className={`text-[9px] uppercase tracking-wider font-bold mt-1 ${
                  selectedCategory === category.id ? 'text-red-400' : 'text-red-600'
                }`}>
                  Sold Out
                </span>
              </div>
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-dark"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Global indicator right under all the rubrics */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 border border-red-200 text-red-700 text-[10px] tracking-[0.2em] uppercase font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>
              {lang === 'ar'
                ? 'جميع المجموعات نفدت الكمية — الطلبات متاحة حصرياً عبر واتساب (+212696194894)'
                : lang === 'fr'
                ? 'Toutes les rubriques sont épuisées (Sold Out) — Commandes privées sur WhatsApp (+212696194894)'
                : 'All rubrics currently Sold Out — Bespoke pre-orders via WhatsApp (+212696194894)'}
            </span>
          </div>
        </div>

        {/* Beautiful Editorial Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredProducts.map((product, index) => {
            const hasWishlisted = wishlist.includes(product.id);
            return (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                className="group relative flex flex-col justify-between bg-white overflow-hidden border border-sand/20 hover:shadow-xl transition-all duration-500"
              >
                {/* Image Showcase Container */}
                <div 
                  onClick={() => handleOpenProduct(product)}
                  className="relative aspect-[4/5] w-full overflow-hidden bg-ivory cursor-pointer"
                >
                  {/* Background Main Image with double swap on hover */}
                  <img
                    src={product.imageMain}
                    alt={product.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-105 editorial-zoom"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle luxury mesh gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-30 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

                  {/* Badges */}
                  <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} flex flex-col gap-1.5 z-10`}>
                    <span className="bg-red-700 text-white text-[8px] md:text-[9px] font-bold tracking-widest uppercase px-3 py-1 font-sans shadow-md">
                      {lang === 'ar' ? 'نفدت الكمية' : 'SOLD OUT'}
                    </span>
                    {product.isNew && (
                      <span className="bg-gold text-dark text-[8px] md:text-[9px] font-semibold tracking-widest uppercase px-3 py-1 font-sans">
                        {lang === 'ar' ? 'جديد' : 'NEW'}
                      </span>
                    )}
                    {product.category === 'limited' && (
                      <span className="bg-dark text-sand text-[8px] md:text-[9px] font-semibold tracking-widest uppercase px-3 py-1 font-sans border border-sand/40">
                        {lang === 'ar' ? 'إصدار محدود' : 'LIMITED'}
                      </span>
                    )}
                  </div>

                  {/* Hot Spot Interact button in Center */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-dark/25 backdrop-blur-[2px]">
                    <div className="bg-white text-dark hover:bg-dark hover:text-sand hover:scale-105 px-6 py-3.5 flex items-center gap-2 text-xs uppercase tracking-widest font-sans transition-all duration-300 shadow-2xl">
                      <Eye size={14} className="text-gold" />
                      <span>{lang === 'ar' ? 'عرض الكوتور' : 'Couture View'}</span>
                    </div>
                  </div>
                </div>

                {/* Info and Actions Footer */}
                <div className="p-6 bg-white border-t border-sand/20 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category info & Wishlist trigger */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold block">
                          {product.categoryLabel[lang]}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-red-600 block mt-0.5">
                          Sold Out
                        </span>
                      </div>
                      
                      {/* Wishlist Heart */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className="text-dark/50 hover:text-gold transition-colors p-1.5 rounded-full hover:bg-ivory cursor-pointer"
                        title={hasWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        <Heart
                          size={16}
                          className={hasWishlisted ? "fill-gold text-gold" : "text-dark/60"}
                        />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => handleOpenProduct(product)}
                      className="font-serif text-xl md:text-2xl font-light text-dark hover:text-gold transition-colors cursor-pointer mb-3 leading-tight"
                    >
                      {product.title[lang]}
                    </h3>

                    {/* Description excerpt */}
                    <p className="font-sans font-light text-xs text-dark/70 line-clamp-2 leading-relaxed mb-4">
                      {product.description[lang]}
                    </p>
                  </div>

                  {/* Pricing and Quick Add Bar */}
                  <div className="pt-4 border-t border-sand/15 flex justify-between items-center mt-auto">
                    <span className="font-serif text-lg text-dark/95 font-medium">
                      {formatPrice(product.price)}
                    </span>

                    {/* Quick Add Dropdown or direct Bag trigger */}
                    <div className="flex items-center gap-1.5">
                      {product.sizes.length === 1 && product.sizes[0] === 'Uniques' ? (
                        <button
                          onClick={() => onAddToBag(product, 'Uniques')}
                          className="bg-dark hover:bg-gold text-ivory hover:text-dark px-4 py-2 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-sans font-semibold transition-all duration-300 cursor-pointer"
                        >
                          <ShoppingBag size={12} />
                          <span>{TRANSLATIONS.quickAdd[lang]}</span>
                        </button>
                      ) : (
                        <div className="relative group/size-pop">
                          <button
                            className="bg-[#111111] hover:bg-gold text-ivory hover:text-dark px-4 py-2 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-sans font-semibold transition-all duration-300 cursor-pointer"
                          >
                            <ShoppingBag size={12} />
                            <span>{TRANSLATIONS.quickAdd[lang]}</span>
                          </button>
                          
                          {/* Hover Dropdown of sizes */}
                          <div className={`absolute bottom-full right-0 mb-1 z-30 bg-dark text-ivory border border-sand/20 py-1 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/size-pop:opacity-100 group-hover/size-pop:translate-y-0 group-hover/size-pop:pointer-events-auto transition-all duration-300 min-w-[70px] ${isRtl ? 'left-0' : 'right-0'}`}>
                            {product.sizes.map(size => (
                              <button
                                key={size}
                                onClick={() => onAddToBag(product, size)}
                                className="w-full text-center px-4 py-2 text-[10px] uppercase tracking-widest font-sans hover:bg-gold hover:text-dark transition-all"
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deluxe Couture Editorial Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-dark/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="bg-ivory text-dark w-full max-w-6xl overflow-hidden shadow-2xl border border-sand/40 flex flex-col lg:flex-row max-h-[92vh] lg:max-h-[85vh] relative"
            >
              
              {/* Close Button top-right */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-40 bg-dark text-sand hover:bg-gold hover:text-dark p-2 rounded-full transition-all focus:outline-none cursor-pointer"
                title="Return to Boutique"
              >
                <X size={18} />
              </button>

              {/* Editorial Large Media Grid (Left Column) */}
              <div className="w-full lg:w-3/5 bg-white relative flex flex-col lg:flex-row overflow-hidden min-h-[300px] lg:min-h-full">
                
                {/* Dual Swapping Primary Viewer */}
                <div className="flex-1 relative overflow-hidden bg-ivory">
                  <img
                    src={activeImage}
                    alt={selectedProduct.title[lang]}
                    className="w-full h-full object-cover transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle limited ribbon */}
                  {selectedProduct.category === 'limited' && (
                    <div className="absolute bottom-4 left-4 bg-dark/90 text-sand border border-gold/40 text-[9px] uppercase tracking-[0.25em] px-4 py-2 font-sans font-semibold">
                      ✨ {lang === 'ar' ? 'قطعة نادرة وحصرية' : 'No. 1 of 20 Collector Spec'}
                    </div>
                  )}
                </div>

                {/* Miniature Thumbnails Rail */}
                {selectedProduct.imageAlt && (
                  <div className="relative z-10 flex lg:flex-col justify-center gap-3 p-4 bg-white border-t lg:border-t-0 lg:border-l border-sand/20 shrink-0">
                    <button
                      onClick={() => setActiveImage(selectedProduct.imageMain)}
                      className={`w-14 h-18 bg-ivory overflow-hidden border transition-all cursor-pointer ${
                        activeImage === selectedProduct.imageMain ? 'border-gold p-0.5' : 'border-sand/40 hover:border-gold'
                      }`}
                    >
                      <img src={selectedProduct.imageMain} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="Main thumb" />
                    </button>
                    <button
                      onClick={() => setActiveImage(selectedProduct.imageAlt!)}
                      className={`w-14 h-18 bg-ivory overflow-hidden border transition-all cursor-pointer ${
                        activeImage === selectedProduct.imageAlt ? 'border-gold p-0.5' : 'border-sand/40 hover:border-gold'
                      }`}
                    >
                      <img src={selectedProduct.imageAlt} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="Alt thumb" />
                    </button>
                  </div>
                )}
              </div>

              {/* Atelier Details Panel (Right Column) */}
              <div id="atelier-details" className={`w-full lg:w-2/5 p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[55vh] lg:max-h-full bg-ivory ${isRtl ? 'text-right' : 'text-left'}`}>
                
                <div>
                  {/* Breadcrumb row */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">
                        {selectedProduct.categoryLabel[lang]}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-red-600 block mt-0.5">
                        Sold Out
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-dark/50 uppercase tracking-[0.2em]">
                      {lang === 'ar' ? 'صنع يدوي في المغرب' : 'Handcrafted in Fez Atelier'}
                    </span>
                  </div>

                  {/* Title heading */}
                  <h2 className="font-serif text-3xl md:text-4xl text-dark tracking-wide font-light mb-2">
                    {selectedProduct.title[lang]}
                  </h2>

                  {/* Price display */}
                  <p className="font-serif text-2xl text-gold font-medium mb-6">
                    {formatPrice(selectedProduct.price)}
                  </p>

                  {/* Heritage quote / Description */}
                  <p className="font-sans text-xs md:text-sm font-light text-dark/80 tracking-wide leading-relaxed mb-6 bg-white/40 p-4 border-l-2 border-gold/70">
                    {selectedProduct.description[lang]}
                  </p>

                  {/* Key Luxury Metrics of Artisan Work */}
                  <div className="mb-6 space-y-2">
                    <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-dark/95 font-semibold">
                      {lang === 'ar' ? 'مواصفات القطعة الفريدة' : 'ARTISANAL SPECIFICATIONS'}
                    </p>
                    <ul className="text-xs space-y-1.5 text-dark/80 font-sans font-light">
                      {selectedProduct.details[lang].map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-gold mt-1">✦</span>
                          <span className="leading-tight">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Organic Materials footnote */}
                  <div className="p-3 bg-white border border-sand/40 text-[10px] text-dark/60 font-sans md:mb-6 mb-4 flex items-center gap-2">
                    <Sparkles size={12} className="text-gold shrink-0" />
                    <span><strong>{lang === 'ar' ? 'المواد العضوية' : 'Composition'}:</strong> {selectedProduct.materials[lang]}</span>
                  </div>

                  {/* Interactive Option Pickers (Size & Matrix) */}
                  <div className="mb-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-dark/85 font-semibold">
                        {lang === 'ar' ? 'اختر المقاس' : 'SELECT SIZE'}
                      </label>
                      
                      {/* Size Matrix Toggle */}
                      <button
                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                        className="text-[10px] uppercase font-sans tracking-[0.15em] text-gold hover:text-dark flex items-center gap-1 cursor-pointer font-semibold underline underline-offset-2"
                      >
                        <Ruler size={10} />
                        <span>{TRANSLATIONS.sizeGuideTitle[lang]}</span>
                      </button>
                    </div>

                    {/* Sizing Grid pill buttons */}
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-[10px] font-sans tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                            selectedSize === size
                              ? 'bg-dark text-sand border-dark font-medium'
                              : 'bg-white text-dark/80 border-sand/30 hover:border-dark'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {/* Collapsible size guide table */}
                    <AnimatePresence>
                      {showSizeGuide && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-sand/20 overflow-hidden"
                        >
                          <div className="bg-white p-3 border border-sand/20 text-[10px] font-sans">
                            <p className="font-semibold text-gold mb-2 uppercase tracking-wider text-center">
                              {TRANSLATIONS.sizeGuideTitle[lang]}
                            </p>
                            <table className="w-full text-center">
                              <thead>
                                <tr className="border-b border-sand/30 font-medium text-dark/70">
                                  <th className="pb-1">Size</th>
                                  <th className="pb-1">Bust</th>
                                  <th className="pb-1 font-sans">Waist</th>
                                  <th className="pb-1">Hips</th>
                                  <th className="pb-1">Height</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentSizeGuideData.map((row) => (
                                  <tr 
                                    key={row.size} 
                                    className={`border-b border-sand/10 ${selectedSize === row.size ? 'bg-sand/35 font-medium' : ''}`}
                                  >
                                    <td className="py-1 font-semibold">{row.size}</td>
                                    <td className="py-1">{row.bust}</td>
                                    <td className="py-1">{row.waist}</td>
                                    <td className="py-1">{row.hips}</td>
                                    <td className="py-1">{row.height}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <p className="text-[8px] text-dark/50 mt-2 text-center">
                              {lang === 'ar' 
                                ? '* تلتزم دامي بتقديم فئة قياسات فضفاضة مريحة تليق بكل قوام.' 
                                : '* Dami uses a modern comfort-relaxed layout. Uniques fits body matrices from S up to XL perfectly.'}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Checkout Integration & Share Actions Footer */}
                <div className="pt-6 border-t border-sand/30 mt-6 lg:mt-auto space-y-3">
                  <div className="flex gap-2.5">
                    {/* Add to Bag */}
                    <button
                      onClick={() => {
                        onAddToBag(selectedProduct, selectedSize);
                      }}
                      className="flex-1 bg-dark hover:bg-gold text-ivory hover:text-dark py-4 px-6 uppercase text-xs tracking-[0.25em] font-sans font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={14} />
                      <span>{lang === 'ar' ? 'إضافة إلى حقيبة التسوق' : 'Secure and Add to Bag'}</span>
                    </button>

                    {/* Wishlist toggle */}
                    <button
                      onClick={() => onToggleWishlist(selectedProduct.id)}
                      className="bg-white hover:bg-sand/20 border border-sand/40 text-dark p-3.5 transition-all cursor-pointer"
                      title="Toggle Wishlist"
                    >
                      <Heart
                        size={18}
                        className={wishlist.includes(selectedProduct.id) ? "fill-gold text-gold scale-105" : "text-dark/80"}
                      />
                    </button>
                  </div>

                  {/* Direct WhatsApp Order Button */}
                  <button
                    onClick={() => {
                      const defaultGreeting = lang === 'fr'
                        ? "Bonjour, je souhaite commander cette pièce sur WhatsApp:"
                        : lang === 'ar'
                        ? "مرحباً، أود طلب هذه القطعة الفاخرة عبر واتساب:"
                        : "Hello, I would like to order this piece on WhatsApp:";
                      const text = encodeURIComponent(
                        `${defaultGreeting}\n\n*${selectedProduct.title[lang]}*\n*${lang === 'ar' ? 'المقاس' : 'Size'}:* ${selectedSize}\n*${lang === 'ar' ? 'السعر' : 'Price'}:* ${formatPrice(selectedProduct.price)}`
                      );
                      window.open(`https://wa.me/212696194894?text=${text}`, '_blank');
                    }}
                    className="w-full bg-[#25D366] hover:bg-[#1ebf58] text-white py-3.5 px-6 uppercase text-xs tracking-[0.2em] font-sans font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-green-500/20"
                  >
                    <MessageCircle size={15} />
                    <span>{lang === 'ar' ? 'طلب في واتساب (+212696194894)' : lang === 'fr' ? 'Commander sur WhatsApp (+212696194894)' : 'Order in WhatsApp (+212696194894)'}</span>
                  </button>

                  {/* Share button and live copy URL */}
                  <div className="flex justify-between items-center text-[10px] text-dark/50 font-sans px-1">
                    <button
                      onClick={() => handleShare(selectedProduct)}
                      className="hover:text-gold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Share2 size={12} className="text-gold" />
                      <span>{shareFeedback ? (lang === 'ar' ? 'تم نسخ الرابط!' : 'Couture Link Copied!') : (lang === 'ar' ? 'مشاركة هذه القطعة' : 'Share Artisan Piece')}</span>
                    </button>
                    <span>
                      {selectedProduct.inStock ? (
                        <span className="text-emerald-700 font-semibold uppercase tracking-widest">● {lang === 'ar' ? 'متوفر بالمخزن' : 'Piece Available'}</span>
                      ) : (
                        <span className="text-red-750 uppercase tracking-widest">● {lang === 'ar' ? 'نفذت الكمية' : 'Sold out'}</span>
                      )}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
