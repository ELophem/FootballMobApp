import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';

const LogoutButton = ({ logout, ...props }) => {
  return (
    <View style={styles.container}>
      <DrawerItemList {...props} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Add appropriate styling
  },
});

export default LogoutButton;
