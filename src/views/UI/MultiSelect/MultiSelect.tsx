import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface MultiSelectProps {
  options: { value: string; name: string }[];
  label: string;
  onChange: (selectedValues: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelect: React.FC<MultiSelectProps> = ({ options, label, onChange }) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(typeof value === 'string' ? value.split(',') : value);
  };

  React.useEffect(() => {
    onChange(selectedValues);
  }, [selectedValues, onChange]);

  return (
   
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multi-select-label" sx={{ color: '#66fcf1' }}>
          {label}
        </InputLabel>
        <Select
          labelId="multi-select-label"
          id="multi-select"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label={label} sx={{ color: '#66fcf1' }} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{ '& fieldset': { borderColor: '#66fcf1' },  color: '#66fcf1'}}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={selectedValues.indexOf(option.value) > -1} />
              <ListItemText primary={option.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    
  );
};

export default MultiSelect;
