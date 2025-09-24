import type { AppData, Team, Player, Match, CommentaryItem } from '../types';

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
    sport: 'Basketball',
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
    sport: 'Basketball',
    wins: 2,
    draws: 2,
    losses: 1,
    goalsFor: 78,
    goalsAgainst: 75,
    points: 8,
    roster: ['Tom Harris', 'Ben Clark', 'Sam Roberts']
  }
];

const players: Player[] = [
  {
    id: '1',
    name: 'John Smith',
    photo: '🏃‍♂️',
    team: 'Thunder Hawks',
    position: 'Forward',
    goals: 8,
    assists: 3,
    mvpVotes: 15,
    isFanFavorite: true,
    bio: 'Star striker with incredible pace and finishing ability.'
  },
  {
    id: '2',
    name: 'Alex Brown',
    photo: '⚽',
    team: 'Fire Dragons',
    position: 'Midfielder',
    goals: 5,
    assists: 7,
    mvpVotes: 12,
    isFanFavorite: true,
    bio: 'Creative midfielder with excellent vision and passing.'
  },
  {
    id: '3',
    name: 'James Wilson',
    photo: '🏀',
    team: 'Storm Eagles',
    position: 'Point Guard',
    goals: 24,
    assists: 18,
    mvpVotes: 20,
    isFanFavorite: false,
    bio: 'Dynamic point guard with exceptional court vision.'
  }
];

const commentary: CommentaryItem[] = [
  {
    id: '1',
    time: '15\'',
    text: 'GOAL! John Smith opens the scoring with a brilliant strike!',
    type: 'goal'
  },
  {
    id: '2',
    time: '23\'',
    text: 'Yellow card for aggressive tackle',
    type: 'card'
  },
  {
    id: '3',
    time: '34\'',
    text: 'Great save by the goalkeeper!',
    type: 'general'
  }
];

const matches: Match[] = [
  {
    id: '1',
    sport: 'Football',
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
    sport: 'Basketball',
    homeTeam: teams[2],
    awayTeam: teams[3],
    homeScore: 78,
    awayScore: 75,
    status: 'FT',
    time: 'Full Time',
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
  }
};