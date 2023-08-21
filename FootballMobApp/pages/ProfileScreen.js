import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserService } from '../services/userService'; // Import the centralized UserService

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const userService = new UserService();
        const userProfile = await userService.getUserProfile();
        console.log('Fetched User Profile:', userProfile);
        setUserData(userProfile);
      } catch (error) {
        console.error('Fetching user profile error:', error);
      }
    }
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      {userData ? (
        <View>
          <Text>User Profile:</Text>
          <Text>Username: {userData.username}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Annual Place: {userData.annualPlace}</Text>
          {/* Add more fields as needed */}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
