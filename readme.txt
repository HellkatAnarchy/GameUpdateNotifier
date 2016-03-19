Steam update notifier

A chrome extension that notifies you when a steam app update has been detected.
We would detect this using the Steam Web API (SteamDB does not allow you to scrape etc.)

An example for requesting JSON for an up to date version of TF2 would be:
http://api.steampowered.com/ISteamApps/UpToDateCheck/v1/?format=json&appid=440&version=3333053

Where appid is the steam app id and the version is the version of the game.
We would store the version number on the initial run by sending version as 0.
Every time an update is detected, update the stored version number and display a notification.
The plugin should send these api requests at 1 minute intervals.

The games to scan can either be manually added (Use webapi to convert name to appid?) or maybe we can get steam library.

Additional features could include:
-An update log link (Many games post on their announcements page, though several games do not (May have to be app specific)

You can add apps via appID's or select from games you own in your steam account.

