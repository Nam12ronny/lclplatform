@@ .. @@
 import React, { useState } from 'react';
-import { Heart, Trophy, Star, Camera, MessageSquare, Award, Zap, Target } from 'lucide-react';
-import type { FanLeaderboardEntry } from '../types';
+import { Heart, Trophy, Star, Camera, MessageSquare, Award, Zap, Target, CheckCircle, Clock, TrendingUp } from 'lucide-react';
+import type { FanLeaderboardEntry, Poll, Prediction, Match } from '../types';
+import { SocialFeed } from './SocialFeed';

 interface FanEngagementProps {
   leaderboard: FanLeaderboardEntry[];
+  polls: Poll[];
+  predictions: Prediction[];
+  matches: Match[];
+  socialPosts: any[];
+  onVote: (pollId: string, optionId: string) => void;
+  onPredict: (matchId: string, homeScore: number, awayScore: number) => void;
+  onLikePost: (postId: string) => void;
+  onCommentPost: (postId: string, comment: string) => void;
 }

-export const FanEngagement: React.FC<FanEngagementProps> = ({ leaderboard }) => {
-  const [activeTab, setActiveTab] = useState<'leaderboard' | 'polls' | 'photos' | 'challenges'>('leaderboard');
-  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
+export const FanEngagement: React.FC<FanEngagementProps> = ({ 
+  leaderboard, 
+  polls, 
+  predictions, 
+  matches, 
+  socialPosts,
+  onVote,
+  onPredict,
+  onLikePost,
+  onCommentPost
+}) => {
+  const [activeTab, setActiveTab] = useState<'leaderboard' | 'polls' | 'photos' | 'challenges' | 'feed' | 'predictions'>('leaderboard');
+  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
+  const [predictionScores, setPredictionScores] = useState<{ [key: string]: { home: number; away: number } }>({});

@@ .. @@
-  const polls = [
-    {
-      id: '1',
-      question: 'Who will be the tournament MVP?',
-      options: [
-        { name: 'John Smith', votes: 67, percentage: 45 },
-        { name: 'Alex Brown', votes: 52, percentage: 35 },
-        { name: 'James Wilson', votes: 30, percentage: 20 }
-      ]
-    },
-    {
-      id: '2',
-      question: 'Best goal of the day?',
-      options: [
-        { name: 'Thunder Hawks vs Fire Dragons (Goal 1)', votes: 89, percentage: 52 },
-        { name: 'Storm Eagles buzzer beater', votes: 45, percentage: 26 },
-        { name: 'Ice Wolves comeback goal', votes: 38, percentage: 22 }
-      ]
-    }
-  ];
+  const upcomingMatches = matches.filter(m => m.status === 'Scheduled');

@@ .. @@
   const renderPolls = () => (
     <div className="space-y-4">
       {polls.map((poll) => (
         <div key={poll.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
-          <h3 className="font-bold mb-4">{poll.question}</h3>
+          <div className="flex justify-between items-start mb-4">
+            <h3 className="font-bold flex-1">{poll.question}</h3>
+            <div className="text-xs text-gray-500 flex items-center space-x-1">
+              <Clock size={12} />
+              <span>Expires in 2h</span>
+            </div>
+          </div>
           <div className="space-y-3">
             {poll.options.map((option, index) => (
               <button
                 key={index}
-                onClick={() => setSelectedPoll(poll.id)}
-                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
+                onClick={() => !poll.hasVoted && onVote(poll.id, option.id)}
+                disabled={poll.hasVoted}
+                className={`w-full p-3 text-left border rounded-lg transition-all duration-300 ${
+                  poll.hasVoted 
+                    ? 'border-gray-200 cursor-not-allowed' 
+                    : 'border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer'
+                }`}
               >
                 <div className="flex justify-between items-center mb-2">
-                  <span className="font-medium">{option.name}</span>
-                  <span className="text-blue-600 font-bold">{option.percentage}%</span>
+                  <span className="font-medium">{option.text}</span>
+                  <div className="flex items-center space-x-2">
+                    <span className="text-blue-600 font-bold">{option.percentage}%</span>
+                    {poll.hasVoted && (
+                      <CheckCircle size={16} className="text-green-500" />
+                    )}
+                  </div>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2">
                   <div 
-                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
+                    className={`h-2 rounded-full transition-all duration-500 ${
+                      poll.hasVoted ? 'bg-blue-600' : 'bg-blue-400'
+                    }`}
                     style={{ width: `${option.percentage}%` }}
                   ></div>
                 </div>
                 <div className="text-sm text-gray-500 mt-1">{option.votes} votes</div>
               </button>
             ))}
           </div>
-          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
-            <span className="text-sm text-gray-500">
-              Total votes: {poll.options.reduce((sum, opt) => sum + opt.votes, 0)}
-            </span>
+          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
+            <span className="text-sm text-gray-500">Total votes: {poll.totalVotes}</span>
+            {poll.hasVoted && (
+              <div className="flex items-center space-x-1 text-green-600 text-sm">
+                <CheckCircle size={14} />
+                <span>Voted</span>
+              </div>
+            )}
           </div>
         </div>
       ))}
+      
+      {/* Create Poll CTA */}
+      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center">
+        <MessageSquare size={32} className="mx-auto mb-3" />
+        <h3 className="font-bold text-lg mb-2">Create Your Own Poll</h3>
+        <p className="mb-4 opacity-90">Ask the community what they think!</p>
+        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
+          Create Poll
+        </button>
+      </div>
     </div>
   );

@@ .. @@
     </div>
   );

+  const renderPredictions = () => (
+    <div className="space-y-4">
+      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white text-center">
+        <Target size={32} className="mx-auto mb-3" />
+        <h3 className="font-bold text-lg mb-2">Match Predictions</h3>
+        <p className="mb-4 opacity-90">Predict match results and earn points!</p>
+        <div className="bg-white/20 rounded-lg px-4 py-2 inline-block">
+          <span className="text-sm">Correct prediction = 50 points</span>
+        </div>
+      </div>

+      {/* My Predictions */}
+      {predictions.length > 0 && (
+        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
+          <h3 className="font-bold mb-4 flex items-center">
+            <Trophy className="mr-2 text-yellow-500" size={20} />
+            My Predictions
+          </h3>
+          <div className="space-y-3">
+            {predictions.map((prediction) => (
+              <div key={prediction.id} className="p-3 border border-gray-200 rounded-lg">
+                <div className="flex justify-between items-center mb-2">
+                  <div className="text-sm font-medium">
+                    {prediction.match.homeTeam.name} vs {prediction.match.awayTeam.name}
+                  </div>
+                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
+                    prediction.status === 'correct' ? 'bg-green-100 text-green-800' :
+                    prediction.status === 'incorrect' ? 'bg-red-100 text-red-800' :
+                    'bg-yellow-100 text-yellow-800'
+                  }`}>
+                    {prediction.status === 'pending' ? 'Pending' : 
+                     prediction.status === 'correct' ? `+${prediction.points} pts` : 
+                     'Incorrect'}
+                  </div>
+                </div>
+                <div className="text-center">
+                  <span className="font-bold text-lg">
+                    {prediction.homeScore} - {prediction.awayScore}
+                  </span>
+                </div>
+              </div>
+            ))}
+          </div>
+        </div>
+      )}

+      {/* Upcoming Matches for Prediction */}
+      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
+        <div className="p-4 border-b border-gray-100">
+          <h3 className="font-bold">🔮 Predict Upcoming Matches</h3>
+        </div>
+        <div className="p-4 space-y-4">
+          {upcomingMatches.slice(0, 3).map((match) => (
+            <div key={match.id} className="border border-gray-200 rounded-lg p-4">
+              <div className="flex items-center justify-between mb-4">
+                <div className="flex items-center space-x-3">
+                  <span className="text-lg">{match.homeTeam.logo}</span>
+                  <span className="font-medium text-sm">{match.homeTeam.name}</span>
+                </div>
+                <div className="text-center">
+                  <div className="text-xs text-gray-500 mb-1">{match.sport}</div>
+                  <div className="text-sm font-medium">{match.time}</div>
+                </div>
+                <div className="flex items-center space-x-3">
+                  <span className="font-medium text-sm">{match.awayTeam.name}</span>
+                  <span className="text-lg">{match.awayTeam.logo}</span>
+                </div>
+              </div>
+              
+              <div className="flex items-center justify-center space-x-4">
+                <div className="text-center">
+                  <input
+                    type="number"
+                    min="0"
+                    max="20"
+                    value={predictionScores[match.id]?.home || ''}
+                    onChange={(e) => setPredictionScores(prev => ({
+                      ...prev,
+                      [match.id]: { ...prev[match.id], home: parseInt(e.target.value) || 0 }
+                    }))}
+                    className="w-16 h-12 text-center border border-gray-300 rounded-lg font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
+                    placeholder="0"
+                  />
+                  <div className="text-xs text-gray-500 mt-1">Home</div>
+                </div>
+                
+                <div className="text-2xl font-bold text-gray-400">-</div>
+                
+                <div className="text-center">
+                  <input
+                    type="number"
+                    min="0"
+                    max="20"
+                    value={predictionScores[match.id]?.away || ''}
+                    onChange={(e) => setPredictionScores(prev => ({
+                      ...prev,
+                      [match.id]: { ...prev[match.id], away: parseInt(e.target.value) || 0 }
+                    }))}
+                    className="w-16 h-12 text-center border border-gray-300 rounded-lg font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
+                    placeholder="0"
+                  />
+                  <div className="text-xs text-gray-500 mt-1">Away</div>
+                </div>
+              </div>
+              
+              <button
+                onClick={() => {
+                  const scores = predictionScores[match.id];
+                  if (scores && (scores.home >= 0 && scores.away >= 0)) {
+                    onPredict(match.id, scores.home, scores.away);
+                  }
+                }}
+                disabled={!predictionScores[match.id]?.home && predictionScores[match.id]?.home !== 0}
+                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
+              >
+                Submit Prediction (+50 points)
+              </button>
+            </div>
+          ))}
+        </div>
+      </div>
+      
+      {/* Prediction Leaderboard */}
+      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
+        <h3 className="font-bold mb-4 flex items-center">
+          <TrendingUp className="mr-2 text-green-500" size={20} />
+          Top Predictors This Week
+        </h3>
+        <div className="space-y-3">
+          {[
+            { name: 'Sarah Johnson', avatar: '👩‍💼', correct: 8, total: 10, points: 400 },
+            { name: 'Mike Chen', avatar: '👨‍💻', correct: 6, total: 8, points: 300 },
+            { name: 'Lisa Rodriguez', avatar: '👩‍⚕️', correct: 5, total: 7, points: 250 }
+          ].map((predictor, index) => (
+            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
+              <div className="flex items-center space-x-3">
+                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
+                  index === 0 ? 'bg-yellow-100 text-yellow-800' :
+                  index === 1 ? 'bg-gray-100 text-gray-800' :
+                  'bg-amber-100 text-amber-800'
+                }`}>
+                  {index + 1}
+                </div>
+                <span className="text-lg">{predictor.avatar}</span>
+                <div>
+                  <div className="font-medium">{predictor.name}</div>
+                  <div className="text-sm text-gray-500">
+                    {predictor.correct}/{predictor.total} correct
+                  </div>
+                </div>
+              </div>
+              <div className="text-right">
+                <div className="font-bold text-green-600">{predictor.points}</div>
+                <div className="text-xs text-gray-500">points</div>
+              </div>
+            </div>
+          ))}
+        </div>
+      </div>
+    </div>
+  );
+
+  const renderFeed = () => (
+    <SocialFeed 
+      posts={socialPosts}
+      onLike={onLikePost}
+      onComment={onCommentPost}
+    />
+  );
+
   const tabs = [
     { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
+    { key: 'feed', label: 'Feed', icon: MessageSquare },
     { key: 'polls', label: 'Polls', icon: MessageSquare },
+    { key: 'predictions', label: 'Predict', icon: Target },
     { key: 'photos', label: 'Photos', icon: Camera },
     { key: 'challenges', label: 'Challenges', icon: Star }
   ];

@@ .. @@
       {/* Tab Navigation */}
-      <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
-        <div className="grid grid-cols-4 gap-1">
+      <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 overflow-x-auto">
+        <div className="flex space-x-1 min-w-max">
           {tabs.map(({ key, label, icon: Icon }) => (
             <button
               key={key}
               onClick={() => setActiveTab(key as any)}
-              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
+              className={`flex flex-col items-center p-3 rounded-lg transition-all min-w-0 flex-shrink-0 ${
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
+        {activeTab === 'feed' && renderFeed()}
         {activeTab === 'polls' && renderPolls()}
+        {activeTab === 'predictions' && renderPredictions()}
         {activeTab === 'photos' && renderPhotos()}
         {activeTab === 'challenges' && renderChallenges()}
       </div>
     </div>
   );
 };