import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import useCharacters from '../hooks/useCharacters';
import {
  useCharacterStore,
  setSelectedCharacter,
} from '../store/useCharacterStore';
import { usePaginationStore } from '../store/usePaginationStore';
import CharacterSeries from './CharacterSeries';
import Modal from './Modal';

interface ThumbnailProps {
  width?: string;
  minWidth?: string;
}

const Item = styled(Paper)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 12,
  '&:hover div': {
    visibility: 'visible',
    cursor: 'pointer',
  },
}));

const Label = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  visibility: 'hidden',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  padding: '0.5em',
  boxSizing: 'border-box',
  borderRadius: 12,
  fontSize: '1.1rem',
  fontWeight: 'bold',
});

const Thumbnail = styled('img')<ThumbnailProps>(
  ({ width = 'auto', minWidth = 'auto' }) => ({
    borderRadius: 12,
    display: 'block',
    width: width,
    minWidth: minWidth,
  })
);

const CharacterList = () => {
  const offset = usePaginationStore(s => s.offset);

  const selectedCharacter = useCharacterStore(s => s.selectedCharacter);
  const { data: characterData } = useCharacters(offset);

  const [isModalVisible, setModalVisible] = useState(false);

  const handleCharacterClick = (id: number) => {
    const currentCharacter = characterData?.characters.find(
      current => current.id === id
    );
    setSelectedCharacter(currentCharacter);
    setModalVisible(true);
  };

  return characterData ? (
    <>
      <Box sx={{ width: '100%' }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {characterData.characters.map(character => {
            const { id, name, thumbnail } = character;
            return (
              <Item key={id} onClick={() => handleCharacterClick(id)}>
                <Label>{name}</Label>
                <Thumbnail
                  src={`${thumbnail.path}.${thumbnail.extension}`}
                  alt={name}
                  loading="lazy"
                  minWidth="188px"
                />
              </Item>
            );
          })}
        </Masonry>
        <Modal open={isModalVisible} onClose={() => setModalVisible(false)}>
          <div className="flex pb-20">
            <div className="pr-12 w-2/5">
              <Thumbnail
                src={`${selectedCharacter?.thumbnail.path}.${selectedCharacter?.thumbnail.extension}`}
                alt={selectedCharacter?.name}
                loading="lazy"
              />
            </div>
            <div className="w-3/5 overflow-y-auto">
              <div className="text-2xl pt-2 pb-6">
                {selectedCharacter?.name}
              </div>
              {selectedCharacter?.description ? (
                <div className="text-lg">
                  Description: {selectedCharacter?.description}
                </div>
              ) : (
                <div className="text-lg">Description Not Avaialble</div>
              )}
              <CharacterSeries characterId={selectedCharacter?.id as number} />
            </div>
          </div>
        </Modal>
      </Box>
    </>
  ) : null;
};

export default CharacterList;
