import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { useCharacterStore } from '../store/useCharacterStore';
import CharacterSeries from './CharacterSeries';
import Thumbnail from './CharacterThumbnail';
import Tabs from './Tabs';

const CharacterDetails = () => {
  const selectedCharacter = useCharacterStore(s => s.selectedCharacter);
  const thumbnail = useCharacterStore(s => s.selectedCharacter?.thumbnail);
  const tabs = [
    {
      name: 'Series',
      icon: MovieCreationIcon,
      component: (
        <CharacterSeries characterId={selectedCharacter?.id as number} />
      ),
    },
    {
      name: 'Comics',
      icon: AutoStoriesIcon,
      component: <div>1111</div>,
    },
  ];

  return (
    <div className="flex pb-20">
      <div className="pr-12 w-2/5">
        <Thumbnail
          src={`${thumbnail?.path}.${thumbnail?.extension}`}
          name={selectedCharacter?.name}
        />
      </div>
      <div className="w-3/5 overflow-y-auto">
        <div className="text-2xl pt-2 pb-6">{selectedCharacter?.name}</div>
        {selectedCharacter?.description ? (
          <div className="text-lg">
            Description: {selectedCharacter?.description}
          </div>
        ) : (
          <div className="text-lg">Description Not Avaialble</div>
        )}
        <div className="mt-6">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
