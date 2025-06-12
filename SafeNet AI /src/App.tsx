import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Heart, BarChart3, Settings, HelpCircle, Users, Zap, CheckCircle, XCircle } from 'lucide-react';
import Header from './components/Header';
import AnalysisPanel from './components/AnalysisPanel';
import Dashboard from './components/Dashboard';
import AlertCenter from './components/AlertCenter';
import ResourceCenter from './components/ResourceCenter';
import SettingsPanel from './components/SettingsPanel';

type TabType = 'analyze' | 'dashboard' | 'alerts' | 'resources' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('analyze');
  const [alertCount, setAlertCount] = useState(3);

  const tabs = [
    { id: 'analyze' as TabType, label: 'Analyze', icon: Zap, color: 'text-teal-600' },
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: BarChart3, color: 'text-blue-600' },
    { id: 'alerts' as TabType, label: 'Alerts', icon: AlertTriangle, color: 'text-amber-600', badge: alertCount },
    { id: 'resources' as TabType, label: 'Resources', icon: Heart, color: 'text-rose-600' },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings, color: 'text-gray-600' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'analyze':
        return <AnalysisPanel />;
      case 'dashboard':
        return <Dashboard />;
      case 'alerts':
        return <AlertCenter onAlertCountChange={setAlertCount} />;
      case 'resources':
        return <ResourceCenter />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <AnalysisPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Header />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 p-6">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-white to-gray-50 shadow-md border border-gray-200 text-gray-900' 
                      : 'hover:bg-white/50 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? tab.color : 'text-gray-400 group-hover:text-gray-600'} transition-colors`} />
                  <span className="font-medium">{tab.label}</span>
                  {tab.badge && tab.badge > 0 && (
                    <span className="ml-auto bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border border-teal-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Today's Impact</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Posts Analyzed</span>
                <span className="text-sm font-semibold text-teal-700">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Risks Prevented</span>
                <span className="text-sm font-semibold text-green-700">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Users Helped</span>
                <span className="text-sm font-semibold text-blue-700">189</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}

export default App;