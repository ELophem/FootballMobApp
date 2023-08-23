import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserService } from '../services/userService';
import { MaterialIcons } from '@expo/vector-icons';

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
          onLogin(); // Notify App component that the user is logged in
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
      <View style={styles.header}>
        <MaterialIcons name="sports-soccer" size={48} color="white" />
        <Text style={styles.appTitle}>Football App</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ccc" 
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc" 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} color="#ccc" style={styles.loginButton} />
      <Text style={styles.trademark}>© ELophem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f51b5', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white', 
    color: 'black', 
    marginTop: 10,
  },
  trademark: {
    marginTop: 100,
    color: '#ccc',
  },
  loginButtonContainer: {
    width: '100%',
    alignItems: 'center',
    borderColor : '#ccc',
  },
  loginButton: {
    marginTop: 20, 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default LoginPage;
