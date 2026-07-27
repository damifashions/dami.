import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Check, Sparkles, Send, Phone, ArrowRight, Truck } from 'lucide-react';
import { DamiLanguage, DamiCurrency, Product, CartItem } from '../types';
import { PRODUCTS } from '../data';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: DamiLanguage;
  currency: DamiCurrency;
  cart: CartItem[];
  onAddToBag: (product: Product, size: string) => void;
  onClearCart: () => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  isOpen,
  onClose,
  lang,
  currency,
  cart,
  onAddToBag,
  onClearCart,
}) => {
  const isRtl = lang === 'ar';

  const getCurrencySymbol = (curr: DamiCurrency) => {
    if (curr === 'EUR') return '€';
    if (curr === 'USD') return '$';
    return ' DH';
  };

  // Default selected product for direct order if cart is empty
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0]?.id || '');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const currentProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  // Calculate order total
  const hasCartItems = cart.length > 0;
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price[currency] * item.quantity), 0);
  const singleTotal = currentProduct ? currentProduct.price[currency] * quantity : 0;
  const finalTotal = hasCartItems ? cartTotal : singleTotal;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !address) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderRef(`DAMI-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderConfirmed(true);
      if (hasCartItems) {
        onClearCart();
      }
    }, 1200);
  };

  const handleWhatsAppOrder = () => {
    const itemsText = hasCartItems
      ? cart.map(i => `${i.product.title[lang]} (${i.selectedSize}) x${i.quantity}`).join(', ')
      : `${currentProduct.title[lang]} (${selectedSize}) x${quantity}`;

    const defaultGreeting = lang === 'fr'
      ? "Bonjour, je souhaite passer une commande depuis le site web / Hello, I'd like to place an order from the website:"
      : lang === 'ar'
      ? "مرحباً، أود تقديم طلبية من الموقع الإلكتروني / Bonjour, je souhaite passer une commande depuis le site web:"
      : "Hello, I'd like to place an order from the website / Bonjour, je souhaite passer une commande depuis le site web:";

    const labels = {
      items: lang === 'fr' ? 'Articles' : lang === 'ar' ? 'المنتجات' : 'Items',
      total: lang === 'fr' ? 'Total' : lang === 'ar' ? 'المجموع' : 'Total',
      name: lang === 'fr' ? 'Nom' : lang === 'ar' ? 'الاسم' : 'Name',
      phone: lang === 'fr' ? 'Téléphone' : lang === 'ar' ? 'الهاتف' : 'Phone',
      address: lang === 'fr' ? 'Ville/Adresse' : lang === 'ar' ? 'المدينة/العنوان' : 'City/Address',
      client: lang === 'fr' ? 'Client' : lang === 'ar' ? 'عميل' : 'Client',
    };

    const text = encodeURIComponent(
      `${defaultGreeting}\n\n*${labels.items}:* ${itemsText}\n*${labels.total}:* ${finalTotal}${getCurrencySymbol(currency)}\n*${labels.name}:* ${fullName || labels.client}\n*${labels.phone}:* ${phoneNumber || '-'}\n*${labels.address}:* ${city ? city + ', ' : ''}${address || '-'}`
    );

    window.open(`https://wa.me/212696194894?text=${text}`, '_blank');
  };

  const resetModal = () => {
    setOrderConfirmed(false);
    setFullName('');
    setPhoneNumber('');
    setAddress('');
    setCity('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetModal}
          className="fixed inset-0 bg-dark/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-ivory border border-gold/40 shadow-2xl text-dark z-10 overflow-hidden my-auto"
        >
          {/* Top Gold Accent Bar */}
          <div className="h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30 w-full" />

          {/* Header */}
          <div className={`p-6 border-b border-sand/40 flex justify-between items-center bg-white/60 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <div className="p-2 bg-dark text-gold border border-gold/40">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light text-dark tracking-wide">
                  {lang === 'ar' ? 'اطلب الآن - طلب سريع' : lang === 'fr' ? 'Commander Maintenant' : 'Order Now — Express Checkout'}
                </h3>
                <p className="text-[10px] uppercase font-sans tracking-widest text-dark/60 mt-0.5">
                  {lang === 'ar' ? 'شحن مباشر وسريع من دار دامي للأزياء' : lang === 'fr' ? 'Expédition express & service privilégié' : 'Direct express dispatch & luxury concierge'}
                </p>
              </div>
            </div>

            <button
              onClick={resetModal}
              className="p-1.5 text-dark/70 hover:text-gold transition-colors cursor-pointer border border-transparent hover:border-sand/40"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {orderConfirmed ? (
              /* ORDER CONFIRMED VIEW */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 px-4 text-center space-y-6 bg-white border border-sand/30"
              >
                <div className="w-16 h-16 bg-gold/15 rounded-full border border-gold text-gold flex items-center justify-center mx-auto animate-bounce">
                  <Check size={32} />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-gold">
                    {lang === 'ar' ? 'تم تأكيد طلبكم بنجاح' : 'Order Confirmed'}
                  </span>
                  <h4 className="font-serif text-3xl text-dark font-light">
                    {lang === 'ar' ? `رمز الطلب: ${orderRef}` : `Reference: ${orderRef}`}
                  </h4>
                  <p className="font-sans text-xs text-dark/70 max-w-md mx-auto leading-relaxed">
                    {lang === 'ar'
                      ? 'شكراً لثقتك بدار دامي. سيتواصل معك أحد مستشارينا هاتفياً لتأكيد تفاصيل التوصيل والشحن المباشر.'
                      : 'Thank you for choosing DAMI. Our royal concierge team will contact you shortly to confirm your delivery and custom fitting.'}
                  </p>
                </div>

                <div className="p-4 bg-ivory border border-sand/40 text-left text-xs space-y-1 inline-block text-dark/80 font-sans max-w-sm w-full">
                  <div className="flex justify-between border-b border-sand/30 pb-1">
                    <span className="text-dark/50">{lang === 'ar' ? 'العميل:' : 'Client:'}</span>
                    <strong className="font-semibold">{fullName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-sand/30 pb-1 pt-1">
                    <span className="text-dark/50">{lang === 'ar' ? 'الهاتف:' : 'Phone:'}</span>
                    <strong className="font-semibold">{phoneNumber}</strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-dark/50">{lang === 'ar' ? 'الإجمالي:' : 'Total:'}</span>
                    <strong className="font-bold text-gold">{finalTotal} {getCurrencySymbol(currency)}</strong>
                  </div>
                </div>

                <div>
                  <button
                    onClick={resetModal}
                    className="bg-dark text-sand hover:bg-gold hover:text-dark px-8 py-3 text-xs font-sans uppercase tracking-widest font-bold transition-all cursor-pointer shadow-md"
                  >
                    {lang === 'ar' ? 'العودة للمتجر' : 'Continue Sifting Capsule'}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* FORM & PRODUCT SELECTION VIEW */
              <form onSubmit={handleOrderSubmit} className="space-y-6">
                
                {/* 1. PRODUCT SUMMARY / SELECTION HEADER */}
                <div className="bg-white p-4 border border-sand/30">
                  <div className="flex justify-between items-center mb-3 border-b border-sand/20 pb-2">
                    <span className="text-[10px] font-sans uppercase tracking-widest font-bold text-gold">
                      {lang === 'ar' ? '١. معلومات قطعة الأزياء' : '1. Selected Piece'}
                    </span>
                    {hasCartItems && (
                      <span className="text-[10px] bg-dark text-sand px-2 py-0.5 font-sans uppercase tracking-wider">
                        {cart.length} {lang === 'ar' ? 'قطع في الحقيبة' : 'Items in bag'}
                      </span>
                    )}
                  </div>

                  {hasCartItems ? (
                    /* Show Cart Items summary */
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {cart.map(item => (
                        <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between items-center text-xs py-1.5 border-b border-sand/15">
                          <div className="flex items-center gap-3">
                            <img src={item.product.imageMain} className="w-10 h-12 object-cover border border-sand/30" alt="" />
                            <div>
                              <p className="font-serif font-semibold text-dark">{item.product.title[lang]}</p>
                              <span className="text-[10px] text-dark/50">Size: {item.selectedSize} × {item.quantity}</span>
                            </div>
                          </div>
                          <span className="font-serif font-bold text-gold">
                            {item.product.price[currency] * item.quantity} {getCurrencySymbol(currency)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Select Product Dropdown if cart is empty */
                    <div className="space-y-3">
                      <label className="block text-xs font-sans uppercase tracking-wider text-dark/70">
                        {lang === 'ar' ? 'اختر القطعة المطلوبة:' : 'Select Model / Creation:'}
                      </label>
                      <select
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="w-full bg-ivory border border-sand/40 p-2.5 text-xs font-serif text-dark focus:outline-none focus:border-gold"
                      >
                        {PRODUCTS.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.title[lang]} — {p.price[currency]} {getCurrencySymbol(currency)}
                          </option>
                        ))}
                      </select>

                      <div className="flex gap-4 items-center pt-1">
                        {/* Size picker */}
                        <div className="flex-1">
                          <label className="block text-[10px] font-sans uppercase tracking-wider text-dark/60 mb-1">
                            {lang === 'ar' ? 'المقاس:' : 'Size:'}
                          </label>
                          <div className="flex gap-1.5 flex-wrap">
                            {currentProduct.sizes.map(size => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => setSelectedSize(size)}
                                className={`px-2.5 py-1 text-[10px] font-sans border cursor-pointer transition-all ${
                                  selectedSize === size
                                    ? 'bg-dark text-gold border-dark font-bold'
                                    : 'bg-white text-dark/70 border-sand/40 hover:border-gold'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quantity picker */}
                        <div>
                          <label className="block text-[10px] font-sans uppercase tracking-wider text-dark/60 mb-1">
                            {lang === 'ar' ? 'الكمية:' : 'Qty:'}
                          </label>
                          <div className="flex items-center border border-sand/40 bg-white">
                            <button
                              type="button"
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="px-2 py-1 text-xs text-dark hover:bg-sand/20 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-bold text-dark">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => setQuantity(quantity + 1)}
                              className="px-2 py-1 text-xs text-dark hover:bg-sand/20 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. DELIVERY & CLIENT FORM */}
                <div className="bg-white p-4 border border-sand/30 space-y-3">
                  <span className="text-[10px] font-sans uppercase tracking-widest font-bold text-gold block border-b border-sand/20 pb-2">
                    {lang === 'ar' ? '٢. بيانات العميل والتوصيل' : '2. Client & Delivery Details'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-dark/70 mb-1">
                        {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={lang === 'ar' ? 'أدخل اسمك الكامل' : 'e.g. Marie Laurent'}
                        className="w-full bg-ivory border border-sand/40 p-2.5 text-xs text-dark focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-dark/70 mb-1">
                        {lang === 'ar' ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+212 6..."
                        className="w-full bg-ivory border border-sand/40 p-2.5 text-xs text-dark focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-dark/70 mb-1">
                        {lang === 'ar' ? 'المدينة *' : 'City *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={lang === 'ar' ? 'الدار البيضاء / مراكش...' : 'Casablanca / Paris...'}
                        className="w-full bg-ivory border border-sand/40 p-2.5 text-xs text-dark focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-dark/70 mb-1">
                        {lang === 'ar' ? 'عنوان التوصيل *' : 'Delivery Address *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={lang === 'ar' ? 'العنوان بالتفصيل' : 'Street address & district'}
                        className="w-full bg-ivory border border-sand/40 p-2.5 text-xs text-dark focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* TOTAL SUMMARY & ACTION BUTTONS */}
                <div className="p-4 bg-dark text-sand flex flex-col sm:flex-row justify-between items-center gap-4 border border-gold/30">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-sand/60 block">
                      {lang === 'ar' ? 'الإجمالي مع الشحن Express' : 'Total Amount (Express Dispatch Included)'}
                    </span>
                    <span className="font-serif text-2xl font-bold text-gold">
                      {finalTotal} {getCurrencySymbol(currency)}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                    {/* Instant Order Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gold text-dark hover:bg-white px-6 py-3 text-xs font-sans uppercase tracking-widest font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-gold/20"
                    >
                      {isSubmitting ? (
                        <span>{lang === 'ar' ? 'جاري المعالجة...' : 'Processing...'}</span>
                      ) : (
                        <>
                          <Check size={14} />
                          <span>{lang === 'ar' ? 'تأكيد الطلب الفوري' : 'Confirm Order Now'}</span>
                        </>
                      )}
                    </button>

                    {/* Order in WhatsApp */}
                    <button
                      type="button"
                      onClick={handleWhatsAppOrder}
                      className="bg-[#25D366] text-white hover:bg-[#1ebf58] px-5 py-3 text-xs font-sans uppercase tracking-widest font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                    >
                      <Phone size={14} />
                      <span>{lang === 'ar' ? 'طلب في واتساب (+212696194894)' : lang === 'fr' ? 'Commander sur WhatsApp (+212696194894)' : 'Order in WhatsApp (+212696194894)'}</span>
                    </button>
                  </div>
                </div>

                {/* Trust guarantee badge */}
                <div className="flex items-center justify-center gap-2 text-[10px] font-sans uppercase tracking-widest text-dark/50 pt-1">
                  <Truck size={12} className="text-gold" />
                  <span>{lang === 'ar' ? 'توصيل مجاني سريع في المغرب والدولية' : 'Express National & International Delivery • Certified Bespoke'}</span>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
