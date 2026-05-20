import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowLeft, Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import api, { IMAGE_BASE_URL } from "../../../api/api";

interface EventDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  imageUrl: string;
  createdAt: string;
}

const EventDetailPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventById = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/event/${eventId}`);
        
        if (response.data && response.data.success) {
          setEvent(response.data.data);
        } else {
          throw new Error(response.data?.message || "Failed to parse single event data payload.");
        }
      } catch (err: any) {
        const errMsg = err.response?.data?.message || err.message;
        setError(errMsg || "An error occurred fetching the details.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventById();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-[#090a0f]">
        <Loader2 className="h-8 w-8 text-neutral-400 animate-spin mb-2" />
        <p className="text-xs text-neutral-400">Loading details structure entry...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-neutral-50 dark:bg-[#090a0f]">
        <h3 className="text-sm font-semibold text-red-500 mb-2">Could not locate event context record</h3>
        <p className="text-xs text-neutral-400 mb-4 max-w-sm">{error || "The event might no longer exist."}</p>
        <Link to="/events" className="text-xs font-semibold underline underline-offset-4 text-neutral-900 dark:text-white">
          Return to directory catalogue
        </Link>
      </div>
    );
  }

  let parsedDate = new Date();
  try {
    if (event.date) parsedDate = parseISO(event.date);
  } catch (e) {}

  const resolvedImgSrc = event.imageUrl
    ? `${IMAGE_BASE_URL.replace(/\/$/, "")}/${event.imageUrl.replace(/^\//, "")}`
    : "https://images.pexels.com/photos/1448709/pexels-photo-1448709.jpeg";

  return (
    <div className="min-h-screen pt-24 pb-12 bg-neutral-50 dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 antialiased">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button Action */}
        <Link to="/events" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to catalog listing</span>
        </Link>

        {/* Hero Display Element */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60">
          <img 
            src={resolvedImgSrc} 
            alt={event.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/1448709/pexels-photo-1448709.jpeg";
            }}
          />
        </div>

        {/* Informative Grid Area layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-2xl md:text-4xl font-serif font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
              {event.title}
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="bg-white dark:bg-[#0d0e16] p-6 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 h-fit space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Gathering Logistics
            </h4>
            
            <div className="space-y-3 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-400 text-[10px]">DATE</div>
                  <span>{format(parsedDate, "MMMM d, yyyy")}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-400 text-[10px]">SCHEDULE TIME</div>
                  <span>{format(parsedDate, "h:mm a")}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-400 text-[10px]">LOCATION VENUE</div>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;