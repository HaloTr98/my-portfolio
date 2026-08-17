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

interface HeroSectionProps {
  initialTab?: 'reel' | 'projects' | 'skills' | 'profile';
  onNavigate?: (path: string, tab?: 'reel' | 'projects' | 'skills' | 'profile') => void;
}

export default function HeroSection({ initialTab = 'reel', onNavigate }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<'reel' | 'projects' | 'skills' | 'profile'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [campaignScope, setCampaignScope] = useState('i-TVC Video Campaign');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [projectFilter, setProjectFilter] = useState<'all' | 'commercial' | 'brand' | 'event' | 'motion' | 'film'>('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  // Director Signature Portrait Photo from Google Drive
  const DIRECTOR_HERO_IMAGE = 'https://lh3.googleusercontent.com/d/1aPb17XxGzcroNBAFOx64IMcLPCRdV-qu';
  const [heroDisplayMode, setHeroDisplayMode] = useState<'portrait' | 'reel'>('portrait');

  // Project-specific custom video links (persisted via localStorage)
  const [projectVideos, setProjectVideos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('custom_project_videos');
      const parsed = saved ? JSON.parse(saved) : {};
      // Clear cached project URLs so they fall back to the code's new defaults
      let modified = false;
      ['lexus', 'biahalong', 'viettelmoney', 'bidvpremier', 'afotech', 'iecgroup', 'datsan247', 'bacsi24h', 'dentalflow', 'myleague', 'planzai', 'handmadebakery', 'sharkgroup', 'dreame_shopdunk', 'vietnam_security_summit_2022', 'em_va_trinh', 'viettel_cyber_security', 'green_sm', 'mova', 'uob_painting', 'rosan_group', 'shopdunk_her_concert', 'syncfest', 'buctuong_mv_thang_3', 'vo_tan_trong_im_lang', 'fulbright_harvard', 'afotech_35th', 'mescells_stem_cell', 'emma_pilates', 'mbs_pilates', 'hikid_sk_challenge', 'biahoi_halong_hero', 'lexus_thanglong_service', 'lexus_es300h', 'wedding_film_01', 'wedding_film_02', 'wedding_film_03'].forEach(key => {
        if (parsed[key]) {
          delete parsed[key];
          modified = true;
        }
      });
      if (modified) {
        localStorage.setItem('custom_project_videos', JSON.stringify(parsed));
      }
      return parsed;
    } catch (e) {
      return {};
    }
  });

  const [activeModalVideoUrl, setActiveModalVideoUrl] = useState<string | null>(null);

  // Synchronize modal active video URL when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      const defaultUrl = projectVideos[selectedProject.id] !== undefined ? projectVideos[selectedProject.id] : (selectedProject.video || '');
      setActiveModalVideoUrl(defaultUrl);
    } else {
      setActiveModalVideoUrl(null);
    }
  }, [selectedProject, projectVideos]);

  const handleUpdateProjectVideo = (projectId: string, url: string) => {
    const updated = { ...projectVideos, [projectId]: url };
    setProjectVideos(updated);
    try {
      localStorage.setItem('custom_project_videos', JSON.stringify(updated));
    } catch (e) {}
  };

  // Helper to extract YouTube video ID
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Beautiful Helper to parse both YouTube and Google Drive links and output embed urls
  const getEmbedVideoUrl = (url: string) => {
    if (!url) return null;

    // 1. YouTube extractor
    const ytId = getYoutubeId(url);
    if (ytId) {
      return `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    }

    // 2. Google Drive folder extractor
    const driveFolderReg = /\/drive\/folders\/([a-zA-Z0-9_-]+)/;
    const driveFolderMatch = url.match(driveFolderReg);
    if (driveFolderMatch && driveFolderMatch[1]) {
      return `https://drive.google.com/embeddedfolderview?id=${driveFolderMatch[1]}#grid`;
    }

    // 3. Google Drive file extractor
    // Format: https://drive.google.com/file/d/1aPb17XxGzcroNBAFOx64IMcLPCRdV-qu/view?usp=sharing
    const driveFileReg = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const driveMatch = url.match(driveFileReg);
    if (driveMatch && driveMatch[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }

    const driveIdReg = /[?&]id=([a-zA-Z0-9_-]+)/;
    const driveIdMatch = url.match(driveIdReg);
    if (driveIdMatch && driveIdMatch[1] && url.includes('drive.google.com')) {
      return `https://drive.google.com/file/d/${driveIdMatch[1]}/preview`;
    }

    return null;
  };

  const getPreviewVideoUrl = (url: string) => {
    if (!url) return null;

    // 1. YouTube extractor
    const ytId = getYoutubeId(url);
    if (ytId) {
      return `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&playsinline=1&modestbranding=1&showinfo=0&rel=0`;
    }

    // 2. Google Drive folder extractor
    const driveFolderReg = /\/drive\/folders\/([a-zA-Z0-9_-]+)/;
    const driveFolderMatch = url.match(driveFolderReg);
    if (driveFolderMatch && driveFolderMatch[1]) {
      return `https://drive.google.com/embeddedfolderview?id=${driveFolderMatch[1]}#grid`;
    }

    // 3. Google Drive file extractor
    const driveFileReg = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const driveMatch = url.match(driveFileReg);
    if (driveMatch && driveMatch[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }

    const driveIdReg = /[?&]id=([a-zA-Z0-9_-]+)/;
    const driveIdMatch = url.match(driveIdReg);
    if (driveIdMatch && driveIdMatch[1] && url.includes('drive.google.com')) {
      return `https://drive.google.com/file/d/${driveIdMatch[1]}/preview`;
    }

    return null;
  };

  const getProjectImage = (proj: any) => {
    const activeUrl = projectVideos[proj.id] !== undefined ? projectVideos[proj.id] : (proj.video || '');
    if (activeUrl) {
      const ytId = getYoutubeId(activeUrl);
      if (ytId) {
        return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      }
    }
    return proj.image;
  };
  
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
    if (onNavigate) {
      onNavigate('/start-a-project');
    } else {
      window.history.pushState({}, '', '/start-a-project');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
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
  const clients = [
    'Lexus', 'Bia Hạ Long', 'Viettel money', 'BIDV Premier', 'Manulife', 'Afotech', 'IEC Group', 
    'DATSAN247.COM', 'BÁC SĨ 24H', 'DENTAL FLOW', 
    'MYLEAGUE.VN', 'PLANZ.AI', 'HANDMADE BAKERY', 'SHARK GROUP', 'SHOPDUNK', 'DREAME BESTECH', 
    'VIETNAM SECURITY SUMMIT', 'EM VÀ TRỊNH', 'VIETTEL CYBER SECURITY', 'GREEN SM', 'MOVA', 
    'UOB', 'ROSAN GROUP', 'SYNCFEST', 'THE BAD RABBIT (TBR)', 'BAN NHẠC BỨC TƯỜNG', 
    'FULBRIGHT UNIVERSITY VIETNAM', 'MESCELLS', 'EMMA PILATES', 'MBS PILATES',
    'HIKID', 'BIA HƠI HẠ LONG', 'LEXUS THĂNG LONG'
  ];

  const projectsData = [
    {
      id: 'aeonmall',
      title: 'AEON MALL PLUS — "Mở Hội Mua Sắm, Một Chạm Là Chất"',
      client: 'AEON MALL Bình Dương Canary',
      year: '2023',
      category: 'commercial',
      tag: 'TVC quảng cáo — 45 giây',
      role: 'Ý tưởng & Kịch bản (Concept & Scriptwriter) · Đạo diễn (Director) · Dựng phim (Editor) · VFX · Colorist',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=600',
      video: 'https://drive.google.com/file/d/1U1uJVWx2HsK0AhRbRH6MmKLJbGBflUBk/view?usp=drive_link',
      specs: 'Sony FX3 // Lens Sony G Master // 4K 16:9 // Agency: NOVAON',
      challenge: 'AEON MALL PLUS là nền tảng mua sắm trực tuyến của AEON MALL Bình Dương Canary, giúp khách hàng trải nghiệm không khí mua sắm mỗi ngày mà không cần chờ đến cuối tuần. Dự án hướng đến 3 mục tiêu: tăng độ nhận diện app, thúc đẩy hành vi mua sắm trực tuyến, và giới thiệu các ưu đãi độc quyền trên nền tảng.',
      solution: 'Xây dựng concept "Chạm Là Chất" — lấy hành động chạm màn hình điện thoại làm điểm nhấn xuyên suốt, chia thành 3 lớp thông điệp: Chất Chơi (mở hội mua sắm), Chất Lượng (hàng Nhật Bản chính hãng), Chất Ngất (deal hời, giá tốt). Mỗi lần nhân vật chạm vào app, không gian xung quanh biến chuyển bằng hiệu ứng VFX để truyền tải trực quan giá trị sản phẩm, kết hợp color grading theo tone hồng tươi sáng đặc trưng của thương hiệu.',
      link: 'https://behance.net/longtrn19',
      behindTheScenesUrl: 'https://www.behance.net/gallery/207551511/TVC-AEONMALLPLUS'
    },
    {
      id: 'biahalong',
      title: 'TVC Bia Hạ Long - rước quà tết kết lộc xuân',
      client: 'Bia Hạ Long',
      year: '2023',
      category: 'commercial',
      tag: 'Festive TVC Campaign',
      role: 'Director/Colorist/QC',
      image: 'https://lh3.googleusercontent.com/d/1aPb17XxGzcroNBAFOx64IMcLPCRdV-qu',
      video: 'https://drive.google.com/file/d/1uYP46W2e_3sdFOHtl6hdBGKRYN5Q42av/view?usp=drive_link',
      videos: [
        'https://drive.google.com/file/d/1uYP46W2e_3sdFOHtl6hdBGKRYN5Q42av/view?usp=drive_link',
        'https://drive.google.com/file/d/1LZQEE_zJegL1Mwkw4VyunDTJjfRFYudg/view?usp=drive_link'
      ],
      videoLabels: [
        'Phần 1: Cào thăm',
        'Phần 2: Đòi nợ'
      ],
      specs: 'Thiết bị sony A7m4',
      challenge: 'Đòi hỏi bối cảnh đoàn viên Tết ấm áp, tone màu vàng đỏ phủ rực rỡ lễ hội nâng cao giá trị gắn kết gia đình.',
      solution: 'Phối màu kết hợp tinh hoa ánh sáng ấm, cân đối hài hòa mỹ thuật hiện trường mang lại video triệu view mượt mà truyền thống.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'lexus',
      title: 'Sự kiện chạy thử xe Lexus',
      client: 'Lexus Việt Nam',
      year: '2023',
      category: 'event',
      tag: 'Premium Event Brand Film',
      role: 'Director of Photography / Camera Setup Lead',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600',
      video: 'https://drive.google.com/file/d/19XoSA1HmkZL3J9IY8Sn9XB7ZVF86YxYY/view?usp=drive_link',
      specs: 'Sony FX3 // DJI Ronin 2 // G-Master Lens',
      challenge: 'Ghi lại tốc độ chuyển động & những đường cong hoàn hảo của dòng xe sang quý phái mà không gây rung giật.',
      solution: 'Sử dụng hệ thống chống rung cao cấp kết hợp tracking mượt mà lấy nét mắt thông minh, tạo ra thước phim thương hiệu đỉnh cao.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'viettelmoney',
      title: 'TVC Viettel Money',
      client: 'Viettel money',
      year: '2022',
      category: 'commercial',
      tag: 'Brand Product Commercial',
      role: 'Postproduction Specialist / Audio Master',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=600',
      video: 'https://drive.google.com/file/d/1ciSxFVwK2eOnX4sqgnv-ijYBDxE1Ow8_/view?usp=drive_link',
      videos: [
        'https://drive.google.com/file/d/1ciSxFVwK2eOnX4sqgnv-ijYBDxE1Ow8_/view?usp=drive_link',
        'https://drive.google.com/file/d/11NhClOHZ_aAuLzvuVdy-UpzZxo0oOyFT/view?usp=drive_link'
      ],
      videoLabels: [
        'Phần 1',
        'Phần 2'
      ],
      specs: 'ARRI Alexa Mini HF // Signature Prime // After Effects',
      challenge: 'Lồng ghép thủ tục đóng viện phí, bảo hiểm khô khan thành các hoạt cảnh gia đình giản dị, đầy thấu cảm.',
      solution: 'Hậu kỳ match-cut chuyển tiếp nhanh, kết hợp typography hiệu ứng sinh động tăng tối đa khả năng tương thích tin cậy.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'bidvpremier',
      title: 'Dịch vụ Tài chính Cao cấp',
      client: 'BIDV Premier',
      year: '2023',
      category: 'brand',
      tag: 'Executive Corporate Movie',
      role: 'Production Supervisor / Grader',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600',
      video: 'https://drive.google.com/file/d/1wNUAYp0eFRS49UzXv-aBRW93hCRCrmqT/view?usp=drive_link',
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
      category: 'brand',
      tag: 'Annual Summary Masterpiece',
      role: 'Creative Director / Tech Lead Team',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600',
      video: '',
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
      category: 'brand',
      tag: 'Industrial Brand Story',
      role: 'Lead Project Director / Storyteller',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600',
      video: 'https://drive.google.com/file/d/10Io2sd6g10KPnuQxNyLO5GLSpJ0g9p5h/view?usp=drive_link',
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
      category: 'event',
      tag: 'Tech Seminar Highlights',
      role: 'Cinematographer & Assembly Editor',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600',
      video: 'https://drive.google.com/file/d/1gS1KADD3LXPVkIMysD3Uytbv6cnXv5Th/view?usp=drive_link',
      specs: 'Sony FX3 // Gimbal DJI RS3 Pro // Premiere Pro',
      challenge: 'Sự kiện lớn quy tụ 1000+ lãnh đạo an ninh mạng diễn ra liên tục tốc độ cao, góc máy cần bao quát toàn cảnh đón đầu khoảnh khắc.',
      solution: 'Sử dụng ống kính đa tiêu cự bắt nhanh thái độ chuyên gia, dựng phim tiết tấu nhanh dứt khoát đậm màu công nghệ.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'datsan247',
      title: 'DATSAN247 — APP INTRODUCTION',
      client: 'DATSAN247.COM',
      year: '2023',
      category: 'motion',
      tag: 'APP INTRODUCTION · MOTION GRAPHICS',
      role: 'Motion Designer / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600',
      video: 'https://drive.google.com/file/d/1nvKtaatvjY-vKsNO9mdD8xJiJC6Tdi04/view?usp=drive_link',
      specs: 'After Effects / Premiere Pro',
      archiveNote: 'Video giới thiệu nền tảng đặt sân Datsan247.com được xây dựng hoàn toàn bằng motion graphics.',
      challenge: 'Truyền tải cách thức hoạt động và các tính năng chính của nền tảng đặt sân thông qua hình ảnh trực quan, đồng thời giữ cho lượng thông tin lớn dễ tiếp cận và theo dõi.',
      solution: 'Xây dựng hệ thống motion graphics kết hợp animation, typography và chuyển động UI để mô phỏng trải nghiệm sử dụng sản phẩm. Hậu kỳ tập trung vào nhịp dựng và chuyển cảnh nhằm tạo cảm giác liền mạch cho toàn bộ video.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'bacsi24h',
      title: 'BÁC SĨ 24H — APP INTRODUCTION',
      client: 'BÁC SĨ 24H',
      year: '2023',
      category: 'motion',
      tag: 'APP INTRODUCTION · MOTION GRAPHICS',
      role: 'Motion Designer / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600',
      video: 'https://drive.google.com/file/d/1gG_UX1l_5b5PGyFGF_oy35g3XsE-QfyO/view?usp=drive_link',
      specs: 'After Effects / Premiere Pro',
      archiveNote: 'Video motion graphics giới thiệu ứng dụng Bác sĩ 24h, đồng thời hướng dẫn người dùng tiếp cận và sử dụng các chức năng chính của ứng dụng.',
      challenge: 'Chuyển đổi các tính năng và quy trình sử dụng ứng dụng thành một nội dung trực quan, dễ hiểu mà không phụ thuộc quá nhiều vào phần diễn giải bằng text.',
      solution: 'Sử dụng motion graphics và UI animation để mô phỏng trực tiếp các thao tác trong ứng dụng. Nhịp animation được xây dựng theo từng bước sử dụng, giúp người xem dễ dàng theo dõi workflow của sản phẩm.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'dentalflow',
      title: 'DENTAL FLOW — PRODUCT INTRODUCTION',
      client: 'DENTAL FLOW',
      year: '2023',
      category: 'motion',
      tag: 'PRODUCT INTRODUCTION · MOTION GRAPHICS',
      role: 'Motion Designer / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600',
      video: 'https://drive.google.com/file/d/159Btep9cOAFUI80sDpqvoZAoHztIaGMm/view?usp=drive_link',
      specs: 'After Effects / Premiere Pro',
      archiveNote: 'Video giới thiệu Dental Flow — nền tảng quản lý dành cho phòng khám nha khoa, tập trung vào hệ thống và các tính năng hỗ trợ vận hành.',
      challenge: 'Thể hiện một hệ thống quản lý với nhiều chức năng và luồng thông tin khác nhau theo cách trực quan, tránh cảm giác khô cứng thường thấy ở các video giới thiệu phần mềm.',
      solution: 'Kết hợp UI animation, motion graphics và typography để biến các chức năng của nền tảng thành một chuỗi visual flow rõ ràng. Chuyển động được sử dụng để dẫn dắt sự chú ý và kết nối các phần nội dung với nhau.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'myleague',
      title: 'MYLEAGUE.VN — SPORTS MANAGEMENT PLATFORM',
      client: 'MYLEAGUE.VN',
      year: '2023',
      category: 'motion',
      tag: 'SPORTS MANAGEMENT PLATFORM',
      role: 'Motion Designer / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600',
      video: 'https://drive.google.com/file/d/1sdpT5GlJnE7VJkhklmxan3cdnBOnk7kI/view?usp=drive_link',
      specs: 'After Effects / Premiere Pro',
      archiveNote: 'Video giới thiệu MyLeague.vn — nền tảng hỗ trợ quản lý giải đấu, đội tuyển và các hoạt động liên quan đến thi đấu thể thao.',
      challenge: 'Truyền tải nhiều thành phần của hệ thống quản lý giải đấu trong thời lượng ngắn, đồng thời tạo cảm giác năng động phù hợp với lĩnh vực thể thao.',
      solution: 'Xây dựng motion graphics với nhịp chuyển động nhanh, kết hợp UI animation và typography để minh họa các tính năng của nền tảng. Hậu kỳ tập trung vào timing, transition và visual hierarchy để duy trì nhịp độ xuyên suốt video.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'planzai',
      title: 'PLANZ.AI — AI PROJECT MANAGEMENT',
      client: 'PLANZ.AI',
      year: '2024',
      category: 'motion',
      tag: 'AI PROJECT MANAGEMENT',
      role: 'Motion Designer / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600',
      video: 'https://drive.google.com/file/d/1ANEXhDNRUR7vLN9_JQVRqXGo6pptFHR6/view?usp=drive_link',
      specs: 'After Effects / Premiere Pro',
      archiveNote: 'Video giới thiệu Planz.ai — nền tảng quản lý dự án ứng dụng AI nhằm hỗ trợ người dùng trong quá trình lập kế hoạch và quản lý công việc.',
      challenge: 'Diễn giải một sản phẩm công nghệ có yếu tố AI bằng hình ảnh trực quan, đồng thời giúp người xem nhanh chóng hiểu được cách nền tảng hỗ trợ quy trình quản lý dự án.',
      solution: 'Kết hợp motion graphics, UI animation và typography để trực quan hóa các tính năng và workflow của sản phẩm. Chuyển động được thiết kế theo logic của giao diện nhằm tạo cảm giác công nghệ nhưng vẫn dễ tiếp cận.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'handmadebakery',
      title: 'HANDMADE BAKERY — PRODUCT FILMS',
      client: 'HANDMADE BAKERY',
      year: '2023',
      category: 'commercial',
      tag: 'PRODUCT FILMS · STOP MOTION & MOTION',
      role: 'Filming / Editor / Motion Designer / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600',
      video: 'https://drive.google.com/file/d/14H5P9pRYAF5N7fDMiNrrPVmmSK16X6TF/view?usp=drive_link',
      videos: [
        'https://drive.google.com/file/d/14H5P9pRYAF5N7fDMiNrrPVmmSK16X6TF/view?usp=drive_link',
        'https://drive.google.com/file/d/1K0guhYbQV3UAZKfM2mhP1rXpa3i0YOSu/view?usp=drive_link'
      ],
      videoLabels: [
        'Video 1: Bánh Dứa',
        'Video 2: Bánh Su Kem'
      ],
      specs: 'Product Filming / Stop Motion / Motion Graphics / Premiere Pro / After Effects',
      archiveNote: 'Series video giới thiệu sản phẩm bánh handmade, bao gồm bánh dứa và bánh su kem, được thực hiện theo cùng một visual style vui vẻ và giàu tính chuyển động.',
      challenge: 'Tạo hình ảnh sản phẩm có tính vui vẻ và khác biệt thay vì sử dụng cách quay product shot thông thường. Project yêu cầu kết hợp nhiều phương pháp production và hậu kỳ trong cùng một visual language.',
      solution: 'Kết hợp quay sản phẩm, stop motion, graphic elements và editing để tạo nhịp chuyển động liên tục quanh sản phẩm. Phần hậu kỳ được sử dụng để kết nối footage và graphic thành một tổng thể có tính playful, phù hợp với hình ảnh của sản phẩm.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'sharkgroup',
      title: 'SHARK GROUP — COMMUNITY INTRODUCTION',
      client: 'SHARK GROUP',
      year: '2023',
      category: 'brand',
      tag: 'COMMUNITY INTRODUCTION · MOTION GRAPHICS',
      role: 'Motion Designer / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600',
      video: 'https://drive.google.com/file/d/1kkBh7kznlg98P7pM_6AW00MDF-aW0fPF/view?usp=drive_link',
      specs: 'After Effects / Premiere Pro',
      archiveNote: 'Video giới thiệu Shark Group — cộng đồng dành cho các chủ doanh nghiệp, tập trung vào kết nối, hỗ trợ khởi nghiệp và chia sẻ kinh nghiệm kinh doanh.',
      challenge: 'Truyền tải mô hình hoạt động và giá trị của một cộng đồng doanh nghiệp thông qua hình thức motion graphics, trong đó cần cân bằng giữa lượng thông tin và tính hấp dẫn về mặt hình ảnh.',
      solution: 'Sử dụng typography, graphic animation và chuyển cảnh để xây dựng mạch thông tin rõ ràng, đồng thời tạo nhịp visual xuyên suốt video. Hậu kỳ tập trung vào việc biến nội dung giới thiệu mang tính thông tin thành một visual presentation dễ theo dõi.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'dreame_shopdunk',
      title: 'DREAME BESTECH — PRODUCT LAUNCH EVENT',
      client: 'SHOPDUNK × DREAME BESTECH',
      year: '2023',
      category: 'event',
      tag: '08 · EVENT RECAP · PRODUCT LAUNCH',
      role: 'Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
      video: 'https://drive.google.com/file/d/15zFEhxpETmtSaL51acFv0mjV8-sP3Bv0/view?usp=sharing',
      specs: 'Event Recap / Editing / Color Grading / Sound Design',
      archiveNote: 'Video recap sự kiện ra mắt các dòng sản phẩm máy sấy Dreame BesTech do ShopDunk tổ chức, với sự tham gia của nhiều influencer và khách mời nổi tiếng.',
      challenge: 'Tái hiện không khí của một sự kiện ra mắt sản phẩm với nhiều hoạt động, khách mời và khoảnh khắc diễn ra liên tục trong thời gian ngắn.',
      solution: 'Hậu kỳ tập trung vào nhịp dựng nhanh, lựa chọn khoảnh khắc nổi bật và kết hợp hình ảnh sản phẩm với không khí sự kiện để tạo thành một event recap có nhịp độ và năng lượng cao.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'vietnam_security_summit_2022',
      title: 'VIETNAM SECURITY SUMMIT 2022',
      client: 'VIETNAM SECURITY SUMMIT',
      year: '2022',
      category: 'event',
      tag: '09 · EVENT RECAP · TECH SUMMIT',
      role: 'Camera Operator / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600',
      video: 'https://drive.google.com/file/d/1xiJOZyk0dSrYwcwf61ps3cWME9Vw9zBR/view?usp=sharing',
      specs: 'Event Filming / Camera Operation / Editing / Color Grading',
      archiveNote: 'Video recap Vietnam Security Summit 2022 — hội thảo và triển lãm về an toàn không gian mạng với sự tham gia của nhiều thương hiệu công nghệ hàng đầu tại Việt Nam và quốc tế.',
      challenge: 'Ghi lại một sự kiện công nghệ quy mô lớn với nhiều khu vực triển lãm, diễn giả, thương hiệu và hoạt động diễn ra đồng thời.',
      solution: 'Đảm nhiệm camera operation trong quá trình ghi hình và thực hiện hậu kỳ để chọn lọc, sắp xếp các khoảnh khắc tiêu biểu. Video được xây dựng theo hướng event recap giàu thông tin nhưng vẫn duy trì nhịp độ hiện đại.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'em_va_trinh',
      title: 'EM VÀ TRỊNH — FILM PREMIERE EVENT',
      client: 'EM VÀ TRỊNH',
      year: '2022',
      category: 'event',
      tag: '10 · FILM PREMIERE EVENT · CINEMATIC RECAP',
      role: 'Filmmaker / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600',
      video: 'https://drive.google.com/file/d/19ki_W7RqPtOmzqrSk2FXj4c6j0jpmopO/view?usp=sharing',
      specs: 'Event Filming / Editing / Color Grading / Post-production',
      archiveNote: 'Video recap sự kiện ra mắt và quảng bá bộ phim Em và Trịnh, với sự tham gia của ekip sản xuất và các diễn viên trong phim.',
      challenge: 'Ghi lại không khí của một sự kiện điện ảnh với sự xuất hiện của ekip sản xuất, diễn viên và nhiều hoạt động truyền thông diễn ra trong cùng một chương trình.',
      solution: 'Kết hợp quay phim tại sự kiện với hậu kỳ để xây dựng một mạch recap tập trung vào con người, không khí và những khoảnh khắc nổi bật. Hình ảnh được xử lý theo hướng cinematic, phù hợp với tính chất của một sự kiện ra mắt phim.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'viettel_cyber_security',
      title: 'VIETTEL CYBER SECURITY — BRAND INTRODUCTION',
      client: 'VIETTEL CYBER SECURITY',
      year: '2023',
      category: 'brand',
      tag: '11 · BRAND INTRODUCTION · TECH & SECURITY',
      role: 'Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600',
      video: 'https://drive.google.com/file/d/1TNdC_JtxcU13Efa6hmWPP89vgoIpfEPk/view?usp=sharing',
      specs: 'Editing / Motion Graphics / Compositing / Color Grading',
      archiveNote: 'Video giới thiệu Viettel Cyber Security, tập trung vào hình ảnh thương hiệu và lĩnh vực an toàn, bảo mật không gian mạng.',
      challenge: 'Truyền tải hình ảnh của một thương hiệu công nghệ và an ninh mạng theo hướng hiện đại, mạnh mẽ, đồng thời đảm bảo lượng thông tin chuyên môn vẫn dễ tiếp cận.',
      solution: 'Xử lý hậu kỳ với trọng tâm là nhịp dựng, compositing và graphic elements để tạo visual language mang tính công nghệ. Hình ảnh và chuyển động được kết hợp nhằm tăng tính nhận diện và sự liền mạch của video.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'green_sm',
      title: 'GREEN SM — GIỮ NHỊP CUỘC VUI',
      client: 'GREEN SM',
      year: '2023',
      category: 'event',
      tag: '12 · EVENT RECAP · GIỮ NHỊP CUỘC VUI',
      role: 'Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600',
      video: 'https://drive.google.com/file/d/1Tga7Y7W4IBQ9tw1VoxJDD9ovm_r98XMK/view?usp=sharing',
      specs: 'Event Recap / Editing / Color Grading / Sound Design',
      archiveNote: 'Video recap sự kiện “Giữ nhịp cuộc vui” của Green SM, tập trung vào không khí, trải nghiệm và những khoảnh khắc nổi bật tại sự kiện.',
      challenge: 'Chuyển tải năng lượng và không khí sôi động của sự kiện thông qua một video ngắn, đồng thời đảm bảo câu chuyện vẫn có sự liên kết thay vì chỉ đơn thuần tổng hợp footage.',
      solution: 'Tập trung vào nhịp dựng, music-driven editing và lựa chọn reaction, interaction của khách tham dự để tạo cảm giác sống động. Hậu kỳ được xử lý theo hướng trẻ trung, giàu năng lượng và phù hợp với tinh thần của sự kiện.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'mova',
      title: 'MOVA — PRODUCT LAUNCH EVENT',
      client: 'MOVA',
      year: '2023',
      category: 'event',
      tag: '13 · PRODUCT LAUNCH EVENT · RECAP',
      role: 'Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600',
      video: 'https://drive.google.com/file/d/1ojCfCe08mxBJWBV_lalUAvgyA6nmf-oe/view?usp=sharing',
      specs: 'Event Recap / Product Film / Editing / Color Grading',
      archiveNote: 'Video recap sự kiện ra mắt các dòng sản phẩm của Mova, kết hợp hình ảnh sản phẩm với không khí và hoạt động tại sự kiện.',
      challenge: 'Cân bằng giữa việc thể hiện sản phẩm và truyền tải không khí của một sự kiện ra mắt, trong đó sản phẩm vẫn cần giữ được vị trí trung tâm.',
      solution: 'Hậu kỳ kết hợp product-focused shots với event footage, sử dụng nhịp dựng và âm nhạc để kết nối hai nhóm hình ảnh. Video vừa đóng vai trò recap sự kiện vừa tạo điểm nhấn cho các sản phẩm được giới thiệu.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'uob_painting',
      title: 'UOB PAINTING OF THE YEAR — EVENT RECAP',
      client: 'UOB',
      year: '2023',
      category: 'event',
      tag: '14 · ART COMPETITION · EVENT RECAP',
      role: 'Filmmaker / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600',
      video: 'https://drive.google.com/file/d/1auFWjEeI_tn_71kMb1Ticfx-ExtAXhGJ/view?usp=sharing',
      specs: 'Event Filming / Camera Operation / Editing / Color Grading',
      archiveNote: 'Video recap sự kiện công bố cuộc thi UOB Painting of the Year, ghi lại không gian sự kiện, khách mời và các hoạt động liên quan đến chương trình.',
      challenge: 'Ghi lại một sự kiện nghệ thuật với nhiều yếu tố cần khai thác đồng thời: không gian trưng bày, tác phẩm, khách mời và hoạt động trên sân khấu.',
      solution: 'Đảm nhiệm quay phim tại sự kiện và xử lý hậu kỳ để xây dựng mạch hình ảnh từ không gian tổng thể đến các chi tiết và tương tác của khách tham dự. Video giữ trọng tâm vào trải nghiệm thị giác và tinh thần nghệ thuật của chương trình.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'rosan_group',
      title: 'ROSAN GROUP — YEAR END PARTY',
      client: 'ROSAN GROUP',
      year: '2023',
      category: 'event',
      tag: '15 · YEAR END PARTY · EVENT RECAP',
      role: 'Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600',
      video: 'https://drive.google.com/file/d/13IcVallOBByQU0Sxg37l0Jc9iEoakKtT/view?usp=sharing',
      specs: 'Event Recap / Editing / Color Grading / Sound Design',
      archiveNote: 'Video recap Year End Party của Rosan Group, tập trung vào không khí, hoạt động và những khoảnh khắc đáng nhớ của sự kiện cuối năm.',
      challenge: 'Tạo một video recap có cảm xúc từ lượng footage lớn của một sự kiện nội bộ, trong đó cần thể hiện được cả không khí tập thể và những khoảnh khắc cá nhân.',
      solution: 'Xây dựng video dựa trên music-driven editing, kết hợp các khoảnh khắc tương tác, biểu diễn và hoạt động của nhân sự. Phần hậu kỳ tập trung vào timing và emotional pacing để tạo cảm giác gần gũi và giàu năng lượng.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'shopdunk_her_concert',
      title: 'SHOPDUNK — HER CONCERT EXPERIENCE',
      client: 'SHOPDUNK',
      year: '2023',
      category: 'event',
      tag: '16 · BRAND EXPERIENCE · CONCERT RECAP',
      role: 'Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600',
      video: 'https://drive.google.com/file/d/1bdpCD-l4K0Ej6hvvql7HnZOeUsgTZDSh/view?usp=sharing',
      specs: 'Event Recap / Editing / Color Grading / Sound Design',
      archiveNote: 'Video recap booth trải nghiệm của ShopDunk tại HER Concert, tập trung vào không gian thương hiệu, hoạt động trải nghiệm và tương tác với khách tham dự.',
      challenge: 'Thể hiện sự hiện diện của thương hiệu trong một sự kiện âm nhạc đông người, đồng thời làm nổi bật trải nghiệm tại booth thay vì chỉ ghi lại tổng thể sự kiện.',
      solution: 'Tập trung vào các khoảnh khắc trải nghiệm, tương tác và visual branding tại booth, kết hợp với footage không khí của concert. Nhịp dựng được xử lý theo hướng trẻ trung, nhanh và phù hợp với energy của sự kiện âm nhạc.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'syncfest',
      title: 'SYNCFEST — EVENT RECAP',
      client: 'SYNCFEST',
      year: '2023',
      category: 'event',
      tag: '17 · MASTER EVENT RECAP',
      role: 'Master Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600',
      video: 'https://drive.google.com/file/d/1m8Fx2e5kbYmYwNg0XqqpL0HSvpVfwadB/view?usp=sharing',
      specs: 'Event Recap / Master Editing / Color Grading / Sound Design',
      archiveNote: 'Video master recap Syncfest, tổng hợp những khoảnh khắc nổi bật, không khí và trải nghiệm của sự kiện.',
      challenge: 'Tổng hợp lượng footage đa dạng từ một sự kiện có nhịp độ cao thành một video recap có cấu trúc rõ ràng, đồng thời giữ được cảm giác liền mạch về mặt hình ảnh và âm thanh.',
      solution: 'Đảm nhiệm master post-production, từ lựa chọn và tổ chức footage đến editing, color grading và hoàn thiện âm thanh. Video được xây dựng theo hướng music-driven với nhịp dựng linh hoạt, giúp tái hiện tổng thể năng lượng và trải nghiệm của Syncfest.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'buctuong_mv_thang_3',
      title: 'BỨC TƯỜNG — MV THÁNG 3 | BEHIND THE SCENES',
      client: 'THE BAD RABBIT (TBR)',
      year: '2023',
      category: 'film',
      tag: '18 · BEHIND THE SCENES · MUSIC VIDEO',
      role: 'Filmmaker / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600',
      video: 'https://drive.google.com/file/d/1WFRfr7VXt3FyTDJ8HHmsDVhmLyXHk9pj/view?usp=sharing',
      specs: 'Behind the Scenes / Filming / Editing / Color Grading',
      archiveNote: 'Video Behind the Scenes ghi lại quá trình sản xuất MV “Tháng 3” của ban nhạc Bức Tường, tập trung vào không khí trường quay, ekip và những khoảnh khắc phía sau quá trình thực hiện MV.',
      challenge: 'Behind the Scenes cần vừa phản ánh chân thực quá trình sản xuất, vừa có tính kể chuyện để người xem cảm nhận được không khí và quy mô của một buổi quay MV.',
      solution: 'Kết hợp footage hậu trường, các khoảnh khắc tương tác của ekip và hình ảnh quá trình quay để tạo thành một câu chuyện ngắn về production. Hậu kỳ tập trung vào nhịp dựng và lựa chọn khoảnh khắc nhằm giữ cảm giác tự nhiên nhưng vẫn có tính cinematic.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'vo_tan_trong_im_lang',
      title: 'VỠ TAN TRONG IM LẶNG | BEHIND THE SCENES',
      client: 'THE BAD RABBIT (TBR)',
      year: '2023',
      category: 'film',
      tag: '19 · BEHIND THE SCENES · SHORT FILM',
      role: 'Filmmaker / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600',
      video: 'https://drive.google.com/file/d/1F6Qe8oAOpkf7yeN3FovRekvDLlXX98YK/view?usp=sharing',
      specs: 'Behind the Scenes / Filming / Editing / Color Grading',
      archiveNote: 'Video Behind the Scenes ghi lại quá trình thực hiện phim ngắn dự thi “Vỡ Tan Trong Im Lặng”, từ quá trình chuẩn bị đến những khoảnh khắc trên set quay.',
      challenge: 'Ghi lại một production phim ngắn với nhiều hoạt động diễn ra đồng thời trên trường quay, đồng thời cần giữ được câu chuyện và cảm xúc phía sau quá trình làm phim.',
      solution: 'Khai thác các khoảnh khắc chuẩn bị, setup, diễn xuất và tương tác giữa ekip để xây dựng một mạch Behind the Scenes có tính kể chuyện. Hậu kỳ được xử lý theo hướng cinematic, ưu tiên cảm xúc và không khí của quá trình sản xuất.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'fulbright_harvard',
      title: 'FULBRIGHT × HARVARD — EVENT RECAP',
      client: 'FULBRIGHT UNIVERSITY VIETNAM',
      year: '2023',
      category: 'event',
      tag: '20 · EVENT RECAP · HIGHER EDUCATION',
      role: 'Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600',
      video: 'https://drive.google.com/file/d/1-solABZJZmsH1nbOBIxd2E67_vvbldgi/view?usp=drive_link',
      specs: 'Event Recap / Editing / Color Grading / Sound Design',
      archiveNote: 'Video recap sự kiện hợp tác giữa Fulbright University Vietnam và Harvard University, ghi lại các hoạt động, khách mời và những khoảnh khắc nổi bật của chương trình.',
      challenge: 'Tổng hợp nhiều hoạt động và khoảnh khắc của một sự kiện mang tính học thuật, với yêu cầu truyền tải được không khí, tinh thần kết nối và quy mô của chương trình.',
      solution: 'Xây dựng mạch recap dựa trên nhịp dựng và âm nhạc, kết hợp hình ảnh hoạt động, nhân vật và không gian sự kiện. Hậu kỳ tập trung vào việc tạo một câu chuyện ngắn gọn nhưng vẫn giữ được tính trang trọng và năng lượng của chương trình.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'afotech_35th',
      title: 'AFOTECH — 35TH ANNIVERSARY',
      client: 'AFOTECH',
      year: '2023',
      category: 'brand',
      tag: '21 · CORPORATE FILM · 35TH ANNIVERSARY',
      role: 'Director',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600',
      video: 'https://drive.google.com/file/d/1L2XBGHyP8l376B9jnJWSUpnnI5uI0EFs/view?usp=sharing',
      specs: 'Corporate Film / Direction / Production / Post-production',
      archiveNote: 'Video kỷ niệm 35 năm thành lập Afotech, nhìn lại hành trình phát triển và những dấu mốc của doanh nghiệp qua nhiều năm hoạt động.',
      challenge: 'Truyền tải hành trình 35 năm của doanh nghiệp trong một video có tính kỷ niệm, đồng thời cần cân bằng giữa thông tin về lịch sử và yếu tố cảm xúc.',
      solution: 'Đảm nhiệm vai trò đạo diễn, định hướng cách kể chuyện và ngôn ngữ hình ảnh cho video. Nội dung được xây dựng theo hướng corporate storytelling, kết hợp các yếu tố về lịch sử, con người và hành trình phát triển của Afotech.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'mescells_stem_cell',
      title: 'MESCELLS — STEM CELL TECHNOLOGY',
      client: 'MESCELLS',
      year: '2023',
      category: 'brand',
      tag: '22 · COMMERCIAL FILMING · STEM CELL TECH',
      role: 'Camera Operator / Filmmaker',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600',
      video: 'https://drive.google.com/file/d/1AibutItTePipZWFYWo4CDaLQl2kvnyDb/view?usp=sharing',
      specs: 'Commercial Filming / Camera Operation / Cinematography',
      archiveNote: 'Video giới thiệu công nghệ tế bào gốc của Mescells, tập trung vào hình ảnh công nghệ, quy trình và môi trường nghiên cứu.',
      challenge: 'Trực quan hóa một lĩnh vực công nghệ chuyên môn cao thông qua hình ảnh, đồng thời cần đảm bảo hình ảnh mang tính chuyên nghiệp và đáng tin cậy.',
      solution: 'Đảm nhiệm quay phim và xây dựng hình ảnh tập trung vào không gian, thiết bị, công nghệ và các chi tiết trong quá trình thực hiện. Cinematography được định hướng theo phong cách clean và hiện đại, phù hợp với lĩnh vực công nghệ sinh học.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'emma_pilates',
      title: 'EMMA PILATES — STUDIO INTRODUCTION',
      client: 'EMMA PILATES',
      year: '2023',
      category: 'commercial',
      tag: '23 · STUDIO INTRODUCTION · LIFESTYLE',
      role: 'Filmmaker / Editor',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600',
      video: 'https://drive.google.com/file/d/10gOYlZtjUUEom29YeZP3wF5gbDUJLmZ-/view?usp=sharing',
      specs: 'Commercial Filming / Editing / Color Grading',
      archiveNote: 'Video giới thiệu không gian và trải nghiệm tại Emma Pilates, tập trung vào hình ảnh phòng tập, không gian và hoạt động tập luyện.',
      challenge: 'Thể hiện không gian phòng tập và trải nghiệm dịch vụ thông qua hình ảnh thay vì sử dụng cách giới thiệu trực tiếp bằng thông tin.',
      solution: 'Đảm nhiệm quay phim và dựng hậu kỳ, tập trung vào composition, chuyển động camera và nhịp dựng để làm nổi bật không gian và trải nghiệm tại studio. Hình ảnh được xử lý theo hướng clean, cinematic và lifestyle-oriented.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'mbs_pilates',
      title: 'MBS PILATES — STUDIO INTRODUCTION',
      client: 'MBS PILATES',
      year: '2023',
      category: 'commercial',
      tag: '24 · STUDIO INTRODUCTION · CGI & LIVE-ACTION',
      role: 'Filmmaker / AD / Editor / CGI Artist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=600',
      video: 'https://drive.google.com/file/d/1qrKxmUg5pALeeaYU__ucfpfOL4RdfPLS/view?usp=drive_link',
      specs: 'Commercial Filming / Art Direction / Editing / CGI / Compositing / Color Grading',
      archiveNote: 'Video giới thiệu MBS Pilates, kết hợp hình ảnh không gian, trải nghiệm tập luyện và các yếu tố CGI để tạo visual identity riêng cho thương hiệu.',
      challenge: 'Không chỉ giới thiệu không gian phòng tập, project yêu cầu xây dựng một visual có tính nhận diện và tạo cảm giác khác biệt so với dạng studio introduction thông thường.',
      solution: 'Đảm nhiệm từ Art Direction, quay phim, dựng đến CGI và compositing, kết hợp footage thực tế với các yếu tố CGI để mở rộng không gian hình ảnh. Hậu kỳ tập trung vào việc tạo sự liền mạch giữa live-action và CGI, mang đến một visual hiện đại và có tính commercial.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'hikid_sk_challenge',
      title: 'HIKID — SK CHALLENGE',
      client: 'HIKID',
      year: '2023',
      category: 'commercial',
      tag: '25 · GREEN SCREEN · COMMERCIAL CONTENT',
      role: 'Director / Editor',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600',
      video: 'https://drive.google.com/file/d/1JLU2ryZIyokKloaRQGUVfZMC2qvSO1VV/view?usp=drive_link',
      specs: 'Commercial Content / Green Screen Production / Direction / Editing / Compositing',
      archiveNote: 'Chuỗi 3 video thuộc chiến dịch SK Challenge của Hikid, với sự tham gia của cầu thủ Duy Mạnh và vợ. Toàn bộ footage được thực hiện trên phông xanh và xử lý hậu kỳ để xây dựng các bối cảnh khác nhau.',
      challenge: 'Xây dựng một chuỗi nội dung quảng bá có tính giải trí với toàn bộ cảnh quay được thực hiện trên green screen. Thách thức nằm ở việc tạo cảm giác tự nhiên cho nhân vật khi tương tác với các bối cảnh được bổ sung hoàn toàn trong hậu kỳ.',
      solution: 'Đảm nhiệm đạo diễn và dựng hậu kỳ cho toàn bộ series, từ định hướng diễn xuất, blocking đến nhịp dựng và compositing. Green screen được xử lý kết hợp với background, graphic elements và visual effects để tạo ra các bối cảnh đa dạng nhưng vẫn giữ được sự nhất quán giữa ba video.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'biahoi_halong_hero',
      title: 'BIA HƠI HẠ LONG — HERO CONTENT',
      client: 'BIA HƠI HẠ LONG',
      year: '2023',
      category: 'commercial',
      tag: '26 · COMMERCIAL FILM · HERO CONTENT',
      role: 'Director / Editor',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=600',
      video: 'https://drive.google.com/file/d/1mIWUXLFomHwTo4GYyfdWHEETu03dPHpW/view?usp=sharing',
      specs: 'Commercial Film / Direction / Production / Editing / Color Grading',
      archiveNote: 'Hero content mở đầu cho chiến dịch quảng bá sản phẩm bia hơi Hạ Long, được xây dựng nhằm tạo hình ảnh và không khí chủ đạo cho toàn bộ campaign.',
      challenge: 'Là nội dung mở đầu chiến dịch nên video cần nhanh chóng thiết lập visual identity, tinh thần thương hiệu và cảm xúc chủ đạo cho sản phẩm.',
      solution: 'Đảm nhiệm đạo diễn và hậu kỳ, tập trung vào visual storytelling, product presentation và nhịp dựng để tạo một hero content có tính nhận diện. Hình ảnh được xây dựng theo hướng commercial, ưu tiên không khí và cảm giác trải nghiệm xung quanh sản phẩm.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'lexus_thanglong_service',
      title: 'LEXUS THĂNG LONG — SERVICE EXPERIENCE',
      client: 'LEXUS THĂNG LONG',
      year: '2023',
      category: 'commercial',
      tag: '27 · COMMERCIAL FILM · SERVICE EXPERIENCE',
      role: 'Director / Editor',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600',
      video: 'https://drive.google.com/file/d/10bE0YG-c6fqw21Ukb5ugpp6hkiCuTChS/view?usp=sharing',
      specs: 'Commercial Film / Direction / Production / Editing / Color Grading',
      archiveNote: 'Video giới thiệu quy trình bảo dưỡng xe tại Lexus Thăng Long, tập trung vào trải nghiệm dịch vụ và các bước trong quá trình chăm sóc, bảo dưỡng xe.',
      challenge: 'Trình bày một quy trình dịch vụ có nhiều công đoạn theo cách trực quan, đồng thời duy trì hình ảnh cao cấp và chuyên nghiệp phù hợp với định vị thương hiệu Lexus.',
      solution: 'Đảm nhiệm đạo diễn và dựng hậu kỳ, xây dựng mạch hình ảnh từ trải nghiệm khách hàng đến các công đoạn kỹ thuật phía sau dịch vụ. Visual được xử lý theo hướng clean và premium, kết hợp nhịp dựng kiểm soát để làm nổi bật sự chuyên nghiệp của quy trình.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'lexus_es300h',
      title: 'LEXUS ES 300H — PRODUCT INTRODUCTION',
      client: 'LEXUS',
      year: '2023',
      category: 'commercial',
      tag: '28 · AUTOMOTIVE FILM · PRODUCT INTRODUCTION',
      role: 'Director / Editor',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600',
      video: 'https://drive.google.com/file/d/1bg4PMIFjv0_tPaiarkAU-Gkgc93669nm/view?usp=sharing',
      specs: 'Automotive Film / Direction / Production / Editing / Color Grading',
      archiveNote: 'Video giới thiệu mẫu xe Lexus ES 300h, tập trung vào thiết kế, không gian và những đặc điểm nổi bật của sản phẩm.',
      challenge: 'Thể hiện một sản phẩm automotive cao cấp trong thời lượng ngắn nhưng vẫn cần truyền tải được thiết kế, chất liệu và cảm giác premium của mẫu xe.',
      solution: 'Đảm nhiệm đạo diễn và dựng hậu kỳ, định hướng cách khai thác hình ảnh xe thông qua composition, camera movement và product-focused editing. Hậu kỳ tập trung vào nhịp dựng, color grading và lựa chọn detail shots để tạo cảm giác cinematic và cao cấp.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'wedding_film_01',
      title: 'WEDDING FILM 01',
      client: 'PRIVATE / WEDDING',
      year: '2023',
      category: 'film',
      tag: '29 · WEDDING FILM · CINEMATOGRAPHY',
      role: 'Filmmaker / Editor / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
      video: 'https://drive.google.com/file/d/1_1MwqY7EQe3-AjbqkPkpNnLVoT5xoHuo/view?usp=drive_link',
      specs: 'Wedding Film / Cinematography / Editing / Color Grading / Sound Design',
      archiveNote: 'Wedding film ghi lại những khoảnh khắc và cảm xúc trong ngày cưới, tập trung vào nhân vật, không khí và những chi tiết mang tính cá nhân.',
      challenge: 'Khác với một event recap thông thường, wedding film cần tìm được những khoảnh khắc có giá trị cảm xúc và kết nối chúng thành một câu chuyện tự nhiên.',
      solution: 'Tập trung vào những khoảnh khắc tự nhiên, tương tác giữa các nhân vật và các chi tiết trong ngày cưới. Hậu kỳ sử dụng storytelling, music-driven editing, sound design và color grading để tạo cảm giác cinematic và giàu cảm xúc.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'wedding_film_02',
      title: 'WEDDING FILM 02',
      client: 'PRIVATE / WEDDING',
      year: '2023',
      category: 'film',
      tag: '30 · WEDDING FILM · CINEMATOGRAPHY',
      role: 'Filmmaker / Editor / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600',
      video: 'https://drive.google.com/file/d/11PDwR8oShSmxSKYmB0I1wlchJnRINkm8/view?usp=sharing',
      specs: 'Wedding Film / Cinematography / Editing / Color Grading / Sound Design',
      archiveNote: 'Wedding film tập trung ghi lại không khí, cảm xúc và những khoảnh khắc đáng nhớ trong ngày cưới thông qua ngôn ngữ hình ảnh mang tính điện ảnh.',
      challenge: 'Thách thức nằm ở việc ghi lại những khoảnh khắc diễn ra tự nhiên nhưng vẫn đảm bảo footage có đủ chất liệu để xây dựng một câu chuyện hoàn chỉnh trong hậu kỳ.',
      solution: 'Khai thác cinematic composition, khoảnh khắc candid và các chi tiết của không gian để tạo chiều sâu cho câu chuyện. Phần hậu kỳ tập trung vào pacing, âm nhạc, sound design và color grading để duy trì cảm xúc xuyên suốt video.',
      link: 'https://behance.net/longtrn19'
    },
    {
      id: 'wedding_film_03',
      title: 'WEDDING FILM 03',
      client: 'PRIVATE / WEDDING',
      year: '2023',
      category: 'film',
      tag: '31 · WEDDING FILM · CINEMATOGRAPHY',
      role: 'Filmmaker / Editor / Post-production Specialist',
      executor: 'NHẬT LONG',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600',
      video: 'https://drive.google.com/file/d/19RKE4vyhOD3vSgGimw6Xelw9cirs-jEd/view?usp=sharing',
      specs: 'Wedding Film / Cinematography / Editing / Color Grading / Sound Design',
      archiveNote: 'Wedding film ghi lại hành trình và những khoảnh khắc đặc biệt của ngày cưới, với trọng tâm là cảm xúc và sự tương tác giữa các nhân vật.',
      challenge: 'Wedding film đòi hỏi khả năng quan sát và lựa chọn khoảnh khắc, bởi phần lớn những chi tiết có giá trị cảm xúc thường diễn ra ngoài những khoảnh khắc được dàn dựng.',
      solution: 'Kết hợp footage được ghi lại trong suốt sự kiện với các detail shots và khoảnh khắc candid để xây dựng mạch kể chuyện. Hậu kỳ được xử lý theo hướng cinematic, chú trọng nhịp dựng, âm thanh và màu sắc để giữ lại cảm xúc tự nhiên của ngày cưới.',
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

      {/* BACKGROUND ATMOSPHERE LOOPER & SUBMERGED DIRECTOR PHOTO */}
      <div id="video-bg-container" className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* Submerged Director portrait in background for ambient depth across tabs */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
            activeTab !== 'reel'
              ? 'opacity-25 scale-105 filter blur-[1px] contrast-125'
              : 'opacity-15 scale-100 filter blur-sm'
          }`}
          style={{ backgroundImage: `url('${DIRECTOR_HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-black/95 z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,20,20,0.15)_0%,rgba(0,0,0,0.92)_100%)] z-1" />
        <video
          id="hero-background-video"
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-20 mix-blend-screen"
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
              
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_15px_rgba(255,42,42,0.4)] flex-shrink-0">
                  <img src={DIRECTOR_HERO_IMAGE} alt="Trần Nhật Long" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-transparent"></div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-950/40 to-slate-900/60 rounded-full border border-red-500/20 text-[9px] font-mono tracking-widest uppercase text-white/90">
                  <Sparkles className="w-3 h-3 text-red-500 animate-spin" />
                  <span>6+ YEARS EXPERIENCE // HÀ NỘI ORIGIN</span>
                </div>
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

            {/* Right: Immersive High-Fidelity Camera Viewfinder Simulator with Director Hero Photo */}
            <div className="lg:col-span-7 w-full relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black shadow-4xl aspect-video lg:aspect-video flex items-center justify-center group">
                
                {/* Director Hero Photo View */}
                {heroDisplayMode === 'portrait' ? (
                  <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    <img 
                      src={DIRECTOR_HERO_IMAGE} 
                      alt="Director Trần Nhật Long" 
                      className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.1)_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
                  </div>
                ) : (
                  /* Active loop background screen */
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-85 transition-all duration-500"
                    src="https://d8j0ntIcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXHO7IWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
                  />
                )}

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
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-rec"></span>
                      <span className="font-bold text-red-500">REC [A]</span>
                      <span className="opacity-40">|</span>
                      <span className="text-white">DIRECTOR CAM</span>
                    </div>

                    {/* Mode switcher button (Portrait / Motion Reel) */}
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10 pointer-events-auto">
                      <button
                        onClick={() => setHeroDisplayMode('portrait')}
                        className={`px-2.5 py-1 rounded-full text-[8px] font-bold font-mono transition-all cursor-pointer ${
                          heroDisplayMode === 'portrait'
                            ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(255,42,42,0.4)]'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        CHÂN DUNG
                      </button>
                      <button
                        onClick={() => setHeroDisplayMode('reel')}
                        className={`px-2.5 py-1 rounded-full text-[8px] font-bold font-mono transition-all cursor-pointer ${
                          heroDisplayMode === 'reel'
                            ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(255,42,42,0.4)]'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        REEL LOOP
                      </button>
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

                {/* Play/Pause hover action circle in reel mode */}
                {heroDisplayMode === 'reel' && (
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
                )}

              </div>

              {/* Viewfinder Subtitle descriptor */}
              <div className="mt-3 flex justify-between items-center text-xs text-neutral-400 px-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-red-500" />
                  <span>{heroDisplayMode === 'portrait' ? 'Director On-set Portrait // Master Frame' : 'Interactive Loop Atmosphere Frame'}</span>
                </span>
                <span>Sequence: [{heroDisplayMode === 'portrait' ? 'NHAT_LONG_PORTRAIT_01' : 'TIDO_REEL_MASTER'}]</span>
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
                <h2 className="text-3xl font-black text-white mt-2 uppercase tracking-tight">Dự án tiêu biểu</h2>
                <p className="text-neutral-450 text-sm mt-1 max-w-2xl leading-relaxed">
                  Tuyển chọn những dự án tiêu biểu trong hành trình làm commercial, brand film và filmmaking.
                </p>
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap gap-2 bg-slate-950/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
                {[
                  { key: 'all', label: 'ALL' },
                  { key: 'commercial', label: 'COMMERCIAL' },
                  { key: 'brand', label: 'BRAND' },
                  { key: 'event', label: 'EVENT' },
                  { key: 'motion', label: 'MOTION' },
                  { key: 'film', label: 'FILM' }
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
                  {getPreviewVideoUrl(projectVideos[projectsData[0].id] !== undefined ? projectVideos[projectsData[0].id] : projectsData[0].video) ? (
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                      <iframe
                        src={getPreviewVideoUrl(projectVideos[projectsData[0].id] !== undefined ? projectVideos[projectsData[0].id] : projectsData[0].video)!}
                        className="w-full h-full scale-[1.02] border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${getProjectImage(projectsData[0])}')` }}></div>
                  )}
                  {/* Absolute transparent overlay to capture clicks and hover events */}
                  <div className="absolute inset-0 z-20 cursor-pointer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none z-10"></div>
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/60 border border-red-500/30 backdrop-blur-md rounded-full text-[10px] font-mono uppercase text-white pointer-events-none z-30">
                    <Sparkles className="w-3 h-3 text-red-400 animate-pulse" />
                    <span>DỰ ÁN TIÊU BIỂU</span>
                  </div>
                </div>
                <div className="lg:col-span-5 text-left space-y-4">
                  <span className="text-[10px] tracking-widest font-mono text-red-500 font-extrabold uppercase bg-red-950/20 px-2.5 py-1 rounded-md">{projectsData[0].tag}</span>
                  <h3 className="text-3xl font-black text-white leading-tight group-hover:text-red-500 transition-colors">{projectsData[0].title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-neutral-300">
                    <span className="bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg">
                      <span className="text-[#ff5500] font-bold">CLIENT:</span> <strong className="text-white font-bold ml-1">{projectsData[0].client}</strong>
                    </span>
                    <span className="bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg">
                      <span className="text-[#ff5500] font-bold">VAI TRÒ:</span> <strong className="text-white font-bold ml-1">{projectsData[0].role}</strong>
                    </span>
                    <span className="bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg text-neutral-400">
                      NĂM: <strong className="text-white font-bold ml-1">{projectsData[0].year}</strong>
                    </span>
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
                .slice((projectFilter === 'all') ? 1 : 0)
                .map((proj: any) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className="group rounded-2xl border border-white/[0.06] bg-[#0c0202]/35 hover:border-red-400/50 hover:shadow-[0_0_15px_rgba(255,42,42,0.12)] transition-all overflow-hidden flex flex-col justify-between cursor-pointer animate-fade-in"
                  >
                    <div>
                      {/* Image Preview frame */}
                      <div className="relative aspect-video w-full overflow-hidden">
                        {getPreviewVideoUrl(projectVideos[proj.id] !== undefined ? projectVideos[proj.id] : proj.video) ? (
                          <div className="absolute inset-0 w-full h-full pointer-events-none">
                            <iframe
                              src={getPreviewVideoUrl(projectVideos[proj.id] !== undefined ? projectVideos[proj.id] : proj.video)!}
                              className="w-full h-full scale-[1.02] border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${getProjectImage(proj)}')` }} />
                        )}
                        {/* Absolute transparent overlay to capture clicks and hover events */}
                        <div className="absolute inset-0 z-20 cursor-pointer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10"></div>
                        <div className="absolute bottom-3 left-3 flex justify-between items-center w-[calc(100%-24px)] text-white font-mono text-[9px] pointer-events-none z-30">
                          <span className="bg-red-950/30 backdrop-blur-md px-2 py-0.5 rounded border border-red-500/20">{proj.year}</span>
                          <span className="text-neutral-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap font-mono">{proj.specs?.split(' // ')[0] || proj.specs}</span>
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
                    <div className="px-5 py-3.5 border-t border-white/[0.06] bg-white/[0.01] flex justify-between items-center text-xs sm:text-sm font-mono text-neutral-400">
                      <span>CLIENT: <strong className="text-white font-bold ml-1">{proj.client}</strong></span>
                      <span className="text-red-500 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">INFO <ArrowRight className="w-3.5 h-3.5" /></span>
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

                {/* Real portrait image with cinematic layers representing Tran Nhat Long */}
                <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                  <img 
                    src={DIRECTOR_HERO_IMAGE} 
                    alt="Trần Nhật Long" 
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-1"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.15)_0%,rgba(0,0,0,0.6)_100%)] z-1"></div>
                  
                  {/* Stylized camera badge overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between backdrop-blur-md bg-black/60 p-3.5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-red-500 bg-black/80 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,42,42,0.3)]">
                        <Aperture className="w-5 h-5 text-red-500 animate-spin" style={{ animationDuration: '40s' }} />
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-black pulse-rec"></div>
                      </div>
                      <div>
                        <div className="text-white font-mono text-xs uppercase tracking-widest font-extrabold">TRẦN NHẬT LONG</div>
                        <div className="text-red-500 text-[10px] font-mono font-medium">Director / Filmmaker // TIDO Media</div>
                      </div>
                    </div>
                    <div className="text-[9px] font-mono text-neutral-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                      HALOTr
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
              START A PROJECT
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
                  Nhật Long và đội ngũ TIDO Media sẽ phản hồi phương án qua hòm thư điện tử của bạn: <strong className="text-white">{email}</strong> trong vòng 24 giờ làm việc.
                </p>
                
                <div className="text-neutral-500 font-mono text-[10px] uppercase">
                  SYS_CONFIRMED // INBOX_CHECK
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================== PORTFOLIO PROJECT DETAIL LIGHTBOX MODAL ==================================== */}
      {selectedProject && (() => {
        const defaultVideoUrl = projectVideos[selectedProject.id] !== undefined ? projectVideos[selectedProject.id] : (selectedProject.video || '');
        const activeVideoUrl = activeModalVideoUrl || defaultVideoUrl;
        const embedUrl = getEmbedVideoUrl(activeVideoUrl);

        return (
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
              {embedUrl ? (
                <div className="space-y-4 mb-6">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.08] bg-black shadow-[0_0_25px_rgba(255,85,0,0.15)] animate-fade-in group">
                    <iframe
                      src={embedUrl}
                      title={`${selectedProject.title} media player`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full"
                    ></iframe>
                  </div>

                  {selectedProject.videos && selectedProject.videos.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-neutral-950/60 border border-white/5 rounded-2xl">
                      <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">Chọn phần trình chiếu:</span>
                      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        {selectedProject.videos.map((vid: string, index: number) => {
                          const isActive = activeVideoUrl === vid;
                          const label = selectedProject.videoLabels && selectedProject.videoLabels[index] 
                            ? selectedProject.videoLabels[index] 
                            : `Bản dựng ${index + 1}`;
                          return (
                            <button
                              key={index}
                              onClick={() => setActiveModalVideoUrl(vid)}
                              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                                isActive
                                  ? 'bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/25'
                                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 group border border-white/[0.05]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url('${selectedProject.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080101] via-[#080101]/30 to-transparent"></div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-center z-10">
                    <span className="w-12 h-12 rounded-full bg-red-650 flex items-center justify-center border border-red-500/50 mb-3 animate-pulse">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </span>
                    <p className="text-white text-xs font-mono tracking-wider font-semibold uppercase">TRANG TRÌNH CHIẾU CHƯA LIÊN KẾT</p>
                    <p className="text-white/60 text-[10px] font-mono mt-1">Video dự án này hiện chưa có liên kết trình phát</p>
                  </div>

                  <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] tracking-widest font-mono text-[#ff5500] font-extrabold uppercase bg-black/75 px-3 py-1 rounded border border-[#ff5500]/30">
                      {selectedProject.tag}
                    </span>
                    <span className="text-[10px] tracking-widest font-mono text-white/90 font-bold bg-black/60 px-3 py-1 rounded">
                      {selectedProject.year}
                    </span>
                  </div>
                </div>
              )}



              {/* Structured copy layout */}
              <div className="space-y-6">
                
                <div className="text-left space-y-3">
                  <div className="inline-flex items-center gap-2 bg-[#ff5500]/10 border border-[#ff5500]/30 px-3.5 py-1.5 rounded-lg text-sm sm:text-base font-mono uppercase font-bold tracking-wider text-[#ff5500]">
                    <span>CLIENT:</span>
                    <strong className="text-white font-black">{selectedProject.client}</strong>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight uppercase tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-mono text-neutral-300">
                    <div className="bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                      <span className="text-[#ff5500] font-bold">VAI TRÒ:</span>
                      <strong className="text-white font-bold">{selectedProject.role}</strong>
                    </div>
                    <div className="bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-neutral-300">
                      <span className="text-neutral-400 font-bold">THỰC HIỆN:</span>
                      <strong className="text-white font-bold">{selectedProject.executor || 'TIDO MEDIA / NHẬT LONG'}</strong>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications Grid */}
                <div className={`p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left ${selectedProject.archiveNote ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-1'}`}>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-[#ff5500] font-bold">Quy mô sản xuất & Thiết bị</div>
                    <div className="text-xs text-neutral-300 font-mono leading-relaxed">
                      {selectedProject.specs}
                    </div>
                  </div>
                  {selectedProject.archiveNote && (
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold">Lưu trữ dự án liên kết</div>
                      <div className="text-xs text-neutral-300 leading-relaxed">
                        {selectedProject.archiveNote}
                      </div>
                    </div>
                  )}
                </div>

                {selectedProject.behindTheScenesUrl && (
                  <div className="p-4 rounded-xl border border-dashed border-[#ff5500]/30 bg-[#ff5500]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase font-mono tracking-widest text-[#ff5500] font-bold">Chi tiết hậu trường</div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        Tìm hiểu quy trình sản xuất, kịch bản chi tiết và hậu trường dự án.
                      </p>
                    </div>
                    <a
                      href={selectedProject.behindTheScenesUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#ff5500] hover:bg-[#ff3c00] text-xs font-bold text-white transition-all text-center flex items-center justify-center gap-1.5 shadow-lg shadow-[#ff5500]/25 cursor-pointer shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>bấm vào đây để biết chi tiết</span>
                    </a>
                  </div>
                )}

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
        );
      })()}

    </div>
  );
}

