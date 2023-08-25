import AsyncStorage from '@react-native-async-storage/async-storage';

export class ArticleService {
  constructor() {
    this.baseUrl = 'http://192.168.1.59:3000/api/';
  }

  async getArticlesList() {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(this.baseUrl + 'articles', { headers });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('getArticlesList error:', error);
      throw error;
    }
  }

  async getArticle(id) {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(this.baseUrl + 'article/' + id, { headers });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('getArticle error:', error);
      throw error;
    }
  }

  async updateArticle(id, updatedArticle) {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(this.baseUrl + 'article/' + id, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedArticle),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('updateArticle error:', error);
      throw error;
    }
  }

  async deleteArticle(id) {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(this.baseUrl + 'article/' + id, {
        method: 'DELETE',
        headers,
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('deleteArticle error:', error);
      throw error;
    }
  }

  async postArticle(articleData) {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(this.baseUrl + 'article', {
        method: 'POST',
        headers,
        body: JSON.stringify(articleData),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('postArticle error:', error);
      throw error;
    }
  }
}

export default ArticleService;
