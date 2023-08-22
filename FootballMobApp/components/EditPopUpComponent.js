// EditPopUpComponent.js
import React, { Component } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { GamesService } from '../services/games.service'; // Update the path

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

class EditPopUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newHomeScore: '',
      newAwayScore: '',
      isVisible: false, // Internal state for controlling visibility
    };
    this.gamesService = new GamesService();
  }

  show() {
    this.setState({ isVisible: true });
  }

  hide() {
    this.setState({
      newHomeScore: '',
      newAwayScore: '',
      isVisible: false,
    });
  }

  async editGame(newHomeScore, newAwayScore) {
    const gameId = this.props.gameId;
  
    try {
      const homeScore = parseInt(newHomeScore);
      const awayScore = parseInt(newAwayScore);
  
      const response = await this.gamesService.editGame(gameId, homeScore, awayScore);
      
      if (response) {
        console.log("Game edited");
        this.setState({ isVisible: false });
        this.props.updateGameScore(gameId, homeScore, awayScore);
      }
    } catch (error) {
      console.error('Error editing game:', error);
    }
  }
  

  render() {
    const { isVisible } = this.state; // Destructure isVisible from state
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible} // Use this.state.isVisible here
        onRequestClose={() => {
          this.hide(); // Hide the modal when closed
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text>Edit Game</Text>
              <Button
                title="Close"
                onPress={() => {
                  this.hide(); // Hide the modal when the close button is pressed
                }}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="New Home Score"
              onChangeText={(text) => this.setState({ newHomeScore: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="New Away Score"
              onChangeText={(text) => this.setState({ newAwayScore: text })}
            />
            <Button
              title="Edit"
              onPress={() =>
                this.editGame(
                  this.state.newHomeScore,
                  this.state.newAwayScore
                )
              }
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default EditPopUpComponent;
