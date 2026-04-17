import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Heart,
  Users,
  BookOpen,
  MessagesSquare,
  PenTool,
  X,
} from "lucide-react";

const leaders = {
  pastors: [
    {
      id: "p1",
      name: "Rev. John Mensah",
      role: "Head Pastor",
      img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg",
      bio: "A visionary leader with over 20 years of ministry experience.",
      details:
        "Rev. John Mensah has dedicated his life to community transformation. Under his leadership, the church has grown into a hub for spiritual and social support. He holds a Doctorate in Divinity and is passionate about mentorship.",
    },
    {
      id: "p2",
      name: "Rev. Grace Adjei",
      role: "Associate Pastor",
      img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg",
      bio: "Compassionate leader focusing on family and youth counseling.",
      details:
        "Rev. Grace specializes in family ministry and counseling. She leads our weekly prayer sessions and oversees the community outreach programs, ensuring the church remains a harbor of grace for all.",
    },
  ],
  deacons: [
    {
      id: "d1",
      name: "Michael Ofori",
      role: "Presiding Deacon",
      img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg",
    },
    {
      id: "d2",
      name: "Mary Owusu",
      role: "Deaconess",
      img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg",
    },
    {
      id: "d3",
      name: "Kofi Arhin",
      role: "Deacon",
      img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg",
    },
    {
      id: "d4",
      name: "Sarah Baidoo",
      role: "Deaconess",
      img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg",
    },
  ],
  traineePastors: [
    {
      id: "tp1",
      name: "Samuel Boateng",
      role: "Trainee Pastor",
      img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg",
    },
    {
      id: "tp2",
      name: "Akosua Prempeh",
      role: "Trainee Pastor",
      img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg",
    },
  ],
};

const LeaderCard = ({ name, role, img, bio, onClick, layoutId }) => {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="bg-theme-surface rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col items-center p-6 text-center border border-theme-border group cursor-pointer"
    >
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-theme-border shadow-sm mb-4">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-lg font-bold text-theme-text font-serif">{name}</h3>
      <span className="mt-2 px-4 py-1 text-[10px] uppercase tracking-widest font-bold text-white bg-primary-600 rounded-full">
        {role}
      </span>
      {bio && <p className="mt-3 text-sm text-theme-muted italic">"{bio}"</p>}
    </motion.div>
  );
};

const AboutPage = () => {
  // Fix: Added the missing state hook
  const [selectedLeader, setSelectedLeader] = useState(null);

  return (
    <div className="bg-theme-bg min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white leading-tight">
              About Grace Harbor Church
            </h1>
            <p className="text-xl mb-0 text-primary-50 font-sans">
              Our story, mission, and vision for serving the community through
              faith and love.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-primary-600/10 rounded-2xl -rotate-2"></div>
              <img
                src="https://images.pexels.com/photos/33373342/pexels-photo-33373342.jpeg"
                alt="Church History"
                className="relative rounded-xl shadow-soft-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif font-bold mb-6 text-primary-600 dark:text-primary-400">
                Our Story
              </h2>
              <div className="space-y-4 text-theme-muted leading-relaxed">
                <p>
                  Grace Harbor Church began in 1985 with a small group of
                  families...
                </p>
                <p>
                  Today, Grace Harbor Church stands as a beacon of hope and
                  faith in our city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-primary-900 border-y border-gray-200 dark:border-primary-800">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      
      {/* Mission Card */}
      <div className="p-8 rounded-2xl bg-white dark:bg-primary-800/60 backdrop-blur shadow-sm hover:shadow-md transition-all duration-300">
        <h3 className="text-2xl font-serif font-bold text-primary-700 dark:text-primary-300 mb-4">
          Our Mission
        </h3>
        <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
          To create a welcoming community where people can experience God's love,
          grow in faith, and build meaningful relationships that inspire lasting
          transformation.
        </p>
      </div>

      {/* Vision Card */}
      <div className="p-8 rounded-2xl bg-white dark:bg-primary-800/60 backdrop-blur shadow-sm hover:shadow-md transition-all duration-300">
        <h3 className="text-2xl font-serif font-bold text-primary-700 dark:text-primary-300 mb-4">
          Our Vision
        </h3>
        <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
          To be a thriving, multi-generational church that impacts lives,
          strengthens families, and transforms our community through faith,
          service, and love.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* Core Values */}
      <section className="py-20 bg-theme-bg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4 text-theme-text">
              Our Core Values
            </h2>
            <p className="text-theme-muted">
              These principles guide our mission and shape our community.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: BookOpen,
                title: "Biblical Authority",
                text: "Divine scriptural authority providing a steadfast foundation for spiritual growth and community guidance within our sanctuary.",
              },
              {
                icon: Heart,
                title: "Authentic Worship",
                text: "Authentic spiritual experiences fostering a profound connection with the Divine through dedicated worship and communal prayer.",
              },
              {
                icon: Users,
                title: "Meaningful Community",
                text: "Inclusive community networks fostering authentic human connections and providing a supportive environment where every individual is truly valued.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-theme-surface group flex flex-col items-center"
              >
                {/* Icon Container: Added mx-auto to center it within the flex column */}
                <div className="bg-primary-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-primary-600 transition-all duration-300 shadow-sm group-hover:shadow-primary-500/20">
                  <value.icon
                    size={28}
                    className="text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors"
                  />
                </div>

                <h3 className="text-xl font-bold mb-3 text-theme-text font-serif">
                  {value.title}
                </h3>

                <p className="text-theme-muted text-sm leading-relaxed max-w-[280px]">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-theme-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-16 text-theme-text">
            Church Leadership
          </h2>

          {/* Pastors */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-2xl font-serif font-bold text-primary-600 dark:text-primary-400">
                The Pastors
              </h3>
              <div className="h-[1px] flex-grow bg-theme-border"></div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {leaders.pastors.map((leader) => (
                <LeaderCard
                  key={leader.id}
                  {...leader}
                  layoutId={`leader-${leader.id}`}
                  onClick={() => setSelectedLeader(leader)}
                />
              ))}
            </div>
          </div>

          {/* Deacons */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-2xl font-serif font-bold text-theme-text">
                Deacon Board
              </h3>
              <div className="h-[1px] flex-grow bg-theme-border"></div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {leaders.deacons.map((leader) => (
                <LeaderCard
                  key={leader.id}
                  {...leader}
                  layoutId={`leader-${leader.id}`}
                  onClick={() => setSelectedLeader(leader)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal Logic */}
        {/* Modal Logic */}
        <AnimatePresence>
          {selectedLeader && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLeader(null)}
                className="absolute inset-0 bg-neutral-950/40 dark:bg-black/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                layoutId={`leader-${selectedLeader.id}`}
                className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 transition-colors duration-500"
              >
                {/* Decorative Top Accent */}
                <div className="h-2 w-full bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400" />

                <button
                  onClick={() => setSelectedLeader(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all z-10"
                >
                  <X size={20} />
                </button>

                <div className="p-8 md:p-12">
                  <div className="flex flex-col items-center text-center">
                    {/* Image Container with Glow */}
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full" />
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-xl">
                        <img
                          src={selectedLeader.img}
                          alt={selectedLeader.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-2">
                      {selectedLeader.name}
                    </h3>

                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
                      {selectedLeader.role}
                    </div>

                    <div className="relative w-full">
                      {/* Quotation Mark Decoration */}
                      <div className="absolute -top-4 -left-2 text-primary-200 dark:text-primary-800/30 select-none">
                        <MessagesSquare size={48} />
                      </div>

                      <div className="relative space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 w-full">
                        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg italic font-light">
                          {selectedLeader.details ||
                            "Dedicated to serving the community and fostering spiritual growth at Grace Harbor."}
                        </p>
                      </div>
                    </div>

                    {/* Social / Contact Placeholder */}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-neutral-300 hover:text-white">
            Join Us This Sunday
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-8 py-3 bg-white text-primary-900 rounded-full font-bold hover:bg-primary-50 transition-all">
              Plan Your Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
