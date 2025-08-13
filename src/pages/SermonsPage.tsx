import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Calendar, User, ArrowRight } from 'lucide-react';

// Mock sermon data
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

// Categories for filtering
const categories = [
  'All',
  'Faith',
  'Prayer',
  'Purpose',
  'Worship',
  'Family',
];

const SermonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter sermons based on search term and selected category
  const filteredSermons = mockSermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || sermon.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              Sermon Library
            </h1>
            <p className="text-xl mb-0 text-white/90">
              Watch, listen, and download messages that will encourage your faith and deepen your understanding of God's Word.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search sermons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-neutral-500" />
              <span className="text-neutral-600">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
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

      {/* Sermons List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredSermons.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSermons.map(sermon => (
                <div key={sermon.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
                  <div className="h-48 overflow-hidden relative group">
                    <img 
                      src={sermon.thumbnail} 
                      alt={sermon.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <Link 
                        to={`/sermons/${sermon.id}`}
                        className="btn bg-primary-600 text-white hover:bg-primary-700"
                      >
                        Watch Now
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-50 text-primary-600 rounded-full mb-3">
                      {sermon.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3 text-primary-800">
                      {sermon.title}
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      {sermon.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-neutral-500 mb-4">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        {sermon.speaker}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {sermon.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {sermon.duration}
                      </div>
                    </div>
                    <Link 
                      to={`/sermons/${sermon.id}`}
                      className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                    >
                      View Details
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-neutral-700 mb-2">No sermons found</h3>
              <p className="text-neutral-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6 text-primary-800">
              Never Miss a Message
            </h2>
            <p className="text-lg mb-8 text-neutral-700">
              Subscribe to our podcast and receive the latest sermons directly to your device.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="btn btn-primary">
                Apple Podcasts
              </a>
              <a href="#" className="btn btn-outline">
                Spotify
              </a>
              <a href="#" className="btn btn-outline">
                Google Podcasts
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SermonsPage;