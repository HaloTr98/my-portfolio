import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  X, 
  Menu, 
  ArrowRight, 
  Check, 
  Mail, 
  Film, 
  Aperture, 
  Inbox, 
  Phone, 
  MapPin, 
  Sparkles, 
  Video, 
  Camera, 
  Layers, 
  Tv, 
  ExternalLink,
  Sliders,
  Maximize2,
  Bookmark,
  Plus,
  Briefcase,
  GraduationCap,
  Award,
  ChevronRight,
  Facebook,
  Instagram,
  Globe
} from 'lucide-react';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'reel' | 'projects' | 'skills' | 'profile'>('reel');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [campaignScope, setCampaignScope] = useState('i-TVC Video Campaign');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [projectFilter, setProjectFilter] = useState<'all' | 'tvc' | 'corporate' | 'tiktok'>('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  
  // High-fidelity dynamic simulator stats
  const [sequenceTime, setSequenceTime] = useState('00 : 00 : 00');
  const [fStop, setFStop] = useState('f/2.8');
  const [shutterAngle, setShutterAngle] = useState('180°');
  const [isoValue, setIsoValue] = useState('ISO 800');
  const [batteryPulse, setBatteryPulse] = useState(98);
  const [selectedAspect, setSelectedAspect] = useState<'cinemascope' | 'standard' | 'portrait'>('cinemascope');
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Update real-time ticking UTC sequence clock and camera simulation values
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

  // Update mock camera values periodically for high kinetic realism
  useEffect(() => {
    const cameraInterval = setInterval(() => {
      setBatteryPulse(prev => (prev <= 20 ? 98 : prev - 1));
      const fStops = ['f/1.8', 'f/2.0', 'f/2.8', 'f/4.0', 'f/5.6'];
      setFStop(fStops[Math.floor(Math.random() * fStops.length)]);
    }, 15000);
    return () => clearInterval(cameraInterval);
  }, []);

  // Toggle video playing state
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log("Video play interrupted:", err));
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Keyboard accessibility for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBeginJourney = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setFormSubmitted(true);
    }
  };

  const navLinks = [
    { label: 'SHOWREEL', key: 'reel' },
    { label: 'PROJECTS', key: 'projects' },
    { label: 'APPROACH', key: 'skills' },
    { label: 'ABOUT', key: 'profile' }
  ];

  // Portfolio details matching PDF
  const clients = ['Lexus', 'Bia Hạ Long', 'Viettel money', 'BIDV Premier', 'Manulife', 'Afotech', 'IEC Group', 'Vua Nệm', 'Vodaplay', 'iPOS.vn', 'Sứ Ming'];

  const projectsData = [
    {
      id: 'biahalong',
      title: 'Rước quà Tết, kết lộc xuân',
      client: 'Bia Hạ Long',
      year: '2023',
      category: 'tvc',
      tag: 'Festive TVC Campaign',
      role: 'Technical Director & Post-Production Check',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600',
      specs: 'RED V-Raptor // Cooke S4/i // DaVinci Grade',
      challenge: 'Đòi hỏi bối cảnh đoàn viên Tết ấm áp, tone màu vàng đỏ phủ rực rỡ lễ hội nâng cao giá trị gắn kết gia đình.',
      solution: 'Phối màu kết hợp tinh hoa ánh sáng ấm, cân đối hài hòa mỹ thuật hiện trường mang lại video triệu view mượt mà truyền thống.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'lexus',
      title: 'Sự kiện chạy thử xe Lexus',
      client: 'Lexus Việt Nam',
      year: '2023',
      category: 'corporate',
      tag: 'Premium Event Brand Film',
      role: 'Director of Photography / Camera Setup Lead',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600',
      specs: 'Sony FX3 // DJI Ronin 2 // G-Master Lens',
      challenge: 'Ghi lại tốc độ chuyển động & những đường cong hoàn hảo của dòng xe sang quý phái mà không gây rung giật.',
      solution: 'Sử dụng hệ thống chống rung cao cấp kết hợp tracking mượt mà lấy nét mắt thông minh, tạo ra thước phim thương hiệu đỉnh cao.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'viettelmoney',
      title: 'Sức khỏe của bạn - Viettel Money lo',
      client: 'Viettel money',
      year: '2022',
      category: 'tvc',
      tag: 'Brand Product Commercial',
      role: 'Postproduction Specialist / Audio Master',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=600',
      specs: 'ARRI Alexa Mini HF // Signature Prime // After Effects',
      challenge: 'Lồng ghép thủ tục đóng viện phí, bảo hiểm khô khan thành các hoạt cảnh gia đình giản dị, đầy thấu cảm.',
      solution: 'Hậu kỳ match-cut chuyển tiếp nhanh, kết hợp typography hiệu ứng sinh động tăng tối đa khả năng tương thích tin cậy.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'vuanem',
      title: 'Giải Trí & Giấc Ngủ Ngon Vô Lo',
      client: 'Vua Nệm',
      year: '2022',
      category: 'tvc',
      tag: 'Creative Viral TVC',
      role: 'Video Editor & Color Grading',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600',
      specs: 'RED Gemini // Zeiss Supreme Prime',
      challenge: 'Kết hợp yếu tố âm nhạc năng động trẻ trung và bối cảnh phòng ngủ trong nhà để tạo cảm giác hài hước dễ chịu.',
      solution: 'Sắp xếp nhịp điệu cắt dựng dồn dập đồng bộ với nhạc cụ, mang lại bầu không khí phóng khoáng kích thích mua sắm.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'bidvpremier',
      title: 'Dịch vụ Tài chính Cao cấp',
      client: 'BIDV Premier',
      year: '2023',
      category: 'corporate',
      tag: 'Executive Corporate Movie',
      role: 'Production Supervisor / Grader',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600',
      specs: 'Sony FX6 // 24-70 GM II // Cine-color Grading',
      challenge: 'Thể hiện phong thái chuyên nghiệp đỉnh cao và chất lượng phục vụ sang trọng bậc nhất của khối khách hàng VIP.',
      solution: 'Nâng tông xanh hoàng gia kết hợp bối cảnh văn phòng kính gương cao cấp, tạo cảm hứng uy tín tài chính vững bền.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'manulife',
      title: 'Year Summary Video 2022',
      client: 'Manulife Việt Nam',
      year: '2022',
      category: 'corporate',
      tag: 'Annual Summary Masterpiece',
      role: 'Creative Director / Tech Lead Team',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600',
      specs: 'Panasonic S1H // Lumix S-Pro // Motion Elements',
      challenge: 'Vừa tổng kết con số tài chính khô khan (mốc doanh thu 500 tỷ, 277 tỷ) vừa tạo khí thế hào hùng đầy tự hào.',
      solution: 'Ứng dụng đồ họa 3D chuyển động trực quan mượt mà lồng ghép cùng thông điệp vượt ngũ hành trình rực rỡ.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'afotech',
      title: 'Corporate Film Cung Đình',
      client: 'Afotech',
      year: '2022',
      category: 'corporate',
      tag: 'Industrial Brand Story',
      role: 'Lead Project Director / Storyteller',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600',
      specs: 'Sony FX3 // Nano-primes // Cap One Tethered',
      challenge: 'Khai thác chân thực dây chuyền nhà máy sạch sẽ khép kín cùng chân dung ban điều hành uy tín.',
      solution: 'Chỉ đạo bối cảnh chỉnh chu, setup dàn đèn phủ sáng tự nhiên tạo độ bóng hấp dẫn cho các quầy nguyên liệu hủ tiếu.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'iecgroup',
      title: 'Vietnam Security Summit 2022',
      client: 'IEC Group',
      year: '2022',
      category: 'corporate',
      tag: 'Tech Seminar Highlights',
      role: 'Cinematographer & Assembly Editor',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600',
      specs: 'Sony FX3 // Gimbal DJI RS3 Pro // Premiere Pro',
      challenge: 'Sự kiện lớn quy tụ 1000+ lãnh đạo an ninh mạng diễn ra liên tục tốc độ cao, góc máy cần bao quát toàn cảnh đón đầu khoảnh khắc.',
      solution: 'Sử dụng ống kính đa tiêu cự bắt nhanh thái độ chuyên gia, dựng phim tiết tấu nhanh dứt khoát đậm màu công nghệ.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'vodaplay',
      title: 'Video Marketing App Launch',
      client: 'Vodaplay',
      year: '2022',
      category: 'corporate',
      tag: 'App Viral Launching Video',
      role: 'Lead post-production designer',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600',
      specs: 'Blackmagic Pocket 4K // Lumix 12-35 // VFX overlay',
      challenge: 'Truyền tải tính năng xem YouTube không quảng cáo độc đáo sinh động nhắm trúng thị hiếu giới trẻ.',
      solution: 'Dựng nhịp nhảy múa vui tươi sôi động, bổ sung hiệu ứng điện thoại giả lập tương tác 3D nổi bật.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'ipos',
      title: 'Xây kênh tiktok Nhà Hàng Bận Rộn',
      client: 'iPOS.vn',
      year: '2023',
      category: 'tiktok',
      tag: 'Tiktok Channel Blueprint',
      role: 'Technical Director / Content Strategist',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600',
      specs: 'Sony FX3 // Portrait lighting / Vertic cut',
      challenge: 'Làm thế actor trông tự nhiên tếu táo mà vẫn nổi rõ giải pháp bán hàng F&B tối ưu.',
      solution: 'Tối ngắm góc máy đứng dọc di động 9:16 sắc nét chuẩn TikTok rực rỡ đạt mốc 443K lượt thích.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'suming',
      title: 'Xây kênh tiktok Sứ Ming',
      client: 'Sứ Ming',
      year: '2023',
      category: 'tiktok',
      tag: 'Artisan Brand Channel Build',
      role: 'Visual Director & Lighting Setup',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=600',
      specs: 'Sony FX3 // Macro lenses // Warm Aesthetic Grade',
      challenge: 'Tôn vinh tinh hoa gốm sứ độc bản với không khí chậm rãi tĩnh lặng đầy sang quý chất phác.',
      solution: 'Phủ nguồn sáng mềm mịn khuếch tán diện rộng bộc lộ rõ vân men sứ tinh tế, kéo mốc tương tác tự nhiên đột phá.',
      link: 'https://behance.net/longtrn19'
    }
  ];

  const industries = [
    { name: 'TVC Quảng cáo', desc: 'Sản xuất phim quảng cáo truyền hình sang trọng đạt mốc triệu view.' },
    { name: 'Phim Doanh nghiệp', desc: 'Báo cáo tổng kết hoành tráng, giới thiệu quy mô công ty đắt giá.' },
    { name: 'Xây kênh TikTok', desc: 'Thúc đẩy chỉ số tiếp cận tự nhiên bứt phá thông qua kịch bản F&B, lối sống.' },
    { name: 'Video Marketing', desc: 'Bứt phá doanh số cho ứng dụng di động sành điệu, giới trẻ.' },
    { name: 'Sự kiện & Hội thảo', desc: 'Highlight hội nghị cấp cao chuyên nghiệp chuẩn chỉ.' }
  ];

  const skillBadges = [
    { title: 'Directing & On-set Control', desc: 'Điều phối hiện trường với tư duy đạo diễn, đảm bảo mỗi khung hình phục vụ đúng narrative và cảm xúc.' },
    { title: 'Cinematic Story Development', desc: 'Phát triển ý tưởng dựa trên insight, chuyển hóa thành ngôn ngữ hình ảnh có tính điện ảnh và định hướng rõ ràng.' },
    { title: 'Post-production Craft', desc: 'Dựng phim, nhịp điệu hình ảnh và hoàn thiện cấu trúc storytelling trong hậu kỳ.' },
    { title: 'Color & Visual Finishing', desc: 'Xây dựng mood & tone thông qua color grading và VFX, đảm bảo tính nhất quán thẩm mỹ.' },
    { title: 'Lighting & Visual Composition', desc: 'Kiểm soát ánh sáng và bố cục để định hình không gian, cảm xúc và chiều sâu hình ảnh.' },
    { title: 'Brand & Communication Thinking', desc: 'Hiểu và triển khai hình ảnh dựa trên mục tiêu truyền thông và chiến lược thương hiệu.' }
  ];

  const toolsData = [
    { id: 'pr', name: 'Premiere Pro', desc: 'Core video editing, multi-cam cut, film assembly.', accent: '#9999FF', color: 'bg-[#00005c]', init: 'Pr' },
    { id: 'dr', name: 'DaVinci Resolve', desc: 'Industry-standard color grading & raw processing.', accent: '#FF9933', color: 'bg-[#401200]', init: 'Dr' },
    { id: 'ae', name: 'After Effects', desc: 'VFX, kinetic typography & motion graphic design.', accent: '#E639FF', color: 'bg-[#3b0040]', init: 'Ae' },
    { id: 'co', name: 'Capture One', desc: 'High-speed professional tethering and RAW photo grading.', accent: '#33CCFF', color: 'bg-[#00384d]', init: 'Co' },
    { id: 'ps', name: 'Photoshop', desc: 'Advanced graphics, asset composites & heavy retouching.', accent: '#3399FF', color: 'bg-[#002244]', init: 'Ps' },
    { id: 'lr', name: 'Lightroom', desc: 'Batch color design & editorial portrait processing.', accent: '#33FFCC', color: 'bg-[#004d3c]', init: 'Lr' },
    { id: 'ai', name: 'Illustrator', desc: 'Vector layout assets for commercial banners & overlays.', accent: '#FFaa00', color: 'bg-[#4d3300]', init: 'Ai' }
  ];

  return (
    <div id="director-root" className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#000000] text-slate-150">
      
      {/* 1. Precise Embedded Global Styling (Liquid Glass, Apple Typography & Modern Chrome Colorways) */}
      <style>{`
        :root {
          --primary-glow: #ff2a2a;
          --secondary-glow: #8c0000;
          --glass-accent: rgba(255, 42, 42, 0.18);
          --chrome-accent: #ffffff;
          --font-apple: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Compact Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        body {
          font-family: var(--font-apple);
          background-color: #000000;
          color: #ffffff;
          margin: 0;
          overflow-x: hidden;
          letter-spacing: -0.015em;
        }

        @keyframes pulse-red {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.95); }
        }

        .pulse-rec {
          animation: pulse-red 2s infinite ease-in-out;
        }

        @keyframes fade-rise {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animate-fade-rise {
          animation: fade-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Modern Chrome and Liquid Glass Styling */
        .glass-chrome {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
          backdrop-filter: blur(32px) saturate(200%);
          -webkit-backdrop-filter: blur(32px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 30px 70px rgba(0, 0, 0, 0.95),
            inset 0 1px 1px rgba(255, 255, 255, 0.25),
            inset 0 -1px 20px rgba(255, 42, 42, 0.08),
            0 0 40px rgba(255, 42, 42, 0.03);
        }

        .liquid-glass {
          background: rgba(18, 4, 4, 0.45);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 24px 60px rgba(0, 0, 0, 0.9),
            inset 0 1px 1px rgba(255, 255, 255, 0.2),
            inset 0 -1px 15px rgba(255, 42, 42, 0.12);
        }

        .liquid-glass-soft {
          background: rgba(12, 3, 3, 0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 42, 42, 0.1);
        }

        /* Apple Cinematic Chrome-Edged Interactive Button */
        .liquid-glass-btn {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 42, 42, 0.04) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.5),
            inset 0 1px 1.5px rgba(255, 255, 255, 0.35),
            0 0 15px rgba(255, 42, 42, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .liquid-glass-btn:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 42, 42, 0.15) 100%);
          border-color: rgba(255, 42, 42, 0.85);
          box-shadow: 
            0 16px 45px rgba(255, 42, 42, 0.28),
            inset 0 1px 2px rgba(255, 255, 255, 0.5),
            0 0 30px rgba(255, 42, 42, 0.25);
          transform: translateY(-2px);
        }

        .liquid-glass-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(255, 42, 42, 0.15);
        }

        /* Custom Audio pulse level indicators */
        .audio-bar {
          transition: height 0.15s ease-in-out;
        }

        /* Scrollbar customizing to reflect liquid glass theme */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #000000;
        }
        ::-webkit-scrollbar-thumb {
          background: #260505;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #ff2a2a;
        }
      `}</style>

      {/* Cyber/Chrome Deep Red, Ruby and Platinum White Ambient Fluid Lights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left top ambient sapphire-indigo */}
        <div className="absolute top-[-10%] left-[-15%] w-[70%] h-[70%] rounded-full opacity-35 blur-[160px] bg-gradient-to-br from-[#9c0d0d] via-[#330000] to-transparent"></div>
        {/* Right middle vibrant cyan */}
        <div className="absolute top-[20%] right-[-10%] w-[65%] h-[65%] rounded-full opacity-25 blur-[140px] bg-gradient-to-tr from-[#ff2a2a] via-[#4d000c] to-transparent"></div>
        {/* Bottom left deep metallic slot */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[65%] h-[65%] rounded-full opacity-20 blur-[130px] bg-gradient-to-tr from-[#1f0505] via-black to-transparent"></div>
        {/* Subtle white highlight gradient recreating WWDC specular sheen */}
        <div className="absolute top-[5%] left-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[180px] bg-white"></div>
        {/* Dark film production vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.92)_100%)]"></div>
      </div>

      {/* Cinematic Film Grain Structure overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay bg-repeat bg-[url('https://www.transparenttextures.com/patterns/p6.png')] z-20"></div>

      {/* BACKGROUND ATMOSPHERE LOOPER */}
      <div id="video-bg-container" className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/75 z-1 pointer-events-none" />
        <video
          id="hero-background-video"
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-25"
          src="https://d8j0ntIcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXHO7IWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />
      </div>

      {/* TOP SYSTEM BAR COORDINATES (Phone, Email, Hanoi) */}
      <div id="system-top-ticker" className="relative z-30 w-full border-b border-white/[0.04] bg-black/45 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-12 py-2 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-[11px] font-mono text-[#d1d1d6] gap-2 sm:gap-0">
          
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center sm:justify-start">
            <a href="tel:0869698420" className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-red-500" />
              <span>086 969 8420</span>
            </a>
            <span className="opacity-40">|</span>
            <a href="mailto:tranlong301198@gmail.com" className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3 text-red-500" />
              <span>tranlong301198@gmail.com</span>
            </a>
            <span className="opacity-40">|</span>
            <a href="https://www.facebook.com/HaloTrVN/" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Facebook className="w-3 h-3 text-red-500" />
              <span>_FB</span>
            </a>
            <span className="opacity-40">|</span>
            <a href="https://www.instagram.com/tran.halo/" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Instagram className="w-3 h-3 text-red-500" />
              <span>_IG</span>
            </a>
            <span className="opacity-40">|</span>
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

      {/* GLASSMORPHIC APPLE NAVBAR */}
      <header id="nav-header" className="relative z-30 w-full">
        <div id="nav-container" className="flex flex-row justify-between items-center px-12 py-6 max-w-7xl mx-auto">
          
          {/* Logo & Sub-Badge */}
          <a id="nav-logo" href="/" className="flex items-center gap-3 group relative z-30">
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
          </a>

          {/* Navigation link swappers */}
          <nav id="nav-links-desktop" className="hidden md:flex items-center space-x-1 w-auto max-w-md bg-slate-950/60 border border-white/10 p-1 rounded-full backdrop-blur-lg">
            {navLinks.map((link) => (
              <button
                id={`nav-link-${link.key}`}
                key={link.key}
                onClick={() => setActiveTab(link.key as any)}
                className={`text-[9px] uppercase tracking-[0.18em] font-bold px-4 py-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  activeTab === link.key 
                    ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white border border-white/20 shadow-[0_0_15px_rgba(255,42,42,0.25)]' 
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Trigger */}
          <div id="nav-actions" className="flex items-center gap-4 relative z-30">
            <button
              id="begin-journey-header-btn"
              onClick={handleBeginJourney}
              className="px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-lg text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-red-500/10 hover:border-red-400/60 hover:text-red-500 hover:shadow-[0_0_15px_rgba(255,42,42,0.2)] transition-all cursor-pointer hidden md:block"
            >
              START A PROJECT
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-[#0c0202]/50 backdrop-blur-md text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* PORTFOLIO ACCORDION VIEWPORT LAYOUT */}
      <main id="director-main-viewport" className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex flex-col justify-center">

        {/* ==================================== TABS 1: ATMOSPHERE REEL ==================================== */}
        {activeTab === 'reel' && (
          <div id="view-reel" className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center py-6 animate-fade-rise">
            
            {/* Left intro copy (6+ Years of absolute production control) */}
            <div className="lg:col-span-5 text-left flex flex-col justify-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-950/40 to-slate-900/60 rounded-full border border-red-500/20 text-[9px] font-mono tracking-widest uppercase text-white/90">
                <Sparkles className="w-3 h-3 text-red-500 animate-spin" />
                <span>6+ YEARS EXPERIENCE // HÀ NỘI ORIGIN</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.1]">
                <span className="whitespace-nowrap">TRẦN <span className="text-red-500">NHẬT LONG</span></span>
                <span className="block mt-2 text-base sm:text-lg lg:text-2xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/40 italic">
                  Director | Commercial & Brand Films
                </span>
              </h1>

              <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                Tôi giúp thương hiệu chuyển hóa những <strong className="text-white">insight cốt lõi</strong> thành trải nghiệm hình ảnh giàu cảm xúc — nơi câu chuyện không chỉ được kể, mà <strong className="text-red-500">được cảm nhận</strong>.
              </p>

              <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                Tôi tin rằng có những hình ảnh có thể thay thế cả một câu chuyện. Công việc của tôi là tìm ra và định hình những hình ảnh đó — phát triển chúng thành những ý tưởng <strong className="text-white">mang tính điện ảnh</strong>, đồng thời kiểm soát chặt chẽ toàn bộ quá trình sản xuất, để mỗi khung hình không chỉ có giá trị thẩm mỹ, mà còn phục vụ chính xác <strong className="text-red-500">mục tiêu truyền thông</strong>.
              </p>

              {/* Quick stats board */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-sm">
                  <div className="text-3xl font-extrabold text-red-500">300+</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mt-1">Dự án hoàn thành</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-sm">
                  <div className="text-3xl font-extrabold text-white">2019</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-red-400 mt-1">Khởi đầu TIDO Media</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-sm col-span-2 md:col-span-1">
                  <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-600">100%</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mt-1">Chuẩn đầu ra TVC</div>
                </div>
              </div>

              {/* Action proposal block */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleBeginJourney}
                  className="liquid-glass-btn px-8 py-3.5 rounded-full text-[10px] uppercase tracking-widest font-extrabold text-white flex items-center gap-2 cursor-pointer"
                >
                  <span>MỞ LỜI MỜI HỢP TÁC</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="px-8 py-3.5 rounded-full border border-white/10 bg-white/[0.01] hover:bg-red-500/10 hover:border-red-400/30 transition-all text-[10px] uppercase tracking-widest font-extrabold cursor-pointer"
                >
                  XEM THƯ MỤC DỰ ÁN
                </button>
              </div>

            </div>

            {/* Right: Immersive High-Fidelity Camera Viewfinder Simulator */}
            <div className="lg:col-span-7 w-full relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black shadow-4xl aspect-video lg:aspect-video flex items-center justify-center">
                
                {/* Active loop background screen */}
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-80 transition-all duration-500"
                  src="https://d8j0ntIcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXHO7IWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
                />

                {/* Simulated Aspect Ratio Cinematic Crop Mask */}
                {selectedAspect === 'cinemascope' && (
                  <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none z-10">
                    <div className="h-[12%] bg-black w-full border-b border-white/[0.06] transition-all"></div>
                    <div className="h-[12%] bg-black w-full border-t border-white/[0.06] transition-all"></div>
                  </div>
                )}

                {selectedAspect === 'portrait' && (
                  <div className="absolute inset-x-0 inset-y-0 flex flex-row justify-between pointer-events-none z-10">
                    <div className="w-[30%] bg-black h-full border-r border-white/[0.06] transition-all"></div>
                    <div className="w-[30%] bg-black h-full border-l border-white/[0.06] transition-all"></div>
                  </div>
                )}

                {/* Viewfinder Overlays (Kinetic Grid, Telemetry Stats) */}
                <div className="absolute inset-0 z-20 p-5 flex flex-col justify-between pointer-events-none font-mono text-[9px] text-[#e5e5ea]">
                  
                  {/* Viewfinder Row 1 */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 bg-black/45 px-2 py-1 rounded border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-rec"></span>
                      <span className="font-bold text-red-550">REC [A]</span>
                    </div>

                    <div className="flex items-center gap-3 bg-black/45 px-2 py-1 rounded border border-white/5">
                      <span>4K DCI 24fps</span>
                      <span className="text-red-500">RAW</span>
                    </div>
                  </div>

                  {/* Viewfinder Center Crosshair focus marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 flex items-center justify-center border border-white/10 rounded-full opacity-45 pointer-events-none">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="absolute top-0 w-2 h-[1px] bg-white"></div>
                    <div className="absolute bottom-0 w-2 h-[1px] bg-white"></div>
                    <div className="absolute left-0 w-[1px] h-2 bg-white"></div>
                    <div className="absolute right-0 w-[1px] h-2 bg-white"></div>
                  </div>

                  {/* Viewfinder Row 2 (Bottom Control Bar with dynamic parameters and telemetry) */}
                  <div className="flex justify-between items-end">
                    
                    {/* Left: Interactive aspects switches */}
                    <div className="flex items-center gap-1.5 pointer-events-auto bg-black/60 p-1 rounded-full border border-white/10">
                      <button
                        onClick={() => setSelectedAspect('cinemascope')}
                        className={`px-2 py-1 rounded-full text-[8px] font-bold transition-all ${selectedAspect === 'cinemascope' ? 'bg-red-550 text-white shadow-[0_0_10px_rgba(255,42,42,0.4)] border border-red-500/30' : 'text-neutral-400 hover:text-white'}`}
                      >
                        2.39:1
                      </button>
                      <button
                        onClick={() => setSelectedAspect('standard')}
                        className={`px-2 py-1 rounded-full text-[8px] font-bold transition-all ${selectedAspect === 'standard' ? 'bg-red-550 text-white shadow-[0_0_10px_rgba(255,42,42,0.4)] border border-red-500/30' : 'text-neutral-400 hover:text-white'}`}
                      >
                        16:9
                      </button>
                      <button
                        onClick={() => setSelectedAspect('portrait')}
                        className={`px-2 py-1 rounded-full text-[8px] font-bold transition-all ${selectedAspect === 'portrait' ? 'bg-red-550 text-white shadow-[0_0_10px_rgba(255,42,42,0.4)] border border-red-500/30' : 'text-neutral-400 hover:text-white'}`}
                      >
                        9:16
                      </button>
                    </div>

                    {/* Shutter status display */}
                    <div className="bg-black/45 px-2.5 py-1 rounded border border-white/5 flex gap-3 text-[8px] sm:text-[9px]">
                      <span>{fStop}</span>
                      <span className="text-red-500">{shutterAngle}</span>
                      <span>{isoValue}</span>
                    </div>

                    {/* Timecode block */}
                    <div className="bg-black/60 px-3 py-1 rounded border border-white/10 text-white font-mono tracking-widest text-[10px] sm:text-[11px]">
                      {sequenceTime}
                    </div>

                  </div>

                </div>

                {/* Cinematic sound volume bars on the right side screen overlay */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-20 pointer-events-none">
                  {[12, 18, 22, 14, 8, 24, 18, 10, 4].map((h, idx) => (
                    <div 
                      key={idx} 
                      className="w-[3px] bg-gradient-to-b from-red-500 to-amber-600 rounded-full transition-all duration-300"
                      style={{ height: `${h + Math.floor(Math.random() * 8)}px` }}
                    />
                  ))}
                </div>

                {/* Play/Pause hover action circle */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity z-20">
                  <button
                    onClick={toggleVideoPlay}
                    className="w-16 h-16 rounded-full border-2 border-red-500 bg-black/75 backdrop-blur-md flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,42,42,0.4)]"
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-6 h-6 text-red-500 stroke-[1.5]" />
                    ) : (
                      <Play className="w-6 h-6 text-red-500 stroke-[1.5] ml-1" />
                    )}
                  </button>
                </div>

              </div>

              {/* Viewfinder Subtitle descriptor */}
              <div className="mt-3 flex justify-between items-center text-xs text-neutral-400 px-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-red-500" />
                  <span>Interactive Loop Atmosphere Frame</span>
                </span>
                <span>Active Sequence: [TIDO_REEL_MASTER]</span>
              </div>

            </div>

          </div>
        )}

        {/* ==================================== TABS 2: SELECTED WORKS ==================================== */}
        {activeTab === 'projects' && (
          <div id="view-projects" className="w-full flex flex-col space-y-6 py-4 animate-fade-rise text-left">
            
            {/* Tab header area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-white/[0.04]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-400/30 text-[9px] font-mono tracking-widest uppercase text-red-500">
                  <Film className="w-3.5 h-3.5" />
                  <span>COMMERCIAL PRODUCTION ARCHIVE</span>
                </div>
                <h2 className="text-3xl font-black text-white mt-2 uppercase tracking-tight">Thư mục dự án chọn lọc</h2>
                <p className="text-neutral-450 text-sm mt-1 max-w-2xl leading-relaxed">
                  Tổng hợp các chiến dịch quảng cáo, TVC nhãn hàng, phim doanh nghiệp và chiến dịch phủ sóng TikTok chất lượng cao rèn dũa qua hàng trăm dự án thương mại thực chiến.
                </p>
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap gap-2 bg-slate-950/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
                {[
                  { key: 'all', label: 'TẤT CẢ' },
                  { key: 'tvc', label: 'TVC QUẢNG CÁO' },
                  { key: 'corporate', label: 'DOANH NGHIỆP & EVENT' },
                  { key: 'tiktok', label: 'TIKTOK & SOCIAL' }
                ].map((btn) => (
                  <button
                    key={btn.key}
                    onClick={() => setProjectFilter(btn.key as any)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold font-mono tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                      projectFilter === btn.key 
                        ? 'bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 text-white shadow-md shadow-red-500/20 shadow-[0_0_15px_rgba(255,42,42,0.18)]' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Project Showcase (Bia Ha Long) */}
            {projectFilter === 'all' && (
              <div 
                className="group relative rounded-3xl overflow-hidden border border-white/15 bg-slate-950/40 backdrop-blur-md p-6 sm:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-6 items-center hover:border-red-400/50 transition-all shadow-[0_4px_30px_rgba(255,42,42,0.05)] cursor-pointer"
                onClick={() => setSelectedProject(projectsData[0])}
              >
                <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-video w-full">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${projectsData[0].image}')` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/60 border border-red-500/30 backdrop-blur-md rounded-full text-[10px] font-mono uppercase text-white">
                    <Sparkles className="w-3 h-3 text-red-400 animate-pulse" />
                    <span>DỰ ÁN TIÊU BIỂU</span>
                  </div>
                </div>
                <div className="lg:col-span-5 text-left space-y-4">
                  <span className="text-[10px] tracking-widest font-mono text-red-500 font-extrabold uppercase bg-red-950/20 px-2.5 py-1 rounded-md">{projectsData[0].tag}</span>
                  <h3 className="text-3xl font-black text-white leading-tight group-hover:text-red-500 transition-colors">{projectsData[0].title}</h3>
                  <div className="flex gap-4 text-xs font-mono text-neutral-400">
                    <span>Nhãn hàng: <strong className="text-white">{projectsData[0].client}</strong></span>
                    <span>Năm: <strong className="text-white">{projectsData[0].year}</strong></span>
                  </div>
                  <p className="text-neutral-455 text-sm leading-relaxed font-normal">
                    {projectsData[0].challenge}
                  </p>
                  <div className="text-[10px] font-mono text-neutral-400 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    🎬 Thiết bị: {projectsData[0].specs}
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 pt-2">
                    <span>XEM THÔNG TIN CHI TIẾT</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Grid matching filtered items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData
                .filter(p => projectFilter === 'all' || p.category === projectFilter)
                .slice((projectFilter === 'all') ? 1 : 0) // Skip first in 'All' because it is shown as featured
                .map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className="group rounded-2xl border border-white/[0.06] bg-[#0c0202]/35 hover:border-red-400/50 hover:shadow-[0_0_15px_rgba(255,42,42,0.12)] transition-all overflow-hidden flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Image Preview frame */}
                      <div className="relative aspect-video w-full overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${proj.image}')` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 flex justify-between items-center w-[calc(100%-24px)] text-white font-mono text-[9px]">
                          <span className="bg-red-950/30 backdrop-blur-md px-2 py-0.5 rounded border border-red-500/20">{proj.year}</span>
                          <span className="text-neutral-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap font-mono">{proj.specs.split(' // ')[0]}</span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-5 text-left space-y-2">
                        <div className="text-[9px] font-mono text-red-500 font-bold uppercase tracking-widest">{proj.tag}</div>
                        <h4 className="text-base font-extrabold text-white group-hover:text-red-500 transition-colors leading-snug line-clamp-1">{proj.title}</h4>
                        <p className="text-xs text-neutral-410 leading-relaxed line-clamp-2">{proj.challenge}</p>
                      </div>
                    </div>

                    {/* Footer brand details */}
                    <div className="px-5 py-3.5 border-t border-white/[0.04] bg-white/[0.005] flex justify-between items-center text-xs font-mono text-neutral-500">
                      <span>Brand: <strong className="text-white">{proj.client}</strong></span>
                      <span className="text-red-500 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[10px]">INFO <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* ==================================== TABS 3: SKILLS ==================================== */}
        {activeTab === 'skills' && (
          <div id="view-skills" className="w-full flex flex-col md:grid md:grid-cols-12 gap-8 py-4 animate-fade-rise text-left">
            
            {/* Left side: Skills Core Capsules list */}
            <div className="md:col-span-6 space-y-6">
              
              <div>
                <div id="skills-title-badge" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/22 text-[9px] font-mono tracking-widest uppercase text-red-400">
                  <Award className="w-3.5 h-3.5 text-red-550" />
                  <span>CORE EXPERTISE</span>
                </div>
                <h2 className="text-3xl font-black text-white mt-2">Năng lực nghiệp vụ</h2>
                <p className="text-neutral-455 text-sm mt-1 leading-relaxed">
                  Được phát triển qua 300+ dự án độc lập và hợp tác cùng các agency, hệ thống năng lực của tôi không chỉ dừng lại ở kỹ thuật, mà là khả năng kiểm soát toàn bộ quá trình tạo ra hình ảnh — từ ý tưởng đến thành phẩm.
                </p>
              </div>

              {/* Skills capsule grid container */}
              <div id="skills-capsules-grid" className="flex flex-col gap-3">
                {skillBadges.map((badge, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-white/[0.012] border border-white/[0.04] hover:bg-red-500/10 hover:border-red-400/30 hover:shadow-[0_0_15px_rgba(255,42,42,0.12)] transition-all flex justify-between items-start group cursor-pointer"
                  >
                    <div className="flex flex-col text-left space-y-1">
                      <span className="text-sm font-extrabold text-white group-hover:text-red-500 transition-colors">
                        • {badge.title}
                      </span>
                      <span className="text-xs text-neutral-400 leading-relaxed font-normal">
                        {badge.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right side: Specialized Technical Tools layout with Hover definitions */}
            <div className="md:col-span-6 space-y-6 flex flex-col justify-between">
              
              <div>
                <div id="tools-title-badge" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-[9px] font-mono tracking-widest uppercase text-red-400">
                  <Sliders className="w-3.5 h-3.5 text-red-550" />
                  <span>PRODUCTION TOOLSET</span>
                </div>
                <h2 className="text-3xl font-black text-white mt-2">Phần mềm chuyên dụng</h2>
                <p className="text-neutral-455 text-sm mt-1 leading-relaxed">
                  Công cụ không tạo nên hình ảnh — cách sử dụng chúng mới là điều quyết định. Rê chuột hoặc chạm vào các biểu tượng phần mềm bên dưới để xem vai trò trong luồng công việc:
                </p>
              </div>

              {/* Dynamic tools card displaying active state details */}
              <div className="p-6 rounded-3xl border border-white/[0.06] bg-[#0c0202]/45 backdrop-blur-md relative min-h-[140px] flex items-center justify-between overflow-hidden">
                <div className="absolute top-0 right-0 p-3 font-mono text-[8px] text-neutral-500">MAPPED TOOL CONTEXT</div>
                {hoveredTool ? (
                  <div className="space-y-2 animate-fade-rise text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white" style={{ backgroundColor: hoveredTool.color, borderColor: hoveredTool.accent, borderWidth: '1.5px', boxShadow: `0 0 15px ${hoveredTool.accent}33` }}>
                        {hoveredTool.init}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-base text-white">{hoveredTool.name}</h4>
                        <span className="text-[9px] text-red-500 font-mono uppercase tracking-widest font-bold">Active pipeline verified</span>
                      </div>
                    </div>
                    <p className="text-neutral-300 text-xs leading-relaxed max-w-sm font-normal">
                      {hoveredTool.desc}
                    </p>
                  </div>
                ) : (
                  <div className="text-left text-neutral-500 text-xs py-4 font-normal">
                    <span>* Rê chuột hoặc chạm vào các biểu tượng phần mềm bên dưới để đọc vai trò trong luồng công việc...</span>
                  </div>
                )}
              </div>

              {/* Grid of Tools icons matching the user's PDF resume styles */}
              <div id="tools-icon-bento" className="grid grid-cols-4 gap-4">
                {toolsData.map((tool) => (
                  <div
                    id={`tool-card-${tool.id}`}
                    key={tool.id}
                    onMouseEnter={() => setHoveredTool({ 
                      name: tool.name, 
                      desc: tool.desc, 
                      color: tool.color, 
                      accent: tool.accent,
                      init: tool.init
                    } as any)}
                    onMouseLeave={() => setHoveredTool(null)}
                    className="aspect-square rounded-2xl border border-white/10 bg-[#080202]/85 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:border-red-400/50 hover:shadow-[0_0_20px_rgba(255,42,42,0.25)] relative group"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white transition-all shadow-md"
                      style={{ backgroundColor: tool.color, borderColor: tool.accent, borderWidth: '1px' }}
                    >
                      {tool.init}
                    </div>
                    <span className="text-[9px] font-mono font-bold text-neutral-400 mt-2 text-center group-hover:text-white transition-colors">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ==================================== TABS 4: PORTRAIT & BIOGRAPHY ==================================== */}
        {activeTab === 'profile' && (
          <div id="view-profile" className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 py-4 animate-fade-rise text-left">
            
            {/* Left side: Premium Viewfinder Profile Container & Academic / Selected Experience */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col space-y-6">
              
              <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-red-400/30 transition-colors bg-black aspect-square max-w-md mx-auto w-full group shadow-2xl">
                {/* Visual Viewfinder framing */}
                <div className="absolute inset-0 pointer-events-none z-10 p-5 font-mono text-[9px] text-white/50 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span>PORTRAIT CAM_01</span>
                    <span className="text-red-500 font-bold">100% FOCUS</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span>Focal 50mm</span>
                    <span className="font-mono text-[10px] tracking-widest text-red-500">{sequenceTime}</span>
                  </div>
                </div>

                {/* Simulated portrait image via modern CSS layers representing Tran Nhat Long */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-900 to-slate-900/40 z-0 flex items-center justify-center p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-45" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1494&auto=format&fit=crop')" }}></div>
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-1"></div>
                  
                  {/* Stylized camera graphics instead */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-full border-2 border-red-500 bg-slate-950/80 backdrop-blur-md flex items-center justify-center relative shadow-[0_0_15px_rgba(255,42,42,0.25)]">
                      <Aperture className="w-12 h-12 text-red-500 animate-spin" style={{ animationDuration: '40s' }} />
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-650 rounded-full border border-black pulse-rec"></div>
                    </div>
                    <div>
                      <div className="text-red-500 font-mono text-[11px] uppercase tracking-widest font-extrabold text-white font-mono">HALOTr</div>
                      <div className="text-red-500 text-xs font-mono font-medium mt-1">Director / Filmmaker</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Block matched with PDF resume */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#0c0202]/45 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-950/20 flex items-center justify-center border border-red-400/30 text-red-550">
                    <GraduationCap className="w-4 h-4 text-red-550" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono tracking-wider font-extrabold text-red-500 uppercase">ACADEMIC BACKGROUND</h4>
                    <span className="text-xs font-extrabold text-white">Đại học Mỏ - Địa chất (Hà Nội)</span>
                  </div>
                </div>
                
                <div className="border-l border-red-505 pl-4 space-y-1">
                  <p className="text-xs text-neutral-300 font-bold">Chuyên ngành: Công nghệ Kỹ thuật Điện - Điện tử</p>
                  <p className="text-[11px] font-mono text-neutral-500">2017 — 2021</p>
                </div>
              </div>

              {/* Selected Experience Block */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#0c0202]/45 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-950/20 flex items-center justify-center border border-red-400/30 text-red-500">
                    <Award className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono tracking-wider font-extrabold text-red-500 uppercase font-mono">SELECTED EXPERIENCE</h4>
                    <span className="text-xs font-extrabold text-white">Cột mốc thực hiện</span>
                  </div>
                </div>
                
                <ul className="space-y-2.5 pl-1 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>300+ dự án hình ảnh & video thương mại</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Làm việc cùng agency và thương hiệu đa ngành</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Trải nghiệm đa vai trò tại Tido Media (Technical Lead / Technical Director)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Phát triển Tido Creative như một hệ thống sản xuất độc lập</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right side: Detailed Profiles, Philosophies, and Industrial Approaches */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col space-y-6">
              
              {/* Header Slogan Area */}
              <div className="p-8 rounded-3xl border border-white/[0.06] bg-[#0c0202]/35 backdrop-blur-md space-y-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-mono tracking-[0.25em] text-red-500 uppercase font-bold">INTRODUCING AUTHOR</span>
                  <h2 className="text-4xl font-extrabold text-white tracking-tight">NHẬT LONG</h2>
                  <span className="text-sm font-mono tracking-widest text-[#a3a3a3] uppercase font-bold">Director / Filmmaker</span>
                </div>
                <div className="w-12 h-[1px] bg-red-500"></div>
                <p className="text-lg text-white font-medium leading-relaxed italic pr-4">
                  "Giúp thương hiệu kể những câu chuyện bằng hình ảnh — với nhịp điệu và cảm xúc được kiểm soát."
                </p>
              </div>

              {/* Creative Profile Block */}
              <div className="p-8 rounded-3xl border border-white/[0.06] bg-[#0c0202]/35 backdrop-blur-md space-y-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-red-500 rounded"></div>
                  <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-red-500 uppercase">CREATIVE PROFILE</h3>
                </div>
                <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-normal">
                  <p>
                    Bắt đầu từ năm 2019 tại Tido Media — trong giai đoạn công ty đang hình thành — quá trình làm việc qua nhiều vai trò đã mang lại góc nhìn toàn diện về cách một sản phẩm hình ảnh được xây dựng và vận hành trong thực tế.
                  </p>
                  <p>
                    Trải qua hơn 7 năm làm việc và 300+ dự án đã triển khai, năng lực không chỉ nằm ở việc phát triển ý tưởng, mà còn ở khả năng kiểm soát toàn bộ pipeline sản xuất — đảm bảo mỗi sản phẩm đạt được sự cân bằng giữa chất lượng hình ảnh và hiệu quả truyền thông.
                  </p>
                  <p>
                    Hiện tại, Tido Creative đang được phát triển như một định hướng dài hạn — tập trung vào việc xây dựng ngôn ngữ hình ảnh nhất quán và tiêu chuẩn sản xuất ở mức cao.
                  </p>
                </div>
              </div>

              {/* Creative Philosophy Block */}
              <div className="p-8 rounded-3xl border border-white/[0.06] bg-[#0c0202]/35 backdrop-blur-md space-y-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-red-500 rounded"></div>
                  <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-red-500 uppercase">CREATIVE PHILOSOPHY</h3>
                </div>
                <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-normal">
                  <p>
                    Hình ảnh là một ngôn ngữ — nơi cảm xúc và thông điệp được định hình thông qua cách lựa chọn và sắp đặt.
                  </p>
                  <p>
                    Kỹ thuật và hiệu ứng không phải là mục tiêu, mà là công cụ — được sử dụng có kiểm soát để tạo nên nhịp điệu, cảm xúc và chiều sâu cho trải nghiệm hình ảnh.
                  </p>
                  <p>
                    Từ những cấu trúc nhanh, giàu năng lượng đến những nhịp kể chậm và giàu chiều sâu, mỗi dự án đều được định hình bằng một logic riêng — nơi mọi yếu tố hình ảnh và âm thanh cùng vận hành để dẫn dắt người xem.
                  </p>
                </div>
              </div>

              {/* Production Approach Block */}
              <div className="p-8 rounded-3xl border border-white/[0.06] bg-[#0c0202]/35 backdrop-blur-md space-y-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-red-500 rounded"></div>
                  <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-red-500 uppercase">PRODUCTION APPROACH</h3>
                </div>
                <p className="text-neutral-450 text-xs">
                  Quy trình sản xuất được xây dựng như một hệ thống liền mạch, nơi ý tưởng và thực thi luôn được liên kết chặt chẽ:
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.012] border border-white/[0.03] space-y-1">
                    <span className="text-xs font-extrabold text-white block">• Pre-production</span>
                    <p className="text-xs text-neutral-450 leading-relaxed">
                      Phát triển concept, narrative và xác định nhịp điệu tổng thể ngay từ đầu.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.012] border border-white/[0.03] space-y-1">
                    <span className="text-xs font-extrabold text-white block">• Production</span>
                    <p className="text-xs text-neutral-450 leading-relaxed">
                      Kiểm soát hiện trường với tư duy đạo diễn — tập trung vào khung hình, ánh sáng và chuyển động.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.012] border border-white/[0.03] space-y-1">
                    <span className="text-xs font-extrabold text-white block">• Post-production</span>
                    <p className="text-xs text-neutral-455 leading-relaxed font-normal">
                      Hoàn thiện trải nghiệm thông qua dựng phim, màu sắc, VFX và âm thanh — tinh chỉnh nhịp điệu ở mức chi tiết.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* MINIMAL CINEMATOGRAPHIC INDICATOR FOOTER BAR */}
      <footer id="hero-footer" className="relative z-20 flex flex-col md:flex-row items-center md:items-end justify-between px-12 pb-10 w-full max-w-7xl mx-auto gap-6 md:gap-0 mt-8">
        
        {/* Scroll action text */}
        <div id="scroll-prompt-container" className="flex flex-col gap-4">
          <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => setActiveTab('projects')}>
            <div className="w-[1px] h-10 bg-gradient-to-b from-red-500 to-transparent group-hover:h-14 transition-all duration-500" />
            <span className="text-[9px] uppercase tracking-[0.35em] font-medium text-white/40 group-hover:text-red-500 transition-colors">Scroll for showreel index</span>
          </div>
        </div>

        {/* Real-time sequence ticks & playbacks */}
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-red-500/80 mb-1">Timecode Sequence</span>
            <span className="text-xs font-mono tracking-widest text-[#e5e5ea]/80">{sequenceTime} / <span className="text-red-500 font-bold">UTC</span></span>
          </div>

          <div id="atmosphere-control-container" className="flex gap-2.5">
            <button
              id="atmosphere-play"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.play().catch((err) => console.log(err));
                  setIsVideoPlaying(true);
                }
              }}
              className={`w-11 h-11 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-red-500/10 hover:border-red-400/30 transition-colors cursor-pointer ${isVideoPlaying ? 'text-red-500' : 'text-white/40 opacity-50'}`}
              title="Play Loop Atmospheric View"
              aria-label="Play atmosphere"
            >
              <Play className="w-3.5 h-3.5 fill-white stroke-none" />
            </button>
            <button
              id="atmosphere-pause"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                  setIsVideoPlaying(false);
                }
              }}
              className={`w-11 h-11 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-red-500/10 hover:border-red-400/30 transition-colors cursor-pointer ${!isVideoPlaying ? 'text-red-500' : 'text-white/40 opacity-50'}`}
              title="Pause Loop Atmospheric View"
              aria-label="Pause atmosphere"
            >
              <Pause className="w-3.5 h-3.5 fill-white stroke-none" />
            </button>
          </div>
        </div>

      </footer>

      {/* MOBILE NAV SLIDING MENU DRAWER */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between p-8 animate-fade-rise text-left border-l border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold tracking-widest text-white uppercase">
              NHẬT LONG<span className="text-[10px] text-red-500 ml-1">DIR®</span>
            </span>
            <button
              id="mobile-menu-close"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-red-500/30 bg-black/55 text-white hover:bg-red-950/30 focus:outline-none cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav id="mobile-nav-links" className="flex flex-col space-y-6 text-left my-auto px-4">
            {navLinks.map((link) => (
              <button
                id={`mobile-nav-link-${link.key}`}
                key={link.key}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTab(link.key as any);
                }}
                className={`text-2xl tracking-[0.1em] font-extrabold uppercase text-left cursor-pointer transition-colors duration-300 ${
                  activeTab === link.key ? 'text-red-500' : 'text-neutral-500 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="w-full">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleBeginJourney();
              }}
              className="w-full py-4 rounded-full border border-red-500 bg-red-950/40 text-center text-white font-bold text-xs tracking-widest uppercase transition-transform duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(255,42,42,0.25)]"
            >
              Partner Up Form
            </button>
          </div>
        </div>
      )}

      {/* LIQUID GLASS CAMPAIGN PROPOSAL MODAL DRAWER */}
      {isModalOpen && (
        <div 
          id="early-access-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-rise"
          onClick={() => {
            setIsModalOpen(false);
            setFormSubmitted(false);
          }}
        >
          <div 
            id="early-access-modal-content"
            className="relative max-w-lg w-full p-8 rounded-3xl border border-[#ff5500]/30 bg-[#080101]/95 backdrop-blur-xl text-center shadow-2xl transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close modal */}
            <button
              id="early-access-modal-close"
              onClick={() => {
                setIsModalOpen(false);
                setFormSubmitted(false);
                setEmail('');
                setAgencyName('');
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors duration-200 cursor-pointer border border-white/10"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {!formSubmitted ? (
              <div id="modal-form-view" className="text-left">
                <div id="modal-mail-icon-container" className="w-12 h-12 rounded-full border border-[#ff5500]/30 bg-[#8c0d0d]/15 backdrop-blur-sm flex items-center justify-center mb-6 text-[#ff3c00]">
                  <Inbox className="w-5 h-5 text-[#ff5500]" />
                </div>
                
                <h3 
                  id="modal-title"
                  className="text-2xl text-white font-black uppercase tracking-wide mb-2"
                >
                  Nhận khảo sát & Báo giá
                </h3>
                
                <p id="modal-desc" className="text-white/70 text-xs leading-relaxed mb-6">
                  Bạn đang chuẩn bị cho chiến dịch thương hiệu mới? Điền thông tin cốt lõi để tôi truyền tải phương án tiếp cận hình ảnh & gửi bảng báo thầu chi tiết trực tiếp cho Agency/Mảng phụ trách của bạn.
                </p>

                <form id="early-access-email-form" onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                  
                  <div>
                    <label className="text-[10px] uppercase text-[#ff5500] font-bold tracking-widest block mb-1">Tên Thương hiệu hoặc Agency của bạn</label>
                    <input
                      type="text"
                      required
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      placeholder="e.g. VinFast / VNPAY / Creative Agency..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff5500]/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase text-[#ff5500] font-bold tracking-widest block mb-1">Gói Chiến dịch mong muốn</label>
                    <select
                      value={campaignScope}
                      onChange={(e) => setCampaignScope(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-[#ff5500]/50 transition-colors cursor-pointer"
                    >
                      <option value="i-TVC Video Campaign">Truyền hình quảng cáo i-TVC</option>
                      <option value="Social Media Video Set">Sản xuất Video Tik Tok / Viral ngắn</option>
                      <option value="Advanced Photo Shooting Package">Quay chụp concept Album Sản phẩm</option>
                      <option value="Full Campaign Strategy">Tư vấn tổ hợp Đạo diễn hình ảnh và Hậu kỳ</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase text-[#ff5500] font-bold tracking-widest block mb-1">Địa chỉ Email nhận Thư mời</label>
                    <input
                      id="early-access-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your professional contact email address"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff5500]/50 transition-colors"
                    />
                  </div>

                  <button
                    id="submit-email-btn"
                    type="submit"
                    className="w-full py-4 rounded-full liquid-glass-btn text-white transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase cursor-pointer"
                  >
                    GỬI ĐỀ XUẤT HỢP TÁC <ArrowRight className="w-4 h-4 text-[#ff5500]" />
                  </button>
                </form>
              </div>
            ) : (
              <div id="modal-success-view" className="py-6">
                <div id="success-icon-container" className="w-12 h-12 rounded-full bg-[#10b981]/25 border border-[#10b981]/40 flex items-center justify-center mx-auto mb-6 text-[#10b981]">
                  <Check className="w-5 h-5" />
                </div>
                
                <h3 
                  id="success-title"
                  className="text-2xl text-white font-extrabold uppercase tracking-wide mb-3"
                >
                  Gửi thông tin thành công!
                </h3>
                
                <p id="success-message" className="text-white/70 text-xs leading-relaxed mb-4 max-w-sm mx-auto">
                  Cảm ơn đại diện <strong className="text-[#ff5500]">{agencyName}</strong> đã gửi nội dung hợp tác mảng <strong className="text-white">{campaignScope}</strong>. 
                  Nhật Long và đội ngũ TIDO Media sẽ phản hồi phương án qua hòm thư điện tử của bạn:
                </p>
                
                <div id="success-email-badge" className="inline-block">
                  <span className="text-[11px] font-mono text-[#10b981] bg-[#10b981]/10 px-4.5 py-2 rounded-full border border-[#10b981]/25">
                    {email}
                  </span>
                </div>

                <div>
                  <button
                    id="success-close-btn"
                    onClick={() => {
                      setIsModalOpen(false);
                      setFormSubmitted(false);
                      setEmail('');
                      setAgencyName('');
                    }}
                    className="mt-8 text-[10px] uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    ĐÓNG CỬA SỔ TRUYỀN TẢI
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================== PORTFOLIO PROJECT DETAIL LIGHTBOX MODAL ==================================== */}
      {selectedProject && (
        <div 
          id="project-lightbox-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            id="project-lightbox-content"
            className="relative max-w-3xl w-full p-6 sm:p-8 rounded-3xl border border-[#ff5500]/30 bg-[#080101]/95 backdrop-blur-xl shadow-2xl transition-all duration-300 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close modal */}
            <button
              id="project-lightbox-close"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors duration-200 cursor-pointer border border-white/10 z-20"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Poster Header */}
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 group border border-white/[0.05]">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url('${selectedProject.image}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080101] via-[#080101]/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-2">
                <span className="text-[10px] tracking-widest font-mono text-[#ff5500] font-extrabold uppercase bg-black/75 px-3 py-1 rounded border border-[#ff5500]/30">
                  {selectedProject.tag}
                </span>
                <span className="text-[10px] tracking-widest font-mono text-white/90 font-bold bg-black/60 px-3 py-1 rounded">
                  {selectedProject.year}
                </span>
              </div>
            </div>

            {/* Structured copy layout */}
            <div className="space-y-6">
              
              <div className="text-left">
                <div className="text-xs font-mono text-[#ff5500] uppercase font-bold tracking-widest">
                  CLIENT: {selectedProject.client}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 leading-tight uppercase tracking-tight">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-neutral-400 mt-2">
                  <span>VAI TRÒ: <strong className="text-white">{selectedProject.role}</strong></span>
                  <span className="opacity-45">|</span>
                  <span>THỰC HIỆN: <strong className="text-white">TIDO MEDIA / NHẬT LONG</strong></span>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#ff5500] font-bold">Quy mô sản xuất & Thiết bị</div>
                  <div className="text-xs text-neutral-300 font-mono leading-relaxed">
                    {selectedProject.specs}
                  </div>
                </div>
                {selectedProject.link && (
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold">Lưu trữ dự án liên kết</div>
                    <div className="text-xs text-neutral-300 leading-relaxed">
                      Sản phẩm hoàn thiện có sẵn để xem trên platform trình bày.
                    </div>
                  </div>
                )}
              </div>

              {/* Story/Challenge & Solution split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white border-l-2 border-[#ff3c00] pl-2">Bối cảnh & Thách thức</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white border-l-2 border-red-500 pl-2">Phương án tiếp cận & Kết quả</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Behance Link out */}
              {selectedProject.link && (
                <div className="pt-2 flex justify-end">
                  <a 
                    href={selectedProject.link} 
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-glass-btn px-6 py-3 rounded-full text-[10px] tracking-widest font-bold text-white inline-flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-center justify-center cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-[#ff5500]" />
                    <span>XEM THÀNH PHẨM TRÊN BEHANCE</span>
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
