import axios, { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { Character, ListData, Serie } from '../entities';

interface FetchDataParams {
  pageParam?: number;
  characterId?: number;
  dataType: 'comics' | 'series' | '';
}

async function fetchData<T extends Character | Serie>({
  pageParam = 0,
  characterId,
  dataType = '',
}: FetchDataParams): Promise<ListData<T>> {
  const MARVEL_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const RESULTS_LIMIT = 20;

  try {
    const { data } = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters/${characterId}${
        dataType ? `/${dataType}` : ''
      }?apikey=${MARVEL_API_KEY}&offset=${pageParam * RESULTS_LIMIT}`
    );
    const items = data?.data.results.map((item: any) => ({
      id: item.id,
      name: item.title,
      thumbnail: item.thumbnail,
      description: item.description,
    })) as T[];
    return { data: items, total: data.data.total };
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Failed to fetch ${dataType}: ${axiosError.message}`);
  }
}

function useCharacterData<T extends Character | Serie>(
  characterId: number | undefined,
  dataType: 'comics' | 'series' | ''
) {
  return useInfiniteQuery<ListData<T>, AxiosError>({
    queryKey: [
      `character${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`,
      characterId,
    ],
    queryFn: ({ pageParam = 0 }) =>
      fetchData<T>({ pageParam, characterId, dataType }),
    onError: error => {
      console.error(`Failed to fetch ${dataType}:`, error.message);
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.total > pages.reduce((acc, page) => acc + page.data.length, 0)
        ? pages.length
        : undefined,
    staleTime: 12 * 60 * 60 * 1000, // It is unlikely that the information will change in less than 12 hours.
  });
}

export default useCharacterData;
