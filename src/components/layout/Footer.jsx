import { Plane, Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
                                <Plane className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-display font-bold">SafarSetu</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your companion for creating unforgettable travel experiences. Plan, customize, and explore with ease.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link to="/" className="block text-gray-400 hover:text-white transition-colors">
                                Home
                            </Link>
                            <Link to="/plan" className="block text-gray-400 hover:text-white transition-colors">
                                Plan Trip
                            </Link>
                            <Link to="/saved" className="block text-gray-400 hover:text-white transition-colors">
                                My Trips
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Resources</h3>
                        <div className="space-y-2">
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                Travel Tips
                            </a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                Destinations
                            </a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                FAQs
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Connect</h3>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-110"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-110"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-110"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} SafarSetu. All rights reserved. Frontend-only demo project.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
