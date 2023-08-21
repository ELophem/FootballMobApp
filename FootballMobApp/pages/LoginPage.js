import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserService } from '../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userService = new UserService();
      const userLogin = {
        username: username,
        password: password,
      };
  
      const loginResponse = await userService.login(userLogin);
  
      if (loginResponse.token) {
        const token = loginResponse.token;
        await AsyncStorage.setItem('token', token);
  
        console.log('Token stored:', token); // Add this line
  
        // Fetch user profile after successful login
        const userProfile = await userService.getUserProfile();
        console.log('User Profile Data:', userProfile);
  
        navigation.navigate('Profile');
      } else {
        console.log('Token not found in login response');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginPage;
