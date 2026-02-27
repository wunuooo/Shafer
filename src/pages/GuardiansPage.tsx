import React, { useState } from 'react';
import { MapPin, Phone, Video, Shield, Star, Clock, Timer, CheckCircle } from 'lucide-react';

const GUARDIANS = [
  {
    id: 1,
    name: "Officer Sarah",
    role: "Community Police",
    distance: "0.2 mi",
    status: "On Patrol",
    rating: 4.9,
    image: "https://picsum.photos/seed/police/100",
    isVerified: true
  },
  {
    id: 2,
    name: "Mike Thompson",
    role: "Volunteer Guardian",
    distance: "0.4 mi",
    status: "Available",
    rating: 4.8,
    image: "https://picsum.photos/seed/mike/100",
    isVerified: true
  },
  {
    id: 3,
    name: "Jessica Lee",
    role: "Walking Buddy",
    distance: "0.1 mi",
    status: "Walking Home",
    rating: 4.7,
    image: "https://picsum.photos/seed/jessica/100",
    isVerified: false
  }
];

export default function GuardiansPage() {
  const [isTimerActive, setIsTimerActive] = useState(false);

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-20">
      <div className="bg-shafer-pink p-6 pb-12 rounded-b-[2.5rem] shadow-lg relative overflow-hidden transition-all duration-500">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white mb-2">Professional Help</h1>
          <p className="text-white/90 text-sm max-w-[80%]">
            Connect with verified guardians and community helpers nearby for a safer journey.
          </p>
          
          <button 
            onClick={() => setIsTimerActive(!isTimerActive)}
            className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg ${
              isTimerActive 
                ? 'bg-white text-shafer-green' 
                : 'bg-shafer-red text-white'
            }`}
          >
            {isTimerActive ? (
              <>
                <CheckCircle size={18} />
                Check-In Active (15m)
              </>
            ) : (
              <>
                <Timer size={18} />
                Start Safety Check-In
              </>
            )}
          </button>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
      </div>

      <div className="px-4 -mt-8 relative z-20">
        {/* Stats Card */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-6 flex justify-between items-center">
          <div className="text-center flex-1 border-r border-gray-100">
            <div className="text-2xl font-bold text-shafer-green">12</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide">Guardians Nearby</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-shafer-pink">5 min</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide">Avg Response</div>
          </div>
        </div>

        <h2 className="font-bold text-gray-900 mb-4 px-1">Nearby Guardians</h2>

        <div className="space-y-3">
          {GUARDIANS.map((guardian) => (
            <div key={guardian.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="relative">
                <img src={guardian.image} alt={guardian.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                {guardian.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white">
                    <Shield size={10} fill="currentColor" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 truncate">{guardian.name}</h3>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold text-gray-700">{guardian.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-shafer-pink font-medium mb-1">{guardian.role}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {guardian.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {guardian.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                  <Phone size={18} />
                </button>
                <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                  <Video size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
