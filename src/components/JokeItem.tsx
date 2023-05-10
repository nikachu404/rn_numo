import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Joke } from '../types/Joke';
import { HeartButton } from './HeartButton';

type Props = {
  joke: Joke;
};

export const JokeItem: React.FC<Props> = ({ joke }) => {
  return (
    <View style={styles.jokeContainer}>
      <Text style={styles.text}>{joke.joke}</Text>
      <HeartButton joke={joke} buttonType="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  jokeContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    borderStyle: 'solid',
  },
  text: {
    width: '80%',
    paddingHorizontal: 24,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 26,
    alignItems: 'center',
    color: '#000000',
  },
});
