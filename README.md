# FootballMobApp
React Native App made by Edouard de Schietere de Lophem 18072 during the Mobile Applications course at ECAM 2022-2023.

This APP contains 7 pages:
###LoginPage:
First page you get on when starting the app, allows the user to authenticate to then further use the app.
###HomePage:
Page where you get on after logging in, depending if you're connected as an admin or not you'll be able to do different things in the app.
###CreateArticle (admin-only):
Page to create a new article this page has 3 fieldss to complete (Title, Subtitle, body) this page is only created when you're logged in as an administrator.
###ArticleDetail:
Article detail page let's you read the whole article when you click on the title of it on the HomePage.
###EditArticle (admin-only):
Admin only page where you're able to edit the current article then save the modifications you're done so that it now shows up for everyone. Or you can delete an article so that it is deleted for everybody instantly.
####CalendarPage:
Calendar page where cou can consult the score of different matches being logged in as an administrator allows you to change and update the scores of the different games.
###ProfileScreen:
Profile Screen where you can see all your personal details attached to the profile you're logged in with.

To run the app I strongly recommend using the Expo Go app avaiable on your App Store of choice, so that for running the app you can simply run "expo start" command in the terminal and then you'll be able to run the app and instantly modify it through scanning the given QR code. 

This App is also based on the FootballWebAppAPI so you'll need that one also to run the code and get the data used in the app
