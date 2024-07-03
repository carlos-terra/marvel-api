import axios, { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { Series } from '../entities';

interface SeriesData {
  series: Series[];
  total: number;
}

const fetchCharacterSeries = async ({
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
      `https://gateway.marvel.com:443/v1/public/characters/${characterId}/series?apikey=${MARVEL_API_KEY}&offset=${
        pageParam * RESULTS_LIMIT
      }`
    );
    const series = data?.data.results.map((series: Series) => ({
      id: series.id,
      title: series.title,
      thumbnail: series.thumbnail,
      description: series.description,
    }));
    return { series, total: data.data.total };
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Failed to fetch series: ${axiosError.message}`);
  }
};

const useCharacterSeries = (characterId: number | undefined) => {
  return useInfiniteQuery<SeriesData, AxiosError>({
    queryKey: ['characterSeries', characterId],
    queryFn: ({ pageParam = 0 }) =>
      fetchCharacterSeries({ pageParam, characterId }),
    onError: error => {
      console.error('Failed to fetch series:', error.message);
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.total > pages.reduce((acc, page) => acc + page.series.length, 0)
        ? pages.length
        : undefined,
    staleTime: 12 * 60 * 60 * 1000, // It is unlikely that the information will change in less than 12 hours.
  });
};

export default useCharacterSeries;
