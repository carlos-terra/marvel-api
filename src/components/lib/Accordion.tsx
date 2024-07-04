import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import * as React from 'react';

interface Props {
  id: number;
  title: string;
  children: React.ReactElement;
}

const Accordion = ({ id, title, children }: Props) => {
  return (
    <>
      <MuiAccordion sx={{ width: '100%', margin: '0 10px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-content`}
          id={`${id}-header`}
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </MuiAccordion>
    </>
  );
};

export default Accordion;
