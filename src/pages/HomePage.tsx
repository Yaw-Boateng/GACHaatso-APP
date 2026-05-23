import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Calendar, 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Quote
} from "lucide-react";
import { Link } from "react-router-dom";
import bgImg from "../assets/bgImg.webp";
import daddyImg from "../assets/daddyImg.webp";

// Importing your local slider assets
import celebrateImg from "../assets/celebrate.webp";
import choirImg from "../assets/choir.webp";
import pastorPreachingImg from "../assets/pastorpreaching.webp";
import inWorship1Img from "../assets/inworship1.webp";
import prayingImg from "../assets/praying.webp";

const SLIDES = [
  {
    id: 1,
    tagline: "Prophetic Mandate",
    titleLine1: "Uncompromising Truth",
    titleLine2: "For Structural Change",
    description: "Demolishing modern religious traditions to rebuild pure, unadulterated foundations built completely around the living presence of God.",
    bgImg: pastorPreachingImg,
    accentColor: "from-amber-400 via-white to-orange-300"
  },
  {
    id: 2,
    tagline: "Kingdom Community",
    titleLine1: "An Empowered Walk",
    titleLine2: "In Kingdom Authority",
    description: "Equipping believers to walk out their prophetic destiny through deep spiritual architecture, biblical literacy, and authentic communal covering.",
    bgImg: choirImg,
    accentColor: "from-primary-400 via-white to-secondary-300"
  },
  {
    id: 3,
    tagline: "Gospel Ambassadors Church",
    titleLine1: "A Higher Sanctuary",
    titleLine2: "For Divine Reality",
    description: "Experience the raw truth, refined dynamic fellowship, and prophetic mandate at the Bethel Center. Your space for spiritual systems and structural transformation.",
    bgImg: celebrateImg, 
    accentColor: "from-secondary-400 via-white to-primary-300"
  },
  {
    id: 4,
    tagline: "Dynamic Fellowship",
    titleLine1: "Consecrated Fire",
    titleLine2: "United as One Body",
    description: "Step out of isolated spirituality and join a global company of saints running toward a unified modern reformation.",
    bgImg: inWorship1Img,
    accentColor: "from-emerald-400 via-white to-cyan-300"
  },
  {
    id: 5,
    tagline: "Bethel Center",
    titleLine1: "Spiritual Systems",
    titleLine2: "Designed to Transform",
    description: "Every gathering is systematically structured to host glory, realign minds, and release strategic blueprints for societal change.",
    bgImg: prayingImg,
    accentColor: "from-blue-400 via-white to-purple-300"
  }
];

const HomePage = () => {
  const [activeServiceTab, setActiveServiceTab] = useState("sunday");
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const [testimonyIndex, setTestimonyIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Core navigation handlers
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Automated slide loop interval
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [handleNext]);

  const currentSlide = SLIDES[currentIndex];

  const testimonies = [
    {
      id: 1,
      name: "Sarah Mensah",
      role: "Member since 2021",
      text: "Joining the Bethel Center has been a turning point for my spiritual life. The community here isn't just a church; it's a family that truly cares for one another.",
    },
    {
      id: 2,
      name: "Kofi Arhin",
      role: "Youth Leader",
      text: "The Tuesday Bible studies have completely transformed my understanding of the Word. It's deep, practical, and incredibly welcoming for everyone.",
    },
    {
      id: 3,
      name: "Abena Boateng",
      role: "Choir Member",
      text: "I found peace here during a very difficult time in my life. The Bethel Encounter sessions on Thursday mornings are a true sanctuary for the soul.",
    },
  ];

  const serviceTimes = [
    {
      id: "sunday",
      title: "Word Impartation Service",
      day: "Every Sunday",
      time: "8:00 AM - 10:30 AM",
      type: "In-person & Online",
      location: "Main Sanctuary",
      tagline: "Deep Revelation & Apostolic Shift",
      details: "Our primary gathering focused on deep scriptural revelation, corporate worship, and prophetic impartation for the week ahead.",
    },
    {
      id: "tuesday",
      title: "Miracle Service",
      day: "Every Tuesday",
      time: "6:30 PM - 8:30 PM",
      type: "In-person & Online",
      location: "Main Sanctuary",
      tagline: "Atmosphere of the Supernatural",
      details: "Come expecting the supernatural. A powerful mid-week service dedicated to healing, deliverance, testimonies, and intense prayer.",
    },
    {
      id: "friday",
      title: "Half Night Prayer",
      day: "Last Friday of Month",
      time: "10:00 PM onwards",
      type: "In-person Only",
      location: "Grace Chapel",
      tagline: "Midnight Altar & Spiritual Stamina",
      details: "An intentional night vigil environment to break chains, seek God's face through the watches of the night, and build spiritual stamina.",
    },
    {
      id: "saturday",
      title: "Bethel Encounter Prayers",
      day: "First Saturday of Month",
      time: "6:00 AM - 8:30 AM",
      type: "In-person Only",
      location: "Sanctuary Garden",
      tagline: "Commanding the Month Ahead",
      details: "Commanding your month at the altar. Early morning sacrificial prayers to commit the month ahead into the secure hands of God.",
    },
  ];

  const nextTestimony = () => setTestimonyIndex((prev) => (prev + 1) % testimonies.length);
  const prevTestimony = () => setTestimonyIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);

  const currentTabDetails = serviceTimes.find(s => s.id === activeServiceTab);

  return (
    <div className="overflow-x-hidden font-sans bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] transition-colors duration-300">
      
      {/* 1. HERO SECTION: Cinematographic Editorial Design */}
      <section className="relative min-h-[92vh] flex items-end justify-center bg-slate-950 pt-24 overflow-hidden group">
  {/* Absolute Visual Backdrops (Pure Image & Glow Layer) */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    <AnimatePresence mode="wait">
      <motion.div
        key={`bg-${currentSlide.id}`}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-cover bg-center filter brightness-90 md:brightness-100" 
        style={{ backgroundImage: `url(${currentSlide.bgImg})` }}
      />
    </AnimatePresence>

    {/* Glow Effects */}
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary-900/10 rounded-full filter blur-[140px]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-secondary-900/20 rounded-full filter blur-[140px]" />

    {/* Soft overall overlay for base image tint */}
    <div className="absolute inset-0 bg-slate-950/10" />
  </div>

  {/* Left/Right Navigation Arrows */}
  <button
    onClick={handlePrev}
    className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 bg-slate-900/50 hover:bg-slate-900/90 text-white p-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md hidden md:flex items-center justify-center"
    aria-label="Previous Slide"
  >
    <ChevronLeft size={24} />
  </button>

  <button
    onClick={handleNext}
    className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 bg-slate-900/50 hover:bg-slate-900/90 text-white p-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md hidden md:flex items-center justify-center"
    aria-label="Next Slide"
  >
    <ChevronRight size={24} />
  </button>

  {/* 
    LOWER THIRD INNER CONTAINER
    - Changed pt-32 to pt-44 (pushes text deeper into the dark gradient mask)
    - Changed pb-24 to pb-16 (keeps it neatly tucked above the pagination indicators)
  */}
  <div className="w-full z-10 relative bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pt-44 pb-16 px-4">
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-center text-center">
        
        {/* Dynamic Text Column */}
        <div className="max-w-3xl space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-content-${currentSlide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-5 flex flex-col items-center" 
            >
              {/* Tagline */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/60 border border-white/10 backdrop-blur-md">
                <Sparkles size={12} className="text-secondary-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-200">
                  {currentSlide.tagline}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-white leading-[1.1]">
                {currentSlide.titleLine1} <br />
                <span className={`bg-clip-text text-transparent bg-[#145efc] ${currentSlide.accentColor}`}>
                  {currentSlide.titleLine2}
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-lg drop-shadow-sm">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/about"
              className="bg-white text-slate-950 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-bold transition-all text-xs tracking-wide flex items-center gap-2 shadow-lg"
            >
              Our Identity <ArrowRight size={14} />
            </Link>
            <Link
              to="/sermons"
              className="bg-white/[0.06] text-white hover:bg-white/[0.12] border border-white/10 px-6 py-3.5 rounded-xl font-bold transition-all text-xs tracking-wide flex items-center gap-2 backdrop-blur-md"
            >
              <Play size={12} className="fill-current" /> Media Archive
            </Link>
          </div>
        </div>
     
      </div>
    </div>
  </div>

  {/* Lower Dotted Pagination Bar */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-slate-950/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
    {SLIDES.map((slide, index) => (
      <button
        key={`dot-${slide.id}`}
        onClick={() => goToSlide(index)}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          index === currentIndex
            ? "w-5 bg-white"
            : "w-1.5 bg-slate-500 hover:bg-slate-300"
        }`}
        aria-label={`Navigate to slide ${index + 1}`}
      />
    ))}
  </div>
</section>

      {/* 2. SERVICES HUB: Interactive Structural Workspace Layout */}
      <section className="bg-[rgb(var(--bg-secondary))] py-28 border-y border-[rgb(var(--border-primary))] transition-colors duration-300">
        <div className="container mx-auto max-w-6xl px-4">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-secondary-500"></span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-secondary-500">Sacred Calendars</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[rgb(var(--text-primary))] tracking-tight">
                Weekly Assemblies
              </h2>
            </div>
            <p className="text-[rgb(var(--text-secondary))] font-light max-w-md text-sm md:text-base leading-relaxed">
              Synchronize your calendar blocks with our architectural frameworks of power, prayer, and systemic alignment.
            </p>
          </div>

          {/* Interactive Workspace Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Column Left */}
            <div className="lg:col-span-5 space-y-3">
              {serviceTimes.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceTab(service.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all border flex items-center justify-between group ${
                    activeServiceTab === service.id
                      ? "bg-[rgb(var(--bg-primary))] border-primary-600 shadow-md"
                      : "bg-transparent border-[rgb(var(--border-primary))] hover:bg-[rgb(var(--bg-primary))]/50"
                  }`}
                >
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${activeServiceTab === service.id ? "text-primary-600" : "text-[rgb(var(--text-muted))]"}`}>
                      {service.day}
                    </p>
                    <h3 className="font-bold text-base text-[rgb(var(--text-primary))] group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform duration-300 ${activeServiceTab === service.id ? "translate-x-1 text-primary-600" : "text-[rgb(var(--text-muted))]"}`} 
                  />
                </button>
              ))}
            </div>

            {/* Display Board Column Right */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeServiceTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[rgb(var(--bg-primary))] border border-[rgb(var(--border-primary))] rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[rgb(var(--text-primary))] pointer-events-none">
                    <Calendar size={180} />
                  </div>

                  <span className="text-xs font-semibold text-secondary-500 bg-secondary-500/10 px-3 py-1 rounded-md inline-block mb-4">
                    {currentTabDetails?.tagline}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[rgb(var(--text-primary))] mb-4">
                    {currentTabDetails?.title}
                  </h3>

                  <p className="text-[rgb(var(--text-secondary))] font-light leading-relaxed mb-8 text-sm md:text-base">
                    {currentTabDetails?.details}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 border-t border-[rgb(var(--border-primary))] pt-8">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-xl text-primary-600">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-muted))]">Hours & Schedule</p>
                        <p className="text-sm font-bold text-[rgb(var(--text-primary))]">{currentTabDetails?.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-xl text-primary-600">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-muted))]">Venue Coordinates</p>
                        <p className="text-sm font-bold text-[rgb(var(--text-primary))]">{currentTabDetails?.location} <span className="font-light text-xs text-[rgb(var(--text-muted))]">({currentTabDetails?.type})</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-2">
                    <button
                      onClick={() => setSelectedServiceModal(currentTabDetails)}
                      className="w-full text-center py-3.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-bold text-sm transition-all tracking-wide"
                    >
                      Acquire Full Assembly Metrics
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 3. GRID HUB: Minimal Strategic Content Modules */}
      <section className="py-24 bg-[rgb(var(--bg-primary))] transition-colors duration-300">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Finding Peace Inside Storms", label: "Latest Key Sermon", img: "https://images.pexels.com/photos/8112237/pexels-photo-8112237.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", path: "/sermons" },
              { title: "Global Community Action", label: "Upcoming Outreach", img: "https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", path: "/events" },
              { title: "Digital Altar Requests", label: "Intercessory Room", img: "https://images.pexels.com/photos/45842/clasped-hands-comfort-hands-people-45842.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", path: "/contact" },
              { title: "Systemic Wisdom Guilds", label: "Weekly Growth Hubs", img: "https://images.pexels.com/photos/6994985/pexels-photo-6994985.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", path: "/about" }
            ].map((card, i) => (
              <Link to={card.path} key={i} className="group bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl overflow-hidden block hover:shadow-xl hover:border-primary-500/40 transition-all duration-300">
                <div className="h-44 overflow-hidden relative">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />
                </div>
                <div className="p-6">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-primary-600 block mb-2">{card.label}</span>
                  <h4 className="font-bold text-base text-[rgb(var(--text-primary))] line-clamp-1 group-hover:text-primary-700 transition-colors">{card.title}</h4>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-[rgb(var(--text-muted))] group-hover:text-primary-600 transition-colors">
                    <span>Enter Hub</span>
                    <ArrowRight size={14} className="transform -translate-x-1 group-hover:translate-x-0 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONY: Clean Floating Review Stack */}
      <section className="py-24 bg-[rgb(var(--bg-secondary))] transition-colors duration-300 border-t border-[rgb(var(--border-primary))] overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary-500">Kingdom Proofs</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[rgb(var(--text-primary))] leading-tight">
                Living Shields of Witness
              </h2>
              <p className="text-[rgb(var(--text-secondary))] font-light text-sm md:text-base leading-relaxed">
                Real accounts of structural alignment, physical restorations, and spiritual shifts engineered inside the Bethel ecosystem.
              </p>
              
              {/* Pagination Controls */}
              <div className="flex items-center gap-3 pt-4">
                <button 
                  onClick={prevTestimony}
                  className="p-3 border border-[rgb(var(--border-primary))] rounded-xl text-[rgb(var(--text-primary))] hover:bg-primary-700 hover:text-white transition-all shadow-sm bg-[rgb(var(--bg-primary))]"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-mono font-bold text-[rgb(var(--text-muted))]">
                  0{testimonyIndex + 1} / 0{testimonies.length}
                </span>
                <button 
                  onClick={nextTestimony}
                  className="p-3 border border-[rgb(var(--border-primary))] rounded-xl text-[rgb(var(--text-primary))] hover:bg-primary-700 hover:text-white transition-all shadow-sm bg-[rgb(var(--bg-primary))]"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Interactive Presentation Block */}
            <div className="md:col-span-7 relative flex justify-center items-center">
              <div className="w-full max-w-xl min-h-[280px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonyIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="bg-[rgb(var(--bg-primary))] border border-[rgb(var(--border-primary))] rounded-3xl p-8 md:p-10 shadow-xl flex flex-col justify-between h-full relative"
                  >
                    <div className="absolute top-6 right-8 text-[rgb(var(--border-secondary))] pointer-events-none opacity-40">
                      <Quote size={48} className="rotate-180" />
                    </div>

                    <div>
                      <p className="text-[rgb(var(--text-primary))] text-lg italic font-light leading-relaxed mb-8 pr-6">
                        "{testimonies[testimonyIndex].text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 border-t border-[rgb(var(--border-primary))] pt-6">
                      <div className="w-10 h-10 bg-primary-700 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                        {testimonies[testimonyIndex].name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[rgb(var(--text-primary))]">{testimonies[testimonyIndex].name}</h4>
                        <p className="text-xs text-[rgb(var(--text-muted))] font-medium mt-0.5">{testimonies[testimonyIndex].role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP PROFILE SECTION */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-slate-950 text-white py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url(${bgImg})` }} />
        <div className="container mx-auto max-w-6xl px-4 z-10 relative">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* Frame Box */}
            <div className="md:col-span-5 relative">
              <div className="absolute inset-0 border border-white/10 rounded-2xl translate-x-4 translate-y-4 -z-10" />
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 aspect-[4/5]">
                <img
                  src={daddyImg}
                  alt="Rev Daniel A. Okyere"
                  className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Core Text Content */}
            <div className="md:col-span-7 space-y-6">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary-600 dark:text-[#e9edf7] ">Pastoral Oversight</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-600 dark:text-white leading-[1.15]">
                Compelled by Truth, <br />Sustained by Grace.
              </h2>
              <div className="space-y-4 text-base md:text-lg text-slate-300 font-light leading-relaxed">
                <p>"Welcome to Gospel Ambassadors Church - Bethel Center. Our mission is to create an authentic space where deep scriptural precision and corporate presence build believers into active kingdom representatives."</p>
                <p>"Whether you are searching for foundational coordinates or advanced spiritual growth, there is an altar ready to sustain your walk here."</p>
              </div>
              
              <div className="pt-6 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-secondary-500" />
                <div>
                  <h4 className="font-serif text-xl font-bold text-secondary-400 dark:text-white">Rev. Daniel A. Okyere</h4>
                  <p className="text-xs uppercase tracking-wider text-secondary-400 font-bold mt-0.5">Lead Pastor, GAC Bethel</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION MODULE */}
      <section className="py-24 bg-[rgb(var(--bg-primary))] transition-colors duration-300 text-center">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[rgb(var(--text-primary))] tracking-tight">
            Take Your Place in the Ecosystem
          </h2>
          <p className="text-[rgb(var(--text-secondary))] mb-10 font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Bethel Center isn't merely an auditorium; it is a corporate family blueprint. Connect with a localized group or seed into our mandates today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="bg-primary-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:bg-primary-800 transition-colors">
              Become a Member
            </Link>
            <Link to="/giving" className="border border-[rgb(var(--border-secondary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-colors">
              Support Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* MODAL DETAILED ASSEMBLY SYSTEM VIEW */}
      <AnimatePresence>
        {selectedServiceModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedServiceModal(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[rgb(var(--bg-primary))] border border-[rgb(var(--border-primary))] w-full max-w-lg rounded-3xl shadow-2xl p-8 md:p-10 overflow-hidden z-10"
            >
              <button 
                onClick={() => setSelectedServiceModal(null)} 
                className="absolute top-6 right-6 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <span className="text-xs font-semibold text-secondary-500 bg-secondary-500/10 px-3 py-1 rounded-md inline-block mb-4">
                {selectedServiceModal.tagline}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[rgb(var(--text-primary))] mb-2">
                {selectedServiceModal.title}
              </h3>
              <p className="text-sm font-semibold text-primary-600 mb-4">{selectedServiceModal.day}</p>
              
              <p className="text-[rgb(var(--text-secondary))] font-light leading-relaxed mb-6 text-sm">
                {selectedServiceModal.details}
              </p>

              <div className="space-y-4 border-t border-[rgb(var(--border-primary))] pt-6">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-primary-600" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[rgb(var(--text-muted))]">Time Slot</p>
                    <p className="text-sm font-medium text-[rgb(var(--text-primary))]">{selectedServiceModal.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary-600" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[rgb(var(--text-muted))]">Location & Access</p>
                    <p className="text-sm font-medium text-[rgb(var(--text-primary))]">{selectedServiceModal.location} ({selectedServiceModal.type})</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default HomePage;