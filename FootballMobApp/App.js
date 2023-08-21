import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';

import LoginPage from './pages/LoginPage';
import ProfileScreen from './pages/ProfileScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Calendar" component={CalendarPage} />
        
        <Drawer.Screen name="Login" component={LoginPage} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
