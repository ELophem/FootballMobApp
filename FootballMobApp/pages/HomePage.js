import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import userProfile from '../App.js'
import { ArticleService } from '../services/article.service';
import EditArticle from './EditArticle';
import ArticleDetail from './ArticleDetail';
//import { UserService } from './services/userService';

const Stack = createStackNavigator();



class HomePage extends Component {
  constructor(props) {
    super(props);
    //const { userProfile } = this.props.route.params;
    //const { userProfile } = this.props.route.params.initialParams;
    //const isAdmin = userProfile.admin;
    //console.log('Is admin:', isAdmin);
    //const userProfile = this.props.route.params?.userProfile;
    this.state = {
      articles: [],
      //userProfile: userProfile,
    };

    //console.log('User is admin when building homepage:', this.state.userProfile?.admin);//
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

  editArticle = article => {
    const articleId = article.articleId;
    this.props.navigation.navigate('EditArticle', {
      articleId,
      onArticleSaved: this.loadArticles.bind(this),
    });
  };

  renderArticleItem = ({ item }) => (
    <View style={styles.articleContainer}>
      <TouchableOpacity
        style={styles.articleBox}
        onPress={() => this.props.navigation.navigate('ArticleDetail', { articleId: item.articleId })}
      >
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleSubtitle}>{item.subtitle}</Text>
        </TouchableOpacity>

      {this.props.userProfile?.admin && (
        <TouchableOpacity style={styles.editButton} onPress={() => this.editArticle(item)}>
          <Text>Edit</Text>
        </TouchableOpacity>
      )}
            
    </View>
  );
//{userProfile?.admin && ()}
  render() {
    //const userProfile = this.props.route.params?.userProfile; // Get userProfile from route.params
    
    return (
      
      <Stack.Navigator initialRouteName="ArticleList" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ArticleList">
          {props => (
            <View style={styles.container}>
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
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Background color of the entire screen
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
    backgroundColor: '#ffffff', // Background color of each article box
    padding: 10,
    borderRadius: 5,
    elevation: 3, // Elevation for shadow effect on Android
  },
  articleBox: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 18, // Adjust the font size as needed
    fontWeight: 'bold',
  },
  articleSubtitle: {
    fontSize: 14, // Adjust the font size as needed
    color: '#666',
  },
  editButton: {
    backgroundColor: '#3498db', // Background color of the edit button
    padding: 5,
    borderRadius: 5,
  },
});

export default HomePage;
