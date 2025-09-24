@@ .. @@
 export interface Match {
   id: string;
   sport: string;
+  pitch?: string;
   homeTeam: Team;
   awayTeam: Team;
   homeScore: number;
   awayScore: number;
   status: 'Live' | 'FT' | 'Scheduled' | 'Postponed';
   time: string;
   venue: string;
   commentary: CommentaryItem[];
   fanReactions: { [key: string]: number };
 }

@@ .. @@
 export interface CSRStats {
   peopleScreened: number;
   donationsCollected: number;
   healthChecksCompleted: number;
   wellnessParticipants: number;
 }

+export interface SocialPost {
+  id: string;
+  author: string;
+  avatar: string;
+  content: string;
+  image?: string;
+  timestamp: string;
+  likes: number;
+  comments: number;
+  isLiked: boolean;
+  sport?: string;
+}
+
+export interface Poll {
+  id: string;
+  question: string;
+  options: PollOption[];
+  totalVotes: number;
+  hasVoted: boolean;
+  expiresAt: string;
+}
+
+export interface PollOption {
+  id: string;
+  text: string;
+  votes: number;
+  percentage: number;
+}
+
+export interface Prediction {
+  id: string;
+  matchId: string;
+  match: Match;
+  homeScore: number;
+  awayScore: number;
+  points: number;
+  status: 'pending' | 'correct' | 'incorrect';
+}
+
 export interface AppData {
   matches: Match[];
   teams: Team[];
   players: Player[];
   fanLeaderboard: FanLeaderboardEntry[];
   csrStats: CSRStats;
+  socialPosts: SocialPost[];
+  polls: Poll[];
+  predictions: Prediction[];
 }