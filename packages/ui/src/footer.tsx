import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react';
import Logo from './logo';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  description: string;
  sections: FooterSection[];
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  description,
  sections,
  socialLinks = {},
  className = ''
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-900 text-white pt-16 pb-8 ${className}`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-gray-400 mb-6 max-w-md">{description}</p>
            <div className="flex space-x-4">
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialLinks.github && (
                <a href={socialLinks.github} className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} SketchCollab. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;