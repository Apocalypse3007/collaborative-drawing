import React, { useState } from 'react';
import { ArrowRight, Users, Share2 } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#101c2c]">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="animate-fadeIn">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-blue-50">
                Collaborate on drawings in <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">real-time</span>
              </h1>
              <p className="text-lg text-blue-200 mb-8 max-w-lg">
                SketchCollab makes it easy to create, share, and collaborate on drawings with your team. No installation required - just draw and share.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="btn-primary">
                  Start Drawing
                  <span className="ml-2">→</span>
                </a>
                <a href="#how-it-works" className="btn-secondary">
                  See how it works
                </a>
              </div>
              <div className="mt-8 flex items-center space-x-6">
                <div className="flex items-center">
                  <span className="inline-block w-5 h-5 bg-blue-600 rounded-full mr-2"></span>
                  <span className="text-sm text-blue-200">10,000+ users</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-5 h-5 bg-blue-600 rounded-full mr-2"></span>
                  <span className="text-sm text-blue-200">5,000+ shared drawings</span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative bg-[#101c2c] p-2 rounded-xl shadow-lg animate-slideUp">
              <div className="bg-[#19243a] rounded-lg p-4 aspect-video relative overflow-hidden">
                {/* Interactive Drawing Canvas Mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://images.pexels.com/photos/7292745/pexels-photo-7292745.jpeg" 
                    alt="Collaborative drawing demo"
                    className="w-full h-full object-cover rounded-md opacity-80"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="text-blue-100 text-center">
                      <span className="text-xl font-semibold mb-4 block">
                        Your drawing will appear here
                      </span>
                      <button onClick={() => setShowDemo(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors">
                        Watch Demo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tool Bar */}
              <div className="mt-2 flex items-center justify-between px-2 py-3 bg-[#19243a] rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-700 border-2 border-blue-500"></div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-400"></div>
                  <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-blue-400"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-md bg-blue-900 flex items-center justify-center">
                    <div className="w-4 h-1 bg-blue-400 rounded-full"></div>
                  </div>
                  <div className="w-8 h-8 rounded-md bg-blue-900 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-blue-400 rounded-sm"></div>
                  </div>
                  <div className="w-8 h-8 rounded-md bg-blue-900 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              {/* Collaboration Indicator */}
              <div className="mt-3 flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-700 border-2 border-[#101c2c] flex items-center justify-center text-xs font-medium text-blue-100">JD</div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-[#101c2c] flex items-center justify-center text-xs font-medium text-blue-100">TK</div>
                  <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-[#101c2c] flex items-center justify-center text-xs font-medium text-blue-900">AS</div>
                </div>
                <span className="ml-2 text-sm text-blue-400">3 people collaborating</span>
              </div>
            </div>
          </div>
        </div>
        {/* Demo Modal */}
        {showDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-[#101c2c] rounded-lg p-8 max-w-lg w-full relative border border-blue-900">
              <button onClick={() => setShowDemo(false)} className="absolute top-2 right-2 text-blue-400 hover:text-blue-200 text-2xl">&times;</button>
              <h2 className="text-2xl font-bold mb-4 text-blue-50">SketchCollab Demo</h2>
              <div className="aspect-video bg-blue-900 rounded mb-4 flex items-center justify-center">
                <span className="text-blue-300">[Demo Video Placeholder]</span>
              </div>
              <p className="text-blue-200">This is where a demo video or interactive preview would appear.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;