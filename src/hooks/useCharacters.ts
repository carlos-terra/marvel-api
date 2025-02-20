import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Character, ListData } from '../entities';

const useCharacters = (offset: number, name?: string) => {
  return useQuery<ListData<Character>, AxiosError>({
    queryKey: ['characters', offset, name],
    queryFn: () => fetchCharacters(offset, name),
    onError: error => {
      console.error('Failed to fetch characters:', error.message);
    },
    staleTime: 12 * 60 * 60 * 1000, // It is unlikely that the information will change in less than 12 hours.
  });
};

const fetchCharacters = async (offset?: number, name?: string) => {
  const MARVEL_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  try {
    const { data } = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters?apikey=${MARVEL_API_KEY}&offset=${offset}${
        name ? `&nameStartsWith=${name}` : ''
      }`
    );
    const characters = data?.data.results.map((character: Character) => ({
      id: character.id,
      name: character.name,
      thumbnail: character.thumbnail,
      description: character.description,
    }));
    return { data: characters, total: data.data.total };
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Failed to fetch the list of characters: ${axiosError.message}`
    );
  }
};

export default useCharacters;
