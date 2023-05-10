import { Joke } from '../../types/Joke';
import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandomJoke } from '../thunks/getRandomJoke';

interface JokesState {
  currentJoke: Joke;
  allJokes: Joke[];
  lastFetched: string | null;
}

const initialState: JokesState = {
  currentJoke: {
    id: 0,
    joke: '',
    liked: false,
  },
  allJokes: [],
  lastFetched: null,
};

export const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    likeJoke: (state, action: PayloadAction<Joke>) => {
      if (state.currentJoke.id === action.payload.id) {
        state.currentJoke.liked = action.payload.liked;
      }

      const index = state.allJokes.findIndex(
        joke => joke.id === action.payload.id,
      );

      if (index !== -1) {
        state.allJokes[index].liked = action.payload.liked;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getRandomJoke.fulfilled, (state, action) => {
      const today = new Date().toLocaleDateString();
      const lastFetched = state.lastFetched;

      if (!lastFetched || lastFetched !== today) {
        const newJoke = action.payload;
        const existingIndex = state.allJokes.findIndex(
          joke => joke.id === newJoke.id,
        );

        if (existingIndex !== -1) {
          // If the joke already exists, move it to the beginning of the array
          state.allJokes.splice(existingIndex, 1);
          state.allJokes.unshift(newJoke);
        } else {
          // Otherwise, add the new joke to the beginning of the array
          state.allJokes.unshift(newJoke);
        }

        state.currentJoke = newJoke;
        state.lastFetched = today;
      }
    });
  },
});

export const selectCurrentJoke = (state: RootState) => state.jokes.currentJoke;
export const selectAllJokes = (state: RootState) => state.jokes.allJokes;

export const { likeJoke } = jokesSlice.actions;
export const jokesReducer = jokesSlice.reducer;
