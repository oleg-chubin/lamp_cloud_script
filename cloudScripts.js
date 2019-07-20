// CloudScript (JavaScript)
handlers.helloWorld = function (args, context) {
    var currentState; // here we are calculating the current player's game state
    var request = {
      "StatisticName": "Turns", 
      "PlayFabId" : currentPlayerId,
      "MaxResultsCount": 20
    }
    var leaderboardData = server.GetLeaderboardAroundUser(request);
	
    var message = "Hello " + currentPlayerId + "!";
    log.info(message);
    var inputValue = null;
    if (args && args.hasOwnProperty("inputValue"))
        inputValue = args.inputValue;
    log.debug("helloWorld:", { input: inputValue });
    return leaderboardData;
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

