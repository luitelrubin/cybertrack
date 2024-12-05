import React, { useState } from 'react';
import Login from './login';

export default function Dashboard() {
    const [defamation_tab, setDefamation] = useState(false);
    const [social_tab, setSocial] = useState(false);
    const [financial_tab, setFinancial] = useState(false);
    const [others_tab, setOthers] = useState(false);
    const [activeTab, setActiveTab] = useState(''); // Tracks the active tab for styling

    const handleTabClick = (tabName) => {
        setActiveTab(tabName); // Set the active tab for styling
        // Update individual states to maintain your previous functionality
        setDefamation(tabName === 'defamation');
        setSocial(tabName === 'social');
        setFinancial(tabName === 'financial');
        setOthers(tabName === 'others');
    };

    return (
        <div className="flex h-screen">
            {/* Left Sidebar - 20% width */}
            <div className="w-1/5 bg-gray-100 p-4 border-r">
                <nav className="space-y-4">
                    {/* Defamation Tab */}
                    <a
                        className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${
                            activeTab === 'defamation' ? 'bg-blue-200 text-blue-800' : ''
                        }`}
                        onClick={() => handleTabClick('defamation')}
                    >
                        Defamation Crime
                    </a>

                    {/* Social Media Crime Tab */}
                    <a
                        className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${
                            activeTab === 'social' ? 'bg-blue-200 text-blue-800' : ''
                        }`}
                        onClick={() => handleTabClick('social')}
                    >
                        Social Media Crime
                    </a>

                    {/* Financial Crime Tab */}
                    <a
                        className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${
                            activeTab === 'financial' ? 'bg-blue-200 text-blue-800' : ''
                        }`}
                        onClick={() => handleTabClick('financial')}
                    >
                        Financial Crime
                    </a>

                    {/* Other Crimes Tab */}
                    <a
                        className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${
                            activeTab === 'others' ? 'bg-blue-200 text-blue-800' : ''
                        }`}
                        onClick={() => handleTabClick('others')}
                    >
                        Other Crimes
                    </a>
                </nav>
            </div>

            {/* Right Container - 80% width */}
            <div className="w-4/5 p-6">
                        <div>
hello
                        </div>
                        <div>
                        {defamation_tab && <Login />}
                {social_tab && <div>Social Media Crime Content</div>}
                {financial_tab && <div>Financial Crime Content</div>}
                {others_tab && <div>Other Crimes Content</div>}

                        </div>

            </div>
        </div>
    );
}
