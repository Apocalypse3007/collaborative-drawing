import React from 'react';

const showcaseItems = [
  {
    title: "Wireframe Planning",
    description: "Teams collaborate on early-stage wireframes and UI mockups.",
    imageUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    category: "UX Design"
  },
  {
    title: "Project Roadmap",
    description: "Visual project planning with teammates across different locations.",
    imageUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    category: "Project Management"
  },
  {
    title: "Teaching & Learning",
    description: "Educators use SketchCollab for interactive online lessons.",
    imageUrl: "https://images.pexels.com/photos/8471983/pexels-photo-8471983.jpeg",
    category: "Education"
  },
  {
    title: "Brainstorming Sessions",
    description: "Teams visualize ideas together in real-time brainstorming.",
    imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    category: "Ideation"
  }
];

const ShowcaseSection: React.FC = () => {
  return (
    <section id="showcase" className="section bg-[#101c2c]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-50">
            How Teams Use SketchCollab
          </h2>
          <p className="text-lg text-blue-200">
            See how teams across different industries collaborate visually to achieve their goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseItems.map((item, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-blue-900/50 to-transparent flex flex-col justify-end p-6 text-blue-100">
                <span className="text-md font-medium py-1 rounded-full inline-block mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl font-semibold mb-2 text-blue-50">{item.title}</h3>
                <p className="text-blue-200 mb-4">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#" className="btn-secondary">
            See More Examples
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;