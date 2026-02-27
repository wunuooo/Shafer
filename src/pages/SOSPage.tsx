import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Video, Share2, Bell, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SOSPage() {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isActive && countdown === 0) {
      // Trigger actual SOS logic here
      console.log("SOS TRIGGERED");
    }
    return () => clearTimeout(timer);
  }, [isActive, countdown]);

  const handleSOSClick = () => {
    setIsActive(true);
    setCountdown(5);
  };

  const handleCancel = () => {
    setIsActive(false);
    setCountdown(5);
  };

  return (
    <div className="h-full bg-white flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="p-6 pt-12">
        <h1 className="text-3xl font-bold text-gray-900">Emergency</h1>
        <p className="text-gray-500 mt-2">Press and hold for immediate assistance</p>
      </div>

      {/* Main SOS Button Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Ripples */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-64 h-64 bg-shafer-red/5 rounded-full animate-ping absolute" style={{ animationDuration: '3s' }}></div>
           <div className="w-48 h-48 bg-shafer-red/10 rounded-full animate-ping absolute" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSOSClick}
          className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-shafer-red to-red-600 shadow-2xl shadow-shafer-red/40 flex flex-col items-center justify-center text-white border-4 border-white/20"
        >
          <ShieldAlert size={64} className="mb-2" />
          <span className="text-2xl font-bold tracking-wider">SOS</span>
        </motion.button>

        <p className="mt-8 text-sm text-gray-400 text-center max-w-xs px-6">
          This will alert nearby police, your emergency contacts, and share your live location.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="p-6 pb-8 grid grid-cols-2 gap-4">
        <button 
          onClick={() => setShowContacts(true)}
          className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl flex flex-col items-center gap-2 transition-colors border border-gray-100"
        >
          <div className="w-10 h-10 rounded-full bg-shafer-pink/10 text-shafer-pink flex items-center justify-center">
            <UsersIcon />
          </div>
          <span className="font-medium text-gray-700">Ask Friends</span>
        </button>
        
        <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl flex flex-col items-center gap-2 transition-colors border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <Phone size={20} />
          </div>
          <span className="font-medium text-gray-700">Police (911)</span>
        </button>
      </div>

      {/* Active SOS Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="absolute inset-0 bg-shafer-red z-50 flex flex-col items-center justify-center text-white p-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Sending Alert</h2>
              <p className="text-white/80 text-lg">Notifying emergency services in</p>
            </div>

            <div className="relative w-40 h-40 flex items-center justify-center mb-12">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * countdown) / 5}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <span className="text-6xl font-bold">{countdown}</span>
            </div>

            <button
              onClick={handleCancel}
              className="bg-white text-shafer-red px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <X size={24} />
              Cancel Alert
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contacts Sheet */}
      <AnimatePresence>
        {showContacts && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContacts(false)}
              className="absolute inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 h-3/4 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Nearby Friends & Family</h3>
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-gray-100">
                    <img src={`https://picsum.photos/seed/${i}/100`} alt="Friend" className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                      <p className="text-xs text-gray-500">0.5 miles away • Active now</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100">
                        <Phone size={18} />
                      </button>
                      <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                        <Video size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setShowContacts(false)}
                className="w-full mt-6 bg-gray-100 text-gray-600 py-3 rounded-xl font-medium"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  );
}
