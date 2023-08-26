import AsyncStorage from '@react-native-async-storage/async-storage';

export class ArticleService {
  constructor() {
    this.baseUrl = 'http://192.168.0.108:3000/api/';//change ip adress of where api is running
  }

  async getArticlesList() { //get the article list and store it to show up on the Homepage
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
  // get the more detailed information about an article to show up on the article detail screen
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
 // method to update the content of an article 
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
 //method to delete an article  based on its ID when pressing the delete button
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
 // method to post an article when creating an article on the create article screen
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
