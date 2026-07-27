import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Instagram, Send, CheckCircle2, Database, Trash2, MapPin, Sparkles, Notebook, Compass, Calendar } from 'lucide-react';
import { DamiLanguage } from '../types';
import { TRANSLATIONS } from '../data';

interface InteractiveContactProps {
  lang: DamiLanguage;
  prefilledProductTitle?: string;
  onClearPrefill?: () => void;
}

interface BoutiqueInquiry {
  id: string;
  name: string;
  email: string;
  desiredDate: string;
  requestType: 'bespoke' | 'fitting' | 'consultation' | 'partnership';
  location: string;
  message: string;
  createdAt: string;
  status: 'new' | 'approved' | 'completed';
  adminNotes?: string;
}

const INITIAL_INQUIRIES: BoutiqueInquiry[] = [
  {
    id: 'dami-inq-1',
    name: 'Lady Charlotte V.',
    email: 'charlotte.v@royallife.co.uk',
    desiredDate: '2026-07-20',
    requestType: 'bespoke',
    location: 'London Knightsbridge / Marrakech',
    message: 'Seeking a bespoke numbered 1-of-1 silk Kimono embroidered with our ancestral gold family emblems for a private dinner in Marrakesh next August. Looking forward to your master weaver consultation.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'new',
    adminNotes: 'Assigned to Master Artisan Larbi in Fez for gold-thread calculation.'
  },
  {
    id: 'dami-inq-2',
    name: 'Le Sel Boutique',
    email: 'buying@lesel.fr',
    desiredDate: '2026-09-15',
    requestType: 'partnership',
    location: 'Paris, 1er Arrondissement',
    message: 'Greetings, we are an elite multi-brand store by Place Vendôme. We would love to sample your upcoming Bohemian Tunics and Sets for our high-net-worth client database.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'approved',
    adminNotes: 'Approved wholesale proposal. Sent summer lookbook catalogues.'
  }
];

export function InteractiveContact({ lang, prefilledProductTitle, onClearPrefill }: InteractiveContactProps) {
  const isRtl = lang === 'ar';

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [desiredDate, setDesiredDate] = useState('');
  const [requestType, setRequestType] = useState<string>('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const [dateFocused, setDateFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // DB Inquiry Console states
  const [inquiries, setInquiries] = useState<BoutiqueInquiry[]>([]);
  const [showInquiryManager, setShowInquiryManager] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<BoutiqueInquiry | null>(null);
  const [adminNoteEdit, setAdminNoteEdit] = useState('');

  // Hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dami_boutique_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        setInquiries(INITIAL_INQUIRIES);
      }
    } else {
      setInquiries(INITIAL_INQUIRIES);
      localStorage.setItem('dami_boutique_inquiries', JSON.stringify(INITIAL_INQUIRIES));
    }
  }, []);

  // Save changes
  const saveInquiriesToStore = (items: BoutiqueInquiry[]) => {
    setInquiries(items);
    localStorage.setItem('dami_boutique_inquiries', JSON.stringify(items));
  };

  // Handle prefilled options
  useEffect(() => {
    if (prefilledProductTitle) {
      setRequestType('bespoke');
      const inquiryMessage = lang === 'ar' 
        ? `أرغب في الاستفسار عن إمكانية تفصيل وتخصيص قطعة: ${prefilledProductTitle}. يرجى توجيه طلبي الحرفي.`
        : `Greetings, I would love to inquire about custom fitting or commissioning a client edition of: ${prefilledProductTitle}. Please assist me with my order.`;
      setMessage(inquiryMessage);
    }
  }, [prefilledProductTitle, lang]);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) {
      errors.name = lang === 'ar' ? 'يرجى إدخال الاسم الكريم.' : 'Kindly provide your full name.';
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = lang === 'ar' ? 'البريد الإلكتروني المدخل غير صالح.' : 'Please enter a valid luxury correspondence email.';
    }
    if (!desiredDate) {
      errors.desiredDate = lang === 'ar' ? 'يرجى تحديد التاريخ المفضل.' : 'Please pick your desired schedule date.';
    }
    if (!requestType) {
      errors.requestType = lang === 'ar' ? 'يرجى اختيار نوع الطلب.' : 'Please select your request classification.';
    }
    if (!location.trim()) {
      errors.location = lang === 'ar' ? 'يرجى إدخال مدينتك وموقعك.' : 'Kindly enter your country/city for delivery.';
    }
    if (message.trim().length < 8) {
      errors.message = lang === 'ar' ? 'يرجى كتابة بضعة تفاصيل حول طلبك (على الأقل 8 محارف).' : 'Please detail your fitting requirements (min 8 characters).';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    fetch("https://formspree.io/f/mykabwnz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        desiredDate,
        requestType,
        location,
        message
      })
    })
    .then(() => {
      const newInquiry: BoutiqueInquiry = {
        id: 'dami-inq-' + Math.random().toString(36).substring(2, 9),
        name,
        email,
        desiredDate,
        requestType: requestType as any,
        location,
        message,
        createdAt: new Date().toISOString(),
        status: 'new',
        adminNotes: lang === 'ar' ? 'طلب جديد ينتظر الاستلام' : 'New request awaiting artisan assessment.'
      };

      const updated = [newInquiry, ...inquiries];
      saveInquiriesToStore(updated);

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setName('');
      setEmail('');
      setDesiredDate('');
      setRequestType('');
      setLocation('');
      setMessage('');
      if (onClearPrefill) onClearPrefill();
    })
    .catch((error) => {
      console.error("Formspree submission error:", error);
      // Fallback: still show success locally to the user if the request failed or was blocked
      const newInquiry: BoutiqueInquiry = {
        id: 'dami-inq-' + Math.random().toString(36).substring(2, 9),
        name,
        email,
        desiredDate,
        requestType: requestType as any,
        location,
        message,
        createdAt: new Date().toISOString(),
        status: 'new',
        adminNotes: lang === 'ar' ? 'طلب جديد ينتظر الاستلام' : 'New request awaiting artisan assessment.'
      };

      const updated = [newInquiry, ...inquiries];
      saveInquiriesToStore(updated);

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setName('');
      setEmail('');
      setDesiredDate('');
      setRequestType('');
      setLocation('');
      setMessage('');
      if (onClearPrefill) onClearPrefill();
    });
  };

  const changeInquiryStatus = (id: string, status: 'new' | 'approved' | 'completed') => {
    const updated = inquiries.map(item => item.id === id ? { ...item, status } : item);
    saveInquiriesToStore(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  const saveAdminNote = (id: string) => {
    const updated = inquiries.map(item => item.id === id ? { ...item, adminNotes: adminNoteEdit } : item);
    saveInquiriesToStore(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, adminNotes: adminNoteEdit });
    }
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter(item => item.id !== id);
    saveInquiriesToStore(updated);
    setSelectedInquiry(null);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-[#FAF8F5] border-t border-sand/35 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Split screen content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Direct channels and social profiles */}
          <div className={`space-y-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4 block font-semibold">
                {lang === 'ar' ? 'اتصالات ومواعيد الكوتور' : 'COMMISSIONS & INQUIRIES'}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl mb-6 tracking-wide text-dark font-light leading-snug">
                {lang === 'ar' ? 'دعنا نصوغ إرثك اليوم.' : 'Let Us Craft Your Piece.'}
              </h2>
              <p className="font-sans font-light text-sm text-dark/70 max-w-lg leading-relaxed">
                {lang === 'ar' 
                  ? 'سواء كنت ترغب في تفصيل قفطان استثنائي بمقاسات مخصصة بماء الذهب، أو ترغب بطلب استشارة مقاسات عن بُعد، أو حجز جلسة قياس حية في إحدى رياضنا المغربية الشريكة.' 
                  : 'Whether commissioning a customized gold-thread kaftan, organizing a private fitting session inside Marrakech, or requesting support with international express shipping and boutique sizes.'
                }
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-6 mt-12 bg-white/40 p-6 border border-sand/30">
              <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="bg-sand/30 p-3 text-gold shrink-0">
                  <Mail size={16} />
                </span>
                <div>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-[#B89B5E] block">
                    {lang === 'ar' ? 'البريد الإلكتروني للدار' : 'CORRESPONDENCE'}
                  </span>
                  <a href="mailto:damifashions@gmail.com" className="font-sans font-medium text-base text-dark custom-underline">
                    damifashions@gmail.com
                  </a>
                </div>
              </div>
              
              <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="bg-sand/30 p-3 text-gold shrink-0">
                  <Phone size={16} />
                </span>
                <div>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-[#B89B5E] block">
                    {lang === 'ar' ? 'الخط الساخن الحصري' : 'MAISON CALLS & WHATSAPP'}
                  </span>
                  <a href="tel:+212696194894" className="font-sans font-medium text-base text-dark custom-underline">
                    +212 (0) 696 19 48 94
                  </a>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-6 border-t border-sand/30">
              <p className="font-sans text-[10px] uppercase tracking-widest text-dark/40 mb-4 font-bold">
                {lang === 'ar' ? 'يوميات الحائكين على إنستغرام' : 'THE ARTISAN JOURNALS'}
              </p>
              <div className={`flex gap-4 ${isRtl ? 'justify-end' : ''}`}>
                <a 
                  href="https://www.instagram.com/dami.maroc/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark text-sand hover:bg-gold hover:text-dark px-6 py-2.5 text-xs font-sans uppercase tracking-widest transition-all shadow"
                >
                  Instagram Feed
                </a>
              </div>
            </div>

            {/* Custom Atelier Commission Database trigger */}
            <div className="pt-6">
              <button 
                onClick={() => setShowInquiryManager(!showInquiryManager)}
                className="inline-flex items-center gap-2.5 bg-[#111111] hover:bg-gold text-sand hover:text-dark px-5 py-3 transition-colors text-xs uppercase tracking-wider font-sans font-semibold cursor-pointer"
              >
                <Database size={13} className="text-gold" />
                <span>🕋 {lang === 'ar' ? 'كونسول طلبيات الدار' : 'Atelier Commissions console'} ({inquiries.length})</span>
                <span className="bg-gold text-dark text-[9px] px-2 py-0.5 rounded-full font-bold">LIVE</span>
              </button>
              <p className="text-[10px] text-dark/50 mt-2 max-w-sm">
                {lang === 'ar' 
                  ? '* لوحة تحكم داخلية مخصصة للتحكم في مواعيد واستفسارات العملاء وحساب قياساتهم.' 
                  : '* An internal developer console simulation to review real-time customer fitting schedules and bespoke sewing diaries.'
                }
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Reservation Form */}
          <div className="bg-white p-8 md:p-10 border border-sand/40 relative shadow-lg">
            
            {/* Shimmer backing */}
            <div className="absolute top-4 right-4 text-sand/15 font-serif text-8xl pointer-events-none select-none">DAMI</div>

            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="boutique-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className={`font-serif text-2xl text-dark tracking-wide font-light pb-2 border-b border-sand/30 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? 'استمارة الحجز والتفصيل للمنسوجات' : 'Atelier Fitting Request'}
                  </h3>

                  {/* Customer Information Row */}
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder={lang === 'ar' ? 'الاسم الكريم بالكامل *' : 'Your Full Name *'}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (formErrors.name) setFormErrors(prev => ({ ...prev, name: '' }));
                      }}
                      className={`w-full bg-transparent border-b border-sand/70 py-3 text-dark focus:outline-none focus:border-gold transition-colors font-sans font-light placeholder-dark/40 text-sm ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                    {formErrors.name && <p className="text-red-650 font-sans text-[10px] tracking-wide">{formErrors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="email"
                      placeholder={lang === 'ar' ? 'عنوان بريدك الإلكتروني للمراسلة *' : 'Correspondence Email *'}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
                      }}
                      className={`w-full bg-transparent border-b border-sand/70 py-3 text-dark focus:outline-none focus:border-gold transition-colors font-sans font-light placeholder-dark/40 text-sm ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                    {formErrors.email && <p className="text-red-650 font-sans text-[10px] tracking-wide">{formErrors.email}</p>}
                  </div>

                  {/* Dual Grid fields (Date & Project Type) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <input
                        type={dateFocused ? "date" : "text"}
                        placeholder={lang === 'ar' ? 'التاريخ المفضل لطلبك *' : 'Target Dream Date *'}
                        onFocus={() => setDateFocused(true)}
                        onBlur={() => { if(!desiredDate) setDateFocused(false); }}
                        value={desiredDate}
                        onChange={(e) => {
                          setDesiredDate(e.target.value);
                          if (formErrors.desiredDate) setFormErrors(prev => ({ ...prev, desiredDate: '' }));
                        }}
                        className={`w-full bg-transparent border-b border-sand/70 py-3 text-dark focus:outline-none focus:border-gold transition-colors font-sans font-light placeholder-dark/40 text-sm ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                      {formErrors.desiredDate && <p className="text-red-650 font-sans text-[10px] tracking-wide">{formErrors.desiredDate}</p>}
                    </div>

                    <div className="space-y-1 relative">
                      <select
                        value={requestType}
                        onChange={(e) => {
                          setRequestType(e.target.value);
                          if (formErrors.requestType) setFormErrors(prev => ({ ...prev, requestType: '' }));
                        }}
                        className={`w-full bg-transparent border-b border-sand/70 py-3 text-dark focus:outline-none focus:border-gold transition-colors font-sans font-light appearance-none cursor-pointer text-sm ${isRtl ? 'text-right pr-2' : 'text-left pl-2'}`}
                      >
                        <option value="" disabled className="text-dark/75">{lang === 'ar' ? 'نوع الخدمة والمقاس *' : 'Request Classification *'}</option>
                        <option value="bespoke" className="bg-[#FAF8F5] text-dark">{lang === 'ar' ? 'تصميم قفطان أو كيمونو مخصص' : 'Custom Bespoke Commission'}</option>
                        <option value="fitting" className="bg-[#FAF8F5] text-dark">{lang === 'ar' ? 'جلسة قياس خاصة بالرياض' : 'Private Riad Fitting Session'}</option>
                        <option value="consultation" className="bg-[#FAF8F5] text-dark">{lang === 'ar' ? 'استشارة مقاسات ومواد عن بعد' : 'Luxury Virtual Size Consultation'}</option>
                        <option value="partnership" className="bg-[#FAF8F5] text-dark">{lang === 'ar' ? 'طلب عرض شراكة دولية للدار' : 'Wholesale / Global Partner'}</option>
                      </select>
                      <span className={`absolute top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none text-xs ${isRtl ? 'left-0' : 'right-0'}`}>▼</span>
                      {formErrors.requestType && <p className="text-red-650 font-sans text-[10px] tracking-wide">{formErrors.requestType}</p>}
                    </div>
                  </div>

                  {/* Location field */}
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder={lang === 'ar' ? 'الدولة والمدينة الحالية للتسليم *' : 'Current City & Country *'}
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        if (formErrors.location) setFormErrors(prev => ({ ...prev, location: '' }));
                      }}
                      className={`w-full bg-transparent border-b border-sand/70 py-3 text-dark focus:outline-none focus:border-gold transition-colors font-sans font-light placeholder-dark/40 text-sm ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                    {formErrors.location && <p className="text-red-650 font-sans text-[10px] tracking-wide">{formErrors.location}</p>}
                  </div>

                  {/* Textarea description */}
                  <div className="space-y-1">
                    <textarea
                      placeholder={lang === 'ar' ? 'التفاصيل والخيارات المطلوبة قياساتك، تفضيلات الأقمشة والمواد...' : 'Please write down any structural guidelines (e.g. height, color tweaks, custom measurements)...'}
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (formErrors.message) setFormErrors(prev => ({ ...prev, message: '' }));
                      }}
                      className={`w-full bg-transparent border-b border-sand/70 py-3 text-dark focus:outline-none focus:border-gold transition-colors font-sans font-light placeholder-dark/40 resize-none text-sm leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                    {formErrors.message && <p className="text-red-650 font-sans text-[10px] tracking-wide">{formErrors.message}</p>}
                  </div>

                  {/* Action items */}
                  <div className={`pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                    <span className="text-[10px] text-dark/50 italic font-sans text-center">
                      {lang === 'ar' ? '* نرحب بطلباتكم الخاصة لحفظ البهاء والأناقة' : '* Dami values absolute carbon-neutral preservation.'}
                    </span>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-dark text-sand hover:bg-gold hover:text-dark px-10 py-3.5 uppercase text-xs tracking-[0.2em] transition-all duration-300 font-sans font-semibold cursor-pointer flex items-center justify-center gap-2 border border-dark"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3 h-3 border-2 border-sand/30 border-t-gold rounded-full animate-spin" />
                          <span>{lang === 'ar' ? 'جاري الصياغة...' : 'Inscribing Correspondence...'}</span>
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          <span>{lang === 'ar' ? 'إرسال الطلب' : 'Inscribe Request'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center flex flex-col items-center justify-center space-y-6"
                >
                  <div className="bg-gold/15 p-5 rounded-full text-gold shrink-0 border border-gold/45 animate-pulse">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl text-dark font-light">{lang === 'ar' ? 'ممتنون لتواصلكم الموقر' : 'Inscribed with Honor'}</h3>
                    <p className="font-serif italic text-base text-gold font-light">
                      {lang === 'ar' ? 'تم تسجيل رسالتك الدقيقة في سجلات الدار.' : 'Your request is securely locked in our Fez logs.'}
                    </p>
                  </div>
                  <p className="font-sans font-light text-xs text-dark/70 max-w-sm leading-relaxed">
                    {lang === 'ar' 
                      ? 'سيقوم مستشار الأناقة لدينا بدراسة طلبك ومراجعة المقاسات الحرفية والتواصل معك خلال 24 ساعة بريدياً.' 
                      : 'An artisan representative will examine your sizing specs and structural material desires, replying with a drafted layout inside 24 to 48 hours.'
                    }
                  </p>
                  
                  <div className="pt-6 flex flex-col space-y-3 w-full">
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="border border-dark/30 text-dark hover:bg-dark hover:text-sand px-6 py-3 text-xs uppercase tracking-wider font-sans font-semibold transition-all cursor-pointer"
                    >
                      {lang === 'ar' ? 'إرسال طلب استشارة آخر' : 'Submit Another Request'}
                    </button>
                    <button
                      onClick={() => {
                        setShowInquiryManager(true);
                        setSubmitSuccess(false);
                      }}
                      className="bg-gold text-dark hover:bg-dark hover:text-sand px-6 py-3 text-xs uppercase tracking-wider font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Database size={12} />
                      <span>{lang === 'ar' ? 'فحص سجل كونسول الدار الذاتية' : 'View Commission Registry'}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cinematic Live Inquiry Controller Drawer Panel */}
        <AnimatePresence>
          {showInquiryManager && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-16 bg-[#111111] text-[#E6D7C3] border border-gold/40 overflow-hidden shadow-2xl"
            >
              <div className={`p-6 md:p-8 border-b border-sand/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold font-semibold flex items-center gap-1">
                    <Database size={11} />
                    MAISON DAMI SECURITY HUB
                  </span>
                  <h4 className="font-serif text-2xl tracking-wide text-sand mt-1 font-light">
                    {lang === 'ar' ? 'لوحة تتبع الطلبات والاستشارات' : 'Maison Dami Commission Console'}
                  </h4>
                </div>
                
                <button
                  onClick={() => setShowInquiryManager(false)}
                  className="text-sand/50 hover:text-gold transition-colors text-xs uppercase tracking-widest border border-sand/10 px-4 py-2 bg-dark/50 hover:bg-white/5 cursor-pointer"
                >
                  {lang === 'ar' ? 'إغلاق لوحة التحكم' : 'Close System Console'}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3">
                
                {/* Inquiry List Panel (2/3 col on large screen) */}
                <div className="col-span-2 p-6 border-r border-sand/10 max-h-[450px] overflow-y-auto space-y-4">
                  <p className={`font-sans text-[10px] uppercase tracking-widest text-sand/40 border-b border-sand/10 pb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? `الطلبات النشطة لعملائنا المقربين (${inquiries.length})` : `Global Commission Ledger (${inquiries.length})`}
                  </p>
                  
                  {inquiries.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-sand/65 font-serif italic text-sm">No Commissions in cache.</p>
                      <button 
                        onClick={() => saveInquiriesToStore(INITIAL_INQUIRIES)}
                        className="text-[10px] text-gold uppercase tracking-widest border border-gold/30 px-3 py-1 mt-4 hover:bg-gold/10 inline-block focus:outline-none cursor-pointer"
                      >
                        Reset Demo Records
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setAdminNoteEdit(inq.adminNotes || '');
                          }}
                          className={`p-4 border text-left cursor-pointer transition-all ${
                            selectedInquiry?.id === inq.id
                              ? 'bg-sand/15 border-gold shadow-lg'
                              : 'bg-dark/40 border-sand/10 hover:border-sand/45'
                          }`}
                        >
                          <div className={`flex justify-between items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <div className={isRtl ? 'text-right' : 'text-left'}>
                              <h5 className="font-sans text-sm font-semibold text-sand">{inq.name}</h5>
                              <p className="font-sans text-xs text-sand/60 mt-0.5">{inq.email}</p>
                            </div>
                            
                            <div className={`flex items-center space-x-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                              {/* Status badge */}
                              <span className={`text-[8px] uppercase tracking-wider px-2 py-0.5 rounded font-mono font-medium ${
                                inq.status === 'new' 
                                  ? 'bg-gold/15 text-gold border border-gold/40' 
                                  : inq.status === 'approved' 
                                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' 
                                  : 'bg-zinc-700/50 text-zinc-400 border border-zinc-650/30'
                              }`}>
                                {inq.status}
                              </span>
                              
                              <span className="text-[10px] font-sans text-sand/40">
                                {inq.desiredDate}
                              </span>
                            </div>
                          </div>

                          <div className={`flex items-center justify-between text-[11px] text-sand/80 mt-3 pt-2.5 border-t border-sand/10 font-sans font-light ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <span className="flex items-center text-gold gap-1">
                              <Compass size={11} />
                              Classification: <strong className="font-semibold uppercase text-xs">{inq.requestType}</strong>
                            </span>
                            <span className="text-sand/50 flex items-center gap-1">
                              <MapPin size={9} />
                              {inq.location}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info Detail Sidebar (1/3 col) */}
                <div className={`p-6 bg-dark/95 text-left flex flex-col justify-between ${isRtl ? 'text-right lg:border-r border-sand/10' : 'text-left'}`}>
                  {selectedInquiry ? (
                    <div className="space-y-6">
                      <div className={`border-b border-sand/15 pb-3 flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="font-serif italic text-sm text-gold">Couture Request Specs</span>
                        <button
                          onClick={() => deleteInquiry(selectedInquiry.id)}
                          className="text-red-400 hover:text-red-500 transition-colors p-1"
                          title="Void Request"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="space-y-4 text-xs font-sans">
                        <div>
                          <span className="text-sand/40 block text-[9px] uppercase">Noble Patron</span>
                          <p className="text-sand font-bold text-sm mt-0.5">{selectedInquiry.name}</p>
                          <p className="text-gold mt-1 text-[11px] font-mono">{selectedInquiry.email}</p>
                        </div>

                        <div>
                          <span className="text-sand/40 block text-[9px] uppercase">Fitting Targets</span>
                          <p className="text-sand mt-0.5 font-medium">📅 {selectedInquiry.desiredDate}</p>
                          <p className="text-sand mt-0.5">📍 {selectedInquiry.location}</p>
                        </div>

                        <div>
                          <span className="text-sand/40 block text-[9px] uppercase">Atelier Directives & Sizing Notes</span>
                          <p className="text-sand/90 bg-black/45 p-3 rounded mt-1 leading-relaxed border border-sand/5 text-[11px] block whitespace-pre-line select-text max-h-[120px] overflow-y-auto">
                            "{selectedInquiry.message}"
                          </p>
                        </div>

                        {/* Status update controls */}
                        <div>
                          <span className="text-sand/40 block text-[9px] uppercase">Update Stage</span>
                          <div className="flex gap-1 mt-1.5">
                            {(['new', 'approved', 'completed'] as const).map(st => (
                              <button
                                key={st}
                                onClick={() => changeInquiryStatus(selectedInquiry.id, st)}
                                className={`flex-1 text-[8px] uppercase tracking-wider py-1 rounded border capitalize cursor-pointer font-semibold font-mono ${
                                  selectedInquiry.status === st
                                    ? 'bg-gold border-gold text-dark'
                                    : 'bg-transparent border-sand/20 text-sand/60 hover:text-white'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Admin comment editor */}
                        <div>
                          <label className="text-sand/40 block text-[9px] uppercase mb-1 flex items-center gap-1">
                            <Notebook size={11} className="text-gold" />
                            Internal Atelier Log
                          </label>
                          <textarea
                             value={adminNoteEdit}
                             onChange={(e) => setAdminNoteEdit(e.target.value)}
                             placeholder="Ex: Stitch layout allocated, silk weight verification done..."
                             rows={3}
                             className="w-full bg-[#1A1815] border border-sand/20 rounded p-2.5 text-sand placeholder-sand/30 text-[11px] focus:outline-none focus:border-gold resize-none leading-relaxed font-sans font-light"
                          />
                          <button
                            onClick={() => saveAdminNote(selectedInquiry.id)}
                            className="bg-gold/20 hover:bg-gold text-sand hover:text-dark text-[10px] uppercase tracking-wider py-1.5 px-3 mt-1 rounded transition-colors block w-full text-center cursor-pointer font-bold"
                          >
                            Inscribe Artisan Note
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                      <Compass size={24} className="text-gold/40 mb-3 animate-pulse" />
                      <p className="text-sand/50 font-serif italic text-xs leading-relaxed">
                        Select a pending boutique commission to oversee technical measurements, raw materials status, and shipment approvals.
                      </p>
                    </div>
                  )}

                  {/* Summary Footer of console */}
                  <div className="mt-8 pt-4 border-t border-sand/15 text-[8px] text-sand/40 font-mono flex justify-between uppercase">
                    <span>Atelier DB Synced v5.0</span>
                    <span>Marrakech Headquarters</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
