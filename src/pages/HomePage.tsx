import { motion } from "framer-motion";
import { Play, Calendar, Heart, Book, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import bgImg from "../assets/bgImg.webp";
import daddyImg from "../assets/daddyImg.webp";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white">
              Welcome to GAC - Bethel Center
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              A place where faith, community, and purpose come together. Join us
              for worship and discover your spiritual home.
            </p>
            <div className="flex flex-wrap gap-4">
             <Link
  to="/about"
  className="btn btn-secondary text-white hover:text-blue-100 hover:bg-secondary/80 transition-colors duration-300"
>
  Learn More
</Link>

              <Link to="/sermons" className="btn btn-outline-white hover:text-blue-100">
                Watch Sermons
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="bg-primary-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-primary-800">
              Join Us For Worship
            </h2>
            <p className="text-lg mb-10 text-neutral-700">
              We welcome you to be a part of our community. Here's when you can
              join us.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-soft flex flex-col items-center">
                <h3 className="text-xl font-bold mb-2 text-primary-700">
                  Sunday Service
                </h3>
                <p className="text-neutral-700 mb-2">7:30am</p>
                <p className="text-neutral-600 text-sm">In-person & Online</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-soft flex flex-col items-center">
                <h3 className="text-xl font-bold mb-2 text-primary-700">
                  Tuesday Service
                </h3>
                <p className="text-neutral-700 mb-2">6:00 PM</p>
                <p className="text-neutral-600 text-sm">In-person & Online</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-soft flex flex-col items-center">
                <h3 className="text-xl font-bold mb-2 text-primary-700">
                  Bethel Encounter
                </h3>
                <p className="text-neutral-700 mb-2">Thursday 9:00 AM</p>
                <p className="text-neutral-600 text-sm">In-person Only</p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/contact"
                className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
              >
                Get Directions
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-soft overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8112237/pexels-photo-8112237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Latest Sermon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-secondary-500 mb-2">
                  <Play size={18} className="mr-2" />
                  <span className="text-sm font-medium">Latest Sermon</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-800">
                  Finding Peace in Troubled Times
                </h3>
                <p className="text-neutral-600 mb-4">
                  Pastor John Williams shares a powerful message on finding
                  God's peace in the midst of life's challenges.
                </p>
                <Link
                  to="/sermons"
                  className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                >
                  Watch Now
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-soft overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Upcoming Event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-accent-600 mb-2">
                  <Calendar size={18} className="mr-2" />
                  <span className="text-sm font-medium">Upcoming Event</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-800">
                  Annual Community Outreach
                </h3>
                <p className="text-neutral-600 mb-4">
                  Join us as we serve our local community with food, clothing,
                  and resources for those in need.
                </p>
                <Link
                  to="/events"
                  className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                >
                  Learn More
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-soft overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/45842/clasped-hands-comfort-hands-people-45842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Prayer Ministry"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-success-600 mb-2">
                  <Heart size={18} className="mr-2" />
                  <span className="text-sm font-medium">Prayer Ministry</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-800">
                  Submit a Prayer Request
                </h3>
                <p className="text-neutral-600 mb-4">
                  Our prayer team is committed to lifting your needs to God.
                  Share your requests with us confidentially.
                </p>
                <Link
                  to="/contact"
                  className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                >
                  Submit Request
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-soft overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/6994985/pexels-photo-6994985.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Bible Study"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-warning-600 mb-2">
                  <Book size={18} className="mr-2" />
                  <span className="text-sm font-medium">Bible Study</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-800">
                  Weekly Bible Studies
                </h3>
                <p className="text-neutral-600 mb-4">
                  Deepen your understanding of God's Word through our weekly
                  in-person and online Bible study groups.
                </p>
                <Link
                  to="/about"
                  className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                >
                  Find a Group
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/5">
              <img
                src={daddyImg}
                alt="Pastor John Williams"
                className="rounded-xl shadow-lg w-full md:h-80 object-cover object-top"
              />
            </div>

            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">
                A Message From Our Pastor
              </h2>
              <p className="text-lg mb-6 text-white/90">
                "Welcome to Gospel Ambassadors Church - Bethel Center. Our
                mission is to create a place where everyone can experience God's
                love, grow in their faith, and find purpose through service. We
                believe that every person matters to God and has a unique role
                to play in His kingdom."
              </p>
              <p className="text-lg mb-8 text-white/90">
                "Whether you're just beginning to explore faith or have been
                following Jesus for years, you're welcome here. We invite you to
                join us this Sunday and see for yourself how God is working in
                our community."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-1 bg-secondary-500"></div>
                <p className="font-serif text-lg">Rev Daniel A. Okyere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-primary-800">
              Be a Part of Our Community
            </h2>
            <p className="text-lg mb-8 text-neutral-700">
              At Grace Harbor, we believe that church is not just a place you
              attend, but a family you belong to. Join us on this journey of
              faith, hope, and love.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="btn btn-primary hover:text-blue-100">
                Become a Member
              </Link>
              <Link to="/giving" className="btn btn-outline hover:text-blue-900">
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
