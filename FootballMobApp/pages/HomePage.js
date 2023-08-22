import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ArticleService } from '../services/article.service';
import EditArticle from './EditArticle'; // Make sure to import the EditArticle component

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    this.articleService = new ArticleService();
  }

  componentDidMount() {
    this.loadArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.params !== this.props.route.params) {
      this.loadArticles();
    }
  }

  loadArticles() {
    this.articleService.getArticlesList()
      .then(data => {
        this.setState({
          articles: data.articles,
        });
      })
      .catch(error => {
        console.error('Error loading articles:', error);
      });
  }

  editArticle(article) {
    const articleId = article.articleId;


    
    const ArticleDetailScreen = ({ route }) => {
      return <ArticleDetail articleId={articleId} />;
    };

    const EditArticleScreen = ({ route }) => {
      return <EditArticle articleId={articleId} />;
    };
    
    this.props.navigation.navigate('EditArticle', {
      articleId,
      onArticleSaved: this.loadArticles.bind(this), // Pass the callback function
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.articles}
          keyExtractor={(item) => item.articleId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ArticleDetail', { articleId: item.articleId })}
            >
              <Text>{item.title}</Text>
              <TouchableOpacity onPress={() => this.editArticle(item)}>
                <Text>Edit</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default HomePage;
