import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Users, Heart, Clock, Target } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Posts Analyzed Today',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      title: 'High-Risk Detections',
      value: '23',
      change: '-8%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50 border-red-200'
    },
    {
      title: 'Users Helped',
      value: '189',
      change: '+24%',
      trend: 'up',
      icon: Heart,
      color: 'text-pink-600 bg-pink-50 border-pink-200'
    },
    {
      title: 'Prevention Success',
      value: '96.8%',
      change: '+2.1%',
      trend: 'up',
      icon: Shield,
      color: 'text-green-600 bg-green-50 border-green-200'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'high',
      message: 'Suicide ideation detected in user post',
      user: '@user_anonymous_123',
      time: '2 min ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'medium',
      message: 'Cyberbullying pattern identified',
      user: '@social_user_456',
      time: '15 min ago',
      status: 'resolved'
    },
    {
      id: 3,
      type: 'high',
      message: 'Self-harm content detected',
      user: '@teen_user_789',
      time: '1 hour ago',
      status: 'active'
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-red-500' : 'bg-green-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SafeNet Dashboard</h2>
          <p className="text-gray-600">Real-time monitoring and analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Detection Trends</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Low Risk</span>
              </div>
            </div>
          </div>
          
          {/* Simulated Chart */}
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Interactive analytics chart would be displayed here</p>
              <p className="text-sm text-gray-500">Showing detection patterns over time</p>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAlertColor(alert.type)}`}>
                    {alert.type.toUpperCase()}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(alert.status)}`}></div>
                </div>
                <p className="text-sm text-gray-900 mb-1">{alert.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{alert.user}</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Response Time</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">0.3s</div>
          <p className="text-sm text-gray-600">Average analysis time</p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Accuracy Rate</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">98.5%</div>
          <p className="text-sm text-gray-600">Detection accuracy</p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Users Protected</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">12.4K</div>
          <p className="text-sm text-gray-600">This month</p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;