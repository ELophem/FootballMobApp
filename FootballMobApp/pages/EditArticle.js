import React, { Component } from 'react';
import { View, Text,TouchableOpacity, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

import { ArticleService } from '../services/article.service';

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.route.params.articleId,
      title: '',
      subtitle: '',
      body: '',
    };
    this.articleService = new ArticleService();
  }
  fetchArticleContent = () => {
    console.log('Article ID:', this.state.articleId);
    this.articleService.getArticle(this.state.articleId)
      .then(data => {
        this.setState({
          title: data.title,
          subtitle: data.subtitle,
          body: data.body,
        });
      })
      .catch(error => {
        console.error('Error loading article content:', error);
      });
  };
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

  componentWillUnmount() {
    this.setState({
      articleId: null,
      title: '',
      subtitle: '',
      body: '',
    });
  }



  handleTitleChange = title => {
    this.setState({ title });
  };

  handleSubtitleChange = subtitle => {
    this.setState({ subtitle });
  };

  handleBodyChange = body => {
    this.setState({ body });
  };

  updateArticle = () => {
    const { articleId, title, subtitle, body } = this.state;
    const updatedArticle = {
      title,
      subtitle,
      body,
    };
  
    this.articleService
      .updateArticle(articleId, updatedArticle)
      .then((data) => {
        this.props.route.params.onArticleSaved(); // Call the function
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.error('Error updating article:', error);
      });
  };

  deleteArticle = async () => {
    const { articleId } = this.state;

    try {
      await this.articleService.deleteArticle(articleId);
      this.props.route.params.onArticleSaved(); // Call the onArticleSaved function from navigation options
      this.props.navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  render() {
    const { route, navigation } = this.props;
    const articleId = route.params.articleId;
    return (
      
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Homepage</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            value={this.state.title}
            onChangeText={this.handleTitleChange}
            placeholder="Title"
          />
        </View>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            value={this.state.subtitle}
            onChangeText={this.handleSubtitleChange}
            placeholder="Subtitle"
          />
        </View>
        <View style={styles.box}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={this.state.body}
            onChangeText={this.handleBodyChange}
            multiline
            placeholder="Body"
          />
        </View>
        <View style={styles.buttonBox}>
        <Button
            title="Delete"
            onPress={this.deleteArticle}
            color="#f44336"
          />
          <Button
            title="Save"
            onPress={this.updateArticle}
            color="#3cb371"
          />
          
        </View>
      </ScrollView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  box: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  input: {
    fontSize: 18,
  },
  textArea: {
    height: 150,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#3f51b5', 
    padding: 20, 
  },
});


export default EditArticle;
