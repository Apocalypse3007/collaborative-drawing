import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Tutorials', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Help Center', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Legal', href: '#' },
    ],
  },
];

const Footer = () => (
  <footer className="bg-[#101c2c] text-blue-100 pt-16 pb-8 border-t-0 mt-0">
    <div className="container-custom flex flex-col md:flex-row md:justify-between gap-12">
      <div className="max-w-xs mb-8 md:mb-0">
        <div className="flex items-center mb-4">
          <span className="inline-block w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg mr-2"></span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text font-sans">SketchCollab</span>
        </div>
        <p className="text-blue-400 mb-6">SketchCollab makes it easy to create, share, and collaborate on drawings with your team in real-time.</p>
        <div className="flex space-x-4">
          <a href="#" aria-label="Twitter" className="hover:text-blue-400"><FaTwitter /></a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-400"><FaFacebook /></a>
          <a href="#" aria-label="Instagram" className="hover:text-blue-400"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-400"><FaLinkedin /></a>
          <a href="#" aria-label="GitHub" className="hover:text-blue-400"><FaGithub /></a>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold mb-4 text-lg text-blue-50">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-blue-400 hover:text-blue-200 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className="container-custom border-t border-blue-900 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-blue-400 text-sm">
      <span>&copy; 2025 SketchCollab. All rights reserved.</span>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-blue-200">Privacy Policy</a>
        <a href="#" className="hover:text-blue-200">Terms of Service</a>
        <a href="#" className="hover:text-blue-200">Cookies</a>
      </div>
    </div>
  </footer>
);

export default Footer;