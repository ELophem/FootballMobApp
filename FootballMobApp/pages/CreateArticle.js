import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { ArticleService } from '../services/article.service';

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

  writeArticle() {
    const { title, subtitle, body } = this.state;

    const article = {
      title,
      subtitle,
      body,
    };

    this.articleService.postArticle(article)
      .then(() => {
        console.log('Article Posted');
        this.props.navigation.navigate('Home'); // Assuming 'Home' is the route name for your home page
      })
      .catch(error => {
        console.error('Error posting article:', error);
      });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Title"
          onChangeText={text => this.setState({ title: text })}
        />
        <TextInput
          placeholder="Subtitle"
          onChangeText={text => this.setState({ subtitle: text })}
        />
        <TextInput
          placeholder="Body"
          onChangeText={text => this.setState({ body: text })}
          multiline
        />
        <Button title="Post Article" onPress={() => this.writeArticle()} />
      </View>
    );
  }
}

export default CreateArticle;
