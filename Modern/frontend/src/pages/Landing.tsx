import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const sections = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({
    hero: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    main: useRef<HTMLDivElement>(null),
    bottom: useRef<HTMLDivElement>(null),
  });

  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({
    hero: false,
    gallery: false,
    main: false,
    bottom: false,
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section');
          if (sectionName) {
            setVisibleSections((prev) => ({ ...prev, [sectionName]: true }));
          }
        }
      });
    }, observerOptions);

    Object.entries(sections.current).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.setAttribute('data-section', key);
        observer.observe(ref.current);
      }
    });

    setTimeout(() => {
      setVisibleSections((prev) => ({ ...prev, hero: true }));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const heroStats = [
    { value: '12,488', label: 'Experiments Run' },
    { value: '98%', label: 'Success Rate' },
    { value: '247', label: 'Labs Onboarded' },
  ];

  const products = [
    {
      id: 1,
      title: 'Reactor Configurator',
      type: 'Process Control System',
      price: 'From $50k',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80',
      highlighted: false,
    },
    {
      id: 2,
      title: 'The Catalyst',
      type: 'Analytics Platform',
      price: 'From $75k',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
      highlighted: true,
    },
    {
      id: 3,
      title: 'Quality Assurance',
      type: 'Compliance Suite',
      price: 'From $60k',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
      highlighted: false,
    },
    {
      id: 4,
      title: 'Inventory Manager',
      type: 'Operations Tool',
      price: 'From $40k',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80',
      highlighted: false,
    },
    {
      id: 5,
      title: 'Analytics Dashboard',
      type: 'Intelligence Platform',
      price: 'From $90k',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
      highlighted: false,
    },
    {
      id: 6,
      title: 'Equipment Integration',
      type: 'LIMS Connector',
      price: 'From $55k',
      image: 'https://images.unsplash.com/photo-1582719201952-c9864fa7a355?w=800&h=600&fit=crop&q=80',
      highlighted: false,
    },
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
    <div className="landing-page bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <span className="text-2xl font-black text-gray-900">CHEMTRAC</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-medium">Search</span>
              </div>
              <div className="flex items-center gap-1 text-gray-700 hover:text-gray-900 cursor-pointer">
                <span className="text-sm font-medium">En</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <a href="#news" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">
                News
              </a>
              <a href="#history" className="text-gray-900 font-medium transition-colors text-sm bg-gray-100 px-3 py-1.5 rounded border-b-2 border-orange-500">
                History
              </a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">
                About
              </a>
              <Link
                to="/tests"
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-all duration-300 flex items-center gap-2 text-sm"
              >
                Request a Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        ref={sections.current.hero}
        className="pt-32 pb-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Headline and Description */}
            <div className={`transition-all duration-1000 ${
              visibleSections.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <h1 className="text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Unearth the future. Today.
              </h1>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-12 max-w-xl">
                Unleashing the power of innovative technology for efficient and responsible chemical R&D platform modernization - fueling the industries of tomorrow and driving sustainable growth.
              </p>
            </div>

            {/* Right: Video and Stats */}
            <div className={`space-y-8 transition-all duration-1000 delay-200 ${
              visibleSections.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              {/* Video Thumbnail */}
              <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                  <img 
                    src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=675&fit=crop&q=80"
                    alt="Our history"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <button className="w-20 h-20 mb-4 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm group-hover:scale-110">
                      <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                    <p className="text-xl font-bold mb-2">Our history</p>
                  </div>
                </div>
              </div>
              
              {/* Video Description */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Dive into our story: from start-up to industry leaders in chemical R&D modernization. Discover our journey in this video.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                  </div>
                  <button className="ml-4">
                    <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                {heroStats.map((stat, index) => (
                  <div key={index} className="text-left">
                    <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Gallery Section */}
      <section 
        ref={sections.current.gallery}
        className="py-12 bg-white overflow-hidden"
      >
        <div className="max-w-full mx-auto px-6 lg:px-12">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`flex-shrink-0 w-80 snap-center transition-all duration-1000 ${
                  visibleSections.gallery 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`relative rounded-lg overflow-hidden h-96 ${
                  product.highlighted 
                    ? 'ring-4 ring-orange-500/50' 
                    : ''
                }`}>
                  <div className="relative h-full">
                    <img
                      src={product.image}
                      alt={product.title}
                      className={`w-full h-full object-cover ${
                        product.highlighted ? '' : 'grayscale'
                      }`}
                    />
                    {product.highlighted && (
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-600/95 via-orange-600/70 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <div className="text-2xl font-black mb-2">{product.title}</div>
                          <div className="text-base mb-3 opacity-90">{product.type}</div>
                          <div className="text-xl font-bold mb-4">{product.price}</div>
                          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors group">
                            <svg className="w-5 h-5 text-orange-600 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* View All Card */}
            <div className="flex-shrink-0 w-80 snap-center">
              <div className="h-96 bg-gray-900 rounded-lg flex flex-col items-center justify-center text-white p-6 hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="text-2xl font-black mb-2 text-center">Check out our products</div>
                <div className="text-base mb-6 text-center text-gray-300">View all (128)</div>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors group">
                  <svg className="w-6 h-6 text-gray-900 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section 
        ref={sections.current.main}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${
              visibleSections.main 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                We are{' '}
                <span className="text-orange-500">redefining the boundaries</span>{' '}
                of chemical R&D
              </h2>
            </div>
            <div className={`space-y-6 transition-all duration-1000 delay-200 ${
              visibleSections.main 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                Our advanced platforms, including state-of-the-art React and FastAPI solutions, are designed not just for efficiency but also for minimal disruption to existing scientific workflows.
              </p>
              <Link
                to="/tests"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-md transition-all duration-300"
              >
                Learn more
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Stats Section */}
      <section 
        ref={sections.current.bottom}
        className="py-24 bg-white border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12">
            {bottomStats.map((stat, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  visibleSections.bottom 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-sm text-gray-600 mb-4 font-medium uppercase tracking-wide">
                  {stat.heading}
                </div>
                <div className="text-6xl lg:text-7xl font-black text-gray-900 mb-4 leading-none">
                  {stat.value}
                </div>
                <div className="text-base text-gray-600 leading-relaxed">
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
              <h3 className="text-2xl font-black text-white mb-4">CHEMTRAC</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Modernizing chemical R&D platforms with cutting-edge technology.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/tests" className="hover:text-orange-400 transition-colors">Test Management</Link></li>
                <li><a href="#products" className="hover:text-orange-400 transition-colors">Products</a></li>
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

export default Landing;
