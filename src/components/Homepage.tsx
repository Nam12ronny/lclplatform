@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { Play, Clock, Trophy, TrendingUp } from 'lucide-react';
+import { Play, Clock, Trophy, TrendingUp, MapPin } from 'lucide-react';
 import type { Match, Team, Player } from '../types';

@@ .. @@
   const liveMatches = matches.filter(m => m.status === 'Live');
   const upcomingMatches = matches.filter(m => m.status === 'Scheduled');
   const topScorers = players.sort((a, b) => b.goals - a.goals).slice(0, 3);
+  
+  const sports = ['Football', 'Volleyball', 'Netball', 'Tag of War', 'Aerobics'];
+  const getSportEmoji = (sport: string) => {
+    const emojis: { [key: string]: string } = {
+      'Football': '⚽',
+      'Volleyball': '🏐',
+      'Netball': '🥅',
+      'Tag of War': '🪢',
+      'Aerobics': '💪'
+    };
+    return emojis[sport] || '🏆';
+  };

   // Animated score ticker
   useEffect(() => {
-    if (liveMatches.length > 1) {
+    if (liveMatches.length > 0) {
       const interval = setInterval(() => {
         setTickerIndex(prev => (prev + 1) % liveMatches.length);
       }, 4000);
       return () => clearInterval(interval);
     }
   }, [liveMatches.length]);

@@ .. @@
       {/* Live Score Ticker */}
       {liveMatches.length > 0 && (
-        <div className="bg-red-50 border border-red-200 rounded-xl p-4 overflow-hidden">
+        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 overflow-hidden shadow-sm">
           <div className="flex items-center space-x-2 mb-2">
             <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
             <span className="text-red-600 font-semibold text-sm">LIVE</span>
+            <span className="text-xs text-gray-500">• {liveMatches.length} matches</span>
           </div>
-          <div 
-            className="transition-transform duration-500 ease-in-out"
-            style={{ transform: `translateY(-${tickerIndex * 60}px)` }}
-          >
+          <div className="space-y-3">
             {liveMatches.map((match, index) => (
               <div 
                 key={match.id}
-                className="h-15 flex items-center justify-between cursor-pointer hover:bg-red-100 rounded-lg p-2"
+                className={`${index === tickerIndex ? 'block' : 'hidden'} animate-fade-in`}
+              >
+                <div 
+                  className="flex items-center justify-between cursor-pointer hover:bg-red-100 rounded-lg p-3 transition-all duration-200"
+                  onClick={() => onMatchClick(match.id)}
+                >
+                  <div className="flex items-center space-x-3">
+                    <div className="text-center">
+                      <span className="text-2xl">{match.homeTeam.logo}</span>
+                      <div className="text-xs text-gray-600 w-16 truncate">{match.homeTeam.name}</div>
+                    </div>
+                  </div>
+                  <div className="text-center flex-1">
+                    <div className="text-xl font-bold text-red-600 mb-1">
+                      {match.homeScore} - {match.awayScore}
+                    </div>
+                    <div className="text-xs text-gray-500 flex items-center justify-center space-x-1">
+                      <span>{getSportEmoji(match.sport)}</span>
+                      <span>{match.time}</span>
+                      {match.pitch && (
+                        <>
+                          <span>•</span>
+                          <MapPin size={10} />
+                          <span>{match.pitch}</span>
+                        </>
+                      )}
+                    </div>
+                  </div>
+                  <div className="flex items-center space-x-3">
+                    <div className="text-center">
+                      <span className="text-2xl">{match.awayTeam.logo}</span>
+                      <div className="text-xs text-gray-600 w-16 truncate">{match.awayTeam.name}</div>
+                    </div>
+                  </div>
+                </div>
+              </div>
+            ))}
+          </div>
+          
+          {/* Live matches indicator dots */}
+          {liveMatches.length > 1 && (
+            <div className="flex justify-center space-x-1 mt-3">
+              {liveMatches.map((_, index) => (
+                <button
+                  key={index}
+                  onClick={() => setTickerIndex(index)}
+                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
+                    index === tickerIndex ? 'bg-red-500' : 'bg-red-200'
+                  }`}
+                />
+              ))}
+            </div>
+          )}
+        </div>
+      )}
+
+      {/* Sports Overview */}
+      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
+        <div className="p-4 border-b border-gray-100">
+          <h2 className="text-lg font-bold text-gray-800">🏆 Sports Overview</h2>
+        </div>
+        <div className="p-4">
+          <div className="grid grid-cols-5 gap-2">
+            {sports.map((sport) => {
+              const sportMatches = matches.filter(m => m.sport === sport);
+              const liveCount = sportMatches.filter(m => m.status === 'Live').length;
+              
+              return (
+                <div key={sport} className="text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
+                  <div className="text-2xl mb-1">{getSportEmoji(sport)}</div>
+                  <div className="text-xs font-medium text-gray-700 truncate">{sport}</div>
+                  {liveCount > 0 && (
+                    <div className="text-xs text-red-600 font-bold">{liveCount} Live</div>
+                  )}
+                </div>
+              );
+            })}
+          </div>
+        </div>
+      </div>
+
+      {/* Quick Live Updates */}
+      {liveMatches.length > 0 && (
+        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
+          <div className="p-4 border-b border-gray-100">
+            <h3 className="font-bold text-gray-800 flex items-center">
+              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
+              Live Updates
+            </h3>
+          </div>
+          <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
+            {liveMatches.map((match) => (
+              <div 
+                key={match.id}
                 onClick={() => onMatchClick(match.id)}
+                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
               >
-                <div className="flex items-center space-x-3">
-                  <span className="text-2xl">{match.homeTeam.logo}</span>
-                  <span className="font-medium">{match.homeTeam.name}</span>
+                <div className="flex items-center space-x-2">
+                  <span className="text-lg">{getSportEmoji(match.sport)}</span>
+                  <div>
+                    <div className="text-sm font-medium">
+                      {match.homeTeam.name} vs {match.awayTeam.name}
+                    </div>
+                    <div className="text-xs text-gray-500 flex items-center space-x-1">
+                      {match.pitch && (
+                        <>
+                          <MapPin size={10} />
+                          <span>{match.pitch}</span>
+                          <span>•</span>
+                        </>
+                      )}
+                      <span>{match.time}</span>
+                    </div>
+                  </div>
                 </div>
-                <div className="text-center">
-                  <div className="text-xl font-bold text-red-600">
-                    {match.homeScore} - {match.awayScore}
+                <div className="text-right">
+                  <div className="font-bold text-red-600">
+                    {match.homeScore}-{match.awayScore}
                   </div>
-                  <div className="text-xs text-gray-500">{match.time}</div>
-                </div>
-                <div className="flex items-center space-x-3">
-                  <span className="font-medium">{match.awayTeam.name}</span>
-                  <span className="text-2xl">{match.awayTeam.logo}</span>
                 </div>
               </div>
             ))}
           </div>
         </div>
       )}

@@ .. @@
         <div className="space-y-2 p-4">
           {matches.slice(0, 5).map((match) => (
             <div
               key={match.id}
               onClick={() => onMatchClick(match.id)}
               className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
             >
               <div className="flex items-center space-x-3">
+                <div className="text-lg">{getSportEmoji(match.sport)}</div>
                 <div className="text-center">
                   <div className="text-lg">{match.homeTeam.logo}</div>
                   <div className="text-xs text-gray-500 w-12 truncate">{match.homeTeam.name}</div>
                 </div>
                 <div className="text-sm text-gray-400">vs</div>
                 <div className="text-center">
                   <div className="text-lg">{match.awayTeam.logo}</div>
                   <div className="text-xs text-gray-500 w-12 truncate">{match.awayTeam.name}</div>
                 </div>
               </div>
               
               <div className="text-right">
                 {match.status === 'Live' && (
                   <div className="flex items-center space-x-2">
                     <div className="text-lg font-bold text-red-600">
                       {match.homeScore}-{match.awayScore}
                     </div>
                     <Play size={16} className="text-red-500" />
                   </div>
                 )}
                 {match.status === 'FT' && (
                   <div className="text-lg font-bold text-gray-600">
                     {match.homeScore}-{match.awayScore}
                   </div>
                 )}
                 {match.status === 'Scheduled' && (
                   <div className="text-sm text-gray-500">{match.time}</div>
                 )}
-                <div className="text-xs text-gray-400 mt-1">{match.sport}</div>
+                <div className="text-xs text-gray-400 mt-1 flex items-center space-x-1">
+                  <span>{match.sport}</span>
+                  {match.pitch && (
+                    <>
+                      <span>•</span>
+                      <span>{match.pitch}</span>
+                    </>
+                  )}
+                </div>
               </div>
             </div>
           ))}
         </div>
       </div>