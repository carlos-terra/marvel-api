import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { useCharacterStore } from '../store/useCharacterStore';
import CharacterSeries from './CharacterSeries';
import Tabs from './Tabs';
import CharacterImage from './CharacterImage';

const CharacterDetails = () => {
  const selectedCharacter = useCharacterStore(s => s.selectedCharacter);
  const thumbnail = useCharacterStore(s => s.selectedCharacter?.thumbnail);
  const tabs = [
    {
      name: 'Series',
      icon: MovieCreationIcon,
      component: <CharacterSeries characterId={selectedCharacter?.id} />,
    },
    {
      name: 'Comics',
      icon: AutoStoriesIcon,
      component: <div>1111</div>,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row px-3 pb-20 items-start">
      <div className="sm:pr-12 sm:w-2/5">
        <CharacterImage src={`${thumbnail?.path}.${thumbnail?.extension}`} />
      </div>
      <div className="w-full sm:w-3/5 overflow-y-auto">
        <div className="text-2xl pt-2 pb-6">{selectedCharacter?.name}</div>
        {selectedCharacter?.description ? (
          <div className="text-lg">
            Description: {selectedCharacter?.description}
          </div>
        ) : (
          <div className="text-lg">
            <CommentsDisabledIcon className="mr-2" />
            Description Not Avaialble
          </div>
        )}
        <div className="mt-6">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
