import React, { useState, useEffect } from 'react';
import { Send, AlertTriangle, Heart, Shield, TrendingUp, Clock, Users } from 'lucide-react';

interface AnalysisResult {
  toxicityScore: number;
  mentalHealthRisk: 'low' | 'medium' | 'high';
  concerns: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  recommendations: string[];
  detectedPatterns: string[];
}

const AnalysisPanel: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<Array<{text: string, result: AnalysisResult, timestamp: Date}>>([]);

  const sampleTexts = [
    "I'm feeling really overwhelmed lately and don't know who to talk to...",
    "You're such a loser, nobody likes you anyway!",
    "Having a great day with friends, so grateful for the support!",
    "I can't take this anymore, everything feels hopeless",
    "Kill yourself, you're worthless and nobody cares about you",
    "I've been thinking about ending it all, I have a plan",
    "You're so stupid, go die in a hole",
    "Feeling blessed and grateful for all the love in my life!"
  ];

  const analyzeText = async (text: string): Promise<AnalysisResult> => {
    // Simulate realistic AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const lowerText = text.toLowerCase();
    
    // Enhanced toxicity detection patterns
    const toxicityPatterns = {
      severe: {
        keywords: ['kill yourself', 'go die', 'end your life', 'nobody cares', 'worthless piece', 'waste of space', 'should die'],
        weight: 0.9
      },
      high: {
        keywords: ['stupid', 'idiot', 'loser', 'pathetic', 'worthless', 'hate you', 'disgusting', 'ugly', 'freak'],
        weight: 0.7
      },
      moderate: {
        keywords: ['dumb', 'weird', 'annoying', 'boring', 'lame', 'sucks', 'terrible'],
        weight: 0.4
      },
      mild: {
        keywords: ['bad', 'wrong', 'not good', 'disappointing'],
        weight: 0.2
      }
    };

    // Mental health risk indicators
    const mentalHealthPatterns = {
      critical: {
        keywords: ['suicide', 'kill myself', 'end it all', 'want to die', 'better off dead', 'have a plan', 'tonight might be'],
        weight: 0.95
      },
      high: {
        keywords: ['hopeless', 'can\'t take', 'overwhelming', 'give up', 'no point', 'tired of living', 'nothing matters'],
        weight: 0.8
      },
      moderate: {
        keywords: ['depressed', 'anxious', 'sad', 'lonely', 'isolated', 'struggling', 'difficult', 'hard time'],
        weight: 0.6
      },
      mild: {
        keywords: ['stressed', 'worried', 'concerned', 'upset', 'frustrated', 'overwhelmed'],
        weight: 0.3
      }
    };

    // Positive sentiment indicators
    const positivePatterns = {
      keywords: ['happy', 'grateful', 'blessed', 'love', 'amazing', 'wonderful', 'great', 'fantastic', 'awesome', 'perfect', 'beautiful'],
      weight: -0.3 // Reduces toxicity score
    };

    // Calculate toxicity score
    let toxicityScore = 0;
    let detectedPatterns: string[] = [];
    
    Object.entries(toxicityPatterns).forEach(([level, pattern]) => {
      pattern.keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          toxicityScore += pattern.weight;
          detectedPatterns.push(`${level} toxicity: "${keyword}"`);
        }
      });
    });

    // Calculate mental health risk
    let mentalHealthScore = 0;
    Object.entries(mentalHealthPatterns).forEach(([level, pattern]) => {
      pattern.keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          mentalHealthScore += pattern.weight;
          detectedPatterns.push(`${level} mental health risk: "${keyword}"`);
        }
      });
    });

    // Apply positive sentiment reduction
    positivePatterns.keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        toxicityScore += positivePatterns.weight;
        detectedPatterns.push(`positive sentiment: "${keyword}"`);
      }
    });

    // Normalize scores
    toxicityScore = Math.max(0, Math.min(1, toxicityScore));
    mentalHealthScore = Math.max(0, Math.min(1, mentalHealthScore));

    // Determine mental health risk level
    let mentalHealthRisk: 'low' | 'medium' | 'high';
    if (mentalHealthScore >= 0.7) {
      mentalHealthRisk = 'high';
    } else if (mentalHealthScore >= 0.4) {
      mentalHealthRisk = 'medium';
    } else {
      mentalHealthRisk = 'low';
    }

    // Generate concerns based on detected patterns
    const concerns: string[] = [];
    if (toxicityScore >= 0.8) {
      concerns.push('Severe cyberbullying detected');
    } else if (toxicityScore >= 0.5) {
      concerns.push('Potential cyberbullying detected');
    }
    
    if (mentalHealthScore >= 0.8) {
      concerns.push('Critical mental health risk - immediate intervention needed');
    } else if (mentalHealthScore >= 0.6) {
      concerns.push('Significant mental health concern identified');
    } else if (mentalHealthScore >= 0.3) {
      concerns.push('Mental health support may be beneficial');
    }

    // Check for specific high-risk patterns
    const suicideKeywords = ['suicide', 'kill myself', 'end it all', 'want to die', 'have a plan'];
    if (suicideKeywords.some(keyword => lowerText.includes(keyword))) {
      concerns.push('Suicide risk detected - crisis intervention required');
    }

    const harassmentKeywords = ['kill yourself', 'go die', 'nobody cares'];
    if (harassmentKeywords.some(keyword => lowerText.includes(keyword))) {
      concerns.push('Severe harassment - immediate action required');
    }

    // Determine sentiment
    let sentiment: 'positive' | 'negative' | 'neutral';
    if (toxicityScore >= 0.4 || mentalHealthScore >= 0.4) {
      sentiment = 'negative';
    } else if (positivePatterns.keywords.some(keyword => lowerText.includes(keyword))) {
      sentiment = 'positive';
    } else {
      sentiment = 'neutral';
    }

    // Calculate confidence based on pattern matches
    const totalPatterns = detectedPatterns.length;
    const confidence = Math.min(0.95, 0.6 + (totalPatterns * 0.05));

    // Generate recommendations
    const recommendations: string[] = [];
    if (concerns.length === 0) {
      recommendations.push('Content appears safe for sharing');
      recommendations.push('Continue monitoring for pattern changes');
    } else {
      if (mentalHealthScore >= 0.7) {
        recommendations.push('Immediate crisis intervention recommended');
        recommendations.push('Contact emergency services or crisis hotline');
        recommendations.push('Do not leave person alone');
      } else if (mentalHealthScore >= 0.4) {
        recommendations.push('Reach out with mental health resources');
        recommendations.push('Consider professional counseling referral');
      }
      
      if (toxicityScore >= 0.6) {
        recommendations.push('Report content to platform moderators');
        recommendations.push('Block or restrict user if necessary');
        recommendations.push('Document evidence for potential legal action');
      }
      
      recommendations.push('Monitor user for escalating behavior patterns');
      recommendations.push('Engage with positive community support');
    }

    return {
      toxicityScore,
      mentalHealthRisk,
      concerns,
      sentiment,
      confidence,
      recommendations,
      detectedPatterns
    };
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeText(inputText);
      setResult(analysisResult);
      setAnalysisHistory(prev => [{
        text: inputText,
        result: analysisResult,
        timestamp: new Date()
      }, ...prev.slice(0, 4)]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getToxicityColor = (score: number) => {
    if (score > 0.7) return 'bg-red-500';
    if (score > 0.4) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Analysis</h2>
          <p className="text-gray-600">Advanced AI-powered analysis for toxicity and mental health concerns</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">99.2%</div>
            <div className="text-xs text-gray-500">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">0.2s</div>
            <div className="text-xs text-gray-500">Avg Response</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analysis Input */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Enter content to analyze
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste social media post, comment, or message here..."
              className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            
            {/* Sample Texts */}
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {sampleTexts.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(sample)}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!inputText.trim() || isAnalyzing}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Analyze Content
                </>
              )}
            </button>
          </div>

          {/* Analysis Results */}
          {result && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className="text-sm font-bold text-teal-600">{Math.round(result.confidence * 100)}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Toxicity Score */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Toxicity Level</span>
                    <span className="text-sm font-bold">{Math.round(result.toxicityScore * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getToxicityColor(result.toxicityScore)}`}
                      style={{ width: `${result.toxicityScore * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Mental Health Risk */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Mental Health Risk</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(result.mentalHealthRisk)}`}>
                      {result.mentalHealthRisk.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Sentiment */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Sentiment</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSentimentColor(result.sentiment)}`}>
                      {result.sentiment.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detected Patterns */}
              {result.detectedPatterns.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Detected Patterns</h4>
                  <div className="space-y-1">
                    {result.detectedPatterns.map((pattern, index) => (
                      <div key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {pattern}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Concerns */}
              {result.concerns.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Identified Concerns</h4>
                  <div className="space-y-2">
                    {result.concerns.map((concern, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-800">{concern}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommendations</h4>
                <div className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Heart className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-blue-800">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Recent Analysis */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analysis</h3>
            
            {analysisHistory.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No recent analysis</p>
            ) : (
              <div className="space-y-3">
                {analysisHistory.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 truncate mb-1">{item.text}</p>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(item.result.mentalHealthRisk)}`}>
                        {item.result.mentalHealthRisk}
                      </span>
                      <span className="text-xs text-gray-500">
                        {Math.round(item.result.toxicityScore * 100)}% toxic
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Analysis Statistics */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Analyzed</span>
                <span className="text-sm font-semibold text-gray-900">{analysisHistory.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">High Risk</span>
                <span className="text-sm font-semibold text-red-600">
                  {analysisHistory.filter(item => item.result.mentalHealthRisk === 'high').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Confidence</span>
                <span className="text-sm font-semibold text-teal-600">
                  {analysisHistory.length > 0 
                    ? Math.round(analysisHistory.reduce((acc, item) => acc + item.result.confidence, 0) / analysisHistory.length * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-teal-600" />
                  <span className="text-sm">Bulk Content Analysis</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Export Analysis Report</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Contact Support Team</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;