import { createAsyncThunk } from '@reduxjs/toolkit';

export const getRandomJoke = createAsyncThunk(
  'jokes/getRandomJoke',
  async () => {
    const response = await fetch(
      'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single',
    );

    if (response.ok) {
      const joke = await response.json();

      return joke;
    } else {
      throw new Error(
        `Failed to fetch random joke with status code ${response.status}`,
      );
    }
  },
);
