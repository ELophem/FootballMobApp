import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import ProfileScreen from './pages/ProfileScreen';
import { UserService } from './services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    
    if (token) {
      const userService = new UserService();
      try {
        const userProfile = await userService.getUserProfile();
        if (userProfile && userProfile.error !== 'Not Authorized') {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('User profile fetch error:', error);
        setLoggedIn(false);
      }
    }
  };

  const handleLogout = async () => {
    // Clear token and perform other logout actions
    await AsyncStorage.removeItem('token'); // Clear the authentication token
    setLoggedIn(false); // Reset login state
  };

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} logout={handleLogout} />}>
          <Drawer.Screen name="Home" component={HomePage} />
          <Drawer.Screen name="Calendar" component={CalendarPage} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
      ) : (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
};

export default App;
