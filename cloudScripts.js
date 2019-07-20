// CloudScript (JavaScript)
handlers.getRivalLamps = function (args, context) {
    var currentState; // here we are calculating the current player's game state
    var request = {
      "StatisticName": "Turns", 
      "PlayFabId" : currentPlayerId,
      "MaxResultsCount": 20
    }
    var leaderboardData = server.GetLeaderboardAroundUser(request);
    var rivals = leaderboardData.Leaderboard
            .filter(function(item){return item.PlayFabId != currentPlayerId})
    rivals = rivals.map(
        function(item){
            var playerData = server.GetUserData(
	        {"Keys": ["DEFENCELAMPS"], "PlayFabId": item.PlayFabId});
	    return playerData.data["DEFENCELAMPS"]	
	}    
    );
    rivals = rivals.filter(function(item){return item});	
    return rivals;
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

