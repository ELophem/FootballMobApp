import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArticleService } from '../services/article.service';

import { UserService } from '../services/userService';
//fetching the specific content of an article Id so that we can inspect and read it 
class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: props.route.params.articleId,
      article: {},
      writerName: '',
    };
    this.articleService = new ArticleService();
    this.userService = new UserService();
  }

  componentDidMount() {
    this.fetchArticleContent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.params.articleId !== this.props.route.params.articleId) {
      this.setState({ articleId: this.props.route.params.articleId }, () => {
        this.fetchArticleContent();
      });
    }
  }

  fetchArticleContent = async () => {
    try {
      const articleData = await this.articleService.getArticle(this.state.articleId);

      console.log('Article Data:', articleData);
      this.setState({ article: articleData });
  
      const writerData = await this.userService.getUser(articleData.userId);
      console.log('Writer Data:', writerData);
      this.setState({ writerName: writerData.username });
    } catch (error) {
      console.error('Error loading article:', error);
    }
  };
  
  render() {
    const { article, writerName } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Homepage</Text>
        </TouchableOpacity>
        <View style={styles.articleBox}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.subtitle}>{article.subtitle}</Text>
          <Text style={styles.writer}>Written by: {writerName}</Text>
          <Text style={styles.body}>{article.body}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f51b5',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'white', 
    padding: 5,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  articleBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  bodyBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  writer: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
});

export default ArticleDetail;
