import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Serie } from '../entities';

interface SeriesData {
  series: Serie[];
  total: number;
}

const useSeries = (offset: number, title?: string) => {
  return useQuery<SeriesData, AxiosError>({
    queryKey: ['series', offset, title],
    queryFn: () => fetchSeries(offset, title),
    onError: error => {
      console.error('Failed to fetch series:', error.message);
    },
    staleTime: 12 * 60 * 60 * 1000, // It is unlikely that the information will change in less than 12 hours.
  });
};

const fetchSeries = async (offset?: number, title?: string) => {
  const MARVEL_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  try {
    const { data } = await axios.get(
      `https://gateway.marvel.com:443/v1/public/series?apikey=${MARVEL_API_KEY}&offset=${offset}${
        title ? `&titleStartsWith=${title}` : ''
      }`
    );
    const series = data?.data.results.map((serie: Serie) => ({
      id: serie.id,
      name: serie.title,
      thumbnail: serie.thumbnail,
      description: serie.description,
    }));
    return { series, total: data.data.total };
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Failed to fetch the list of series: ${axiosError.message}`
    );
  }
};

export default useSeries;
