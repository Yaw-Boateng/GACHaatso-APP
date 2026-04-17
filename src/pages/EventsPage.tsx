import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Search, ArrowRight, Filter, X } from 'lucide-react';
import { format, parseISO, isFuture, isPast } from 'date-fns';

// Mock events data
const mockEvents = [
  {
    id: '1',
    title: 'Annual Community Outreach',
    date: '2026-07-15T09:00:00',
    endDate: '2026-07-15T15:00:00',
    location: 'Harbor City Park',
    description: 'Join us as we serve our local community with food, clothing, and resources for those in need.',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Outreach',
    detailsUrl: '/events/1',
  },
  {
    id: '2',
    title: 'Youth Summer Camp',
    date: '2026-08-01T08:00:00',
    endDate: '2026-08-05T16:00:00',
    location: 'Mountain Retreat Center',
    description: 'A week of fun, fellowship, and spiritual growth for students grades 6-12.',
    image: 'https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Youth',
    detailsUrl: '/events/2',
  },
  {
    id: '3',
    title: "Women's Conference",
    date: '2026-09-25T18:00:00',
    endDate: '2026-09-27T21:00:00',
    location: 'Grace Harbor Church',
    description: 'A weekend of worship, teaching, and connection designed to encourage and empower women in their faith journey.',
    image: 'https://images.pexels.com/photos/8108063/pexels-photo-8108063.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Conference',
    detailsUrl: '/events/3',
  },
  {
    id: '4',
    title: 'Father-Son Fishing Trip',
    date: '2026-06-10T06:00:00',
    endDate: '2026-06-10T14:00:00',
    location: 'Harbor Lake',
    description: 'A day of fishing, food, and fellowship for fathers and sons of all ages.',
    image: 'https://images.pexels.com/photos/6130723/pexels-photo-6130723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Fellowship',
    detailsUrl: '/events/4',
  },
  {
    id: '5',
    title: 'Easter Sunday Services',
    date: '2026-04-05T08:00:00',
    endDate: '2026-04-05T13:00:00',
    location: 'Grace Harbor Church',
    description: 'Join us for special Easter services celebrating the resurrection of Jesus Christ.',
    image: 'https://images.pexels.com/photos/1448709/pexels-photo-1448709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Worship',
    detailsUrl: '/events/5',
  },
  {
    id: '6',
    title: 'Financial Peace Workshop',
    date: '2026-10-12T18:30:00',
    endDate: '2026-10-12T20:30:00',
    location: 'Grace Harbor Church',
    description: 'Learn biblical principles for managing your finances and achieving financial freedom.',
    image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    category: 'Classes',
    detailsUrl: '/events/6',
  },
];

const categories = ['All', 'Worship', 'Outreach', 'Youth', 'Conference', 'Fellowship', 'Classes'];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeFilter, setTimeFilter] = useState('upcoming');

  // Filter Logic
  const filteredEvents = mockEvents.filter((event) => {
    const eventDate = parseISO(event.date);
    
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

    const matchesTime =
      timeFilter === 'all' ||
      (timeFilter === 'upcoming' && isFuture(eventDate)) ||
      (timeFilter === 'past' && isPast(eventDate));

    return matchesSearch && matchesCategory && matchesTime;
  });

  // Sort Logic
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = parseISO(a.date).getTime();
    const dateB = parseISO(b.date).getTime();
    return timeFilter === 'past' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="min-h-screen bg-neutral-50 transition-colors duration-300 dark:bg-[#0a0f1a] pt-16">
      {/* Hero Section */}
      <section className="bg-primary-700 dark:bg-primary-900 py-20 text-white transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl text-white">Events & Calendar</h1>
            <p className="text-xl text-white/90">
              Discover opportunities to connect, grow, and serve with our church family.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-16 z-10 border-b bg-white/80 backdrop-blur-md dark:bg-neutral-900/80 dark:border-neutral-800 shadow-sm transition-colors">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 py-3 pl-10 pr-4 transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30 outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Time Toggle */}
            <div className="flex rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1">
              {['upcoming', 'past', 'all'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-all ${
                    timeFilter === filter
                      ? 'bg-white dark:bg-neutral-700 text-primary-700 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {sortedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-neutral-200 dark:bg-neutral-800 p-6 text-neutral-400 dark:text-neutral-600">
                <Filter className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">No events found</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">Try adjusting your filters or search keywords.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setTimeFilter('all'); }}
                className="mt-6 font-medium text-primary-600 dark:text-primary-400 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sortedEvents.map((event) => (
                <article
                  key={event.id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 shadow-lg dark:shadow-2xl transition-all hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-primary-900/10 border border-transparent dark:border-neutral-800"
                >
                  {/* Image Container */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-white/95 dark:bg-neutral-900/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400 shadow-sm">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-3 font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100 transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-400">
                      {event.title}
                    </h3>

                    <div className="mb-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-primary-600 dark:text-primary-500" />
                        <span>{format(parseISO(event.date), 'MMMM do, yyyy')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-primary-600 dark:text-primary-500" />
                        <span>
                          {format(parseISO(event.date), 'h:mm a')} - {format(parseISO(event.endDate), 'h:mm a')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-primary-600 dark:text-primary-500" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {event.description}
                    </p>

                    <div className="mt-auto border-t border-neutral-100 dark:border-neutral-800 pt-5">
                      <a
                        href={event.detailsUrl}
                        className="inline-flex items-center font-bold text-primary-600 dark:text-primary-400 transition-colors hover:text-primary-800 dark:hover:text-primary-300"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-700 dark:bg-primary-950 py-20 text-white transition-colors">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 font-serif text-3xl font-bold text-white">Never Miss an Event</h2>
            <p className="mb-8 text-lg text-white/80">
              Sign up for our weekly bulletin to get event updates and community news delivered to your inbox.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 rounded-lg border-none px-6 py-4 text-neutral-900 dark:bg-neutral-800 dark:text-white outline-none ring-primary-100 dark:ring-primary-900/50 focus:ring-4 transition-all"
                required
              />
              <button className="rounded-lg bg-white dark:bg-primary-500 px-8 py-4 font-bold text-primary-700 dark:text-white transition hover:bg-primary-50 dark:hover:bg-primary-400 active:scale-95">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;