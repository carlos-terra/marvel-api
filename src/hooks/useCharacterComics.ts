import axios, { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { Comic } from '../entities';

interface ComicsData {
  comics: Comic[];
  total: number;
}

const fetchComics = async ({
  pageParam = 0,
  characterId,
}: {
  pageParam: number;
  characterId: number | undefined;
}) => {
  const MARVEL_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const RESULTS_LIMIT = 20;

  try {
    const { data } = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${MARVEL_API_KEY}&offset=${
        pageParam * RESULTS_LIMIT
      }`
    );
    const comics = data?.data.results.map((series: Comic) => ({
      id: series.id,
      title: series.title,
      thumbnail: series.thumbnail,
      description: series.description,
    }));
    return { comics, total: data.data.total };
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Failed to fetch series: ${axiosError.message}`);
  }
};

const useCharacterComics = (characterId: number | undefined) => {
  return useInfiniteQuery<ComicsData, AxiosError>({
    queryKey: ['characterComics', characterId],
    queryFn: ({ pageParam = 0 }) => fetchComics({ pageParam, characterId }),
    onError: error => {
      console.error('Failed to fetch comics:', error.message);
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.total > pages.reduce((acc, page) => acc + page.comics.length, 0)
        ? pages.length
        : undefined,
    staleTime: 12 * 60 * 60 * 1000, // It is unlikely that the information will change in less than 12 hours.
  });
};

export default useCharacterComics;
