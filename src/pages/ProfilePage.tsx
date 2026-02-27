import React from 'react';
import { Settings, ChevronRight, Shield, Bell, Lock, User, LogOut } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-20">
      <div className="bg-white p-6 pb-8 rounded-b-3xl shadow-sm">
        <div className="flex justify-end mb-4">
          <button className="text-gray-400 hover:text-gray-600">
            <Settings size={24} />
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden border-4 border-white shadow-lg">
            <img src="https://picsum.photos/seed/user/200" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Emily Parker</h1>
          <p className="text-gray-500 text-sm">New York, USA</p>
          
          <div className="flex gap-4 mt-6 w-full justify-center">
            <div className="text-center px-6 py-2 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-xl font-bold text-shafer-pink">24</div>
              <div className="text-[10px] text-gray-400 uppercase">Trips</div>
            </div>
            <div className="text-center px-6 py-2 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-xl font-bold text-shafer-green">12</div>
              <div className="text-[10px] text-gray-400 uppercase">Helpers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">Safety Settings</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <MenuItem icon={Shield} label="Trusted Contacts" value="3 Active" />
            <MenuItem icon={Bell} label="Notifications" toggle />
            <MenuItem icon={Lock} label="Privacy & Location" />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">Account</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <MenuItem icon={User} label="Personal Information" />
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-red-500">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                <LogOut size={16} />
              </div>
              <span className="font-medium flex-1 text-left">Log Out</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function MenuItem({ icon: Icon, label, value, toggle }: { icon: any, label: string, value?: string, toggle?: boolean }) {
  return (
    <button className="w-full flex items-center gap-4 p-4 border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-shafer-pink/10 text-shafer-pink flex items-center justify-center">
        <Icon size={16} />
      </div>
      <span className="font-medium text-gray-700 flex-1 text-left text-sm">{label}</span>
      {value && <span className="text-xs text-gray-400 font-medium">{value}</span>}
      {toggle ? (
        <div className="w-10 h-6 bg-shafer-green rounded-full relative">
          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
        </div>
      ) : (
        <ChevronRight size={16} className="text-gray-300" />
      )}
    </button>
  );
}
