/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Joke } from '../types/Joke';
import { useAppDispatch } from '../redux/hooks';
import { likeJoke } from '../redux/slices/jokesSlice';
import { FAV_ICON, FAV_ICON_FILLED } from '../constants';

type Props = {
  joke: Joke;
  buttonType: 'small' | 'big';
};

export const HeartButton: React.FC<Props> = ({ joke, buttonType }) => {
  const dispatch = useAppDispatch();

  const heartScale = useRef(new Animated.Value(0)).current;

  const handleFavoritePress = async () => {
    dispatch(likeJoke({ ...joke, liked: !joke.liked }));

    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: joke.liked ? 0 : 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 0,
        duration: 300,
        delay: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const interpolatedScaleBigButton = heartScale.interpolate({
    inputRange: [0, 2],
    outputRange: [1, 2],
  });

  const interpolatedScaleSmallButton = heartScale.interpolate({
    inputRange: [0, 1.5],
    outputRange: [1, 1.5],
  });

  return (
    <Pressable
      style={[
        styles.heartContainer,
        buttonType === 'big'
          ? styles.heartContainerBig
          : styles.heartContainerSmall,
      ]}
      onPress={handleFavoritePress}>
      <View style={[styles.overlay, { opacity: joke.liked ? 1 : 0.2 }]} />
      <Animated.View
        style={[
          styles.heartIcon,
          {
            transform: [
              { translateX: -14 },
              { translateY: -14 },
              {
                scale:
                  buttonType === 'big'
                    ? interpolatedScaleBigButton
                    : interpolatedScaleSmallButton,
              },
            ],
          },
        ]}>
        <SvgUri uri={joke.liked ? FAV_ICON_FILLED : FAV_ICON} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  heartContainer: {
    position: 'relative',
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  heartContainerBig: {
    width: 64,
    height: 64,
  },
  heartContainerSmall: {
    width: 48,
    height: 48,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#9763FF',
  },
  heartIcon: {
    position: 'absolute',
    width: 28,
    height: 28,
    top: '50%',
    left: '50%',
  },
});
