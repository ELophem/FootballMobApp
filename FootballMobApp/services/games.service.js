import AsyncStorage from '@react-native-async-storage/async-storage';

export class GamesService {
  constructor() {
    this.baseUrl = 'http://192.168.0.108:3000/api/';
  }

  async getGames() {
    try {
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      console.log('Token sent:', token);
  
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
  
      const response = await fetch(this.baseUrl + 'games', { headers });
      const data = await response.json();
  
      console.log('Games Response:', data);
  
      return data;
    } catch (error) {
      console.error('getGames error:', error);
      throw error;
    }
  }
  
  // You can add more methods here for different game-related requests
  
  // For example, a method to get game scores
  async getGameScores(gameId) {
    try {
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      console.log('Token sent:', token);
  
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
  
      const response = await fetch(this.baseUrl + `games/${gameId}/scores`, { headers });
      const data = await response.json();
  
      console.log('Game Scores Response:', data);
  
      return data;
    } catch (error) {
      console.error('getGameScores error:', error);
      throw error;
    }
  }
}
