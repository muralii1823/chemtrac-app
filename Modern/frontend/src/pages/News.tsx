import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function News() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const featuredNews = {
    id: 1,
    title: 'CHEMTRAC Launches Next-Generation Platform with AI-Powered Analytics',
    excerpt: 'Revolutionary update brings real-time predictive modeling and intelligent insights to chemical R&D laboratories worldwide.',
    date: 'November 15, 2025',
    category: 'Product Launch',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80',
    author: 'Sarah Johnson',
    readTime: '5 min read'
  };

  const newsArticles = [
    {
      id: 2,
      title: 'Partnership with Major Pharmaceutical Companies Announced',
      excerpt: 'CHEMTRAC expands its reach by partnering with top pharmaceutical companies to enhance drug discovery processes.',
      date: 'October 28, 2025',
      category: 'Partnerships',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop&q=80',
      author: 'Michael Chen',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'New Research Reveals 40% Efficiency Gain in Laboratory Workflows',
      excerpt: 'Comprehensive study across 200+ labs shows significant improvements in experiment turnaround time and data accuracy.',
      date: 'October 12, 2025',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&q=80',
      author: 'Dr. Emily Rodriguez',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'CHEMTRAC Opens New Innovation Center in Singapore',
      excerpt: 'State-of-the-art facility will serve as the hub for Asia-Pacific operations and R&D initiatives.',
      date: 'September 20, 2025',
      category: 'Company News',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
      author: 'James Wilson',
      readTime: '3 min read'
    },
    {
      id: 5,
      title: 'Security Updates: Enhanced Data Protection Features',
      excerpt: 'Latest platform update includes advanced encryption and compliance features meeting international standards.',
      date: 'September 5, 2025',
      category: 'Security',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&q=80',
      author: 'David Kim',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'Customer Success: Lab Achieves 98% Test Accuracy Improvement',
      excerpt: 'Case study highlights how one laboratory transformed their operations using CHEMTRAC platform.',
      date: 'August 22, 2025',
      category: 'Success Stories',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80',
      author: 'Lisa Martinez',
      readTime: '7 min read'
    },
    {
      id: 7,
      title: 'Industry Recognition: Best Innovation Award 2025',
      excerpt: 'CHEMTRAC receives prestigious award for groundbreaking contributions to chemical research technology.',
      date: 'August 10, 2025',
      category: 'Awards',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&q=80',
      author: 'Rachel Thompson',
      readTime: '4 min read'
    }
  ];

  const categories = ['All', 'Product Launch', 'Partnerships', 'Research', 'Company News', 'Security', 'Success Stories', 'Awards'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center text-gray-900">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">CHEMTRAC</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">Home</Link>
              <Link to="/history" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">History</Link>
              <Link to="/news" className="text-gray-900 font-medium transition-colors text-sm bg-gray-100 px-3 py-1.5 rounded border-b-2 border-orange-500">News</Link>
              <Link to="/products" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">Products</Link>
              <Link to="/tests" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">Tests</Link>
            </nav>

            <button className="md:hidden text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Latest <span className="text-orange-500">News</span> & Updates
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Stay informed about our latest innovations, partnerships, research findings, and industry insights.
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Story</h2>
            <div className="w-20 h-1 bg-orange-500"></div>
          </div>

          <div
            className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                    {featuredNews.category}
                  </span>
                  <span className="text-sm text-gray-500">{featuredNews.date}</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredNews.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{featuredNews.author}</span>
                    <span>•</span>
                    <span>{featuredNews.readTime}</span>
                  </div>
                  <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  category === 'All'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent News</h2>
            <div className="w-20 h-1 bg-orange-500"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, index) => (
              <article
                key={article.id}
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{article.author}</span>
                    </div>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Subscribe to our newsletter to get the latest news, updates, and insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">CHEMTRAC</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Modernizing chemical R&D platforms with cutting-edge technology.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/tests" className="hover:text-orange-400 transition-colors">Test Management</Link></li>
                <li><Link to="/products" className="hover:text-orange-400 transition-colors">Products</Link></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/history" className="hover:text-orange-400 transition-colors">History</Link></li>
                <li><Link to="/news" className="hover:text-orange-400 transition-colors">News</Link></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:info@chemtrac.com" className="hover:text-orange-400 transition-colors">info@chemtrac.com</a></li>
                <li><a href="tel:+1234567890" className="hover:text-orange-400 transition-colors">+1 (234) 567-890</a></li>
                <li className="text-gray-400">Global Support 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CHEMTRAC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default News;

