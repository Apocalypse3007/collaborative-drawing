import React from 'react';
import { 
  Users, 
  Share2, 
  Download, 
  Lock, 
  Zap, 
  Palette,
  Layers,
  Smartphone
} from 'lucide-react';

const features = [
  {
    icon: <Users className="h-6 w-6 text-blue-100" />,
    title: "Real-time Collaboration",
    description: "Work together with your team in real-time. See changes as they happen with no delay.",
    bgColor: "bg-blue-700"
  },
  {
    icon: <Share2 className="h-6 w-6 text-blue-100" />,
    title: "Easy Sharing",
    description: "Share your drawings with a simple link. No account required for viewers.",
    bgColor: "bg-blue-500"
  },
  {
    icon: <Download className="h-6 w-6 text-blue-100" />,
    title: "Export Options",
    description: "Export your work as PNG, SVG, or PDF with just a click.",
    bgColor: "bg-blue-400"
  },
  {
    icon: <Lock className="h-6 w-6 text-blue-100" />,
    title: "Privacy Controls",
    description: "Set permissions for who can view and edit your drawings.",
    bgColor: "bg-blue-900"
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-100" />,
    title: "Lightning Fast",
    description: "Our app loads instantly and responds quickly to every action.",
    bgColor: "bg-blue-600"
  },
  {
    icon: <Palette className="h-6 w-6 text-blue-100" />,
    title: "Rich Drawing Tools",
    description: "Access a variety of shapes, lines, and freehand drawing tools.",
    bgColor: "bg-blue-800"
  },
  {
    icon: <Layers className="h-6 w-6 text-blue-100" />,
    title: "Layering Support",
    description: "Organize your drawings with multiple layers for complex illustrations.",
    bgColor: "bg-blue-500"
  },
  {
    icon: <Smartphone className="h-6 w-6 text-blue-100" />,
    title: "Mobile Friendly",
    description: "Draw and collaborate from any device with our responsive interface.",
    bgColor: "bg-blue-700"
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="section bg-[#101c2c]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-50">
            Everything you need for collaborative drawing
          </h2>
          <p className="text-lg text-blue-200">
            Our platform provides all the tools you need to create, share, and collaborate on drawings with your team.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-[#19243a] rounded-xl shadow-sm p-6 hover:shadow-lg transition-all border border-blue-900 flex flex-col items-center text-center text-blue-100 hover:bg-[#22325a]">
              <div className={`mb-4 w-14 h-14 flex items-center justify-center rounded-full ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-50">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;