// LoginPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserService } from '../services/userService';

const LoginPage = ({ navigation, onLogin }) => {
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
        // Fetch user profile after successful login
        const userProfile = await userService.getUserProfile();

        if (userProfile && userProfile.error !== 'Not Authorized') {
          onLogin(); // Notify App component that user is logged in
        }
      } else {
        console.log('Token not found in login response');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Before trying to access the rest of the App please Log In with your credentials</Text>
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
