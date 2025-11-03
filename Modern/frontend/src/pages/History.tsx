import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function History() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const milestones = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'CHEMTRAC was founded with a vision to modernize chemical R&D platforms. Started as a small team of 10 engineers dedicated to transforming laboratory operations.',
      icon: '🌱',
      color: 'blue'
    },
    {
      year: '2014',
      title: 'First Major Breakthrough',
      description: 'Launched our first cloud-based platform, enabling real-time collaboration for 50+ research labs. This marked the beginning of our digital transformation journey.',
      icon: '🚀',
      color: 'green'
    },
    {
      year: '2017',
      title: 'Global Expansion',
      description: 'Expanded operations internationally, opening offices in Europe and Asia. Partnered with leading pharmaceutical and chemical companies to scale our solutions.',
      icon: '🌍',
      color: 'orange'
    },
    {
      year: '2020',
      title: 'AI Integration',
      description: 'Introduced AI-powered analytics and predictive modeling. Our platforms now serve over 500 laboratories worldwide, processing millions of experiments annually.',
      icon: '🤖',
      color: 'purple'
    },
    {
      year: '2023',
      title: 'Modern Platform Launch',
      description: 'Launched the next-generation React and FastAPI-based platform, providing unprecedented speed, scalability, and user experience for modern chemical R&D workflows.',
      icon: '✨',
      color: 'red'
    },
    {
      year: '2025',
      title: 'Today & Beyond',
      description: 'Serving 1,288+ labs globally with cutting-edge technology. Continuously innovating to shape the future of chemical research and development.',
      icon: '🔮',
      color: 'teal'
    }
  ];

  const achievements = [
    { number: '1,288+', label: 'Labs Worldwide' },
    { number: '12M+', label: 'Experiments Processed' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '15+', label: 'Years of Excellence' },
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We continuously push boundaries in technology and methodology to deliver cutting-edge solutions.',
      icon: '💡'
    },
    {
      title: 'Reliability',
      description: 'Our platforms are built on robust infrastructure ensuring 99.9% uptime for critical laboratory operations.',
      icon: '🔒'
    },
    {
      title: 'Partnership',
      description: 'We work closely with our clients, understanding their unique needs and co-creating solutions that drive their success.',
      icon: '🤝'
    },
    {
      title: 'Excellence',
      description: 'Quality is at the heart of everything we do, from code to customer service, we strive for perfection.',
      icon: '⭐'
    }
  ];

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
              <Link to="/history" className="text-gray-900 font-medium transition-colors text-sm bg-gray-100 px-3 py-1.5 rounded border-b-2 border-orange-500">History</Link>
              <Link to="/news" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">News</Link>
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
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
              Our Journey Through
              <span className="block text-orange-300">Innovation</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              From a small startup to a global leader in chemical R&D platform modernization. 
              Discover the milestones that shaped our commitment to transforming laboratory operations worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Stats */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                <div className="text-sm text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Milestones That Shaped Us
          </h2>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-orange-500 to-purple-500"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative mb-12 transition-all duration-1000 ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`flex flex-col md:flex-row items-start gap-6 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 flex items-center justify-center text-2xl shadow-lg ${
                    milestone.color === 'blue' ? 'border-blue-500' :
                    milestone.color === 'green' ? 'border-green-500' :
                    milestone.color === 'orange' ? 'border-orange-500' :
                    milestone.color === 'purple' ? 'border-purple-500' :
                    milestone.color === 'red' ? 'border-red-500' :
                    'border-teal-500'
                  }`}>
                    {milestone.icon}
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 bg-white rounded-xl shadow-lg p-6 md:p-8 ${
                    index % 2 === 0 ? 'md:mr-auto md:max-w-[45%]' : 'md:ml-auto md:max-w-[45%]'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-gray-900">{milestone.year}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        milestone.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                        milestone.color === 'green' ? 'bg-green-100 text-green-700' :
                        milestone.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                        milestone.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                        milestone.color === 'red' ? 'bg-red-100 text-red-700' :
                        'bg-teal-100 text-teal-700'
                      }`}>
                        {milestone.title}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every solution we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
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

export default History;

