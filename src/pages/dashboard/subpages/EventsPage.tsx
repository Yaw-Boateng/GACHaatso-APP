import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  ArrowRight,
  Filter,
  Mail,
  Loader2,
} from "lucide-react";
import { format, parseISO, isFuture, isPast } from "date-fns";
import api from "../../../api/api";
import { ProtectedImage } from "../../../api/ProtectedImage";

const categories = [
  "All",
  "Worship",
  "Outreach",
  "Youth",
  "Conference",
  "Fellowship",
  "Classes",
];

interface EventItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  imageUrl: string;
  category?: string;
}

const EventsPage = () => {
  // Local Filtering and Layout State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Changed default state to "all" so everything shows instantly on load
  const [timeFilter, setTimeFilter] = useState("all");

  // API Integration States
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination Meta Tracking
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/event`, {
          params: {
            page: currentPage,
            size: pageSize,
          },
        });

        const result = response.data;

        if (result && typeof result === "object") {
          // Explicit mapping matching your payload structure: result.data.content & result.data.totalPages
          if (result.success && result.data && result.data.content) {
            setEvents(result.data.content);
            setTotalPages(result.data.totalPages || 0);
          } else if ("data" in result && result.data?.content) {
            setEvents(result.data.content);
            setTotalPages(result.data.totalPages || 0);
          } else if ("content" in result && Array.isArray(result.content)) {
            setEvents(result.content);
            setTotalPages(result.totalPages || 0);
          } else if (Array.isArray(result)) {
            setEvents(result);
            setTotalPages(1);
          } else {
            throw new Error(
              "Unexpected payload structure received from backend."
            );
          }
        } else {
          throw new Error("Failed to parse response payload.");
        }
      } catch (err: any) {
        const serverErrorMessage = err.response?.data?.message || err.message;
        setError(
          serverErrorMessage || "An unexpected networking issue occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

  // Integrated Filtering Logic Engine over Live REST arrays
  const filteredEvents = events.filter((event) => {
    const eventDateText = event.date || new Date().toISOString();
    let eventDate: Date;
    try {
      // Replaces whitespace separator with 'T' for clean browser standard date compatibility
      eventDate = parseISO(eventDateText.replace(" ", "T")); 
    } catch (e) {
      eventDate = new Date();
    }

    const matchesSearch =
      (event.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (event.location || "").toLowerCase().includes(searchTerm.toLowerCase());

    const eventCategory = event.category || "All";
    const matchesCategory =
      selectedCategory === "All" || eventCategory === selectedCategory;

    const matchesTime =
      timeFilter === "all" ||
      (timeFilter === "upcoming" && isFuture(eventDate)) ||
      (timeFilter === "past" && isPast(eventDate));

    return matchesSearch && matchesCategory && matchesTime;
  });

  // Sorting Logic Frame
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = parseISO(a.date || "").getTime();
    const dateB = parseISO(b.date || "").getTime();
    // Keeps historical list intuitive by ordering closest items up front
    return timeFilter === "past" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="min-h-screen pt-16 bg-neutral-50 dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 antialiased transition-colors duration-300">
      {/* Background Styled Hero Unit Header */}
      <section className="relative py-20 bg-primary-900 dark:bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-800/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight text-neutral-300 hover:text-white">
              Events &amp; Gatherings
            </h1>
            <p className="text-lg md:text-xl text-white dark:text-neutral-400 font-sans leading-relaxed">
              Discover opportunities to connect, learn, and collaborate with our
              local community members.
            </p>
          </div>
        </div>
      </section>

      {/* Persistent Navigation Controls Bar */}
      <section className="sticky top-0 z-10 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-[#0d0e16]/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Minimal Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Find an event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 py-2.5 pl-9 pr-4 transition-all focus:border-neutral-400 dark:focus:border-neutral-600 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none"
              />
            </div>

            {/* Time Frame Segments */}
            <div className="flex rounded-lg bg-neutral-100 dark:bg-neutral-900 p-1 self-start md:self-auto">
              {["all", "upcoming", "past"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`rounded-md px-3.5 py-1 text-xs font-medium capitalize transition-all cursor-pointer ${
                    timeFilter === filter
                      ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs"
                      : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Horizontal Scrolling List */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1 text-xs font-medium whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white"
                    : "bg-transparent border-neutral-200 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Primary State Switchboard Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="h-8 w-8 text-neutral-400 animate-spin" />
            <p className="text-xs text-neutral-400">
              Loading catalog matrix content stream...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-[#0d0e16] p-6">
            <h3 className="text-sm font-semibold text-red-500 mb-1">
              Failed to connect to event directory
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mb-4">{error}</p>
            <button
              onClick={() => setCurrentPage(currentPage)}
              className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-all cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-[#0d0e16] p-6">
            <div className="mb-4 rounded-full bg-neutral-100 dark:bg-neutral-900 p-4 text-neutral-400">
              <Filter className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              No events fit your criteria
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              Try changing your active search parameters or shifting category tabs.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setTimeFilter("all");
              }}
              className="mt-4 text-xs font-semibold text-neutral-900 dark:text-white underline underline-offset-4 hover:opacity-80 cursor-pointer"
            >
              Reset active filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedEvents.map((event) => {
                let parsedDate = new Date();
                try {
                  if (event.date) parsedDate = parseISO(event.date.replace(" ", "T"));
                } catch (e) {}

                // Cleans out leading/trailing whitespaces safely
                const cleanedImgString = event.imageUrl ? event.imageUrl.trim() : "";
                const targetSrc = cleanedImgString || "/photos/1448709/pexels-photo-1448709.jpeg";

                return (
                  <article
                    key={event.id}
                    className="group flex flex-col bg-white dark:bg-[#0d0e16] rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    {/* Image Shell */}
                    <div className="relative h-44 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <ProtectedImage
                        src={targetSrc}
                        alt={event.title || "Event image"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-neutral-950/90 text-neutral-900 dark:text-neutral-100 px-2 py-0.5 rounded-md backdrop-blur-xs shadow-xs">
                          {event.category || "Gathering"}
                        </span>
                      </div>
                    </div>

                    {/* Content Section Area */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                        {event.title}
                      </h3>

                      {/* Micro Metric Metadata stack */}
                      <div className="space-y-1.5 text-[11px] font-medium text-neutral-400 dark:text-neutral-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                          <span>{format(parsedDate, "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-neutral-400" />
                          <span>{format(parsedDate, "h:mm a")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {/* Summary text */}
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-5">
                        {event.description}
                      </p>

                      {/* Dynamic Framework Navigation Link */}
                      <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
                        <Link
                          to={`/events/${event.id}`}
                          className="inline-flex items-center text-xs font-semibold text-neutral-900 dark:text-white group/link"
                        >
                          <span>Learn More</span>
                          <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Controls Footer Container */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-12 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentPage === 0}
                  className="px-3 py-1.5 text-xs rounded-md border border-neutral-200 dark:border-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs text-neutral-400 font-medium">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                  }
                  disabled={currentPage === totalPages - 1}
                  className="px-3 py-1.5 text-xs rounded-md border border-neutral-200 dark:border-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Newsletter Subscription Area */}
      <section className="bg-neutral-100 dark:bg-[#0d0e16] border-t border-neutral-200/60 dark:border-neutral-800/60 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="max-w-md mx-auto">
            <Mail className="mx-auto h-5 w-5 text-neutral-400 mb-3" />
            <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white mb-1">
              Stay Informed
            </h2>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-6">
              Get clean digests containing coming scheduled events sent direct
              to your mailbox weekly.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-2.5 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none transition-colors"
                required
              />
              <button className="rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 px-4 py-2.5 text-xs font-semibold text-white dark:text-neutral-900 transition-all cursor-pointer active:scale-98">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;