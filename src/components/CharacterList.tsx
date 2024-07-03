import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import useCharacters from '../hooks/useCharacters';
import { setSelectedCharacter } from '../store/useCharacterStore';
import { usePaginationStore } from '../store/usePaginationStore';
import Modal from './Modal';
import CharacterDetails from './CharacterDetails';
import Thumbnail from './CharacterThumbnail';

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

const CharacterList = () => {
  const offset = usePaginationStore(s => s.offset);

  const {
    data: characterData,
    isLoading,
    isError,
    error,
  } = useCharacters(offset);

  const [isModalVisible, setModalVisible] = useState(false);

  const handleCharacterClick = (id: number) => {
    const currentCharacter = characterData?.characters.find(
      current => current.id === id
    );
    setSelectedCharacter(currentCharacter);
    setModalVisible(true);
  };

  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {!isLoading && characterData && (
          <Masonry columns={{ xs: 2, sm: 3, lg: 4 }} spacing={2}>
            {characterData.characters.map(character => {
              const { id, name } = character;
              return (
                <Item key={id} onClick={() => handleCharacterClick(id)}>
                  <Label>{name}</Label>
                  <Thumbnail
                    src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
                    name={character?.name}
                  />
                </Item>
              );
            })}
          </Masonry>
        )}
        <Modal open={isModalVisible} onClose={() => setModalVisible(false)}>
          <CharacterDetails />
        </Modal>
      </Box>
    </>
  );
};

export default CharacterList;
