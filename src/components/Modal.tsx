import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import MuiModal from '@mui/material/Modal';
import logo from '../assets/marvel-logo.svg';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  children: React.ReactElement;
  onClose: () => void;
}

const Modal = ({ open, children, onClose }: Props) => {
  const [visible, setVisible] = useState<boolean>(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={visible}
    >
      <Fade in={open}>
        <Box className="relative w-full h-full bg-white border-2 text-black p-8">
          <div className="absolute top-0 left-0 m-4 mt-12">
            <IconButton
              aria-label="close"
              onClick={onClose}
              className="focus:outline-none scale-125"
            >
              <ArrowBackIcon sx={{ color: 'black' }} />
            </IconButton>
          </div>
          <div className="flex justify-center">
            <img
              className="w-48 md:w-60 pt-4 pb-10 transition-all duration-500 hover:scale-110"
              src={logo}
              alt="Marvel"
            />
          </div>
          {children}
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
