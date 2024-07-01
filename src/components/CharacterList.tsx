import { styled } from '@mui/material/styles';
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import useCharacters from '../hooks/useCharacters';
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

const Thumbnail = styled('img')({
  borderRadius: 12,
  display: 'block',
});

const CharacterList = () => {
  const { offset } = usePaginationStore(state => ({
    offset: state.offset,
  }));

  const { data: characterData } = useCharacters(offset);

  const [isModalVisible, setModalVisible] = useState(false);

  return characterData ? (
    <>
      <Box sx={{ width: '100%', minHeight: 253 }}>
        <Masonry columns={{ xs: 3, sm: 4 }} spacing={2}>
          {characterData.characters.map((character, index) => (
            <Item key={index} onClick={() => setModalVisible(true)}>
              <Label>{character.name}</Label>
              <Thumbnail
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                loading="lazy"
              />
            </Item>
          ))}
        </Masonry>
        <Modal open={isModalVisible} onClose={() => setModalVisible(false)}>
          <div>Modal content</div>
        </Modal>
      </Box>
    </>
  ) : null;
};

export default CharacterList;
