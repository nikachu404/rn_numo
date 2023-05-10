import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Joke } from '../types/Joke';
import { useAppSelector } from '../redux/hooks';
import { selectAllJokes } from '../redux/slices/jokesSlice';
import { JokeItem } from '../components/JokeItem';

export const JokeHistory: React.FC = () => {
  const jokes = useAppSelector(selectAllJokes);

  const renderItem = ({ item }: { item: Joke }) => (
    <JokeItem key={item.id} joke={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList data={jokes} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
