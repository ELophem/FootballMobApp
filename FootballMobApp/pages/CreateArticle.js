import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
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
      // Reset navigation to the homepage
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    })
    .catch(error => {
      console.error('Error posting article:', error);
    });
}

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={text => this.setState({ title: text })}
          />
        </View>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="Subtitle"
            onChangeText={text => this.setState({ subtitle: text })}
          />
        </View>
        <View style={styles.box}>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Body"
            onChangeText={text => this.setState({ body: text })}
            multiline
          />
        </View>
        <Button
          title="Post Article"
          onPress={() => this.writeArticle()}
          color="#3cb371"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  container: {
    flex: 1,
    backgroundColor: '#3f51b5', // Set the background color for all screens
    padding: 20, // Example padding
  },
});

export default CreateArticle;
