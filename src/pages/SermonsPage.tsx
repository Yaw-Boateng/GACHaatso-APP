import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Calendar, User, ArrowRight, PlayCircle } from 'lucide-react';

const mockSermons = [
  {
    id: '1',
    title: 'Finding Peace in Troubled Times',
    speaker: 'Pastor John Williams',
    date: 'May 21, 2023',
    duration: '38 min',
    category: 'Faith',
    description: 'A powerful message on finding God\'s peace in the midst of life\'s challenges.',
    thumbnail: 'https://images.pexels.com/photos/8112237/pexels-photo-8112237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: '2',
    title: 'The Power of Prayer',
    speaker: 'Pastor Sarah Johnson',
    date: 'May 14, 2023',
    duration: '42 min',
    category: 'Prayer',
    description: 'Learn how to develop a powerful prayer life that transforms your relationship with God.',
    thumbnail: 'https://images.pexels.com/photos/4940662/pexels-photo-4940662.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: '3',
    title: 'Living with Purpose',
    speaker: 'Pastor John Williams',
    date: 'May 7, 2023',
    duration: '45 min',
    category: 'Purpose',
    description: 'Discover how God has created you with unique gifts and a specific purpose.',
    thumbnail: 'https://images.pexels.com/photos/6943596/pexels-photo-6943596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: '4',
    title: 'The Heart of Worship',
    speaker: 'Pastor Sarah Johnson',
    date: 'April 30, 2023',
    duration: '36 min',
    category: 'Worship',
    description: 'Explore what it means to worship God with your whole heart, mind, and strength.',
    thumbnail: 'https://images.pexels.com/photos/5345858/pexels-photo-5345858.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: '5',
    title: 'Building Strong Families',
    speaker: 'Pastor Michael Chen',
    date: 'April 23, 2023',
    duration: '41 min',
    category: 'Family',
    description: 'Biblical principles for creating healthy, loving family relationships.',
    thumbnail: 'https://images.pexels.com/photos/7948032/pexels-photo-7948032.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: '6',
    title: 'Faith That Works',
    speaker: 'Pastor John Williams',
    date: 'April 16, 2023',
    duration: '39 min',
    category: 'Faith',
    description: 'Practical ways to put your faith into action in everyday life.',
    thumbnail: 'https://images.pexels.com/photos/4734081/pexels-photo-4734081.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
];

const categories = ['All', 'Faith', 'Prayer', 'Purpose', 'Worship', 'Family'];

const SermonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredSermons = mockSermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sermon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-theme-bg min-h-screen pt-16 transition-colors duration-300">
      {/* Hero Header */}
      <section className="relative py-20 bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight text-neutral-300 hover:text-white">
              Sermon Library
            </h1>
            <p className="text-lg md:text-xl text-primary-100 font-sans leading-relaxed">
              Equipping you for your spiritual journey through inspired teaching and the timeless wisdom of God's Word.
            </p>
          </div>
        </div>
      </section>

      {/* Control Bar (Search & Filter) */}
      <section className="sticky top-20 z-40 bg-theme-bg/80 backdrop-blur-md border-b border-theme-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md group">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted group-focus-within:text-primary-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by title, speaker, or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-theme-surface border border-theme-border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-theme-text transition-all"
              />
            </div>
            
            {/* Category Pills */}
            <div className="flex items-center w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-primary-600 mr-2 shrink-0" />
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                        : 'bg-theme-surface text-theme-muted hover:text-primary-600 border border-theme-border'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredSermons.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredSermons.map(sermon => (
                <div key={sermon.id} className="group bg-theme-surface rounded-2xl border border-theme-border overflow-hidden hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-500 flex flex-col h-full">
                  {/* Thumbnail Overlay */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={sermon.thumbnail} 
                      alt={sermon.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <Link to={`/sermons/${sermon.id}`} className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <PlayCircle size={64} className="text-white fill-white/20" />
                       </Link>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] px-2 py-1 rounded font-bold backdrop-blur-sm">
                      {sermon.duration}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-primary-600 dark:text-primary-400">
                        {sermon.category}
                      </span>
                      <div className="flex items-center text-theme-muted text-xs">
                        <Calendar size={14} className="mr-1" />
                        {sermon.date}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-theme-text font-serif leading-tight group-hover:text-primary-600 transition-colors">
                      {sermon.title}
                    </h3>
                    
                    <p className="text-theme-muted text-sm mb-6 line-clamp-2 flex-grow">
                      {sermon.description}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-theme-border">
                      <div className="flex items-center text-theme-text font-medium text-sm">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-2">
                          <User size={16} className="text-primary-600" />
                        </div>
                        {sermon.speaker}
                      </div>
                      <Link 
                        to={`/sermons/${sermon.id}`}
                        className="p-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-all"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-theme-surface rounded-3xl border border-dashed border-theme-border">
              <div className="bg-primary-50 dark:bg-primary-900/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-primary-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-theme-text mb-2">No sermons found</h3>
              <p className="text-theme-muted">Try using different keywords or checking another category.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                className="mt-6 text-primary-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Podcast Integration - Darker/More Premium Feel */}
      <section className="py-20 bg-theme-surface border-t border-theme-border">
        <div className="container mx-auto px-4">
          <div className="bg-primary-900 rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Design Element */}
            <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
               <PlayCircle size={160} className="text-white" />
            </div>

            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white leading-tight">
                Listen on the go
              </h2>
              <p className="text-lg mb-10 text-primary-100">
                Can't make it to church or want to re-listen to your favorite message? Subscribe to our podcast on any platform.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="flex items-center gap-3 px-6 py-3 bg-white text-primary-900 rounded-xl font-bold hover:scale-105 transition-transform">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Podcasts_%28iOS%29.svg" className="w-6 h-6" alt="Apple" />
                  Apple Podcasts
                </button>
                <button className="flex items-center gap-3 px-6 py-3 bg-[#1DB954] text-white rounded-xl font-bold hover:scale-105 transition-transform">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" className="w-6 h-6 brightness-0 invert" alt="Spotify" />
                  Spotify
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SermonsPage;