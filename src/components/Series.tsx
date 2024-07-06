import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { CircularProgress } from '@mui/material';
import { Serie } from '../entities';
import useCharacterData from '../hooks/useCharacterData';
import Image from './Image';
import Accordion from './lib/Accordion';

const Series = ({ characterId }: { characterId: number | undefined }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    error,
  } = useCharacterData<Serie>(characterId, 'series');

  if (isFetching && !isFetchingNextPage)
    return (
      <div className="flex justify-center mx-auto w-full pt-5">
        <CircularProgress />
      </div>
    );
  if (isError) return <div>Error: {(error as Error).message}</div>;

  const flattenedSeries = data?.pages.flatMap(page => page.data) || [];

  return (
    <div className=" flex items-center flex-col">
      {flattenedSeries.map((serie: Serie) => {
        return (
          <Accordion key={serie.id} id={serie.id} title={serie.title}>
            <div className="overflow-auto">
              <div className="mb-4 md:mb-0 md:float-left md:w-1/2 mr-4">
                <Image
                  src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                />
              </div>
              <div>
                {serie.description || (
                  <>
                    <CommentsDisabledIcon className="mr-2" />
                    Description Not Available
                  </>
                )}
              </div>
            </div>
          </Accordion>
        );
      })}
      <div className="pt-8 pb-16">
        {isFetchingNextPage ? (
          <div className="flex justify-center items-start mx-auto w-full">
            <CircularProgress />
          </div>
        ) : (
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className={`bg-red-600 text-white px-4 py-2 transition-all duration-300 ease-in-out 
                ${
                  !hasNextPage || isFetchingNextPage
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-110'
                } 
                focus:outline-none focus:ring-0`}
          >
            {hasNextPage ? 'Load More' : 'Nothing more to load'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Series;
