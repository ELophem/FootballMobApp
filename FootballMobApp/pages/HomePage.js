import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { ArticleService } from '../services/article.service';
import EditArticle from './EditArticle';
import ArticleDetail from './ArticleDetail';

const Stack = createStackNavigator();

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      searchQuery: '',
    };
    this.articleService = new ArticleService();
  }

  componentDidMount() {
    this.loadArticles();
  }

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.route.params !== this.props.route.params) {
      this.loadArticles();
    }
  }

  handleArticlePosted = (newArticle) => {
    // Update the articles state to include the new article
    this.setState(prevState => ({
      articles: [newArticle, ...prevState.articles],
    }));
  };
  

  loadArticles = () => {
    this.articleService
      .getArticlesList()
      .then((data) => {
        const filteredArticles = data.articles.filter(
          (article) =>
            article.title.includes(this.state.searchQuery) ||
            article.subtitle.includes(this.state.searchQuery) ||
            article.body.includes(this.state.searchQuery)
        );

        this.setState({
          articles: filteredArticles,
        });
      })
      .catch((error) => {
        console.error('Error loading articles:', error);
      });
  };

  editArticle = (article) => {
    const articleId = article.articleId;
    this.props.navigation.navigate('EditArticle', {
      articleId,
      onArticleSaved: this.loadArticles, 
    });
  };
  

  renderArticleItem = ({ item }) => (
    <View style={styles.articleContainer}>
      <TouchableOpacity
        style={styles.articleBox}
        onPress={() =>
          this.props.navigation.navigate('ArticleDetail', { articleId: item.articleId })
        }
      >
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleSubtitle}>{item.subtitle}</Text>
      </TouchableOpacity>

      {this.props.userProfile?.admin && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => this.editArticle(item)}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  render() {
    return (
      <Stack.Navigator
        initialRouteName="ArticleList"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ArticleList">
          {(props) => (
            <View style={styles.container}>
              <View style={styles.searchBar}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search articles"
                  value={this.state.searchQuery}
                  onChangeText={this.handleSearchChange}
                  onSubmitEditing={this.loadArticles}
                />
                <TouchableOpacity onPress={this.loadArticles}>
                  <Ionicons
                    name="md-search"
                    size={24}
                    color="#666"
                    style={styles.searchIcon}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
              data={this.state.articles}
              keyExtractor={(item) => item.articleId.toString()}
              renderItem={this.renderArticleItem}
              contentContainerStyle={styles.scrollContainer}
            />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="EditArticle" component={EditArticle} />
        <Stack.Screen name="CreateArticle">
  {(props) => (
    <CreateArticle {...props} onArticlePosted={this.handleArticlePosted} />
  )}
</Stack.Screen>
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0', 
      padding: 20,
    },
    scrollContainer: {
      paddingBottom: 20,
    },
    articleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: '#ffffff',
      padding: 10,
      borderRadius: 5,
      elevation: 3, 
    },
    articleBox: {
      flex: 1,
    },
    articleTitle: {
      fontSize: 18, 
      fontWeight: 'bold',
    },
    articleSubtitle: {
      fontSize: 14,
      color: '#666',
    },
    editButton: {
      backgroundColor: '#3498db', 
      padding: 5,
      borderRadius: 5,
    },
    searchInput: {
      backgroundColor: '#ffffff',
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      width: 250, 
      backgroundColor: '#ffffff',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    searchIcon: {
      marginLeft: 10,
    },
    container: {
      flex: 1,
      backgroundColor: '#3f51b5', 
      padding: 20, 
    },
    
  });

export default HomePage;
