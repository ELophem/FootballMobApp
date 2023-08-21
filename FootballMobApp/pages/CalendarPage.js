import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { GamesService } from '../services/games.service'; // Update the path to your service

class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      userType: '',
      gameId: 0,
    };
    this.gamesService = new GamesService();
  }

  componentDidMount() {
    this.loadGames();
  }

  loadGames() {
    this.gamesService.getGames() // Correct the method name to getGames()
      .then(data => {
        this.setState({
          games: data.games,
          userType: data.admin,
        });
        console.log(this.state.userType);
        console.log(this.state.games);
      })
      .catch(error => {
        console.error('Error loading games:', error);
      });
  }

  editGame(game) {
    this.setState({ gameId: game.gameId }, () => {
      console.log(this.state.gameId);
      console.log(this.state.games);

      // Open edit popup here
      // You can use your preferred modal/pop-up library or create a custom component
      // to display the edit form
    });
  }

  render() {
    return (
      <View>
        <Text>Calendar Page</Text>
        <FlatList
          data={this.state.games}
          keyExtractor={(item) => item.gameId.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>Game: {item.name}</Text>
              <Text>Date: {item.date}</Text>
              <Text>HomeTeam : {item.homeTeam}</Text>
              <Text>HomeScore : {item.homeScore}</Text>
              <Text>AwayTeam : {item.awayTeam}</Text>
              <Text>AwayScore : {item.awayScore}</Text>
              {/* Add more details you want to display */}
              <Button
                title="Edit"
                onPress={() => this.editGame(item)}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

export default CalendarPage;
