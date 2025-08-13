import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import { Clock, Calendar, User, Download, Share, MessageSquare, ChevronLeft, Heart, ChevronRight } from 'lucide-react';

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
    longDescription: `
      In this powerful message, Pastor John Williams explores the concept of finding peace in troubled times through the lens of Philippians 4:6-7. 
      
      Drawing from personal experiences and biblical examples, this sermon addresses how we can maintain our peace and trust in God even when life seems overwhelming. Pastor Williams offers practical steps for handling anxiety, fear, and uncertainty while keeping our focus on God's promises.
      
      Whether you're going through a difficult season or want to prepare for future challenges, this message will encourage your faith and provide biblical wisdom for navigating life's storms with God's perfect peace.
    `,
    videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Sample URL
    thumbnail: 'https://images.pexels.com/photos/8112237/pexels-photo-8112237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    pdfNotes: '#', // Would link to actual PDF in real implementation
    audioDownload: '#', // Would link to actual audio file in real implementation
    relatedSermons: ['2', '6'], // IDs of related sermons
    scripture: 'Philippians 4:6-7',
    series: 'Finding Strength in God',
  },
  {
    id: '2',
    title: 'The Power of Prayer',
    speaker: 'Pastor Sarah Johnson',
    date: 'May 14, 2023',
    duration: '42 min',
    category: 'Prayer',
    description: 'Learn how to develop a powerful prayer life that transforms your relationship with God.',
    longDescription: `
      Pastor Sarah Johnson delivers a compelling message on the transformative power of prayer in the believer's life. 
      
      This sermon examines key biblical principles about prayer from Matthew 6 and James 5, demonstrating how consistent, faithful prayer can bring breakthrough in seemingly impossible situations. Pastor Johnson shares both scriptural examples and modern testimonies of answered prayers, while offering practical guidance for developing a more consistent and effective prayer life.
      
      You'll learn about different types of prayer, common obstacles to prayer, and how to align your prayers with God's will and purposes. This message is perfect for anyone looking to deepen their communication with God and experience more answered prayers.
    `,
    videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Sample URL
    thumbnail: 'https://images.pexels.com/photos/4940662/pexels-photo-4940662.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    pdfNotes: '#', // Would link to actual PDF in real implementation
    audioDownload: '#', // Would link to actual audio file in real implementation
    relatedSermons: ['1', '3'], // IDs of related sermons
    scripture: 'Matthew 6:9-13, James 5:16',
    series: 'Foundations of Faith',
  },
  // Additional sermons from previous component...
  {
    id: '3',
    title: 'Living with Purpose',
    speaker: 'Pastor John Williams',
    date: 'May 7, 2023',
    duration: '45 min',
    category: 'Purpose',
    description: 'Discover how God has created you with unique gifts and a specific purpose.',
    longDescription: `
      In this inspiring message, Pastor John Williams explores how to discover and live out your God-given purpose.
      
      Drawing from Ephesians 2:10 and Romans 12, this sermon delves into understanding how God has uniquely designed each person with specific gifts, talents, and callings. Pastor Williams shares practical steps for identifying your spiritual gifts and finding fulfillment through serving in areas aligned with your purpose.
      
      This message will help you understand how your unique story, including your challenges and triumphs, plays a role in God's larger plan. If you've ever wondered about your purpose or felt uncertain about your direction in life, this sermon offers biblical guidance for discovering how God wants to use you to make a difference in the world.
    `,
    videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Sample URL
    thumbnail: 'https://images.pexels.com/photos/6943596/pexels-photo-6943596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    pdfNotes: '#',
    audioDownload: '#',
    relatedSermons: ['2', '5'],
    scripture: 'Ephesians 2:10, Romans 12:4-8',
    series: 'Finding Strength in God',
  },
  {
    id: '6',
    title: 'Faith That Works',
    speaker: 'Pastor John Williams',
    date: 'April 16, 2023',
    duration: '39 min',
    category: 'Faith',
    description: 'Practical ways to put your faith into action in everyday life.',
    longDescription: `
      Pastor John Williams offers a compelling examination of what it means to have a faith that produces real-world results.
      
      Based primarily on the book of James, this message challenges believers to move beyond passive belief to active, demonstrable faith. Pastor Williams explores the relationship between faith and works, showing how genuine faith inevitably leads to action and transformation in the believer's life.
      
      Through biblical examples and contemporary applications, this sermon provides practical guidance for living out your faith at home, in the workplace, and in your community. You'll be inspired to examine your own faith journey and encouraged to take specific steps toward a more authentic and impactful Christian life.
    `,
    videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Sample URL
    thumbnail: 'https://images.pexels.com/photos/4734081/pexels-photo-4734081.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    pdfNotes: '#',
    audioDownload: '#',
    relatedSermons: ['1', '3'],
    scripture: 'James 2:14-26',
    series: 'Foundations of Faith',
  },
];

const SermonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [sermon, setSermon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedSermons, setRelatedSermons] = useState<any[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const findSermon = mockSermons.find(s => s.id === id);
    setSermon(findSermon || null);
    
    if (findSermon?.relatedSermons) {
      const related = mockSermons.filter(s => findSermon.relatedSermons.includes(s.id));
      setRelatedSermons(related);
    }
    
    setLoading(false);
    
    // Reset scroll position when sermon changes
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!sermon) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Sermon Not Found</h2>
        <p className="mb-6">The sermon you're looking for doesn't exist or has been removed.</p>
        <Link to="/sermons" className="btn btn-primary">
          Return to Sermons
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Video Section */}
      <section className="bg-neutral-900">
        <div className="container mx-auto px-4 py-8">
          <div className="player-wrapper aspect-video rounded-xl overflow-hidden shadow-soft-lg">
            <ReactPlayer
              url={sermon.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              light={sermon.thumbnail}
              playing={false}
            />
          </div>
        </div>
      </section>

      {/* Sermon Details */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Back Button */}
              <Link 
                to="/sermons" 
                className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to All Sermons
              </Link>
              
              {/* Title and Meta */}
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-50 text-primary-600 rounded-full">
                    {sermon.category}
                  </span>
                  {sermon.series && (
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary-50 text-secondary-600 rounded-full ml-2">
                      Series: {sermon.series}
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary-800">
                  {sermon.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
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
                  {sermon.scripture && (
                    <div className="flex items-center">
                      <MessageSquare size={16} className="mr-1" />
                      {sermon.scripture}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Description */}
              <div className="bg-white p-6 rounded-xl shadow-soft mb-8">
                <h2 className="text-xl font-semibold mb-4 text-primary-700">About This Message</h2>
                <div className="prose max-w-none text-neutral-700">
                  {sermon.longDescription.split('\n').map((paragraph: string, i: number) => (
                    <p key={i} className="mb-4">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Download and Share */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a 
                  href={sermon.pdfNotes} 
                  className="btn btn-outline inline-flex items-center"
                >
                  <Download size={18} className="mr-2" />
                  Sermon Notes (PDF)
                </a>
                <a 
                  href={sermon.audioDownload} 
                  className="btn btn-outline inline-flex items-center"
                >
                  <Download size={18} className="mr-2" />
                  Audio Download
                </a>
                <button 
                  className="btn btn-outline inline-flex items-center"
                  onClick={() => {
                    // In a real app, this would use a proper share API
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                >
                  <Share size={18} className="mr-2" />
                  Share
                </button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Related Sermons */}
              {relatedSermons.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-soft mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-primary-700">Related Messages</h2>
                  <div className="space-y-4">
                    {relatedSermons.map(related => (
                      <Link 
                        key={related.id}
                        to={`/sermons/${related.id}`}
                        className="flex gap-4 hover:bg-neutral-50 p-2 rounded-lg transition"
                      >
                        <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={related.thumbnail} 
                            alt={related.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-primary-800">{related.title}</h3>
                          <p className="text-sm text-neutral-500">{related.speaker}</p>
                          <p className="text-sm text-neutral-500">{related.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Newsletter */}
              <div className="bg-primary-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4 text-primary-700">Get Weekly Updates</h2>
                <p className="text-neutral-700 mb-4">
                  Subscribe to our newsletter and never miss a sermon or church event.
                </p>
                <form className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                  />
                  <button type="submit" className="w-full btn btn-primary">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Navigation */}
      <section className="py-8 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              to={`/sermons/${parseInt(id || '0') - 1}`}
              className={`flex items-center ${parseInt(id || '0') <= 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft size={20} className="mr-2" />
              <span>Previous Sermon</span>
            </Link>
            <Link
              to={`/sermons/${parseInt(id || '0') + 1}`}
              className={`flex items-center ${parseInt(id || '0') >= mockSermons.length ? 'invisible' : ''}`}
            >
              <span>Next Sermon</span>
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SermonDetailPage;