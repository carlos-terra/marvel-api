import React from 'react';
import useCharacterSeries from '../hooks/useCharacterSeries';
import { Series } from '../entities';

const CharacterSeries = ({ characterId }: { characterId: number }) => {
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

  return (
    <div className=" flex items-center flex-col">
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.series.map((series: Series) => (
            <div key={series.id}>
              <h3>{series.title}</h3>
              <img
                src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                alt={series.title}
              />
              <p>{series.description}</p>
            </div>
          ))}
        </React.Fragment>
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
