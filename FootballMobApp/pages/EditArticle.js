import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
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

  componentDidMount() {
    this.fetchArticleContent();
  }

  componentWillUnmount() {
    // Clear the state values when the component unmounts
    this.setState({
      articleId: null,
      title: '',
      subtitle: '',
      body: '',
    });
  }

  fetchArticleContent = () => {
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

    this.articleService.updateArticle(articleId, updatedArticle)
      .then(data => {
        // Handle success, navigate back
        this.props.route.params.onArticleSaved(); // Call the onArticleSaved function from navigation options
        this.props.navigation.goBack();
      })
      .catch(error => {
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
    return (
      <View>
        <TextInput
          value={this.state.title}
          onChangeText={this.handleTitleChange}
          placeholder="Title"
        />
        <TextInput
          value={this.state.subtitle}
          onChangeText={this.handleSubtitleChange}
          placeholder="Subtitle"
        />
        <TextInput
          value={this.state.body}
          onChangeText={this.handleBodyChange}
          multiline
          placeholder="Body"
        />
        <Button title="Save" onPress={this.updateArticle} />
        <Button title="Delete" onPress={this.deleteArticle} />
      </View>
    );
  }
}

export default EditArticle;
