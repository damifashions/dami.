import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Scale } from 'lucide-react';
import { DamiLanguage } from '../types';

interface LegalModalProps {
  type: 'impressum' | 'datenschutz' | null;
  lang: DamiLanguage;
  onClose: () => void;
}

export function LegalModal({ type, lang, onClose }: LegalModalProps) {
  if (!type) return null;

  const isRtl = lang === 'ar';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-dark/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="bg-ivory text-dark w-full max-w-2xl overflow-hidden shadow-2xl border border-sand/40 flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-6 border-b border-sand/20 flex justify-between items-center bg-white/40 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {type === 'impressum' ? (
                <Scale className="text-gold" size={20} />
              ) : (
                <Shield className="text-gold" size={20} />
              )}
              <h3 className="font-serif text-2xl text-dark tracking-wide font-light">
                {type === 'impressum' 
                  ? (lang === 'ar' ? 'بيانات دار دامي' : 'Impressum & Maison Credentials') 
                  : (lang === 'ar' ? 'ميثاق الخصوصية الفاخر' : 'Privacy & Heritage Policy')
                }
              </h3>
            </div>
            
            <button
              onClick={onClose}
              className="text-dark/50 hover:text-gold transition-colors p-1.5 rounded-full hover:bg-sand/10 focus:outline-none cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrolling Content Box */}
          <div className={`p-6 md:p-8 overflow-y-auto font-sans text-xs md:text-sm text-dark/80 leading-relaxed space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            {type === 'impressum' ? (
              <>
                <section className="space-y-2">
                  <h4 className="font-serif text-lg text-dark font-medium">Maison Dami de Couture</h4>
                  <p className="font-light">
                    Rue de la Bahia, Ateliers de Couture<br />
                    Marrakech, Gueliz, 40000<br />
                    Royaume du Maroc
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-lg text-dark font-medium">Creative Direction</h4>
                  <p className="font-light">Maison Dami Creative Guild & Association for Moroccan Artisan Conservation.</p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-lg text-dark font-medium">Boutique Inquiries</h4>
                  <p className="font-light">
                    Tel: +212 (0) 524 44 44 44<br />
                    Email: damifashions@gmail.com
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-lg text-dark font-medium">International Registered Entity</h4>
                  <p className="font-light">
                    Dami Luxury Heritage S.A.R.L.<br />
                    Registered Registry Fez No: 51249/C<br />
                    Authorized Capital: 1,000,000 MAD
                  </p>
                </section>

                <section className="space-y-3 pt-4 border-t border-sand/20">
                  <h4 className="font-serif text-base text-gold italic">Artisan Well-Being Charter</h4>
                  <p className="text-[11px] font-sans text-dark/60 leading-relaxed font-light">
                    All patterns, geometric structural descriptions, and embroideries featured on dami-maison.com are copyright of Dami Luxury Group. We actively defend the intellectual integrity of ancestral Moroccan families by ensuring absolute fair compensation.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section className="space-y-2">
                  <h4 className="font-serif text-lg text-dark font-medium">1. Absolute Confidentiality</h4>
                  <p className="font-light">
                    Maison Dami believes in absolute discretion. We collect user information solely to process bespoke kaftan measurements, private riad fitting sessions, or shipping orders. Your sizing data is never shared or leveraged for commercial marketing.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-lg text-dark font-medium">2. Sizing Logs & Commission Cookies</h4>
                  <p className="font-light">
                    To make your luxury browsing experience seamless, we leverage your browser's secure memory (localStorage) to store your ongoing Wishlist, Cart Items, and past Commission filings. These logs are entirely client-side and remain in your control.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-lg text-dark font-medium">3. Couture Delivery Insurances</h4>
                  <p className="font-light">
                    All limited edition packages (specifically limited edition numbered garments) are shipped via high-priority secure international couriers with custom duties prepaid. We guarantee maximum security of all customer transfers.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-lg text-dark font-medium">4. Contact & Sizing Erasure</h4>
                  <p className="font-light">
                    Should you wish to request the complete deletion of your private fitting schedules or custom commission logs from our system, simply notify our Marrakech atelier at damifashions@gmail.com.
                  </p>
                </section>
              </>
            )}

          </div>

          {/* Footer close option */}
          <div className="p-4 border-t border-sand/20 bg-sand/10 text-right">
            <button
               onClick={onClose}
               className="bg-dark hover:bg-gold text-sand hover:text-dark px-6 py-2.5 uppercase text-[10px] tracking-widest transition-colors font-sans font-semibold cursor-pointer"
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
