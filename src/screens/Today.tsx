import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeartButton } from '../components/HeartButton';
import { useRandomJoke } from '../customHooks/useRandomJoke';

export const TodayJoke: React.FC = () => {
  const joke = useRandomJoke();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{joke.joke}</Text>
        <HeartButton joke={joke} buttonType="big" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    marginTop: 130,
  },
  text: {
    marginBottom: 16,
    alignItems: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    lineHeight: 38,
    color: '#000000',
  },
});
