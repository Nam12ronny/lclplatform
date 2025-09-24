import React, { useState } from 'react';
import { Heart, Trophy, Star, Camera, MessageSquare, Award, Zap, Target } from 'lucide-react';
import type { FanLeaderboardEntry } from '../types';

interface FanEngagementProps {
  leaderboard: FanLeaderboardEntry[];
}

export const FanEngagement: React.FC<FanEngagementProps> = ({ leaderboard }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'polls' | 'photos' | 'challenges'>('leaderboard');
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);

  const polls = [
    {
      id: '1',
      question: 'Who will be the tournament MVP?',
      options: [
        { name: 'John Smith', votes: 67, percentage: 45 },
        { name: 'Alex Brown', votes: 52, percentage: 35 },
        { name: 'James Wilson', votes: 30, percentage: 20 }
      ]
    },
    {
      id: '2',
      question: 'Best goal of the day?',
      options: [
        { name: 'Thunder Hawks vs Fire Dragons (Goal 1)', votes: 89, percentage: 52 },
        { name: 'Storm Eagles buzzer beater', votes: 45, percentage: 26 },
        { name: 'Ice Wolves comeback goal', votes: 38, percentage: 22 }
      ]
    }
  ];

  const challenges = [
    {
      id: '1',
      title: 'Perfect Predictor',
      description: 'Predict 5 match results correctly',
      progress: 3,
      total: 5,
      reward: '250 points',
      icon: Target
    },
    {
      id: '2',
      title: 'Photo Enthusiast',
      description: 'Upload 10 photos to the gallery',
      progress: 7,
      total: 10,
      reward: '150 points + Badge',
      icon: Camera
    },
    {
      id: '3',
      title: 'Super Fan',
      description: 'React to 20 different matches',
      progress: 12,
      total: 20,
      reward: '300 points + Special Badge',
      icon: Heart
    }
  ];

  const badges = [
    { name: 'Super Fan', icon: '⭐', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Predictor', icon: '🔮', color: 'bg-purple-100 text-purple-800' },
    { name: 'Quiz Master', icon: '🧠', color: 'bg-blue-100 text-blue-800' },
    { name: 'Photo King', icon: '📸', color: 'bg-green-100 text-green-800' },
    { name: 'Match Analyst', icon: '📊', color: 'bg-red-100 text-red-800' }
  ];

  const renderLeaderboard = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold flex items-center">
            <Trophy className="mr-2 text-yellow-500" size={20} />
            Top Fans This Week
          </h3>
        </div>
        <div className="p-4 space-y-3">
          {leaderboard.map((fan, index) => (
            <div key={fan.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                index === 0 ? 'bg-yellow-100 text-yellow-800' :
                index === 1 ? 'bg-gray-100 text-gray-800' :
                index === 2 ? 'bg-amber-100 text-amber-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {index < 3 ? (
                  index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'
                ) : (
                  index + 1
                )}
              </div>
              
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                {fan.avatar}
              </div>
              
              <div className="flex-1">
                <div className="font-medium">{fan.name}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {fan.badges.slice(0, 3).map((badge, badgeIndex) => (
                    <span key={badgeIndex} className={`px-2 py-1 rounded-full text-xs font-medium ${
                      badges.find(b => b.name === badge)?.color || 'bg-gray-100 text-gray-800'
                    }`}>
                      {badges.find(b => b.name === badge)?.icon} {badge}
                    </span>
                  ))}
                  {fan.badges.length > 3 && (
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                      +{fan.badges.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-blue-600">{fan.points.toLocaleString()}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Badges */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold mb-4">🏅 Available Badges</h3>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge, index) => (
            <div key={index} className={`p-3 rounded-lg border-2 border-dashed ${badge.color} border-opacity-50`}>
              <div className="text-center">
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="text-sm font-medium">{badge.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPolls = () => (
    <div className="space-y-4">
      {polls.map((poll) => (
        <div key={poll.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4">{poll.question}</h3>
          <div className="space-y-3">
            {poll.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedPoll(poll.id)}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{option.name}</span>
                  <span className="text-blue-600 font-bold">{option.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${option.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">{option.votes} votes</div>
              </button>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <span className="text-sm text-gray-500">
              Total votes: {poll.options.reduce((sum, opt) => sum + opt.votes, 0)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPhotos = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">📸 Fan Photo Gallery</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Upload Photo
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <Camera size={32} className="text-gray-400" />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                Fan Photo {index}
              </div>
              <button className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                <Heart size={12} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">124 photos uploaded today</span>
        </div>
      </div>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-4">
      {challenges.map((challenge) => {
        const IconComponent = challenge.icon;
        const progress = (challenge.progress / challenge.total) * 100;
        
        return (
          <div key={challenge.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <IconComponent className="text-blue-600" size={20} />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg">{challenge.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress}/{challenge.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium text-green-600">Reward: </span>
                    <span className="text-gray-600">{challenge.reward}</span>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {Math.round(progress)}% complete
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white text-center">
        <Zap size={32} className="mx-auto mb-3" />
        <h3 className="font-bold text-lg mb-2">Daily Bonus Challenge</h3>
        <p className="mb-4 opacity-90">Vote in 3 polls today for extra points!</p>
        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Start Challenge
        </button>
      </div>
    </div>
  );

  const tabs = [
    { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { key: 'polls', label: 'Polls', icon: MessageSquare },
    { key: 'photos', label: 'Photos', icon: Camera },
    { key: 'challenges', label: 'Challenges', icon: Star }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">💖 Fan Zone</h1>
        <p className="text-pink-100">Engage, compete, and win amazing prizes!</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
        <div className="grid grid-cols-4 gap-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                activeTab === key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'leaderboard' && renderLeaderboard()}
        {activeTab === 'polls' && renderPolls()}
        {activeTab === 'photos' && renderPhotos()}
        {activeTab === 'challenges' && renderChallenges()}
      </div>
    </div>
  );
};