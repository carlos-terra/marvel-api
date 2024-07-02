import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MuiModal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import logo from '../assets/marvel-logo.svg';

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
        <Box className="relative bg-[#1e1e1e] text-white p-8 h-screen flex flex-col">
          <div className="h-[20%]">
            <div className="absolute top-0 left-0 m-4 mt-12">
              <IconButton
                aria-label="close"
                onClick={onClose}
                className="focus:outline-none scale-125"
              >
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className="flex justify-center">
              <img
                className="w-48 md:w-60 pt-4 pb-10 transition-all duration-500 hover:scale-110"
                src={logo}
                alt="Marvel"
              />
            </div>
          </div>
          <div className="h-[80%] overflow-auto">{children}</div>
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
