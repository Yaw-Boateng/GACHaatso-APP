import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const EventsPage = () => {
  const events = [
    {
      id: 1,
      title: "Youth Impact Summit 2026",
      date: "April 15 - 17",
      time: "9:00 AM",
      location: "Main Auditorium",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
      category: "Youth",
      isRegistered: false
    },
    {
      id: 2,
      title: "Easter Sunday Celebration",
      date: "April 5, 2026",
      time: "8:00 AM",
      location: "GAC Church Grounds",
      image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800",
      category: "Service",
      isRegistered: true
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-theme-text">Church Events</h2>
          <p className="text-theme-muted">Stay updated with our upcoming programs and activities.</p>
        </div>
        <div className="hidden md:flex gap-2 bg-theme-surface p-1 rounded-xl border border-theme-border">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-bold text-sm">Upcoming</button>
          <button className="px-4 py-2 text-theme-muted hover:text-theme-text rounded-lg font-bold text-sm transition-colors">Past</button>
        </div>
      </div>

      {/* Featured Event / Banner */}
      <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden group">
        <img 
          src={events[0].image} 
          alt="Featured Event" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
          <span className="bg-primary-600 text-white text-xs font-black px-3 py-1 rounded-full w-fit mb-4 tracking-widest uppercase">
            Featured Event
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{events[0].title}</h3>
          <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-medium">
            <div className="flex items-center gap-2"><Calendar size={18} /> {events[0].date}</div>
            <div className="flex items-center gap-2"><MapPin size={18} /> {events[0].location}</div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-theme-surface border border-theme-border rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 hover:border-primary-600/50 transition-all group">
            <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden shrink-0">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex flex-col justify-between flex-1 py-1">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">{event.category}</span>
                  {event.isRegistered && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase">
                      <CheckCircle size={12} /> Registered
                    </span>
                  )}
                </div>
                <h4 className="text-xl font-bold text-theme-text mb-4 group-hover:text-primary-600 transition-colors">
                  {event.title}
                </h4>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-theme-muted text-sm font-medium">
                    <Clock size={16} /> {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-theme-muted text-sm font-medium">
                    <MapPin size={16} /> {event.location}
                  </div>
                </div>
              </div>

              <button className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                event.isRegistered 
                ? 'bg-theme-base text-theme-muted cursor-default' 
                : 'bg-primary-600 text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700'
              }`}>
                {event.isRegistered ? 'Viewing Details' : 'Register Now'} 
                {!event.isRegistered && <ArrowRight size={18} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;