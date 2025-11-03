import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Observe all sections
    const refs = [heroRef, categoriesRef, dealsRef, contentRef, statsRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    setTimeout(() => {
      document.querySelector('.home-page')?.classList.add('is-loaded');
    }, 100);

    return () => observer.disconnect();
  }, []);

  const heroStats = [
    { value: '12,488', label: 'Experiments Run' },
    { value: '98%', label: 'Success Rate' },
    { value: '247', label: 'Labs Onboarded' },
  ];

  const categories = [
    { id: 1, name: 'Reactors', icon: '⚗️', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&q=80' },
    { id: 2, name: 'Analytics', icon: '📊', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop&q=80' },
    { id: 3, name: 'Equipment', icon: '🔬', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200&h=200&fit=crop&q=80' },
    { id: 4, name: 'Safety', icon: '🛡️', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop&q=80' },
    { id: 5, name: 'Inventory', icon: '📦', image: 'https://images.unsplash.com/photo-1582719201952-c9864fa7a355?w=200&h=200&fit=crop&q=80' },
    { id: 6, name: 'Quality', icon: '✓', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=80' },
    { id: 7, name: 'Integration', icon: '🔌', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=200&h=200&fit=crop&q=80' },
    { id: 8, name: 'Automation', icon: '🤖', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop&q=80' },
  ];

  const bottomStats = [
    {
      heading: 'Years of experience',
      value: '15+',
      description: 'Expertise in chemical R&D platform modernization',
    },
    {
      heading: 'Total number of labs',
      value: '1,288',
      description: 'Professionals driving innovation forward',
    },
    {
      heading: 'Current projects',
      value: '589+',
      description: 'Successfully completed projects worldwide',
    },
  ];

  return (
    <div className="home-page">
      {/* Fixed Header with Search */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <button className="md:hidden text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link to="/" className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-gray-900">
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                    <path d="M2 17L12 22L22 17" />
                    <path d="M2 12L12 17L22 12" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 leading-tight">CHEMTRAC</span>
                  <span className="text-xs text-gray-500 leading-tight">Part of Thermo Scientific</span>
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products, equipment..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-900 font-medium transition-colors text-sm bg-gray-100 px-3 py-1.5 rounded border-b-2 border-orange-500">Home</Link>
              <Link to="/history" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">History</Link>
              <Link to="/news" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">News</Link>
              <Link to="/products" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">Products</Link>
              <Link to="/tests" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">Tests</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-28 pb-16 bg-gradient-to-br from-blue-50 to-white scroll-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Headline and Description */}
            <div className="fade-in-up">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Get Modern R&D Solutions.
              </h1>
              <p className="text-base text-gray-600 leading-relaxed mb-6 max-w-xl">
                When you upgrade your chemical R&D platform with our React and FastAPI solutions. Transform your lab operations today.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Save Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Right: Stats */}
            <div className="fade-in-up delay-200">
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                {heroStats.map((stat, index) => (
                  <div key={index} className="text-left">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Product Categories - Horizontal Scroll */}
      <section ref={categoriesRef} className="py-12 bg-white scroll-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Popular Product Categories</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to="/products"
                className="flex-shrink-0 snap-center fade-in-up"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-32 h-32 bg-white rounded-full border-2 border-gray-200 hover:border-orange-500 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col items-center justify-center cursor-pointer group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <img src={category.image} alt={category.name} className="w-16 h-16 rounded-full object-cover" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-orange-500 transition-colors text-center px-2">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
            {/* Browse All Button */}
            <div className="flex-shrink-0 snap-center">
              <Link
                to="/products"
                className="w-32 h-32 bg-blue-600 hover:bg-blue-700 rounded-full flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <span className="text-sm font-bold mb-1">Browse All</span>
                <span className="text-xs opacity-90">Categories</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section ref={dealsRef} className="py-12 bg-gray-50 scroll-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Grab These Deals Before They're Gone</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 fade-in-up">
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&q=80" alt="Equipment" className="w-full h-full object-cover opacity-60" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Get Up to 55% Off</h3>
                  <p className="text-sm">Equipment & Instruments</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 fade-in-up delay-100">
              <div className="p-8 text-white">
                <h3 className="text-xl font-bold mb-2">Supporting Your Science</h3>
                <p className="text-3xl font-black mb-4">Up to 75% Off</p>
                <p className="text-sm opacity-90">Limited Time Offers</p>
              </div>
            </div>
            <div className="bg-blue-600 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 fade-in-up delay-200">
              <div className="p-8 text-white">
                <h3 className="text-xl font-bold mb-2">Online Exclusive</h3>
                <p className="text-2xl font-bold mb-4">Limited-Time Offers</p>
                <p className="text-sm opacity-90">Explore Now</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef} className="py-24 bg-white scroll-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-up">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                We are{' '}
                <span className="text-orange-500">redefining the boundaries</span>{' '}
                of chemical R&D
              </h2>
            </div>
            <div className="space-y-4 fade-in-up delay-200">
              <p className="text-base text-gray-600 leading-relaxed">
                Our advanced platforms, including state-of-the-art React and FastAPI solutions, are designed not just for efficiency but also for minimal disruption to existing scientific workflows.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Our Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Stats Section */}
      <section ref={statsRef} className="py-24 bg-gray-50 border-t border-gray-200 scroll-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12">
            {bottomStats.map((stat, index) => (
              <div
                key={index}
                className="fade-in-up"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">
                  {stat.heading}
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </div>
              </div>
            ))}
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
                <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
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

export default Home;
