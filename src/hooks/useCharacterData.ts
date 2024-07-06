import axios, { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { ListData } from '../entities';

type DataType = 'comics' | 'series' | '';

interface FetchDataParams {
  pageParam?: number;
  characterId?: number;
  dataType: DataType;
}

async function fetchData<T>({
  pageParam = 0,
  characterId,
  dataType,
}: FetchDataParams): Promise<ListData<T>> {
  const MARVEL_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const RESULTS_LIMIT = 20;

  try {
    const { data } = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters/${characterId}${
        dataType ? `/${dataType}` : ''
      }?apikey=${MARVEL_API_KEY}&offset=${pageParam * RESULTS_LIMIT}`
    );
    const items: T[] = data?.data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      description: item.description,
    }));
    return { data: items, total: data.data.total };
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Failed to fetch ${dataType}: ${axiosError.message}`);
  }
}

function useCharacterData<T>(
  characterId: number | undefined,
  dataType: DataType
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
