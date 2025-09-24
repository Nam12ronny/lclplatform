import React, { useState, useEffect } from 'react';
import { Play, Clock, Trophy, TrendingUp } from 'lucide-react';
import type { Match, Team, Player } from '../types';

interface HomepageProps {
  matches: Match[];
  teams: Team[];
  players: Player[];
  onMatchClick: (matchId: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({ matches, teams, players, onMatchClick }) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  
  const liveMatches = matches.filter(m => m.status === 'Live');
  const upcomingMatches = matches.filter(m => m.status === 'Scheduled');
  const topScorers = players.sort((a, b) => b.goals - a.goals).slice(0, 3);

  // Animated score ticker
  useEffect(() => {
    if (liveMatches.length > 1) {
      const interval = setInterval(() => {
        setTickerIndex(prev => (prev + 1) % liveMatches.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [liveMatches.length]);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
        <h1 className="text-3xl font-bold mb-2">🏆 Lira Corporate Gala</h1>
        <p className="text-blue-100">Live from the Sports Festival</p>
        <div className="mt-4 flex justify-center space-x-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="text-sm">Live Matches</span>
            <div className="text-xl font-bold">{liveMatches.length}</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="text-sm">Total Attendees</span>
            <div className="text-xl font-bold">900+</div>
          </div>
        </div>
      </div>

      {/* Live Score Ticker */}
      {liveMatches.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 overflow-hidden">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 font-semibold text-sm">LIVE</span>
          </div>
          <div 
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${tickerIndex * 60}px)` }}
          >
            {liveMatches.map((match, index) => (
              <div 
                key={match.id}
                className="h-15 flex items-center justify-between cursor-pointer hover:bg-red-100 rounded-lg p-2"
                onClick={() => onMatchClick(match.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{match.homeTeam.logo}</span>
                  <span className="font-medium">{match.homeTeam.name}</span>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600">
                    {match.homeScore} - {match.awayScore}
                  </div>
                  <div className="text-xs text-gray-500">{match.time}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{match.awayTeam.name}</span>
                  <span className="text-2xl">{match.awayTeam.logo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Fixtures */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Clock className="mr-2 text-blue-500" size={20} />
            Today's Fixtures
          </h2>
        </div>
        <div className="space-y-2 p-4">
          {matches.slice(0, 5).map((match) => (
            <div
              key={match.id}
              onClick={() => onMatchClick(match.id)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
            >
              <div className="flex items-center space-x-3">
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
                <div className="text-xs text-gray-400 mt-1">{match.sport}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <Trophy className="mb-2" size={24} />
          <div className="text-sm opacity-90">Top Team</div>
          <div className="font-bold">{teams[0]?.name || 'TBD'}</div>
          <div className="text-xs opacity-75">{teams[0]?.points || 0} points</div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <TrendingUp className="mb-2" size={24} />
          <div className="text-sm opacity-90">Top Scorer</div>
          <div className="font-bold">{topScorers[0]?.name || 'TBD'}</div>
          <div className="text-xs opacity-75">{topScorers[0]?.goals || 0} goals</div>
        </div>
      </div>

      {/* Trending Players */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">🌟 Trending Players</h3>
        </div>
        <div className="p-4 space-y-3">
          {topScorers.map((player, index) => (
            <div key={player.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-lg">{player.photo}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-gray-500">{player.team}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">{player.goals}</div>
                <div className="text-xs text-gray-500">goals</div>
              </div>
              {player.isFanFavorite && (
                <div className="text-yellow-500">⭐</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};