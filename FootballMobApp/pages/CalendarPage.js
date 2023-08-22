// CalendarPage.js
import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { GamesService } from '../services/games.service'; // Update the path to your service
import EditPopUpComponent from '../components/EditPopUpComponent'; // Update the path

class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      userType: '',
      gameId: 0,
    };
    this.gamesService = new GamesService();

    // Create a ref for the EditPopUpComponent
    this.editPopUpRef = React.createRef();

    this.updateGameScore = this.updateGameScore.bind(this);

  }

  componentDidMount() {
    this.loadGames();
  }

  loadGames() {
    this.gamesService.getGames()
      .then(data => {
        this.setState({
          games: data.games,
          userType: data.admin,
        });
      })
      .catch(error => {
        console.error('Error loading games:', error);
      });
  }

  editGame(game) {
    this.setState({ gameId: game.gameId }, () => {
      // Open edit popup here
      this.editPopUpRef.current.show(); // Show the EditPopUpComponent
    });
  }
  updateGameScore(gameId, newHomeScore, newAwayScore) {
    const updatedGames = this.state.games.map(game => {
      if (game.gameId === gameId) {
        return {
          ...game,
          homeScore: newHomeScore,
          awayScore: newAwayScore,
        };
      }
      return game;
    });
  
    this.setState({ games: updatedGames });
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.games}
          keyExtractor={(item) => item.gameId.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>Game: {item.name}</Text>
              <Text>Date: {item.date}</Text>
              <Text>HomeTeam : {item.homeTeam} {item.homeScore}</Text>
              <Text>AwayTeam : {item.awayTeam} {item.awayScore}</Text>
              <Button
                title="Edit"
                onPress={() => this.editGame(item)}
              />
            </View>
          )}
        />

        {/* Add the EditPopUpComponent */}
        <EditPopUpComponent
          ref={this.editPopUpRef}
          gameId={this.state.gameId}
          updateGameScore={this.updateGameScore}
        />
      </View>
    );
  }
}

export default CalendarPage;
