import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
    return (
        <View style={{flex:1}}>
        <View style={{flex:1,justifyContent: 'flex-end'}}>FootballApp</View>
        </View>
    );
  }
