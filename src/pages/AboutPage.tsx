import { Calendar, Heart, Users, BookOpen, MessagesSquare, PenTool } from 'lucide-react';

const leaders = {
  pastors: [
    { name: "Rev. John Mensah", role: "Head Pastor", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Rev. Grace Adjei", role: "Associate Pastor", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
  ],
  
  deacons: [
    { name: "Michael Ofori", role: "Presiding Deacon", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Mary Owusu", role: "Deaconess", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Mary Owusu", role: "Deaconess", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Mary Owusu", role: "Deaconess", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Mary Owusu", role: "Deaconess", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Mary Owusu", role: "Deaconess", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Mary Owusu", role: "Deaconess", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Mary Owusu", role: "Deaconess", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
  ],
  traineePastors: [
    { name: "Samuel Boateng", role: "Trainee Pastor", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Samuel Boateng", role: "Trainee Pastor", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Samuel Boateng", role: "Trainee Pastor", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Samuel Boateng", role: "Trainee Pastor", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Samuel Boateng", role: "Trainee Pastor", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Samuel Boateng", role: "Trainee Pastor", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Samuel Boateng", role: "Trainee Pastor", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
    { name: "Samuel Boateng", role: "Trainee Pastor", img: "https://images.pexels.com/photos/6276729/pexels-photo-6276729.jpeg" },
  ],
};

const LeaderCard = ({ name, role, img, bio }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center p-6 text-center">
      
      {/* Profile Image */}
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm mb-4">
        <img 
          src={img} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

      {/* Role Badge */}
      <span className="mt-2 px-3 py-1 text-xs font-medium text-white bg-primary-600 rounded-full">
        {role}
      </span>

      {/* Bio */}
      {bio && (
        <p className="mt-3 text-sm text-gray-600">
          {bio}
        </p>
      )}
    </div>
  );
};


const AboutPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              About Grace Harbor Church
            </h1>
            <p className="text-xl mb-0 text-white/90">
              Our story, mission, and vision for serving the community through faith and love.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/33373342/pexels-photo-33373342.jpeg" 
                alt="Church History" 
                className="rounded-xl shadow-soft"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif font-bold mb-6 text-primary-800">
                Our Story
              </h2>
              <p className="mb-4 text-neutral-700">
                Grace Harbor Church began in 1985 with a small group of families who shared a vision for a community-focused church that would serve the needs of Harbor City. What started as living room gatherings quickly grew into a thriving church community.
              </p>
              <p className="mb-4 text-neutral-700">
                Over the decades, we have grown not only in numbers but in our impact on the community. Through various outreach programs, educational initiatives, and worship services, we've remained committed to our founding principle: to be a harbor of God's grace for all people.
              </p>
              <p className="text-neutral-700">
                Today, Grace Harbor Church stands as a beacon of hope and faith in our city, welcoming people from all walks of life to experience God's love and find purpose in serving others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6 text-primary-800">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-neutral-700">
              At Grace Harbor Church, we're guided by a clear mission and vision that shapes everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-soft">
              <h3 className="text-2xl font-serif font-bold mb-4 text-primary-700">Our Mission</h3>
              <p className="text-neutral-700 mb-4">
                To create a community where people can experience God's love, grow in their faith, and discover their purpose through serving others.
              </p>
              <p className="text-neutral-700">
                We believe that every person matters to God and has been created with gifts and abilities that can make a difference in the world.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-soft">
              <h3 className="text-2xl font-serif font-bold mb-4 text-primary-700">Our Vision</h3>
              <p className="text-neutral-700 mb-4">
                To be a thriving, multi-generational church that transforms our community through the love of Christ, equipping people to live out their faith in everyday life.
              </p>
              <p className="text-neutral-700">
                We envision a church where barriers are broken down, relationships are restored, and people find hope and healing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6 text-primary-800">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-700">
              These six principles guide our decisions, shape our culture, and reflect who we are as a church community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-xl shadow-soft text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-700">Biblical Authority</h3>
              <p className="text-neutral-700">
                We believe the Bible is God's inspired word and the foundation for all we believe and do.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-xl shadow-soft text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-700">Authentic Worship</h3>
              <p className="text-neutral-700">
                We value heartfelt, life-changing encounters with God through worship.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-xl shadow-soft text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-700">Meaningful Community</h3>
              <p className="text-neutral-700">
                We're committed to creating genuine relationships where people are known, loved, and supported.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white p-8 rounded-xl shadow-soft text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-700">Intentional Growth</h3>
              <p className="text-neutral-700">
                We believe in lifelong spiritual development and becoming more like Christ every day.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-white p-8 rounded-xl shadow-soft text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessagesSquare size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-700">Cultural Relevance</h3>
              <p className="text-neutral-700">
                We communicate timeless truths in contemporary, understandable ways.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-white p-8 rounded-xl shadow-soft text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <PenTool size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-700">Selfless Service</h3>
              <p className="text-neutral-700">
                We're called to serve others as Jesus did, with humility and compassion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
       <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-10">Church Leadership</h2>

    {/* Pastors */}
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-6 border-b-2 border-primary inline-block">
        Pastors
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {leaders.pastors.map((leader, index) => (
          <LeaderCard key={index} {...leader} />
        ))}
      </div>
    </div>

    {/* Deacon Board */}
    <div>
      <h3 className="text-2xl font-semibold mb-6 border-b-2 border-green-500 inline-block">
        Deacon Board
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {leaders.deacons.map((leader, index) => (
          <LeaderCard key={index} {...leader} />
        ))}
      </div>
    </div>

     {/* Trainee Pastors */}
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-6 border-b-2 border-yellow-500 inline-block">
        Trainee Pastors
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {leaders.traineePastors.map((leader, index) => (
          <LeaderCard key={index} {...leader} />
        ))}
      </div>
    </div>
  </div>
</section>



      {/* Join Us CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6 text-white">
            Join Us This Sunday
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            We'd love to welcome you to our church family. Come experience the warmth of community and the power of faith.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn bg-white text-primary-600 hover:bg-neutral-100">
              Get Directions
            </a>
            <a href="/sermons" className="btn btn-outline-white">
              Watch Online
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;