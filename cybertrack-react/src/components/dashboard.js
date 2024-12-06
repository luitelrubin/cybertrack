import React, { useState, useContext } from 'react';
import DashboardComplaint from './dashboard_complaint';
import { AuthContext } from '../context/AuthContext';


export default function Dashboard() {
    const { auth, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('defamation'); // Tracks the active tab for styling
    const [activeButton, setActiveButton] = useState('pending'); // Tracks the active button for styling

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); // Set the active button for styling
    };
    return (
        <div>
            {auth.isAuthenticated ? (
                <div className="flex h-screen">
                    {/* Left Sidebar - 20% width */}
                    <div className="w-1/5 bg-gray-100 p-4 border-r rounded-l-lg">
                        <nav className="space-y-4">
                            {/* Defamation Tab */}
                            <a
                                className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${activeTab === 'defamation' ? 'bg-blue-200 text-blue-800' : ''
                                    }`}
                                onClick={() => handleTabClick('defamation')}
                            >
                                Defamation Crime
                            </a>

                            {/* Social Media Crime Tab */}
                            <a
                                className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${activeTab === 'social' ? 'bg-blue-200 text-blue-800' : ''
                                    }`}
                                onClick={() => handleTabClick('social')}
                            >
                                Social Media Crime
                            </a>

                            {/* Financial Crime Tab */}
                            <a
                                className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${activeTab === 'financial' ? 'bg-blue-200 text-blue-800' : ''
                                    }`}
                                onClick={() => handleTabClick('financial')}
                            >
                                Financial Crime
                            </a>

                            {/* Other Crimes Tab */}
                            <a
                                className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${activeTab === 'others' ? 'bg-blue-200 text-blue-800' : ''
                                    }`}
                                onClick={() => handleTabClick('others')}
                            >
                                Other Crimes
                            </a>
                        </nav>
                    </div>

                    {/* Right Container - 80% width */}
                    <div className="w-4/5">
                        <div className="flex justify-evenly w-full  bg-gray-100 h-[10%] py-4">
                            <a
                                className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-b-[4px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${activeButton === 'pending' ? 'bg-blue-200 text-blue-800 rounded-xl' : ''
                                    }`}
                                onClick={() => handleButtonClick('pending')}
                            >Pending</a>
                            <a
                                className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-b-[4px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${activeButton === 'inaction' ? 'bg-blue-200 text-blue-800 rounded-xl' : ''
                                    }`}
                                onClick={() => handleButtonClick('inaction')}
                            >In Action</a>
                            <a
                                className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-b-[4px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${activeButton === 'scam' ? 'bg-blue-200 text-blue-800 rounded-xl' : ''
                                    }`}
                                onClick={() => handleButtonClick('scam')}
                            >Spam</a>
                            <a
                                className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-b-[4px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${activeButton === 'resolved' ? 'bg-blue-200 text-blue-800 rounded-xl' : ''
                                    }`}
                                onClick={() => handleButtonClick('resolved')}
                            >Resolved</a>
                            <a
                                className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-b-[4px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${activeButton === 'closed' ? 'bg-blue-200 text-blue-800 rounded-xl' : ''
                                    }`}
                                onClick={() => handleButtonClick('closed')}
                            >Closed</a>


                        </div>

                        <div>
                            {activeTab === 'defamation' && <DashboardComplaint data1={activeTab} data2={activeButton} />}
                            {activeTab === 'social' && <DashboardComplaint data1={activeTab} data2={activeButton} />}
                            {activeTab === 'financial' && <DashboardComplaint data1={activeTab} data2={activeButton} />}
                            {activeTab === 'others' && <DashboardComplaint data1={activeTab} data2={activeButton} />}

                        </div>
                        <button onClick={logout}>Logout</button>

                    </div>
                </div>
            ) : (<h1>Not Authenticated</h1>)}
        </div>

    );
}
