@@ .. @@
 export const LeagueTable: React.FC<LeagueTableProps> = ({ teams, matches }) => {
   const [selectedSport, setSelectedSport] = useState<string>('all');

-  const sports = ['all', ...Array.from(new Set(teams.map(team => team.sport)))];
+  const sports = ['all', 'Football', 'Volleyball', 'Netball', 'Tag of War', 'Aerobics'];
+  
+  const getSportEmoji = (sport: string) => {
+    const emojis: { [key: string]: string } = {
+      'all': '🏆',
+      'Football': '⚽',
+      'Volleyball': '🏐',
+      'Netball': '🥅',
+      'Tag of War': '🪢',
+      'Aerobics': '💪'
+    };
+    return emojis[sport] || '🏆';
+  };
   
   const filteredTeams = selectedSport === 'all' 
     ? teams 
     : teams.filter(team => team.sport === selectedSport);

@@ .. @@
       {/* Sport Filter */}
       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
+        <h3 className="font-semibold mb-3 text-gray-700">Filter by Sport</h3>
         <div className="flex space-x-2 overflow-x-auto">
           {sports.map((sport) => (
             <button
               key={sport}
               onClick={() => setSelectedSport(sport)}
-              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all ${
+              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                 selectedSport === sport
                   ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
               }`}
             >
-              {sport.charAt(0).toUpperCase() + sport.slice(1)}
+              <span>{getSportEmoji(sport)}</span>
+              <span>{sport.charAt(0).toUpperCase() + sport.slice(1)}</span>
             </button>
           ))}
         </div>
+        
+        {/* Sport Stats */}
+        {selectedSport !== 'all' && (
+          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
+            <div className="grid grid-cols-3 gap-4 text-center">
+              <div>
+                <div className="font-bold text-lg text-blue-600">
+                  {filteredTeams.length}
+                </div>
+                <div className="text-xs text-gray-500">Teams</div>
+              </div>
+              <div>
+                <div className="font-bold text-lg text-green-600">
+                  {matches.filter(m => m.sport === selectedSport && m.status === 'Live').length}
+                </div>
+                <div className="text-xs text-gray-500">Live</div>
+              </div>
+              <div>
+                <div className="font-bold text-lg text-orange-600">
+                  {matches.filter(m => m.sport === selectedSport).length}
+                </div>
+                <div className="text-xs text-gray-500">Total Matches</div>
+              </div>
+            </div>
+          </div>
+        )}
       </div>