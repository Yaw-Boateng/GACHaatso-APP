import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Calendar, 
  Heart, 
  Book, 
  ArrowRight, 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import bgImg from "../assets/bgImg.webp";
import daddyImg from "../assets/daddyImg.webp";

const HomePage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      title: "Sunday Service",
      time: "7:30 AM",
      type: "In-person & Online",
      location: "Main Sanctuary",
      details: "Our primary gathering focused on communal worship and the spoken Word. We invite you to experience the presence of God in a warm, welcoming atmosphere.",
    },
    {
      id: "tuesday",
      title: "Tuesday Service",
      time: "6:00 PM",
      type: "In-person & Online",
      location: "Grace Chapel",
      details: "A mid-week sanctuary for those seeking a deeper dive into Scripture. Join our inductive Bible study and corporate prayer sessions.",
    },
    {
      id: "bethel",
      title: "Bethel Encounter",
      time: "Thurs 9:00 AM",
      type: "In-person Only",
      location: "Prayer Garden",
      details: "A dedicated morning of quiet reflection and intense prayer. This is a space designed for spiritual breakthroughs and personal renewal.",
    },
  ];

  const nextTestimony = () => setCurrentIndex((prev) => (prev + 1) % testimonies.length);
  const prevTestimony = () => setCurrentIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);

  return (
    <div className="overflow-x-hidden font-sans bg-[rgb(var(--bg-primary))] transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center text-white">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white leading-tight">
              Welcome to GAC - Bethel Center
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed font-light">
              A place where faith, community, and purpose come together. Join us
              for worship and discover your spiritual home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="bg-secondary-500 text-neutral-300 hover:text-white px-8 py-3.5 rounded-full font-bold hover:bg-secondary-600 transition-all shadow-lg"
              >
                Learn More
              </Link>
              <Link
                to="/sermons"
                className="border border-white/60 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-bold hover:bg-white hover:text-primary-900 transition-all"
              >
                Watch Sermons
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="bg-[rgb(var(--bg-secondary))] pb-10 pt-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[rgb(var(--text-primary))]">
              Join Us For Worship
            </h2>
            <div className="w-12 h-0.5 bg-secondary-500 mx-auto mb-6"></div>
            <p className="text-[rgb(var(--text-secondary))] font-light">
              We welcome you to be a part of our community. Select a service to view more information.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {serviceTimes.map((service) => (
              <motion.div
                key={service.id}
                layoutId={`card-${service.id}`}
                onClick={() => setSelectedService(service)}
                className="group relative bg-[rgb(var(--bg-primary))] p-10 rounded-2xl shadow-sm border border-[rgb(var(--border-primary))] cursor-pointer hover:shadow-md transition-all text-center"
              >
                <div className="absolute top-5 right-5 text-[rgb(var(--text-muted))] group-hover:text-primary-600 transition-colors">
                  <Plus size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[rgb(var(--text-primary))]">{service.title}</h3>
                <p className="text-primary-600 font-medium mb-1">{service.time}</p>
                <p className="text-[rgb(var(--text-muted))] text-xs uppercase tracking-[0.2em]">{service.type}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                layoutId={`card-${selectedService.id}`}
                className="relative bg-[rgb(var(--bg-primary))] w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden p-10 md:p-12 border border-[rgb(var(--border-primary))]"
              >
                <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors">
                  <X size={20} />
                </button>
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-bold text-[rgb(var(--text-primary))] mb-1">{selectedService.title}</h3>
                  <p className="text-primary-600 font-bold mb-6 tracking-wide">{selectedService.time}</p>
                  <div className="space-y-1 mb-8">
                    <p className="text-xs uppercase tracking-widest text-[rgb(var(--text-muted))] font-bold">Location</p>
                    <p className="text-[rgb(var(--text-secondary))]">{selectedService.location}</p>
                  </div>
                  <div className="border-t border-[rgb(var(--border-primary))] pt-8 mb-8">
                    <p className="text-[rgb(var(--text-secondary))] leading-relaxed font-light text-sm">{selectedService.details}</p>
                  </div>
                  <Link to="/contact" className="text-primary-700 font-bold text-sm uppercase tracking-widest hover:text-primary-900 border-b border-primary-700 pb-1 inline-flex items-center transition-all">
                    View Directions
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Featured Section */}
      <section className="pb-24 pt-16 bg-[rgb(var(--bg-primary))] transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Finding Peace", label: "Latest Sermon", color: "text-secondary-500", img: "https://images.pexels.com/photos/8112237/pexels-photo-8112237.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", link: "/sermons" },
              { title: "Annual Outreach", label: "Upcoming Event", color: "text-accent-600", img: "https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", link: "/events" },
              { title: "Prayer Request", label: "Ministry", color: "text-green-600", img: "https://images.pexels.com/photos/45842/clasped-hands-comfort-hands-people-45842.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", link: "/contact" },
              { title: "Bible Studies", label: "Weekly Group", color: "text-orange-600", img: "https://images.pexels.com/photos/6994985/pexels-photo-6994985.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", link: "/about" }
            ].map((item, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="bg-[rgb(var(--bg-secondary))] rounded-xl shadow-sm border border-[rgb(var(--border-primary))] overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className={`flex items-center ${item.color} mb-2`}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-[rgb(var(--text-primary))]">{item.title}</h3>
                  <Link to={item.link} className="text-primary-600 text-sm font-bold inline-flex items-center hover:translate-x-1 transition-transform">
                    Explore <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimony Section */}
      <section className="py-24 bg-[rgb(var(--bg-secondary))] overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
            
            {/* Left Side: Animated Stacked Cards */}
            <div className="md:w-1/2 relative h-[450px] w-full flex items-center justify-center">
              <div className="relative w-full max-w-md h-full">
                <AnimatePresence mode="popLayout">
                  {testimonies.map((testimony, index) => {
                    const isCurrent = index === currentIndex;
                    const isNext = index === (currentIndex + 1) % testimonies.length;

                    if (!isCurrent && !isNext) return null;

                    return (
                      <motion.div
                        key={testimony.id}
                        initial={{ opacity: 0, scale: 0.8, x: 100 }}
                        animate={{
                          opacity: isCurrent ? 1 : 0.3,
                          scale: isCurrent ? 1 : 0.9,
                          x: isCurrent ? 0 : 40,
                          y: isCurrent ? 0 : -30,
                          zIndex: isCurrent ? 20 : 10,
                          filter: isCurrent ? "blur(0px)" : "blur(6px)",
                        }}
                        exit={{ 
                          opacity: 0, 
                          x: -200, 
                          rotate: -10,
                          scale: 0.9, 
                          transition: { duration: 0.5, ease: "anticipate" } 
                        }}
                        transition={{ type: "spring", stiffness: 260, damping: 25 }}
                        className="absolute inset-0 bg-[rgb(var(--bg-primary))]/60 backdrop-blur-xl border border-[rgb(var(--border-primary))] p-8 md:p-12 rounded-[2rem] shadow-2xl flex flex-col justify-center"
                      >
                        <Heart className="text-secondary-500 fill-secondary-500/20 mb-6" size={40} />
                        <p className="text-[rgb(var(--text-primary))] text-xl md:text-2xl italic font-light leading-relaxed mb-10">
                          "{testimony.text}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {testimony.name[0]}
                          </div>
                          <div>
                            <h4 className="font-bold text-[rgb(var(--text-primary))]">{testimony.name}</h4>
                            <p className="text-sm text-[rgb(var(--text-muted))]">{testimony.role}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute -bottom-4 md:bottom-4 right-0 md:-right-8 flex gap-4 z-30">
                <AnimatePresence>
                  {currentIndex > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      onClick={prevTestimony}
                      className="p-4 rounded-2xl border border-[rgb(var(--border-primary))] bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] hover:bg-secondary-500 hover:text-white transition-all shadow-lg"
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                  )}
                </AnimatePresence>

                <button
                  onClick={nextTestimony}
                  className="group p-4 pr-6 rounded-2xl bg-primary-700 text-white hover:bg-primary-800 transition-all shadow-xl flex items-center gap-3"
                >
                  <div className="bg-white/20 p-1 rounded-lg">
                    <ChevronRight size={24} />
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase">Next Story</span>
                </button>
              </div>
            </div>

            {/* Right Side: Header Content */}
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20">
                  <span className="text-secondary-600 font-bold uppercase tracking-[0.2em] text-xs">Voice of GAC Bethel</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-[rgb(var(--text-primary))] leading-[1.1]">
                  Here's what some <br /> of our <span className="text-primary-700">members</span> say
                </h2>
                
                <div className="pt-4">
                   
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pastor Section */}
      <section className="bg-primary-700 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-white">
          <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="md:w-2/5 relative">
              <div className="absolute -inset-4 border border-white/10 rounded-2xl transform -rotate-2"></div>
              <img
                src={daddyImg}
                alt="Rev Daniel A. Okyere"
                className="rounded-2xl shadow-2xl w-full relative z-10 md:h-[500px] object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out cursor-pointer"
              />
            </div>
            <div className="md:w-3/5">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight text-white">
                A Message From Our Pastor
              </h2>
              <div className="space-y-6 text-xl text-neutral-300 hover:text-white font-light leading-relaxed">
                <p>"Welcome to Gospel Ambassadors Church - Bethel Center. Our mission is to create a place where everyone can experience God's love..."</p>
                <p>"Whether you're beginning your journey or have been following for years, you're welcome here."</p>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <div className="w-16 h-0.5 bg-secondary-500"></div>
                <div>
                  <p className="font-serif text-2xl font-bold text-neutral-300 hover:text-white">Rev Daniel A. Okyere</p>
                  <p className="text-secondary-400 text-sm font-bold uppercase tracking-[0.2em] mt-1">Lead Pastor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 bg-[rgb(var(--bg-primary))] border-t border-[rgb(var(--border-primary))] transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-[rgb(var(--text-primary))]">
              Be a Part of Our Community
            </h2>
            <p className="text-[rgb(var(--text-secondary))] mb-10 font-light leading-relaxed">
              At Bethel Center, church is a family you belong to. Join us on this journey of faith, hope, and love.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="bg-primary-700 text-white px-10 py-3.5 rounded-full font-bold hover:shadow-lg transition-all">
                Become a Member
              </Link>
              <Link to="/giving" className="border border-[rgb(var(--border-secondary))] text-[rgb(var(--text-secondary))] px-10 py-3.5 rounded-full font-bold hover:bg-[rgb(var(--bg-tertiary))] transition-all">
                Support Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;