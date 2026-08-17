import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Aperture, 
  Menu, 
  X, 
  Sparkles, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Globe,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface StartAProjectProps {
  onNavigate: (path: string, tab?: 'reel' | 'projects' | 'skills' | 'profile') => void;
}

export default function StartAProject({ onNavigate }: StartAProjectProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sequenceTime, setSequenceTime] = useState('00 : 00 : 00');
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeJ8uTGzMIRojFk0ej8k82k5y2iFUMrGz9hsQT5o0NXMZKyrA/viewform?embedded=true";
  const GOOGLE_FORM_DIRECT_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeJ8uTGzMIRojFk0ej8k82k5y2iFUMrGz9hsQT5o0NXMZKyrA/viewform?usp=publish-editor";
  const DIRECTOR_HERO_IMAGE = 'https://lh3.googleusercontent.com/d/1aPb17XxGzcroNBAFOx64IMcLPCRdV-qu';

  useEffect(() => {
    const updateSequence = () => {
      const now = new Date();
      const hrs = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setSequenceTime(`${hrs} : ${mins} : ${secs}`);
    };
    
    updateSequence();
    const interval = setInterval(updateSequence, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navLinks = [
    { label: 'SHOWREEL', key: 'reel' as const },
    { label: 'PROJECTS', key: 'projects' as const },
    { label: 'APPROACH', key: 'skills' as const },
    { label: 'ABOUT', key: 'profile' as const }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between overflow-x-hidden selection:bg-red-500 selection:text-white font-sans">
      
      {/* Background Ambient Fluid Lights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-15%] w-[70%] h-[70%] rounded-full opacity-35 blur-[160px] bg-gradient-to-br from-[#9c0d0d] via-[#330000] to-transparent"></div>
        <div className="absolute top-[20%] right-[-10%] w-[65%] h-[65%] rounded-full opacity-25 blur-[140px] bg-gradient-to-tr from-[#ff2a2a] via-[#4d000c] to-transparent"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[65%] h-[65%] rounded-full opacity-20 blur-[130px] bg-gradient-to-tr from-[#1f0505] via-black to-transparent"></div>
        <div className="absolute top-[5%] left-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[180px] bg-white"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.92)_100%)]"></div>
      </div>

      {/* Cinematic Film Grain Structure */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay bg-repeat bg-[url('https://www.transparenttextures.com/patterns/p6.png')] z-20"></div>

      {/* Background Atmosphere Image */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-sm"
          style={{ backgroundImage: `url('${DIRECTOR_HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black/98" />
      </div>

      {/* TOP SYSTEM BAR */}
      <div className="relative z-30 w-full border-b border-white/[0.04] bg-black/45 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-2 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-[11px] font-mono text-[#d1d1d6] gap-2 sm:gap-0">
          
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center sm:justify-start">
            <a href="tel:0869698420" className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-red-500" />
              <span>086 969 8420</span>
            </a>
            <span className="opacity-40 hidden sm:inline">|</span>
            <a href="mailto:tranlong301198@gmail.com" className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3 text-red-500" />
              <span>tranlong301198@gmail.com</span>
            </a>
            <span className="opacity-40 hidden sm:inline">|</span>
            <a href="https://www.facebook.com/HaloTrVN/" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Facebook className="w-3 h-3 text-red-500" />
              <span>_FB</span>
            </a>
            <span className="opacity-40 hidden sm:inline">|</span>
            <a href="https://www.instagram.com/tran.halo/" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Instagram className="w-3 h-3 text-red-500" />
              <span>_IG</span>
            </a>
            <span className="opacity-40 hidden sm:inline">|</span>
            <a href="https://www.behance.net/longtrn19" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Globe className="w-3 h-3 text-red-500" />
              <span>_BEHANCE</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-neutral-400">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>Hà Nội, Việt Nam / 21.0278° N, 105.8342° E</span>
            </span>
          </div>

        </div>
      </div>

      {/* GLASSMORPHIC NAVBAR */}
      <header className="relative z-30 w-full">
        <div className="flex flex-row justify-between items-center px-6 sm:px-12 py-6 max-w-7xl mx-auto">
          
          {/* Logo */}
          <button 
            onClick={() => onNavigate('/', 'reel')}
            className="flex items-center gap-3 group relative z-30 text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/20 bg-gradient-to-br from-slate-800 to-black backdrop-blur-md shadow-[0_0_15px_rgba(255,42,42,0.25)] group-hover:scale-105 transition-all">
              <Aperture className="w-4.5 h-4.5 text-red-500 stroke-[1.8] group-hover:rotate-45 transition-transform duration-700" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg tracking-[0.16em] text-white font-extrabold uppercase line-clamp-1">
                HALOTr
              </span>
              <span className="text-[8px] font-mono tracking-[0.2em] text-red-500 uppercase font-bold">
                Director/Filmmaker/Photographer
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 w-auto max-w-md bg-slate-950/60 border border-white/10 p-1 rounded-full backdrop-blur-lg">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => onNavigate('/', link.key)}
                className="text-[9px] uppercase tracking-[0.18em] font-bold px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/[0.03] transition-all duration-300 focus:outline-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Trigger */}
          <div className="flex items-center gap-4 relative z-30">
            <button
              onClick={() => onNavigate('/', 'reel')}
              className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/10 text-[10px] uppercase tracking-[0.18em] font-bold text-white transition-all cursor-pointer hidden md:flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PORTFOLIO</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-[#0c0202]/50 backdrop-blur-md text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="relative z-10 flex-grow w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Back Link */}
        <div className="w-full max-w-3xl flex justify-start mb-6">
          <button
            onClick={() => onNavigate('/', 'reel')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-red-500 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>QUAY LẠI PORTFOLIO CHÍNH</span>
          </button>
        </div>

        {/* Header Content */}
        <div className="w-full max-w-3xl text-center space-y-4 mb-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-red-950/60 to-slate-900/80 rounded-full border border-red-500/30 text-[10px] font-mono tracking-widest uppercase text-white shadow-[0_0_20px_rgba(255,42,42,0.2)]">
            <Sparkles className="w-3 h-3 text-red-400 animate-pulse" />
            <span>PROJECT INQUIRY & BRIEF FORM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.1]">
            START A <span className="text-red-500">PROJECT</span>
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Bạn đang có một dự án trong đầu? Hãy chia sẻ một vài thông tin về dự án của bạn. Tôi sẽ xem qua brief và liên hệ lại để cùng trao đổi về hướng triển khai tiếp theo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Phản hồi trong vòng 24 giờ làm việc</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-lg">
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>Bảo mật thông tin dự án & brief</span>
            </div>
          </div>
        </div>

        {/* Embedded Google Form Card Container */}
        <div className="w-full max-w-3xl relative rounded-3xl border border-white/10 bg-[#0c0202]/80 backdrop-blur-2xl p-2 sm:p-4 md:p-6 shadow-[0_0_50px_rgba(255,42,42,0.06)] overflow-hidden">
          
          {/* Top Frame Bar Indicator */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] mb-3 text-[10px] font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-bold text-white uppercase tracking-wider">PROJECT INQUIRY FORM</span>
            </div>
            <a 
              href={GOOGLE_FORM_DIRECT_URL} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <span>Mở tab mới</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Loading Indicator */}
          {!isIframeLoaded && (
            <div className="w-full h-96 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-8 h-8 rounded-full border-2 border-red-500/20 border-t-red-500 animate-spin"></div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Đang tải biểu mẫu...</span>
            </div>
          )}

          {/* Responsive Embedded Iframe */}
          <div className={`w-full overflow-hidden rounded-2xl bg-white transition-opacity duration-500 ${isIframeLoaded ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <iframe
              src={GOOGLE_FORM_EMBED_URL}
              width="100%"
              height="1150"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Project Inquiry Google Form"
              onLoad={() => setIsIframeLoaded(true)}
              className="w-full min-h-[950px] sm:min-h-[1150px] border-0 rounded-2xl block"
            >
              Đang tải…
            </iframe>
          </div>

        </div>

      </main>

      {/* FOOTER BAR */}
      <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 py-8 w-full max-w-7xl mx-auto gap-4 mt-8 border-t border-white/[0.04] text-[11px] font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} TRẦN NHẬT LONG (HALOTr)</span>
          <span className="opacity-30">•</span>
          <span className="text-red-500 font-bold">ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex items-center gap-3 text-neutral-300">
          <span>Sequence UTC:</span>
          <span className="text-white font-bold bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded">
            {sequenceTime}
          </span>
        </div>
      </footer>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between p-8 text-left border-l border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold tracking-widest text-white uppercase">
              NHẬT LONG<span className="text-[10px] text-red-500 ml-1">DIR®</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-red-500/30 bg-black/55 text-white hover:bg-red-950/30 focus:outline-none cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 text-left my-auto px-4">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/', link.key);
                }}
                className="text-2xl tracking-[0.1em] font-extrabold uppercase text-left cursor-pointer text-neutral-400 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="w-full">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/', 'reel');
              }}
              className="w-full py-4 rounded-full border border-red-500 bg-red-950/40 text-center text-white font-bold text-xs tracking-widest uppercase transition-transform duration-300 cursor-pointer"
            >
              Quay lại Portfolio
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
