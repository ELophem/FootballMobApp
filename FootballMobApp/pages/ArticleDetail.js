import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArticleService } from '../services/article.service'; // Update the path

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: props.route.params.articleId, // Set initial articleId from props
      article: {},
    };
    this.articleService = new ArticleService();
  }

  componentDidMount() {
    this.fetchArticleContent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.params.articleId !== this.props.route.params.articleId) {
      this.setState({ articleId: this.props.route.params.articleId }, () => {
        this.fetchArticleContent(); // Fetch content for the new articleId
      });
    }
  }

  fetchArticleContent = () => {
    this.articleService.getArticle(this.state.articleId)
      .then(data => {
        this.setState({
          article: data,
        });
      })
      .catch(error => {
        console.error('Error loading article:', error);
      });
  };
  
  render() {
    const { article } = this.state;
    const { route, navigation } = this.props;
    const articleId = route.params.articleId;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>Back to Homepage</Text>
        </TouchableOpacity>
        <Text>Title: {article.title}</Text>
        <Text>Subtitle: {article.subtitle}</Text>
        <Text>Body: {article.body}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  // Your styles here...
});
export default ArticleDetail;
