import { useState } from "react";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Notification from "./Notification"; // Ensure this component is created or imported properly
import React from "react";
const Footer = () => {
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState(null);

    const handleSubscription = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/subscribe/subscribe", { email });
            setNotification({ type: "success", message: response.data.message });
            setEmail('');
        } catch (error) {
            setNotification({ type: "error", message: error.response?.data?.message || "Something went wrong." });
        }
    };

    return (
        <footer className="bg-gray-900 text-white py-10 w-screen">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    {/* About SkillSync */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">About SkillSync</h2>
                        <p className="text-sm text-gray-300">
                            SkillSync is your AI-powered companion in tech journeys. Whether it's mastering skills, building portfolios, or finding mentors, we sync your growth with opportunity.
                        </p>
                    </div>

                    {/* Subscribe */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Stay in the Loop</h2>
                        <form onSubmit={handleSubscription}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-2 rounded text-gray-900 mb-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-xs text-gray-400 mt-2">Get latest updates on features, projects & events!</p>
                    </div>

                    {/* Connect With Us */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Connect With Us</h2>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                <FaFacebookF size={22} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                                <FaTwitter size={22} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                                <FaLinkedinIn size={22} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                                <FaInstagram size={22} />
                            </a>
                        </div>
                        <p className="text-sm mt-4 text-gray-400">Email us: <a href="mailto:contact@skillsync.ai" className="underline">contact@skillsync.ai</a></p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="text-center border-t border-gray-700 pt-4 text-sm text-gray-500">
                    <p>© 2024 SkillSync. Empowering Growth with AI. All Rights Reserved.</p>
                </div>
            </div>

            {/* Notification */}
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
        </footer>
    );
};

export default Footer;
