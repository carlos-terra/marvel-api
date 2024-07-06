import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { useDetailsStore } from '../store/useDetailsStore';
import { useSearchStore } from '../store/useSearchStore';
import Comics from './Comics';
import Image from './Image';
import Series from './Series';
import Tabs from './lib/Tabs';

const Details = () => {
  const selectedItem = useDetailsStore(s => s.selectedItem);
  const searchType = useSearchStore(s => s.searchType);

  const tabs = [
    {
      name: 'Comics',
      icon: AutoStoriesIcon,
      component: <Comics characterId={selectedItem?.id} />,
    },
    {
      name: 'Series',
      icon: MovieCreationIcon,
      component: <Series characterId={selectedItem?.id} />,
    },
  ];

  return selectedItem ? (
    <div className="flex flex-col sm:flex-row px-3 pb-20 items-start">
      <div className="w-full mb-5 sm:w-2/5 sm:pr-12">
        <Image
          src={`${selectedItem?.thumbnail?.path}.${selectedItem.thumbnail?.extension}`}
        />
      </div>
      <div className="w-full sm:w-3/5 overflow-y-auto">
        <>
          <div className="text-2xl pt-2 pb-6">
            {'name' in selectedItem ? selectedItem.name : selectedItem.title}
          </div>
          {selectedItem.description ? (
            <div className="text-lg">
              Description: {selectedItem.description}
            </div>
          ) : (
            <div className="text-lg">
              <CommentsDisabledIcon className="mr-2" />
              Description Not Avaialble
            </div>
          )}
          {searchType === 'characters' && (
            <div className="mt-6">
              <Tabs tabs={tabs} />
            </div>
          )}
        </>
      </div>
    </div>
  ) : null;
};

export default Details;
