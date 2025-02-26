import Image from 'next/image';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function About() {
  return (
    <Layout>
      <SEO 
        title="About Us | Blog"
        description="Learn more about our team and our mission to share knowledge through our blog."
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-blue-100 mb-6">
            About Our Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-blue-200/90 max-w-2xl mx-auto">
            A modern blog platform built with Next.js and Tailwind CSS, showcasing the latest in web development.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-50/80 dark:bg-blue-800/20 rounded-xl p-8 border border-gray-200 dark:border-blue-700/30">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-blue-100 mb-4">
              Modern Technology Stack
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-blue-200/90">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Next.js for Static Site Generation
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Tailwind CSS for Responsive Design
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                TypeScript for Type Safety
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                React Icons for Beautiful UI
              </li>
            </ul>
          </div>

          <div className="bg-blue-50/80 dark:bg-blue-800/20 rounded-xl p-8 border border-gray-200 dark:border-blue-700/30">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-blue-100 mb-4">
              Key Features
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-blue-200/90">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Infinite Scroll for Better UX
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Tag-based Filtering System
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Dark Mode Support
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Optimized Image Loading
              </li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-blue-100 mb-8">
            Meet the Team
          </h2>
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500/10">
              <Image
                src="https://ui-avatars.com/api/?name=Vahdet+Karatas&background=0D8ABC&color=fff"
                alt="Vahdet Karatas"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-blue-100 mb-2">
            Vahdet Karatas
          </h3>
          <p className="text-gray-600 dark:text-blue-200/90 mb-4">
            Lead Developer & Designer
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="text-gray-600 dark:text-blue-200/90 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-blue-200/90 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-blue-200/90 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50/80 dark:bg-blue-800/20 rounded-xl p-8 text-center border border-gray-200 dark:border-blue-700/30">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-blue-100 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-blue-200/90 mb-6">
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <a
            href="mailto:contact@example.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </Layout>
  );
}
