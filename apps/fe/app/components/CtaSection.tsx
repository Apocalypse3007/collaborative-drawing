import React from 'react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-600 to-accent-500 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform how your team collaborates?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who use SketchCollab to bring their ideas to life. Start for free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="btn bg-white text-primary-600 hover:bg-primary-50 font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free
              <span className="ml-2">→</span>
            </a>
            <a 
              href="#" 
              className="btn bg-transparent text-white border border-white/30 hover:bg-white/10 font-medium px-8 py-4 rounded-lg transition-colors"
            >
              Schedule a Demo
            </a>
          </div>
          <p className="mt-6 text-white/70">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;