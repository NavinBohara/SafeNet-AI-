import React from 'react';
import { Heart, Phone, MessageCircle, BookOpen, Users, ExternalLink, Clock, MapPin } from 'lucide-react';

const ResourceCenter: React.FC = () => {
  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 free and confidential support for people in distress',
      availability: '24/7',
      languages: ['English', 'Spanish'],
      website: 'suicidepreventionlifeline.org'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free, 24/7 support for those in crisis',
      availability: '24/7',
      languages: ['English', 'Spanish'],
      website: 'crisistextline.org'
    },
    {
      name: 'LGBTQ National Hotline',
      phone: '1-888-843-4564',
      description: 'Confidential support for LGBTQ+ community',
      availability: 'Mon-Fri 4PM-12AM ET, Sat 12PM-5PM ET',
      languages: ['English'],
      website: 'lgbthotline.org'
    }
  ];

  const mentalHealthResources = [
    {
      title: 'Understanding Depression in Teens',
      description: 'Comprehensive guide to recognizing and addressing teenage depression',
      type: 'Guide',
      readTime: '8 min read',
      category: 'Depression'
    },
    {
      title: 'Cyberbullying Prevention Strategies',
      description: 'Evidence-based approaches to prevent and respond to online harassment',
      type: 'Article',
      readTime: '12 min read',
      category: 'Cyberbullying'
    },
    {
      title: 'Building Resilience in Young People',
      description: 'Tools and techniques for developing emotional resilience',
      type: 'Toolkit',
      readTime: '15 min read',
      category: 'Resilience'
    },
    {
      title: 'Social Media and Mental Health',
      description: 'Research-backed insights on social media\'s impact on wellbeing',
      type: 'Research',
      readTime: '20 min read',
      category: 'Digital Wellness'
    }
  ];

  const supportGroups = [
    {
      name: 'Teen Support Circle',
      description: 'Peer support group for teenagers facing mental health challenges',
      schedule: 'Tuesdays 7PM ET',
      format: 'Virtual',
      facilitator: 'Licensed Counselor'
    },
    {
      name: 'Parents of Struggling Teens',
      description: 'Support network for parents navigating teenage mental health',
      schedule: 'Thursdays 8PM ET',
      format: 'Hybrid',
      facilitator: 'Family Therapist'
    },
    {
      name: 'Cyberbullying Survivors',
      description: 'Recovery-focused group for those affected by online harassment',
      schedule: 'Saturdays 2PM ET',
      format: 'Virtual',
      facilitator: 'Trauma Specialist'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resource Center</h2>
          <p className="text-gray-600">Mental health support, crisis intervention, and educational resources</p>
        </div>
        <button className="px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-medium hover:bg-pink-700 transition-colors">
          Request New Resource
        </button>
      </div>

      {/* Crisis Resources */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <Phone className="w-4 h-4 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Crisis Support</h3>
          <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-200">
            IMMEDIATE HELP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {crisisResources.map((resource, index) => (
            <div key={index} className="p-4 border border-red-200 rounded-xl bg-red-50">
              <h4 className="font-semibold text-gray-900 mb-2">{resource.name}</h4>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-mono font-semibold text-red-800">{resource.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span className="text-xs text-red-700">{resource.availability}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{resource.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {resource.languages.map(lang => (
                    <span key={lang} className="px-2 py-1 bg-white text-xs text-red-700 rounded border border-red-200">
                      {lang}
                    </span>
                  ))}
                </div>
                <button className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  Visit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Educational Resources */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Educational Resources</h3>
          </div>

          <div className="space-y-4">
            {mentalHealthResources.map((resource, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded border border-blue-200">
                    {resource.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {resource.readTime}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {resource.category}
                    </span>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    Read More
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Groups */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Support Groups</h3>
          </div>

          <div className="space-y-4">
            {supportGroups.map((group, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">{group.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Schedule:</span>
                    <span className="font-medium">{group.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">{group.format}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Facilitator:</span>
                    <span className="font-medium">{group.facilitator}</span>
                  </div>
                </div>
                <button className="mt-3 w-full px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                  Join Group
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Actions */}
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl border border-teal-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Call 988</div>
              <div className="text-xs text-gray-600">Crisis Support</div>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Text HOME</div>
              <div className="text-xs text-gray-600">to 741741</div>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Find Help</div>
              <div className="text-xs text-gray-600">Local Resources</div>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Self-Care</div>
              <div className="text-xs text-gray-600">Tools & Tips</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCenter;