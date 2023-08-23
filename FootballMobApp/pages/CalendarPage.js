import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { GamesService } from '../services/games.service';
import EditPopUpComponent from '../components/EditPopUpComponent';

class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      userType: '',
      gameId: 0,
    };
    this.gamesService = new GamesService();
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
      this.editPopUpRef.current.show();
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

  renderGameItem = ({ item }) => (
    <View style={styles.gameContainer}>
      <View style={styles.gameBox}>
        <Text style={styles.gameName}>Game: {item.name}</Text>
        <Text>Date: {item.date}</Text>
        <Text>{item.competition}</Text>
        <Text style={styles.teamText}>HomeTeam: <Text style={styles.homeTeam}>{item.homeTeam}</Text> {item.homeScore}</Text>
        <Text style={styles.teamText}>AwayTeam: <Text style={styles.awayTeam}>{item.awayTeam}</Text> {item.awayScore}</Text>
        </View>
      {this.props.userProfile?.admin && ( // Check if the user is an admin
        <TouchableOpacity style={styles.editButton} onPress={() => this.editGame(item)}>
          <Text>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  render() {
    const upcomingGames = this.state.games.filter(
      (game) => game.homeScore === 0 && game.awayScore === 0
    );
    const pastGames = this.state.games.filter(
      (game) => game.homeScore !== 0 || game.awayScore !== 0
    );

    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Games</Text>
          {pastGames.map((game, index) => (
            <View key={index}>
              {this.renderGameItem({ item: game })}
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Games</Text>
          {upcomingGames.map((game, index) => (
            <View key={index}>
              {this.renderGameItem({ item: game })}
            </View>
          ))}
        </View>

        <EditPopUpComponent
          ref={this.editPopUpRef}
          gameId={this.state.gameId}
          updateGameScore={this.updateGameScore}
        />
      </ScrollView>
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
  gameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  gameBox: {
    flex: 1,
  },
  gameName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  teamText: {
    fontSize: 14,
    color: '#666',
  },
  homeTeam: {
    color: '#3498db',
  },
  awayTeam: {
    color: '#e74c3c',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#3f51b5',
    padding: 20, 
  },
});

export default CalendarPage;
