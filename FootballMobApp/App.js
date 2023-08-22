import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { ArticleService } from './services/article.service'; // Update the path
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import ProfileScreen from './pages/ProfileScreen';
import LoginPage from './pages/LoginPage';
import LogoutButton from './components/LogoutButton';
import ArticleDetail from './pages/ArticleDetail';
import EditArticle from './pages/EditArticle';
import CreateArticle from './pages/CreateArticle';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    // Your login status checking logic
  };

  const handleLogout = async () => {
    // Your logout logic
  };



  return (
    <NavigationContainer>
      {loggedIn ? (
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <LogoutButton {...props} logout={handleLogout} />}
        >
          <Drawer.Screen name="Home" component={HomePage} />
          <Drawer.Screen name="Calendar" component={CalendarPage} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
          <Stack.Screen name="EditArticle" component={EditArticle} />
          <Stack.Screen name="CreateArticle" component={CreateArticle} />
          {/* Add other screen components */}
        </Drawer.Navigator>
      ) : (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}

export default App;
