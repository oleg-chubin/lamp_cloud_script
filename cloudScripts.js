// CloudScript (JavaScript)
function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

handlers.getRivalLamps = function (args, context) {
    var currentState; // here we are calculating the current player's game state
    var request = {
      "StatisticName": "Turns", 
      "PlayFabId" : currentPlayerId,
      "MaxResultsCount": 10
    }
    var leaderboardData = server.GetLeaderboardAroundUser(request);
    var rivals = leaderboardData.Leaderboard
            .filter(function(item){return item.PlayFabId != currentPlayerId})
    rivals = rivals.map(
        function(item){
            var playerData = server.GetUserData(
	        {"Keys": ["DEFENCELAMPS"], "PlayFabId": item.PlayFabId});
	    if ('DEFENCELAMPS' in playerData.Data){
                return {"PlayFabId": item.PlayFabId,
			"Lamps": playerData.Data['DEFENCELAMPS'],
		        "DisplayName": ""};
	    }
	    return null;	
	}    
    );
    rivals = rivals.filter(function(item){return item});	
    var result = randomChoice(rivals);
    var profile = server.GetPlayerProfile({PlayFabId: result.PlayFabId});
    return {"DisplayName": profile["PlayerDisplayName"],
	    "PlayFabId": result.PlayFabId,
	    "Lamps": result.Lamps};
}

handlers.initLeaderboard = function (args, context) {
    request = {
        "PlayFabId": currentPlayerId,
        "Statistics": [
            {
              "StatisticName": "Turns",
              "Value": 600
            }
        ]
    };
    server.UpdatePlayerStatistics(request);
}

