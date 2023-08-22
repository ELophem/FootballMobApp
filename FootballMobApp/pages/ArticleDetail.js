// ArticleDetail.js
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ArticleService } from '../services/article.service'; // Update the path

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
    };
    this.articleService = new ArticleService();
  }

  componentDidMount() {
    const articleId = this.props.route.params.articleId;
    this.articleService.getArticle(articleId)
      .then(data => {
        this.setState({
          article: data,
        });
      })
      .catch(error => {
        console.error('Error loading article:', error);
      });
  }

  render() {
    const { article } = this.state;
    return (
      <View>
        <Text>Title: {article.title}</Text>
        <Text>Subtitle: {article.subtitle}</Text>
        <Text>Body: {article.body}</Text>
      </View>
    );
  }
}

export default ArticleDetail;
