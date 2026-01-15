import { useNavigate } from 'react-router-dom';
import { Compass, Calendar, Edit, Save, MapPin, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Compass className="w-8 h-8" />,
            title: 'Smart Planning',
            description: 'Choose your destination and preferences, we handle the rest',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: 'Day-wise Itinerary',
            description: 'Get a structured plan with morning, afternoon, and evening activities',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: <Edit className="w-8 h-8" />,
            title: 'Full Customization',
            description: 'Edit, remove, or reorder activities to match your style',
            gradient: 'from-orange-500 to-red-500',
        },
        {
            icon: <Save className="w-8 h-8" />,
            title: 'Save & Access',
            description: 'Save your itineraries and access them anytime, anywhere',
            gradient: 'from-green-500 to-teal-500',
        },
    ];

    const destinations = [
        { name: 'Paris', emoji: '🗼', color: 'from-pink-400 to-rose-600' },
        { name: 'Tokyo', emoji: '🗾', color: 'from-red-400 to-orange-600' },
        { name: 'Bali', emoji: '🏝️', color: 'from-teal-400 to-cyan-600' },
        { name: 'Rome', emoji: '🏛️', color: 'from-amber-400 to-orange-600' },
    ];

    return (
        <div className="min-h-screen">
            <section className="relative overflow-hidden py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-white to-secondary-100 opacity-60" />

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6 animate-slide-down">
                            <Sparkles className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-semibold text-gray-700">Your Personal Travel Companion</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-black mb-6 animate-fade-in">
                            Plan Your Perfect
                            <span className="block text-gradient mt-2">Travel Adventure</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-slide-up">
                            SafarSetu helps you create detailed, personalized travel itineraries in minutes.
                            Just tell us where you want to go, and we'll craft the perfect journey.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
                            <Button onClick={() => navigate('/plan')} className="text-lg px-8 py-4">
                                <MapPin className="w-5 h-5 mr-2 inline" />
                                Start Planning
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/saved')} className="text-lg px-8 py-4">
                                View My Trips
                            </Button>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {destinations.map((dest, index) => (
                            <div
                                key={dest.name}
                                className={`p-6 rounded-2xl bg-gradient-to-br ${dest.color} text-white text-center transform hover:scale-105 transition-all cursor-pointer shadow-xl animate-slide-up`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-5xl mb-2">{dest.emoji}</div>
                                <div className="font-bold text-lg">{dest.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="section-title mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">
                            Four simple steps to your dream itinerary
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="glass-card p-8 text-center group hover:scale-105 transition-all animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Create your first itinerary now and discover amazing experiences
                    </p>
                    <Button
                        onClick={() => navigate('/plan')}
                        className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4"
                    >
                        Plan My Trip
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
