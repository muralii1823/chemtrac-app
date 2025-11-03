import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

function Products() {
  const [visible, setVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const products = [
    {
      id: 1,
      title: 'Reactor Configurator',
      type: 'Process Control System',
      price: 'From $50k',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80',
      highlighted: false,
      description: 'Advanced configuration management for chemical reactors with real-time monitoring and optimization capabilities.',
    },
    {
      id: 2,
      title: 'The Catalyst',
      type: 'Analytics Platform',
      price: 'From $75k',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
      highlighted: true,
      description: 'Comprehensive tracking and analysis of catalyst performance with predictive insights and machine learning.',
    },
    {
      id: 3,
      title: 'Quality Assurance',
      type: 'Compliance Suite',
      price: 'From $60k',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
      highlighted: false,
      description: 'End-to-end quality management with automated compliance reporting and comprehensive documentation.',
    },
    {
      id: 4,
      title: 'Inventory Manager',
      type: 'Operations Tool',
      price: 'From $40k',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80',
      highlighted: false,
      description: 'Intelligent inventory tracking with safety data sheets and automated reorder notifications.',
    },
    {
      id: 5,
      title: 'Analytics Dashboard',
      type: 'Intelligence Platform',
      price: 'From $90k',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
      highlighted: false,
      description: 'Real-time visualization and analytics for process optimization and predictive maintenance.',
    },
    {
      id: 6,
      title: 'Equipment Integration',
      type: 'LIMS Connector',
      price: 'From $55k',
      image: 'https://images.unsplash.com/photo-1582719201952-c9864fa7a355?w=800&h=600&fit=crop&q=80',
      highlighted: false,
      description: 'Seamless connectivity with existing LIMS and lab equipment for unified data management.',
    },
  ];

  return (
    <div className="products-page">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
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
              <Link to="/news" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">News</Link>
              <Link to="/products" className="text-gray-900 font-medium transition-colors text-sm bg-gray-100 px-3 py-1.5 rounded border-b-2 border-orange-500">Products</Link>
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
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`text-center mb-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              Our <span className="text-orange-500">Product Suite</span>
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed for modern chemical R&D operations
            </p>
          </div>
        </div>
      </section>

      {/* Products Gallery Section */}
      <section ref={galleryRef} className="py-12 bg-white overflow-hidden">
        <div className="max-w-full mx-auto px-6 lg:px-12">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`flex-shrink-0 w-96 snap-center transition-all duration-1000 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`relative rounded-xl overflow-hidden h-[500px] shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  product.highlighted 
                    ? 'ring-4 ring-orange-500/50' 
                    : ''
                }`}>
                  <div className="relative h-full">
                    <img
                      src={product.image}
                      alt={product.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        product.highlighted ? '' : 'grayscale'
                      } ${product.highlighted ? 'group-hover:scale-110' : ''}`}
                    />
                    {product.highlighted ? (
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-600/95 via-orange-600/70 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                          <div className="text-xl font-bold mb-1.5">{product.title}</div>
                          <div className="text-xs mb-2 opacity-90 uppercase tracking-wider">{product.type}</div>
                          <div className="text-base font-semibold mb-3">{product.price}</div>
                          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors group shadow-md">
                            <svg className="w-4 h-4 text-orange-600 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <div className="text-2xl font-bold mb-2">{product.title}</div>
                          <div className="text-base mb-3 opacity-90">{product.type}</div>
                          <div className="text-lg font-semibold mb-3">{product.price}</div>
                          <p className="text-sm opacity-80 mb-4 line-clamp-2">{product.description}</p>
                          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors group">
                            <svg className="w-5 h-5 text-gray-900 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="flex-shrink-0 w-96 snap-center">
              <div className="h-[500px] bg-gray-900 rounded-xl flex flex-col items-center justify-center text-white p-8 hover:bg-gray-800 transition-colors cursor-pointer shadow-lg">
                <div className="text-xl font-bold mb-2 text-center">Check out our products</div>
                <div className="text-xs mb-6 text-center text-gray-300 uppercase tracking-wide">View all (128)</div>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors group shadow-lg">
                  <svg className="w-5 h-5 text-gray-900 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`text-center mb-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Comprehensive Solutions
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Every product is designed to integrate seamlessly with your existing workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-3">{product.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-base font-semibold text-gray-900">{product.price}</span>
                  <button className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors text-xs">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Ready to Transform Your R&D Platform?
            </h2>
            <p className="text-base text-gray-600 mb-5">
              Get in touch with our team to discuss your specific needs and discover how we can help modernize your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tests"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Request a Demo
              </Link>
              <Link
                to="/tests"
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Sales
              </Link>
            </div>
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

export default Products;

