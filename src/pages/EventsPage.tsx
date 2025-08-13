import { useState } from 'react';
import { Calendar, Clock, MapPin, Search, Filter, ArrowRight } from 'lucide-react';
import { format, parseISO, isFuture, isPast } from 'date-fns';

// Mock events data
const mockEvents = [
  {
    id: '1',
    title: 'Annual Community Outreach',
    date: '2025-07-15T09:00:00',
    endDate: '2025-07-15T15:00:00',
    location: 'Harbor City Park',
    description: 'Join us as we serve our local community with food, clothing, and resources for those in need.',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Outreach',
    detailsUrl: '/events/1',
  },
  {
    id: '2',
    title: 'Youth Summer Camp',
    date: '2025-08-01T08:00:00',
    endDate: '2025-08-05T16:00:00',
    location: 'Mountain Retreat Center',
    description: 'A week of fun, fellowship, and spiritual growth for students grades 6-12.',
    image: 'https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Youth',
    detailsUrl: '/events/2',
  },
  {
    id: '3',
    title: 'Women\'s Conference',
    date: '2025-09-25T18:00:00',
    endDate: '2025-09-27T21:00:00',
    location: 'Grace Harbor Church',
    description: 'A weekend of worship, teaching, and connection designed to encourage and empower women in their faith journey.',
    image: 'https://images.pexels.com/photos/8108063/pexels-photo-8108063.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Conference',
    detailsUrl: '/events/3',
  },
  {
    id: '4',
    title: 'Father-Son Fishing Trip',
    date: '2025-06-10T06:00:00',
    endDate: '2025-06-10T14:00:00',
    location: 'Harbor Lake',
    description: 'A day of fishing, food, and fellowship for fathers and sons of all ages.',
    image: 'https://images.pexels.com/photos/6130723/pexels-photo-6130723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Fellowship',
    detailsUrl: '/events/4',
  },
  {
    id: '5',
    title: 'Easter Sunday Services',
    date: '2025-04-05T08:00:00',
    endDate: '2025-04-05T13:00:00',
    location: 'Grace Harbor Church',
    description: 'Join us for special Easter services celebrating the resurrection of Jesus Christ. Services at 8:00 AM, 10:00 AM, and 12:00 PM.',
    image: 'https://images.pexels.com/photos/1448709/pexels-photo-1448709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Worship',
    detailsUrl: '/events/5',
  },
  {
    id: '6',
    title: 'Financial Peace Workshop',
    date: '2025-10-12T18:30:00',
    endDate: '2025-10-12T20:30:00',
    location: 'Grace Harbor Church',
    description: 'Learn biblical principles for managing your finances and achieving financial freedom.',
    image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Classes',
    detailsUrl: '/events/6',
  },
  {
    id: '7',
    title: 'Christmas Eve Candlelight Service',
    date: '2024-12-24T19:00:00',
    endDate: '2024-12-24T20:30:00',
    location: 'Grace Harbor Church',
    description: 'A beautiful service of carols, scripture readings, and candlelight celebrating the birth of Christ.',
    image: 'https://images.pexels.com/photos/3149896/pexels-photo-3149896.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Worship',
    detailsUrl: '/events/7',
  },
];

// Categories for filtering
const categories = [
  'All',
  'Worship',
  'Outreach',
  'Youth',
  'Conference',
  'Fellowship',
  'Classes',
];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeFilter, setTimeFilter] = useState('upcoming'); // 'upcoming', 'past', 'all'
  
  // Filter events based on search term, selected category, and time filter
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    
    const eventDate = parseISO(event.date);
    const matchesTime = 
      timeFilter === 'all' ||
      (timeFilter === 'upcoming' && isFuture(eventDate)) ||
      (timeFilter === 'past' && isPast(eventDate));
    
    return matchesSearch && matchesCategory && matchesTime;
  });

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return timeFilter === 'past' 
      ? parseISO(b.date).getTime() - parseISO(a.date).getTime() // newest first for past events
      : parseISO(a.date).getTime() - parseISO(b.date).getTime(); // oldest first for upcoming
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              Events & Calendar
            </h1>
            <p className="text-xl mb-0 text-white/90">
              Join us for upcoming events, services, and activities for the whole family.
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
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Time Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-neutral-600">Show:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTimeFilter('upcoming')}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      timeFilter === 'upcoming'
                        ? 'bg-accent-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setTimeFilter('past')}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      timeFilter === 'past'
                        ? 'bg-accent-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    Past
                  </button>
                  <button
                    onClick={() => setTimeFilter('all')}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      timeFilter === 'all'
                        ? 'bg-accent-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    All
                  </button>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-neutral-500" />
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
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
  <div className="container mx-auto px-4">
    {sortedEvents.length > 0 ? (
      <div className="grid gap-8 md:gap-10 lg:grid-cols-2">
        {sortedEvents.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row"
          >
            {/* Image */}
            <div className="md:w-1/3 h-56 md:h-auto">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="md:w-2/3 p-6 flex flex-col">
              {/* Category */}
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary-50 text-primary-600 rounded-full mb-3">
                {event.category}
              </span>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base line-clamp-3 mb-4">
                {event.description}
              </p>

              {/* Meta Info */}
              <div className="mt-auto space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-primary-600" />
                  <span>
                    {format(parseISO(event.date), 'MMMM d, yyyy')}
                    {event.endDate &&
                      parseISO(event.date).toDateString() !== parseISO(event.endDate).toDateString() &&
                      ` - ${format(parseISO(event.endDate), 'MMMM d, yyyy')}`}
                  </span>
                </div>

                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-primary-600" />
                  <span>
                    {format(parseISO(event.date), 'h:mm a')}
                    {event.endDate && ` - ${format(parseISO(event.endDate), 'h:mm a')}`}
                  </span>
                </div>

                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-primary-600" />
                  {event.location}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <a
                  href={event.detailsUrl}
                  className="inline-flex items-center px-5 py-2.5 bg-primary-600 text-white font-medium rounded-lg shadow hover:bg-primary-700 hover:shadow-md transition-all duration-300"
                >
                  {isFuture(parseISO(event.date)) ? "Register" : "View Details"}
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    )}
  </div>
</section>


      {/* Subscribe Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6 text-primary-800">
              Stay Updated on Church Events
            </h2>
            <p className="text-lg mb-8 text-neutral-700">
              Sign up for our weekly newsletter to get event notifications, service times, and important church announcements.
            </p>
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                />
                <button type="submit" className="btn btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;