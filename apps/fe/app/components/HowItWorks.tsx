import React from 'react';
import { MousePointer, Users, File } from 'lucide-react';

const steps = [
  {
    icon: <MousePointer className="h-8 w-8 text-blue-400" />,
    title: "Create a Drawing",
    description: "Start with a blank canvas or choose from our templates. Use our intuitive tools to bring your ideas to life.",
    number: "01"
  },
  {
    icon: <Users className="h-8 w-8 text-blue-400" />,
    title: "Invite Collaborators",
    description: "Share a link with your team members to invite them to collaborate in real-time on your drawing.",
    number: "02"
  },
  {
    icon: <File className="h-8 w-8 text-blue-400" />,
    title: "Export & Share",
    description: "Export your finished drawing in multiple formats or share it directly with clients and stakeholders.",
    number: "03"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="section bg-[#101c2c]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-50">
            How SketchCollab Works
          </h2>
          <p className="text-lg text-blue-200">
            Getting started is simple. Create, collaborate, and share in just a few steps.
          </p>
        </div>
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-1 bg-blue-900 -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 lg:grid-cols-[repeat(3,minmax(0,500px))] justify-center gap-8 md:gap-12 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="bg-[#19243a] p-8 rounded-xl shadow-sm border border-blue-900 relative group hover:shadow-md transition-all duration-300 text-blue-100"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-blue-900 rounded-bl-xl flex items-center justify-center font-bold text-blue-400 text-lg">
                  {step.number}
                </div>
                <div className="mb-6 p-4 bg-blue-800 inline-block rounded-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-50">{step.title}</h3>
                <p className="text-blue-200">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-12 top-1/2 transform -translate-y-1/2 z-20">
                    <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 text-center">
          <a href="#" className="btn-primary inline-flex">
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;