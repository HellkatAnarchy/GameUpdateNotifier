//Run when submit is pressed

//Call the api to get the news for the appid entered using:
//"http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=" + appID + "&count=20&maxlength=300&format=json"

//Getting the add button and adding an event listener to it.
document.addEventListener('DOMContentLoaded', function (){
	var submitButton = document.getElementById("checkVersion");
	submitButton.addEventListener("click", getVersion);
	var deleteButton = document.getElementById("deleteApp");
	deleteButton.addEventListener("click", deleteApp);
})


//We run this every minute on all stored appid's, or on a entered appid (Run by button press).
function getVersion()
{	
	function processRequest(e) 
	{
		//If the request is fine
		if (jsonResponse.readyState == 4 && jsonResponse.status == 200) 
		{
			jsonResponse = JSON.parse(jsonResponse.responseText);
			//Check if appid is valid
			if (jsonResponse["appnews"]["appid"] == appID)
			{
				//If appid is not stored: Store
				if (typeof localStorage[appID] === 'undefined')
				{
					alert("Not stored. Storing..");
					//Go through until feedname = steam_updates is found and store that GID.
					var newsItemCount = 0;
					for (newsItemCount = 0; newsItemCount < 20; newsItemCount ++)
					{
						console.log(jsonResponse["appnews"]["newsitems"][newsItemCount])
						if (typeof jsonResponse["appnews"]["newsitems"][newsItemCount] != "undefined") 
						{
							if (jsonResponse["appnews"]["newsitems"][newsItemCount]["feedname"] == "steam_updates" || jsonResponse["appnews"]["newsitems"][newsItemCount]["feedname"] == "steam_community_announcements")
							{
								localStorage[appID] = jsonResponse["appnews"]["newsitems"][newsItemCount]["gid"];
							}
						}
					}
					alert("Current GID: " + localStorage[appID])
					location.reload();
				}
				//If appID is stored.
				else
				{
					//Check if any of the more recent gid's are larger
					for (newsItemCount = 0; newsItemCount < 20; newsItemCount ++)
					{
						console.log(localStorage[appID])
						//If more recent gid found in news
						if (localStorage[appID] < jsonResponse["appnews"]["newsitems"][newsItemCount]["gid"])
						{
							//If it's an update
							if (jsonResponse["appnews"]["newsitems"][newsItemCount]["feedname"] == "steam_updates" || jsonResponse["appnews"]["newsitems"][newsItemCount]["feedname"] == "steam_community_announcements")
							{
								//Put a notification with a link to the update here.
								var notification = new Notification('News detected for ' + appID, {
									icon: 'https://etgeekera.files.wordpress.com/2014/09/steam-logo-2014.png',
									body: jsonResponse["appnews"]["newsitems"][newsItemCount][url],
								});
								notification.onclick = function () {
									window.open(jsonResponse["appnews"]["newsitems"][newsItemCount][url]);      
								};
								localStorage[appID] = jsonResponse["appnews"]["newsitems"][newsItemCount]["gid"];
								location.reload();
								break;
							}
						}
					}
				}	
				//Refreshes the window after we add an app
			}							
		}
	}
	
	var appID = document.getElementById("AppIDEntry").value;
	var jsonResponse = new XMLHttpRequest();
	var requestURL = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=" + appID + "&count=20&maxlength=300&format=json"
	jsonResponse.open("GET",requestURL,true)	
	jsonResponse.send();
	jsonResponse.addEventListener("readystatechange", processRequest, false);
}

function deleteApp()
{
	var appID = document.getElementById("DeleteAppIDEntry").value;
	localStorage.removeItem(appID);
	alert("Removed app: " + appID);
	location.reload();
}

window.onload = function() {
	//Go through each object in localStorage
	//Object.key
	var stringToDisplay = "<ul>";
	var keys = Object.keys(localStorage);
	var i = keys.length;
	for(count = 0; count < i; count++)
	{
		stringToDisplay = stringToDisplay.concat("<li>");
		//Some casting to ditch a weird issue where there's whitespaces
		stringToDisplay = stringToDisplay.concat(String(parseInt(keys[count])));
		stringToDisplay = stringToDisplay.concat("&nbsp")
		stringToDisplay = stringToDisplay.concat(":")
		stringToDisplay = stringToDisplay.concat(localStorage[keys[count]]);
		stringToDisplay = stringToDisplay.concat("      ");
		stringToDisplay = stringToDisplay.concat("</li>");
	}
	stringToDisplay = stringToDisplay.concat("</ul>");
	document.getElementById("apps").innerHTML = stringToDisplay;
	
};





