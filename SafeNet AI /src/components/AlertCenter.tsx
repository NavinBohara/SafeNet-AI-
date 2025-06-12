import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, User, MessageSquare, Phone, Mail, ExternalLink } from 'lucide-react';

interface Alert {
  id: number;
  type: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  user: string;
  platform: string;
  timestamp: Date;
  status: 'active' | 'resolved' | 'escalated';
  content: string;
  riskFactors: string[];
  interventions: string[];
}

interface AlertCenterProps {
  onAlertCountChange: (count: number) => void;
}

const AlertCenter: React.FC<AlertCenterProps> = ({ onAlertCountChange }) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'high',
      title: 'Suicide Ideation Detected',
      description: 'User expressing thoughts of self-harm with specific plans',
      user: '@concerned_teen_123',
      platform: 'Instagram',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      status: 'active',
      content: "I can't take this anymore. I've been thinking about ending it all. I have a plan and I think tonight might be the night.",
      riskFactors: ['Suicide ideation', 'Specific plan mentioned', 'Immediate timeline'],
      interventions: ['Crisis hotline contact', 'Platform notification', 'Emergency services alert']
    },
    {
      id: 2,
      type: 'high',
      title: 'Cyberbullying Campaign',
      description: 'Coordinated harassment targeting vulnerable individual',
      user: '@student_victim_456',
      platform: 'TikTok',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'active',
      content: "Multiple users posting harmful content about me. They're sharing my personal info and making threats.",
      riskFactors: ['Coordinated harassment', 'Doxxing attempt', 'Multiple platforms'],
      interventions: ['Content removal request', 'Account reporting', 'School notification']
    },
    {
      id: 3,
      type: 'medium',
      title: 'Depression Indicators',
      description: 'Pattern of posts indicating worsening mental health',
      user: '@young_adult_789',
      platform: 'Twitter',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'escalated',
      content: "Everything feels pointless lately. I haven't left my room in days. My friends don't understand.",
      riskFactors: ['Social isolation', 'Hopelessness', 'Declining function'],
      interventions: ['Mental health resources shared', 'Friend network notified', 'Follow-up scheduled']
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved' | 'escalated'>('all');

  useEffect(() => {
    const activeAlerts = alerts.filter(alert => alert.status === 'active').length;
    onAlertCountChange(activeAlerts);
  }, [alerts, onAlertCountChange]);

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.status === filter
  );

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-amber-200 bg-amber-50';
      default: return 'border-green-200 bg-green-50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'high': return 'text-red-800 bg-red-100 border-red-200';
      case 'medium': return 'text-amber-800 bg-amber-100 border-amber-200';
      default: return 'text-green-800 bg-green-100 border-green-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-800 bg-red-100 border-red-200';
      case 'resolved': return 'text-green-800 bg-green-100 border-green-200';
      case 'escalated': return 'text-purple-800 bg-purple-100 border-purple-200';
      default: return 'text-gray-800 bg-gray-100 border-gray-200';
    }
  };

  const updateAlertStatus = (alertId: number, newStatus: 'resolved' | 'escalated') => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes} min ago`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Alert Center</h2>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
              {alerts.filter(a => a.status === 'active').length} Active
            </span>
          </div>
          <p className="text-gray-600">Monitor and respond to safety alerts in real-time</p>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm"
          >
            <option value="all">All Alerts</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
            <option value="escalated">Escalated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-md ${
                getAlertColor(alert.type)
              } ${selectedAlert?.id === alert.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.type === 'high' ? 'text-red-600' : 
                    alert.type === 'medium' ? 'text-amber-600' : 'text-green-600'
                  }`} />
                  <div>
                    <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(alert.type)}`}>
                    {alert.type.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}>
                    {alert.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {alert.user}
                  </span>
                  <span>{alert.platform}</span>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {getTimeAgo(alert.timestamp)}
                </span>
              </div>

              {alert.status === 'active' && (
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateAlertStatus(alert.id, 'resolved');
                    }}
                    className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark Resolved
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateAlertStatus(alert.id, 'escalated');
                    }}
                    className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Escalate
                  </button>
                </div>
              )}
            </div>
          ))}

          {filteredAlerts.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts found</h3>
              <p className="text-gray-600">All clear! No alerts matching your current filter.</p>
            </div>
          )}
        </div>

        {/* Alert Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          {selectedAlert ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Alert Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">User:</span>
                    <p className="text-sm text-gray-900">{selectedAlert.user}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Platform:</span>
                    <p className="text-sm text-gray-900">{selectedAlert.platform}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Content:</span>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg italic">
                      "{selectedAlert.content}"
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Risk Factors</h4>
                <div className="space-y-2">
                  {selectedAlert.riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-800">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Interventions</h4>
                <div className="space-y-2">
                  {selectedAlert.interventions.map((intervention, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-blue-800">{intervention}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Contact Crisis Hotline</span>
                  </button>
                  <button className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Send Resources</span>
                  </button>
                  <button className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">View Full Profile</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select an Alert</h3>
              <p className="text-gray-600">Choose an alert from the list to view details and take action.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertCenter;