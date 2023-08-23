import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  handleSearchChange = (text) => {
    this.setState({ searchText: text });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchText);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles"
          value={this.state.searchText}
          onChangeText={this.handleSearchChange}
          onSubmitEditing={this.handleSearch}
        />
        <TouchableOpacity onPress={this.handleSearch}>
          <Ionicons name="md-search" size={24} color="#666" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
  },
  searchIcon: {
    marginLeft: 10,
  },
});

export default SearchComponent;
