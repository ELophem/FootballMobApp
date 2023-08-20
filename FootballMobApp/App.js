import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import LoginPage from './pages/LoginPage';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Calendar" component={CalendarPage} />
        <Drawer.Screen name="Personal Info" component={PersonalInfoPage} />
        <Drawer.Screen name="Login" component={LoginPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
