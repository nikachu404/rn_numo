import { useEffect } from 'react';
import { selectCurrentJoke } from '../redux/slices/jokesSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getRandomJoke } from '../redux/thunks/getRandomJoke';

export const useRandomJoke = () => {
  const currentJoke = useAppSelector(selectCurrentJoke);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRandomJoke());
  }, [dispatch]);

  return currentJoke;
};
