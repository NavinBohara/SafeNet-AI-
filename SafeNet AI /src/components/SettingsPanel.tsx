import React, { useState } from 'react';
import { Settings, Shield, Bell, Users, Sliders, Globe, Lock, Database, AlertTriangle } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    toxicityThreshold: 70,
    mentalHealthSensitivity: 85,
    autoModeration: true,
    realTimeAlerts: true,
    emailNotifications: true,
    smsAlerts: false,
    dataRetention: 30,
    anonymizeData: true,
    shareInsights: false,
    apiAccess: true,
    multiLanguage: true,
    platforms: {
      twitter: true,
      instagram: true,
      tiktok: true,
      facebook: false,
      discord: true
    }
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updatePlatform = (platform: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: value
      }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Configure SafeNet AI detection parameters and preferences</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Detection Parameters</h3>
          </div>

          <div className="space-y-6">
            {/* Toxicity Threshold */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">Toxicity Detection Threshold</label>
                <span className="text-sm font-semibold text-gray-900">{settings.toxicityThreshold}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.toxicityThreshold}
                onChange={(e) => updateSetting('toxicityThreshold', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Less Sensitive</span>
                <span>More Sensitive</span>
              </div>
            </div>

            {/* Mental Health Sensitivity */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">Mental Health Alert Sensitivity</label>
                <span className="text-sm font-semibold text-gray-900">{settings.mentalHealthSensitivity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.mentalHealthSensitivity}
                onChange={(e) => updateSetting('mentalHealthSensitivity', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>

            {/* Auto Moderation */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Auto-Moderation</h4>
                <p className="text-xs text-gray-600">Automatically flag harmful content</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoModeration}
                  onChange={(e) => updateSetting('autoModeration', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>

          <div className="space-y-4">
            {[
              { key: 'realTimeAlerts', label: 'Real-time Alerts', description: 'Instant notifications for high-risk content' },
              { key: 'emailNotifications', label: 'Email Notifications', description: 'Daily summary reports via email' },
              { key: 'smsAlerts', label: 'SMS Alerts', description: 'Text message alerts for critical incidents' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onChange={(e) => updateSetting(item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Integration */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Platform Integration</h3>
          </div>

          <div className="space-y-4">
            {Object.entries(settings.platforms).map(([platform, enabled]) => (
              <div key={platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 capitalize">{platform}</h4>
                  <p className="text-xs text-gray-600">Monitor content from {platform}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => updatePlatform(platform, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Data */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Privacy & Data</h3>
          </div>

          <div className="space-y-6">
            {/* Data Retention */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">Data Retention Period (days)</label>
                <span className="text-sm font-semibold text-gray-900">{settings.dataRetention}</span>
              </div>
              <input
                type="range"
                min="7"
                max="365"
                value={settings.dataRetention}
                onChange={(e) => updateSetting('dataRetention', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>7 days</span>
                <span>1 year</span>
              </div>
            </div>

            {/* Privacy Options */}
            {[
              { key: 'anonymizeData', label: 'Anonymize User Data', description: 'Remove personally identifiable information' },
              { key: 'shareInsights', label: 'Share Anonymized Insights', description: 'Help improve detection algorithms' },
              { key: 'apiAccess', label: 'API Access', description: 'Allow third-party integrations' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onChange={(e) => updateSetting(item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Sliders className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Advanced Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <Database className="w-6 h-6 text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">Export Data</h4>
            <p className="text-xs text-gray-600">Download your detection data</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <AlertTriangle className="w-6 h-6 text-amber-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">Reset Settings</h4>
            <p className="text-xs text-gray-600">Restore default configuration</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <Users className="w-6 h-6 text-green-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">Team Access</h4>
            <p className="text-xs text-gray-600">Manage user permissions</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;