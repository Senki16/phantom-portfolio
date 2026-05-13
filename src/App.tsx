import React, { useState, useEffect, useRef, JSX } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  Trophy, 
  Mail, 
  Volume2, 
  VolumeX,
  ExternalLink,
  ChevronRight,
  MapPin,
  Linkedin,
  Phone,
  Code,
  Zap,
  Star,
  Menu,
  X
} from 'lucide-react';
import track from './track.mp3';

// --- Types ---
type SectionId = 'home' | 'experience' | 'education' | 'projects' | 'skills' | 'achievements' | 'extracurricular' | 'contact';

interface Section {
  id: SectionId;
  label: string;
}

// --- Data ---
const sections: Section[] = [
  { id: 'home', label: 'About Me' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'extracurricular', label: 'Extracurricular' },
  { id: 'contact', label: 'Contact' },
];

const resumeData = {
  profile: {
    name: "David Zuluaga Henao",
    title: "Mechanical Engineering Undergraduate",
    email: "dzuluagah@eafit.edu.co",
    phone: "+573046593793",
    location: "Envigado, Colombia",
    linkedin: "senki17david",
    summary: "Mechanical Engineering student at Universidad EAFIT. Experience in data analysis (Excel, Python, MATLAB), automation with Arduino, and modeling/simulation in SolidWorks. Characterized by discipline, analytical thinking, and organization, with resilience and strong problem-solving skills. Brown belt in taekwondo, which has strengthened my discipline and consistency."
  },
  experience: [
    {
      role: "Academic Assistant",
      company: "Universidad EAFIT (Research Group)",
      period: "2024",
      location: "Medellin",
      desc: "Worked in a research group focused on motorcycle efficiency and fuel consumption. Performed data analysis and information processing, as well as maintenance labors."
    }
  ],
  education: [
    {
      school: "Universidad EAFIT",
      degree: "Mechanical Engineering",
      period: "2021 - Present"
    },
    {
      school: "Kyung Hee University",
      degree: "Academic Exchange (South Korea)",
      period: "Mar–Jun 2025",
      note: "GKS Scholarship Recipient"
    },
    {
      school: "National University of Colombia",
      degree: "Partial Studies",
      period: "2019–2021"
    }
  ],
  skills: {
    technical: [
      { name: "MS Office", level: "Advanced" },
      { name: "SolidWorks", level: "Advanced" },
      { name: "Python", level: "Intermediate" },
      { name: "MATLAB", level: "Intermediate" },
      { name: "Arduino", level: "Intermediate" },
      { name: "YOLOv5", level: "Basic" },
      { name: "Unity", level: "Intermediate" },
      { name: "Aseprite", level: "Intermediate" },
      { name: "LaTeX", level: "Intermediate" },
      { name: "Creo Parametric", level: "Basic" },
      { name: "Power Apps", level: "Basic" }
    ],
    soft: ["Problem-solving", "Mechanical analysis", "Fast learning", "Computational skills", "Discipline", "Adaptability", "Teamwork", "Communication", "Leadership"],
    languages: [
      { name: "English", level: "IELTS B2 (2024)" },
      { name: "French", level: "DELF A2 (2018)" },
      { name: "Japanese", level: "Basic" },
      { name: "Korean", level: "Basic" }
    ]
  },
  achievements: [
    { title: "GKS Scholarship", body: "Global Korea Scholarship for academic exchange (2025)." },
    { title: "Taekwondo Silver Medal", body: "Silver medal in Taekwondo Poomsae (2024)." },
    { title: "Physics Challenge Bronze", body: "Bronze medal – EIA Physics Challenge (2019)." },
    { title: "Model United Nations", body: "Selected to represent NotreDame School at Yale University (2015)." },
    { title: "Symphony Orchestra", body: "Selected violinist in the Youth Symphony Orchestra of the Dominican Republic (2015)." }
  ],
  extracurricular: [
    { title: "Taekwondo", company: "Dragon Rojo Club", period: "2022–Present", note: "Brown Belt" },
    { title: "Turbomachinery Research", company: "Universidad EAFIT", period: "2023" },
    { title: "Japanese Study", company: "Haru no Hinata Academy", period: "2023–Present" },
    { title: "Swimming", company: "Brazada Club", period: "2016–2019" }
  ],
  portfolio: [
    { name: "Tripteron Systems", desc: "Developed complex robotic system modeling." },
    { name: "MagLev Motor Prototype", desc: "Magnetic levitation motor prototype and controls." },
    { name: "Human Powered Vehicles (HPV)", desc: "Engineering design for efficient transport." },
    { name: "Process Automation", desc: "Arduino-based industrial automation prototypes." },
    { name: "Unity Game Dev", desc: "Basic knowledge in game development and 2D/3D assets." }
  ]
};

// --- Components ---
const SelectorPoints = () => {
  const [points, setPoints] = useState({ red: "", blue: "" });

  useEffect(() => {
    const generatePoints = () => {
      const w = 100, h = 50, cx = 50, cy = 25;
      const r = () => Math.random() * 20;
      
      const redP = [
        [r(), r()], [80+r(), r()], [80+r(), 30+r()], [r(), 30+r()]
      ].map(p => p.join(',')).join(' ');

      const blueP = [
        [30+r(), r()], [90+r(), 30+r()], [100+r(), 35+r()], [20+r(), 50+r()]
      ].map(p => p.join(',')).join(' ');

      setPoints({ red: redP, blue: blueP });
    };

    const interval = setInterval(generatePoints, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 150 70" preserveAspectRatio="none">
      <polygon fill="#ff0022" points={points.red} />
      <polygon fill="#1cfeff" points={points.blue} style={{ mixBlendMode: 'screen' }} />
    </svg>
  );
};

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const selectSoundRef = useRef<HTMLAudioElement | null>(null);

  const playSfx = (type: 'hover' | 'select') => {
    try {
      if (type === 'hover' && hoverSoundRef.current) {
        hoverSoundRef.current.currentTime = 0;
        hoverSoundRef.current.play().catch(() => {});
      } else if (type === 'select' && selectSoundRef.current) {
        selectSoundRef.current.currentTime = 0;
        selectSoundRef.current.play().catch(() => {});
      }
    } catch (e) {
      // Ignored
    }
  };

  useEffect(() => {
    if (isStarted && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.error("Audio block:", e);
      });
    }
  }, [isStarted]);

  const startApp = () => {
    setIsStarted(true);
    playSfx('select');
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleSectionChange = (id: SectionId) => {
    if (id !== activeSection) {
      setActiveSection(id);
      playSfx('select');
      setIsMobileMenuOpen(false);
    }
  };

  if (!isStarted) {
    return (
      <div 
        className="h-screen w-full flex flex-col items-center justify-center text-p5-white cursor-pointer group relative overflow-hidden"
        style={{
          backgroundImage: "url('/InitBG.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        onClick={startApp}
        onMouseEnter={() => playSfx('hover')}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          <div className="scanline" />
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-display uppercase tracking-tighter italic mb-4 sm:mb-8 select-none text-center"
          >
            Portfolio <span className="text-p5-red">5</span>
          </motion.h1>
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-widest">Press to Infiltrate</p>
            <ChevronRight className="w-5 sm:w-7 md:w-8 h-5 sm:h-7 md:h-8 rotate-90" />
          </motion.div>
        </div>
        
        {/* Assets */}
        <audio ref={audioRef} src={track} loop crossOrigin="anonymous" />
        <audio ref={hoverSoundRef} src="/hover.wav" crossOrigin="anonymous" />
        <audio ref={selectSoundRef} src="/select.wav" crossOrigin="anonymous" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-p5-black text-p5-white font-sans overflow-hidden flex flex-col md:flex-row">
      <div className="scanline" />
      
      {/* Background Assets */}
      <audio ref={audioRef} src={track} loop crossOrigin="anonymous" />
      <audio ref={hoverSoundRef} src="/hover.wav" crossOrigin="anonymous" />
      <audio ref={selectSoundRef} src="/select.wav" crossOrigin="anonymous" />

      {/* Background Music Control */}
      <button 
        onClick={toggleMusic}
        onMouseEnter={() => playSfx('hover')}
        className="fixed top-4 right-4 z-50 bg-p5-white text-p5-black p-2 sm:p-3 hover:bg-p5-red hover:text-p5-white transition-colors border-2 border-transparent hover:border-black rounded-none shadow-[4px_4px_0px_#D3121E]"
        style={{ clipPath: 'polygon(10% 0%, 100% 15%, 90% 100%, 0% 85%)' }}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-p5-white text-p5-black p-2 hover:bg-p5-red hover:text-p5-white transition-colors border-2 border-transparent hover:border-black rounded-none shadow-[4px_4px_0px_#D3121E]"
        style={{ clipPath: 'polygon(10% 0%, 100% 15%, 90% 100%, 0% 85%)' }}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Navigation Rail - Desktop */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-1/3 flex-col justify-center gap-4 pl-16 z-30">
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.05 + 0.3 }}
            onMouseEnter={() => playSfx('hover')}
            onClick={() => handleSectionChange(section.id)}
            className={`p5-menu-item flex items-center gap-4 ${activeSection === section.id ? 'active h-16' : 'h-14'}`}
          >
            {activeSection === section.id && (
              <div className="absolute inset-0 pointer-events-none">
                <SelectorPoints />
              </div>
            )}
            <span className="relative z-10">{section.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Navigation Rail - Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed left-0 top-16 w-full bg-p5-black border-b-4 border-p5-red z-40 max-h-[calc(100vh-64px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-2 p-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  onMouseEnter={() => playSfx('hover')}
                  className={`p-3 text-left font-display uppercase text-sm ${activeSection === section.id ? 'bg-p5-red text-p5-white' : 'bg-p5-white text-p5-black hover:bg-p5-red hover:text-p5-white'} transition-colors`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <main className="w-full md:w-2/3 md:ml-auto h-full md:p-20 p-4 sm:p-6 pt-20 md:pt-0 flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ x: 300, opacity: 0, skewX: 10 }}
            animate={{ x: 0, opacity: 1, skewX: 0 }}
            exit={{ x: -300, opacity: 0, skewX: -10 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="w-full relative"
          >
            {/* Section Header */}
            <motion.div
              initial={{ x: -100, opacity: 0, skewX: -20 }}
              animate={{ x: 0, opacity: 1, skewX: -20 }}
              className="hidden md:block absolute -top-6 -left-10 z-40 bg-p5-red text-p5-white px-8 py-4 font-display text-4xl uppercase shadow-[10px_10px_0px_black]"
            >
              {sections.find(s => s.id === activeSection)?.label}
            </motion.div>

            <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] p5-card group">
              <div className="p5-card-inner custom-scrollbar text-sm sm:text-base md:text-base">
                {activeSection === 'home' && (
                  <div className="space-y-4 md:space-y-8">
                    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                      <div className="w-32 h-32 md:w-48 md:h-48 bg-p5-black border-4 border-p5-red skew-x-[-5deg] overflow-hidden shadow-[10px_10px_0px_white] flex-shrink-0">
                        <img
                          src="/profile.jpg"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl md:text-7xl font-display uppercase leading-none mb-2">About Me</h2>
                        <p className="text-base md:text-2xl font-bold bg-p5-black text-p5-white inline-block px-4 py-1 skew-x-[-10deg]">
                          David Zuluaga Henao
                        </p>
                      </div>
                    </div>
                    <p className="text-sm md:text-xl leading-relaxed italic border-l-8 border-p5-red pl-4 md:pl-6 py-2">
                      {resumeData.profile.summary}
                    </p>
                  </div>
                )}

                {activeSection === 'experience' && (
                  <div className="space-y-4 md:space-y-12">
                    {resumeData.experience.map((exp, i) => (
                      <motion.div 
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative pl-8 md:pl-12 border-l-4 border-p5-black"
                      >
                        <div className="absolute -left-[14px] top-0 w-6 h-6 bg-p5-red rotate-45 shadow-lg" />
                        <h3 className="text-xl md:text-4xl font-display uppercase text-p5-red">{exp.role}</h3>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 md:mb-4 gap-2">
                          <p className="text-base md:text-xl font-black bg-p5-black text-p5-white px-3 py-1 italic">{exp.company}</p>
                          <span className="font-mono font-bold text-gray-500 text-xs md:text-base">{exp.period}</span>
                        </div>
                        <p className="text-sm md:text-lg leading-relaxed">{exp.desc}</p>
                        <div className="mt-4 flex items-center gap-2 text-gray-600 text-xs md:text-base">
                          <MapPin size={16} /> {exp.location}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeSection === 'projects' && (
                  <div className="grid grid-cols-1 gap-3 md:gap-6">
                    {resumeData.portfolio.map((project, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ 
                          scale: 1.03, 
                          x: 15,
                          boxShadow: "0 0 25px rgba(211, 18, 30, 0.4)",
                          backgroundColor: "#000",
                          color: "#fff"
                        }}
                        onMouseEnter={() => playSfx('hover')}
                        className="bg-gray-100 p-3 md:p-6 border-r-8 border-p5-red group transition-all duration-200 cursor-default"
                      >
                        <h3 className="text-lg md:text-3xl font-display uppercase flex items-center gap-2 md:gap-4">
                          <Zap className="text-p5-red group-hover:animate-pulse w-5 h-5 md:w-6 md:h-6" />
                          {project.name}
                        </h3>
                        <p className="text-xs md:text-lg italic mt-2 opacity-80">{project.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeSection === 'education' && (
                  <div className="space-y-3 md:space-y-8">
                    {resumeData.education.map((edu, i) => (
                      <div key={i} className={`p-3 md:p-8 shadow-xl transform text-sm md:text-base ${i % 2 === 0 ? '-rotate-1 bg-p5-black text-p5-white' : 'rotate-1 bg-p5-red text-p5-white'}`}>
                        <h3 className="text-xl md:text-3xl font-display uppercase">{edu.school}</h3>
                        <p className="text-base md:text-xl font-bold italic">{edu.degree}</p>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-2 md:mt-4 gap-2">
                          <span className="font-mono text-xs md:text-base">{edu.period}</span>
                          {edu.note && <span className="text-xs md:text-sm font-black border-2 border-current px-2 py-1 uppercase w-fit">{edu.note}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSection === 'skills' && (
                  <div className="space-y-4 md:space-y-10">
                    <section>
                      <h3 className="text-lg md:text-3xl font-display uppercase border-b-4 border-p5-black mb-2 md:mb-6">Execution Capabilities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                        {resumeData.skills.technical.map((skill, i) => (
                          <div key={i} className="flex justify-between items-center bg-gray-100 p-2 border-l-4 border-p5-red text-xs md:text-base">
                            <span className="font-bold uppercase tracking-tight">{skill.name}</span>
                            <span className={`text-xs px-2 py-1 font-black ${skill.level === 'Advanced' ? 'bg-p5-red text-white' : 'bg-p5-black text-white'}`}>
                              {skill.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10">
                      <section>
                        <h3 className="text-base md:text-2xl font-display uppercase border-b-4 border-p5-black mb-2 md:mb-4">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.languages.map((lang, i) => (
                            <div key={i} className="bg-p5-black text-p5-white px-2 md:px-3 py-1 skew-x-[-10deg] text-xs md:text-base">
                              <span className="font-bold">{lang.name}:</span> {lang.level}
                            </div>
                          ))}
                        </div>
                      </section>
                      <section>
                        <h3 className="text-base md:text-2xl font-display uppercase border-b-4 border-p5-black mb-2 md:mb-4">Abilities</h3>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.soft.map((s, i) => (
                            <span key={i} className="border-2 border-p5-black px-2 py-1 text-xs md:text-sm font-bold uppercase">{s}</span>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                )}

                {activeSection === 'achievements' && (
                  <div className="space-y-3 md:space-y-6">
                    {resumeData.achievements.map((ach, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.02, x: 10 }}
                        onMouseEnter={() => playSfx('hover')}
                        className="bg-p5-black text-p5-white p-3 md:p-6 relative overflow-hidden"
                        style={{ clipPath: 'polygon(0% 0%, 100% 5%, 95% 100%, 0% 95%)' }}
                      >
                        <div className="absolute top-0 right-0 p-2 opacity-20">
                          <Trophy className="w-10 md:w-20 h-10 md:h-20" />
                        </div>
                        <h3 className="text-lg md:text-3xl font-display uppercase text-p5-red mb-1 md:mb-2">{ach.title}</h3>
                        <p className="text-xs md:text-lg italic">{ach.body}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeSection === 'extracurricular' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                    {resumeData.extracurricular.map((extra, i) => (
                      <div 
                        key={i} 
                        onMouseEnter={() => playSfx('hover')}
                        className="border-4 border-p5-black p-3 md:p-6 relative group hover:bg-p5-red hover:text-p5-white transition-colors cursor-default text-xs md:text-base"
                      >
                        <h3 className="text-base md:text-2xl font-display uppercase mb-1">{extra.title}</h3>
                        <p className="text-xs md:text-sm font-bold opacity-80">{extra.company}</p>
                        <p className="font-mono text-xs mt-2 md:mt-4">{extra.period}</p>
                        {extra.note && (
                          <div className="absolute -bottom-2 -right-2 bg-p5-black text-p5-white px-2 py-1 text-xs uppercase group-hover:bg-p5-white group-hover:text-p5-black">
                            {extra.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeSection === 'contact' && (
                  <div className="h-full flex flex-col justify-center gap-3 md:gap-12">
                    <div className="space-y-3 md:space-y-8">
                      <a 
                        href={`mailto:${resumeData.profile.email}`} 
                        onMouseEnter={() => playSfx('hover')}
                        onClick={() => playSfx('select')}
                        className="p5-menu-item !bg-p5-black !text-p5-white hover:!bg-p5-red group flex items-center gap-2 md:gap-6 !py-2 md:!py-3 !px-3 md:!px-10 !text-sm md:!text-2xl"
                      >
                        <Mail className="w-5 h-5 md:w-10 md:h-10 group-hover:animate-bounce" />
                        <span className="truncate text-xs md:text-2xl">{resumeData.profile.email}</span>
                      </a>
                      <div className="p5-menu-item !bg-p5-black !text-p5-white flex items-center gap-2 md:gap-6 cursor-default !py-2 md:!py-3 !px-3 md:!px-10">
                        <Phone className="w-5 h-5 md:w-10 md:h-10" />
                        <span className="text-xs md:text-2xl">{resumeData.profile.phone}</span>
                      </div>
                      <a 
                        href={`https://linkedin.com/in/${resumeData.profile.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onMouseEnter={() => playSfx('hover')}
                        onClick={() => playSfx('select')}
                        className="p5-menu-item !bg-p5-black !text-p5-white hover:!bg-p5-cyan hover:!text-p5-black group flex items-center gap-2 md:gap-6 !py-2 md:!py-3 !px-3 md:!px-10 !text-sm md:!text-2xl"
                      >
                        <Linkedin className="w-5 h-5 md:w-10 md:h-10" />
                        <span className="text-xs md:text-2xl">LinkedIn</span>
                        <ExternalLink className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4 md:w-6 md:h-6" />
                      </a>
                    </div>
                    <div className="bg-p5-black text-p5-white p-3 md:p-6 rotate-[2deg] shadow-2xl text-sm md:text-base">
                      <p className="text-base md:text-3xl font-display uppercase flex items-center gap-2 md:gap-4">
                        <MapPin className="text-p5-red w-5 h-5 md:w-8 md:h-8" /> {resumeData.profile.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Transitional Graphics & Accents */}
      <motion.div 
        className="fixed -bottom-20 -right-20 opacity-10 pointer-events-none z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] text-p5-red" />
      </motion.div>

      {/* Floating UI Dots */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none halftone opacity-10 z-0" />
      
      <style>{`
        .p5-menu-item.active {
          transform: translateX(30px) translateY(-10px) skewX(-15deg);
        }
      `}</style>
    </div>
  );
}
