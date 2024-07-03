import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { Series } from '../entities';
import useCharacterSeries from '../hooks/useCharacterSeries';
import Accordion from './Accordion';
import CharacterImage from './CharacterImage';

const CharacterSeries = ({
  characterId,
}: {
  characterId: number | undefined;
}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    error,
  } = useCharacterSeries(characterId);

  if (isFetching && !isFetchingNextPage) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  const flattenedSeries = data?.pages.flatMap(page => page.series) || [];

  return (
    <div className=" flex items-center flex-col">
      {flattenedSeries.map((series: Series) => (
        <Accordion key={series.id} id={series.id} title={series.title}>
          <div className="flex">
            <CharacterImage
              src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
              width="50%"
            />
            <p className="pt-1 pl-4 w-1/2">
              {series.description || (
                <>
                  <CommentsDisabledIcon className="mr-2" />
                  Description Not Available
                </>
              )}
            </p>
          </div>
        </Accordion>
      ))}
      <div className="pt-8 pb-16">
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
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
};

export default CharacterSeries;
