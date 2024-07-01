import { styled } from '@mui/material/styles';
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import useCharacters, { Character } from '../hooks/useCharacters';
import { usePaginationStore } from '../store/usePaginationStore';
import Modal from './Modal';
import { useState } from 'react';

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

const Thumbnail = styled('img')<{ width?: string; height?: string }>(
  ({ width = 'auto', height = 'auto' }) => ({
    borderRadius: 12,
    display: 'block',
    width: width,
    height: height,
  })
);

const CharacterList = () => {
  const { offset } = usePaginationStore(state => ({
    offset: state.offset,
  }));

  const { data: characterData } = useCharacters(offset);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

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
      <Box sx={{ width: '100%', minHeight: 253 }}>
        <Masonry columns={{ xs: 3, sm: 4 }} spacing={2}>
          {characterData.characters.map(character => {
            const { id, name, thumbnail } = character;
            return (
              <Item key={id} onClick={() => handleCharacterClick(id)}>
                <Label>{name}</Label>
                <Thumbnail
                  src={`${thumbnail.path}.${thumbnail.extension}`}
                  alt={name}
                  loading="lazy"
                />
              </Item>
            );
          })}
        </Masonry>
        <Modal open={isModalVisible} onClose={() => setModalVisible(false)}>
          <div className="flex">
            <div className="pr-12 flex-1">
              <Thumbnail
                src={`${selectedCharacter?.thumbnail.path}.${selectedCharacter?.thumbnail.extension}`}
                alt={selectedCharacter?.name}
                loading="lazy"
                width="100%"
                height="100%"
              />
            </div>
            <div className="flex-1">
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
            </div>
          </div>
        </Modal>
      </Box>
    </>
  ) : null;
};

export default CharacterList;
