import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { ArticleService } from './services/article.service'; // Update the path
import DrawerContent from './components/LogoutButton';
import { UserService } from './services/userService';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import ProfileScreen from './pages/ProfileScreen';
import LoginPage from './pages/LoginPage';
import LogoutButton from './components/LogoutButton';
//import ArticleDetail from './pages/ArticleDetail';
//import EditArticle from './pages/EditArticle';
import CreateArticle from './pages/CreateArticle';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, [loggedIn]);

  
  const checkLoginStatus = async () => {
    console.log('Checking login status...');
    const token = await AsyncStorage.getItem('token');
    
    
    if (token) {
      const userService = new UserService();
      try {
        const userProfile = await userService.getUserProfile();
        console.log('User Profile Response:', userProfile);
        if (userProfile && userProfile.error !== 'Not Authorized') {
          setLoggedIn(true);
          setUserProfile(userProfile); // Set the user profile in the state
        } else {
          setLoggedIn(false);
          setUserProfile(null); // Reset user profile
        }
      } catch (error) {
        console.error('User profile fetch error:', error);
        setLoggedIn(false);
        setUserProfile(null); // Reset user profile
      }
      
    }//
  };

  const handleLogout = async () => {
    // Clear token and perform other logout actions
    await AsyncStorage.removeItem('token'); // Clear the authentication token
    setLoggedIn(false); // Reset login state
    setUserProfile(null); // Reset user profile
  };


  return (
    <NavigationContainer>
      {loggedIn ? (
          <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <LogoutButton {...props} logout={handleLogout} />}>
        
        <Drawer.Screen
            name="Home"
            options={{ headerShown: true }}
          >
            {props => <HomePage {...props} userProfile={userProfile} />}
          </Drawer.Screen>
            
          <Drawer.Screen name="Calendar" component={CalendarPage} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          {console.log('User Profile Admin when building create article:', userProfile?.admin)}
          {userProfile?.admin && (
            <Drawer.Screen name="CreateArticle" component={CreateArticle} />
          )}
        </Drawer.Navigator>
      ) : (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}

export default App;
