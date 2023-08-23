import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserService } from '../services/userService';

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
        <View style={styles.profileContainer}>
          <Text style={styles.headerText}>User Profile:</Text>
          <Text style={styles.profileText}>Username: {userData.username}</Text>
          <Text style={styles.profileText}>Email: {userData.email}</Text>
          <Text style={styles.profileText}>userID: {userData.userId}</Text>
         
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
  },
  profileContainer: {
    backgroundColor: '#ffffff', 
    padding: 20,
    borderRadius: 5,
    elevation: 3, 
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  container: {
    flex: 1,
    backgroundColor: '#3f51b5', 
    padding: 20, 
  },
});

export default ProfileScreen;
