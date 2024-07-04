import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useSearchStore } from '../store/useSearchStore';

interface Props {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const SearchFilter = ({ onChange }: Props) => {
  const searchType = useSearchStore(s => s.searchType);

  return (
    <FormControl fullWidth>
      <RadioGroup
        row
        aria-labelledby="search-type"
        name="search-type"
        value={searchType}
        onChange={onChange}
      >
        <FormControlLabel
          value="characters"
          control={<Radio />}
          label="Characters"
          labelPlacement="start"
        />
        <FormControlLabel
          value="series"
          control={<Radio />}
          label="Series"
          labelPlacement="start"
        />
      </RadioGroup>
    </FormControl>
  );
};
export default SearchFilter;
