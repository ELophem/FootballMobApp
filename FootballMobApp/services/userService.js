
import AsyncStorage from '@react-native-async-storage/async-storage';

export class UserService {
  constructor() {
    this.baseUrl = 'http://192.168.0.108:3000/api/';
  }

  async getUserProfile() {
    try {
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      console.log('Token sent:', token); // Add this line to log the token being sent
  
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
  
      const response = await fetch(this.baseUrl + 'profile', { headers });
      const data = await response.json();
  
      console.log('User Profile Response:', data); // Add this line to log the response data
  
      return data; // Return the fetched profile data
    } catch (error) {
      console.error('getUserProfile error:', error);
      throw error;
    }
  }
  

  async login(user) {
    try {
      const response = await fetch(this.baseUrl + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);

        if (data.user) {
          await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        }

        return data; // Return the login response data
      } else {
        throw new Error('Token not found in login response');
      }
    } catch (error) {
      console.error('login error:', error);
      throw error;
    }
  }
}
