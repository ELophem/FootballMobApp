// CreateArticle.js
import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { ArticleService } from '../services/article.service'; // Update the path

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      body: '',
    };
    this.articleService = new ArticleService();
  }

  createArticle() {
    const newArticle = {
      title: this.state.title,
      subtitle: this.state.subtitle,
      body: this.state.body,
    };

    this.articleService.postArticle(newArticle)
      .then(data => {
        console.log('Article created:', data);
        // You can navigate back to the HomePage or perform other actions
      })
      .catch(error => {
        console.error('Error creating article:', error);
      });
  }

  render() {
    return (
      <View>
        <Text>Create New Article</Text>
        <TextInput
          placeholder="Title"
          value={this.state.title}
          onChangeText={text => this.setState({ title: text })}
        />
        <TextInput
          placeholder="Subtitle"
          value={this.state.subtitle}
          onChangeText={text => this.setState({ subtitle: text })}
        />
        <TextInput
          placeholder="Body"
          value={this.state.body}
          onChangeText={text => this.setState({ body: text })}
          multiline
        />
        <Button title="Create Article" onPress={() => this.createArticle()} />
      </View>
    );
  }
}

export default CreateArticle;
