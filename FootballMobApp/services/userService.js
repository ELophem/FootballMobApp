
import AsyncStorage from '@react-native-async-storage/async-storage';

export class UserService {
  constructor() {
    
    this.baseUrl = 'http://192.168.0.108:3000/api/'; //change ip adress of where api is running 
  }

  async getUserProfile() {  //get the user profile with token if it exist i get it back as a json file
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

  async getUser(userId) {  // get userid to use in the articles for the name of the writer
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(this.baseUrl + 'username/' + userId, { headers });
      const data = await response.json();

      return data; // Return the user data
    } catch (error) {
      console.error('getUser error:', error);
      throw error;
    }
  }
}
