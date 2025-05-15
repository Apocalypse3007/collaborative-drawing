import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for individuals and small projects",
    features: [
      "Unlimited public drawings",
      "Up to 3 collaborators",
      "Basic drawing tools",
      "PNG exports",
      "7-day history"
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Pro",
    price: "12",
    description: "Ideal for professionals and small teams",
    features: [
      "Unlimited private drawings",
      "Up to 10 collaborators",
      "Advanced drawing tools",
      "PNG, SVG, PDF exports",
      "30-day history",
      "Priority support"
    ],
    cta: "Start Free Trial",
    highlighted: true
  },
  {
    name: "Team",
    price: "49",
    description: "For teams that need advanced features",
    features: [
      "Unlimited everything",
      "Unlimited collaborators",
      "All drawing tools",
      "All export formats",
      "Unlimited history",
      "Team management",
      "SSO authentication",
      "Dedicated support"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="section bg-[#101c2c] pb-0 mb-0">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-50">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-blue-200">
            Choose the plan that works for your needs. All plans include core features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-[#19243a] rounded-xl shadow-sm border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md 
                ${plan.highlighted ? 'border-blue-500 relative z-10 scale-105 shadow-lg' : 'border-blue-900'} text-blue-100 hover:bg-[#22325a]`}
            >
              {plan.highlighted && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 px-6 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-2 text-blue-50">{plan.name}</h3>
                <p className="text-blue-200 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-blue-50">${plan.price}</span>
                  <span className="text-blue-400">/month</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`mr-3 mt-1 rounded-full p-1 ${plan.highlighted ? 'bg-blue-200 text-blue-700' : 'bg-blue-900 text-blue-400'}`}>
                        <Check className="h-4 w-4" />
                      </div>
                      <span className={plan.highlighted ? 'text-blue-100' : 'text-blue-200'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#" 
                  className={`block w-full py-3 px-6 text-center rounded-lg font-medium transition-colors 
                    ${plan.highlighted 
                      ? 'bg-blue-600 text-white hover:bg-blue-500' 
                      : 'bg-[#101c2c] border border-blue-800 text-blue-100 hover:bg-blue-900'}`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-[#19243a] p-8 rounded-xl shadow-sm border border-blue-900 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-blue-50">Need a custom solution?</h3>
          <p className="text-blue-200 mb-6">
            Contact our sales team for enterprise pricing and custom solutions for your organization.
          </p>
          <a href="#" className="btn-primary">
            Contact Enterprise Sales
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;