@@ .. @@
 import { FanEngagement } from './components/FanEngagement';
 import { CSRSection } from './components/CSRSection';
 import { mockData } from './data/mockData';
-import type { AppData } from './types';
+import type { AppData, SocialPost } from './types';

 function App() {
   const [currentPage, setCurrentPage] = useState('home');
   const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
   const [appData, setAppData] = useState<AppData>(mockData);

@@ .. @@
     }));
   };

+  const handleVote = (pollId: string, optionId: string) => {
+    setAppData(prev => ({
+      ...prev,
+      polls: prev.polls.map(poll => 
+        poll.id === pollId 
+          ? { ...poll, hasVoted: true }
+          : poll
+      )
+    }));
+  };
+
+  const handlePredict = (matchId: string, homeScore: number, awayScore: number) => {
+    const newPrediction = {
+      id: Date.now().toString(),
+      matchId,
+      match: appData.matches.find(m => m.id === matchId)!,
+      homeScore,
+      awayScore,
+      points: 50,
+      status: 'pending' as const
+    };
+    
+    setAppData(prev => ({
+      ...prev,
+      predictions: [...prev.predictions, newPrediction]
+    }));
+  };
+
+  const handleLikePost = (postId: string) => {
+    setAppData(prev => ({
+      ...prev,
+      socialPosts: prev.socialPosts.map(post => 
+        post.id === postId 
+          ? { 
+              ...post, 
+              isLiked: !post.isLiked,
+              likes: post.isLiked ? post.likes - 1 : post.likes + 1
+            }
+          : post
+      )
+    }));
+  };
+
+  const handleCommentPost = (postId: string, comment: string) => {
+    setAppData(prev => ({
+      ...prev,
+      socialPosts: prev.socialPosts.map(post => 
+        post.id === postId 
+          ? { ...post, comments: post.comments + 1 }
+          : post
+      )
+    }));
+  };
+
   const renderCurrentPage = () => {
     switch (currentPage) {
       case 'match':
         return selectedMatchId ? (
           <MatchCenter 
             match={appData.matches.find(m => m.id === selectedMatchId)!}
             onReaction={addFanReaction}
             onBack={() => setCurrentPage('home')}
           />
         ) : <Homepage {...appData} onMatchClick={(id) => { setSelectedMatchId(id); setCurrentPage('match'); }} />;
       
       case 'teams':
         return <TeamProfiles teams={appData.teams} matches={appData.matches} />;
       
       case 'players':
         return <PlayerProfiles players={appData.players} />;
       
       case 'table':
         return <LeagueTable teams={appData.teams} matches={appData.matches} />;
       
       case 'engagement':
-        return <FanEngagement leaderboard={appData.fanLeaderboard} />;
+        return <FanEngagement 
+          leaderboard={appData.fanLeaderboard}
+          polls={appData.polls}
+          predictions={appData.predictions}
+          matches={appData.matches}
+          socialPosts={appData.socialPosts}
+          onVote={handleVote}
+          onPredict={handlePredict}
+          onLikePost={handleLikePost}
+          onCommentPost={handleCommentPost}
+        />;
       
       case 'csr':
         return <CSRSection csrStats={appData.csrStats} />;
       
       default:
         return <Homepage {...appData} onMatchClick={(id) => { setSelectedMatchId(id); setCurrentPage('match'); }} />;
     }
   };