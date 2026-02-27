import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import { Search, Navigation, AlertTriangle, ShieldCheck, Map as MapIcon, X } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Mock data
const DANGER_ZONES = [
  { id: 1, position: [51.508, -0.11], reason: "Poor lighting reported", severity: "medium" },
  { id: 2, position: [51.503, -0.06], reason: "Recent incident reported", severity: "high" },
];

const SAFE_ZONES = [
  { id: 1, position: [51.505, -0.09], radius: 300, label: "University Campus - Patrolled" },
];

const CONGESTION_ZONES = [
  { id: 1, path: [[51.505, -0.09], [51.51, -0.1]], color: '#E34F41', label: "Heavy Traffic (15 min delay)" }, // Red
  { id: 2, path: [[51.51, -0.1], [51.515, -0.12]], color: '#35D04C', label: "Clear Path (Fastest)" },   // Green
];

// Component to handle map view updates
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapPage() {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSafetyLayer, setShowSafetyLayer] = useState(true);
  const [activeRoute, setActiveRoute] = useState<number | null>(null);
  const [riskWarning, setRiskWarning] = useState<string | null>(null);

  // Simulate getting user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          console.log("Using default location");
        }
      );
    }
  }, []);

  // Simulate entering a danger zone check
  useEffect(() => {
    // Just a mock check for demo purposes
    const nearbyDanger = DANGER_ZONES.find(z => {
      const dist = Math.sqrt(Math.pow(z.position[0] - position[0], 2) + Math.pow(z.position[1] - position[1], 2));
      return dist < 0.005; // Roughly nearby
    });

    if (nearbyDanger) {
      setRiskWarning(`Caution: You are approaching a reported ${nearbyDanger.severity} risk area.`);
    } else {
      setRiskWarning(null);
    }
  }, [position]);

  const handleRouteSelect = () => {
    setActiveRoute(2); // Select the safe/green route
  };

  return (
    <div className="relative h-full w-full bg-gray-50">
      {/* Search Bar Overlay */}
      <div className="absolute top-4 left-4 right-4 z-[1000] space-y-3">
        <div className="bg-white rounded-2xl shadow-lg p-2 flex items-center gap-2 border border-gray-100">
          <Search className="text-shafer-grey ml-2" size={20} />
          <input 
            type="text" 
            placeholder="Where are you going?" 
            className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 text-sm py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={handleRouteSelect}
            className="bg-shafer-pink/10 p-2 rounded-xl text-shafer-pink hover:bg-shafer-pink hover:text-white transition-colors"
          >
            <Navigation size={18} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setShowSafetyLayer(!showSafetyLayer)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shadow-sm border transition-colors ${
              showSafetyLayer 
                ? 'bg-shafer-pink text-white border-shafer-pink' 
                : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            <ShieldCheck size={14} />
            Safety First
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-gray-600 text-xs font-medium whitespace-nowrap shadow-sm border border-gray-200">
            <AlertTriangle size={14} />
            Report Danger
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-gray-600 text-xs font-medium whitespace-nowrap shadow-sm border border-gray-200">
            <MapIcon size={14} />
            Congestion
          </button>
        </div>
      </div>

      {/* Risk Warning Banner */}
      {riskWarning && (
        <div className="absolute top-32 left-4 right-4 z-[1000] bg-shafer-red text-white p-3 rounded-xl shadow-lg flex items-start gap-3 animate-in slide-in-from-top-2">
          <AlertTriangle className="shrink-0 mt-0.5" size={20} />
          <div className="flex-1 text-sm font-medium">
            {riskWarning}
          </div>
          <button onClick={() => setRiskWarning(null)} className="text-white/80 hover:text-white">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Route Info Card */}
      {activeRoute && (
        <div className="absolute bottom-6 left-4 right-4 z-[1000] bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-gray-900">Safe Route to Library</h3>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                <ShieldCheck size={12} /> 98% Safety Score
              </p>
            </div>
            <button onClick={() => setActiveRoute(null)} className="text-gray-400">
              <X size={20} />
            </button>
          </div>
          <div className="flex gap-4 text-sm text-gray-600 mb-4">
            <span>12 min (0.8 mi)</span>
            <span>•</span>
            <span>Well lit</span>
          </div>
          <button className="w-full bg-shafer-pink text-white py-3 rounded-xl font-bold shadow-lg shadow-shafer-pink/20 hover:bg-shafer-pink/90 transition-colors">
            Start Navigation
          </button>
        </div>
      )}

      {/* Map */}
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={position} />
        
        <Marker position={position}>
          <Popup>
            You are here
          </Popup>
        </Marker>

        {showSafetyLayer && (
          <>
            {/* Danger Zones */}
            {DANGER_ZONES.map((zone) => (
              <Circle 
                key={zone.id}
                center={zone.position as [number, number]}
                pathOptions={{ color: '#E34F41', fillColor: '#E34F41', fillOpacity: 0.2 }}
                radius={200}
              >
                <Popup>
                  <div className="text-xs">
                    <strong className="text-shafer-red flex items-center gap-1">
                      <AlertTriangle size={12} /> High Risk Area
                    </strong>
                    <p className="mt-1 text-gray-600">{zone.reason}</p>
                  </div>
                </Popup>
              </Circle>
            ))}

            {/* Safe Zones */}
            {SAFE_ZONES.map((zone) => (
              <Circle 
                key={zone.id}
                center={zone.position as [number, number]}
                pathOptions={{ color: '#35D04C', fillColor: '#35D04C', fillOpacity: 0.1 }}
                radius={zone.radius}
              >
                <Popup>
                  <div className="text-xs">
                    <strong className="text-shafer-green flex items-center gap-1">
                      <ShieldCheck size={12} /> Safe Zone
                    </strong>
                    <p className="mt-1 text-gray-600">{zone.label}</p>
                  </div>
                </Popup>
              </Circle>
            ))}

            {/* Congestion Paths */}
            {CONGESTION_ZONES.map((zone) => (
              <Polyline 
                key={zone.id}
                positions={zone.path as [number, number][]}
                pathOptions={{ 
                  color: zone.color, 
                  weight: activeRoute === zone.id ? 8 : 5, 
                  opacity: activeRoute === zone.id ? 1 : 0.6 
                }}
              >
                <Popup>{zone.label}</Popup>
              </Polyline>
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
}
