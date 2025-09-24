@@ .. @@
-import type { AppData, Team, Player, Match, CommentaryItem } from '../types';
+import type { AppData, Team, Player, Match, CommentaryItem, SocialPost, Poll, Prediction } from '../types';

 const teams: Team[] = [
   {
     id: '1',
     name: 'Thunder Hawks',
     logo: '⚡',
     color: '#3B82F6',
     sport: 'Football',
     wins: 4,
     draws: 1,
     losses: 0,
     goalsFor: 12,
     goalsAgainst: 3,
     points: 13,
     roster: ['John Smith', 'Mike Johnson', 'David Wilson']
   },
   {
     id: '2',
     name: 'Fire Dragons',
     logo: '🔥',
     color: '#EF4444',
     sport: 'Football',
     wins: 3,
     draws: 2,
     losses: 0,
     goalsFor: 10,
     goalsAgainst: 4,
     points: 11,
     roster: ['Alex Brown', 'Chris Davis', 'Ryan Miller']
   },
   {
     id: '3',
     name: 'Storm Eagles',
     logo: '🌪️',
     color: '#10B981',
-    sport: 'Basketball',
+    sport: 'Volleyball',
     wins: 3,
     draws: 1,
     losses: 1,
     goalsFor: 85,
     goalsAgainst: 72,
     points: 10,
     roster: ['James Wilson', 'Mark Taylor', 'Luke Anderson']
   },
   {
     id: '4',
     name: 'Ice Wolves',
     logo: '❄️',
     color: '#6366F1',
-    sport: 'Basketball',
+    sport: 'Netball',
     wins: 2,
     draws: 2,
     losses: 1,
     goalsFor: 78,
     goalsAgainst: 75,
     points: 8,
     roster: ['Tom Harris', 'Ben Clark', 'Sam Roberts']
+  },
+  {
+    id: '5',
+    name: 'Golden Lions',
+    logo: '🦁',
+    color: '#F59E0B',
+    sport: 'Tag of War',
+    wins: 3,
+    draws: 0,
+    losses: 2,
+    goalsFor: 3,
+    goalsAgainst: 2,
+    points: 9,
+    roster: ['Sarah Johnson', 'Emma Davis', 'Lisa Brown']
+  },
+  {
+    id: '6',
+    name: 'Fit Squad',
+    logo: '💪',
+    color: '#EC4899',
+    sport: 'Aerobics',
+    wins: 4,
+    draws: 0,
+    losses: 1,
+    goalsFor: 95,
+    goalsAgainst: 88,
+    points: 12,
+    roster: ['Maria Garcia', 'Anna Wilson', 'Kate Miller']
   }
 ];

@@ .. @@
   {
     id: '3',
     name: 'James Wilson',
     photo: '🏀',
     team: 'Storm Eagles',
-    position: 'Point Guard',
+    position: 'Spiker',
     goals: 24,
     assists: 18,
     mvpVotes: 20,
     isFanFavorite: false,
-    bio: 'Dynamic point guard with exceptional court vision.'
+    bio: 'Dynamic spiker with exceptional timing and power.'
+  },
+  {
+    id: '4',
+    name: 'Sarah Johnson',
+    photo: '💪',
+    team: 'Golden Lions',
+    position: 'Anchor',
+    goals: 2,
+    assists: 1,
+    mvpVotes: 18,
+    isFanFavorite: true,
+    bio: 'Strong anchor with incredible determination and team spirit.'
+  },
+  {
+    id: '5',
+    name: 'Maria Garcia',
+    photo: '🏃‍♀️',
+    team: 'Fit Squad',
+    position: 'Lead Instructor',
+    goals: 45,
+    assists: 12,
+    mvpVotes: 22,
+    isFanFavorite: true,
+    bio: 'Energetic instructor with perfect form and motivational skills.'
   }
 ];

@@ .. @@
 const matches: Match[] = [
   {
     id: '1',
     sport: 'Football',
+    pitch: 'Pitch 1',
     homeTeam: teams[0],
     awayTeam: teams[1],
     homeScore: 2,
     awayScore: 1,
     status: 'Live',
     time: '67\'',
     venue: 'Main Stadium',
     commentary,
     fanReactions: {
       '🔥': 45,
       '⚡': 32,
       '❤️': 28,
       '🎉': 15
     }
   },
   {
     id: '2',
-    sport: 'Basketball',
+    sport: 'Volleyball',
+    pitch: 'Pitch 2',
     homeTeam: teams[2],
     awayTeam: teams[3],
     homeScore: 78,
     awayScore: 75,
-    status: 'FT',
-    time: 'Full Time',
+    status: 'Live',
+    time: 'Set 3',
     venue: 'Sports Hall A',
     commentary: [],
     fanReactions: {
       '🏀': 38,
       '🔥': 29,
       '💪': 22
     }
   },
   {
     id: '3',
+    sport: 'Netball',
+    pitch: 'Pitch 3',
+    homeTeam: teams[3],
+    awayTeam: teams[0],
+    homeScore: 45,
+    awayScore: 42,
+    status: 'Live',
+    time: 'Q4',
+    venue: 'Court B',
+    commentary: [],
+    fanReactions: {
+      '🏐': 25,
+      '🔥': 18
+    }
+  },
+  {
+    id: '4',
+    sport: 'Tag of War',
+    pitch: 'Pitch 5',
+    homeTeam: teams[4],
+    awayTeam: teams[1],
+    homeScore: 2,
+    awayScore: 1,
+    status: 'Live',
+    time: 'Round 3',
+    venue: 'Central Field',
+    commentary: [],
+    fanReactions: {
+      '💪': 35,
+      '🔥': 28
+    }
+  },
+  {
+    id: '5',
     sport: 'Football',
     homeTeam: teams[1],
     awayTeam: teams[0],
     homeScore: 0,
     awayScore: 0,
     status: 'Scheduled',
     time: '18:00',
     venue: 'Field B',
     commentary: [],
     fanReactions: {}
   }
 ];

+const socialPosts: SocialPost[] = [
+  {
+    id: '1',
+    author: 'Sarah Johnson',
+    avatar: '👩‍💼',
+    content: 'What an incredible goal by John Smith! Thunder Hawks are on fire! ⚡🔥',
+    timestamp: '2 min ago',
+    likes: 24,
+    comments: 8,
+    isLiked: false,
+    sport: 'Football'
+  },
+  {
+    id: '2',
+    author: 'Mike Chen',
+    avatar: '👨‍💻',
+    content: 'The volleyball match is getting intense! Storm Eagles showing great teamwork 🏐',
+    timestamp: '5 min ago',
+    likes: 18,
+    comments: 3,
+    isLiked: true,
+    sport: 'Volleyball'
+  },
+  {
+    id: '3',
+    author: 'Lisa Rodriguez',
+    avatar: '👩‍⚕️',
+    content: 'Amazing aerobics performance by Fit Squad! The energy is contagious 💪✨',
+    image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400',
+    timestamp: '8 min ago',
+    likes: 32,
+    comments: 12,
+    isLiked: false,
+    sport: 'Aerobics'
+  },
+  {
+    id: '4',
+    author: 'David Wilson',
+    avatar: '👨‍🎓',
+    content: 'Tag of War is all about strategy and teamwork. Golden Lions showing both! 🦁',
+    timestamp: '12 min ago',
+    likes: 15,
+    comments: 5,
+    isLiked: true,
+    sport: 'Tag of War'
+  }
+];
+
+const polls: Poll[] = [
+  {
+    id: '1',
+    question: 'Which team will win the Football championship?',
+    options: [
+      { id: '1a', text: 'Thunder Hawks ⚡', votes: 67, percentage: 45 },
+      { id: '1b', text: 'Fire Dragons 🔥', votes: 52, percentage: 35 },
+      { id: '1c', text: 'Other teams', votes: 30, percentage: 20 }
+    ],
+    totalVotes: 149,
+    hasVoted: false,
+    expiresAt: '2024-01-15T18:00:00Z'
+  },
+  {
+    id: '2',
+    question: 'Most exciting sport to watch today?',
+    options: [
+      { id: '2a', text: 'Football ⚽', votes: 89, percentage: 35 },
+      { id: '2b', text: 'Volleyball 🏐', votes: 76, percentage: 30 },
+      { id: '2c', text: 'Aerobics 💪', votes: 58, percentage: 23 },
+      { id: '2d', text: 'Tag of War 🪢', votes: 31, percentage: 12 }
+    ],
+    totalVotes: 254,
+    hasVoted: true,
+    expiresAt: '2024-01-15T20:00:00Z'
+  }
+];
+
+const predictions: Prediction[] = [
+  {
+    id: '1',
+    matchId: '5',
+    match: matches[4],
+    homeScore: 2,
+    awayScore: 1,
+    points: 50,
+    status: 'pending'
+  }
+];
+
 export const mockData: AppData = {
   matches,
   teams,
   players,
   fanLeaderboard: [
     {
       id: '1',
       name: 'Sarah Johnson',
       points: 1250,
       badges: ['Super Fan', 'Predictor', 'Quiz Master'],
       avatar: '👩‍💼'
     },
     {
       id: '2',
       name: 'Mike Chen',
       points: 980,
       badges: ['Match Analyst', 'Photo King'],
       avatar: '👨‍💻'
     },
     {
       id: '3',
       name: 'Lisa Rodriguez',
       points: 850,
       badges: ['Team Spirit', 'Wellness Warrior'],
       avatar: '👩‍⚕️'
     }
   ],
   csrStats: {
     peopleScreened: 347,
     donationsCollected: 28500,
     healthChecksCompleted: 156,
     wellnessParticipants: 423
-  }
+  },
+  socialPosts,
+  polls,
+  predictions
 };