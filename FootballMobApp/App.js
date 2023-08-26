import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ArticleService } from './services/article.service';
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
import CustomDrawerContent from './components/CustomDrawerContent'; 
import { MaterialIcons } from '@expo/vector-icons';

//entry point of the app so that we can check login status and create all our pages  when logoutbutton is pressed we go to handlelogout function
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
          setUserProfile(userProfile); 
        } else {
          setLoggedIn(false);
          setUserProfile(null); 
        }
      } catch (error) {
        console.error('User profile fetch error:', error);
        setLoggedIn(false);
        setUserProfile(null); 
      }
      
    }
  };

  const handleLogout = async () => {
  
    await AsyncStorage.removeItem('token');
    setLoggedIn(false); 
    setUserProfile(null); 
  };


  return (
    
    <NavigationContainer>
      {loggedIn ? (
          <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <LogoutButton {...props} logout={handleLogout} />}
          
          drawerStyle={{
            backgroundColor: '#f0f0f0',
            width: 250, 
          }}
          screenOptions={{
            drawerActiveTintColor: '#3498db', 
            drawerInactiveTintColor: '#666', 
            drawerLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
          theme={{
            colors: {
              background: '#3f51b5', 
            },
          }}
          >
            
            
        <Drawer.Screen
            name="Home"
            options={{ headerShown: true }}
          >
            {props => <HomePage {...props} userProfile={userProfile} />}
          </Drawer.Screen>
            
          <Drawer.Screen name="Calendar">
            {(props) => (
              <CalendarPage {...props} userProfile={userProfile} />
            )}
          </Drawer.Screen>
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
