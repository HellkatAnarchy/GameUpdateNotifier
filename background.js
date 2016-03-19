function updateScan()
{
	
	//For each appID in localstorage
	for (var key in localStorage)
	{
		function processRequest(e) 
		{
			//If the request is fine
			if (jsonResponse.readyState == 4 && jsonResponse.status == 200) 
			{
				//If more recent gid found in news
				if (localStorage[key] < jsonResponse["appnews"]["newsitems"][newsItemCount]["gid"])
				{
					//If it's an update
					if (jsonResponse["appnews"]["newsitems"][newsItemCount]["feedname"] == "steam_updates" || jsonResponse["appnews"]["newsitems"][newsItemCount]["feedname"] == "steam_community_announcements")
					{
						//Put a notification with a link to the update here.
						var notification = new Notification('News detected for ' + key, {
							icon: 'https://etgeekera.files.wordpress.com/2014/09/steam-logo-2014.png',
							body: jsonResponse["appnews"]["newsitems"][newsItemCount][url],
						});
						notification.onclick = function () {
							window.open(jsonResponse["appnews"]["newsitems"][newsItemCount][url]);      
						};
						localStorage[key] = jsonResponse["appnews"]["newsitems"][newsItemCount]["gid"];
					}
	
				}
			}
		}
		
		//Send request to api]
		var jsonResponse = new XMLHttpRequest();
		var requestURL = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=" + key + "&count=20&maxlength=300&format=json"
		jsonResponse.open("GET",requestURL,true)	
		jsonResponse.send();
		jsonResponse.addEventListener("readystatechange", processRequest, false);
	}
	
}

setInterval(function(){updateScan()},60000);