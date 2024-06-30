import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

interface SelectProps {
  options: { value: string; name: string }[];
  defaultValue: string;
  onChange: (selectedValue: string) => void;
}

const SelectComponent: React.FC<SelectProps> = ({ options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="select-label" sx={{ color: '#66fcf1' }}>
        {defaultValue}
      </InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={selectedValue}
        onChange={handleChange}
        input={<OutlinedInput label={defaultValue} sx={{ color: '#66fcf1' }} />}
        renderValue={(selected) => (
          <div className="selected-values" style={{ color: '#66fcf1' }}>
            {selected as string}
          </div>
        )}
        sx={{
          '& fieldset': { borderColor: '#66fcf1' },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: '#45a29e' },
            '&.Mui-focused fieldset': { borderColor: '#66fcf1' },
          },
          '& .MuiSelect-icon': { color: '#66fcf1' },
          '& .MuiListItem-root': { color: '#66fcf1' },
          '& .Mui-checked': { color: '#66fcf1' },
          '& .MuiListItemText-primary': { color: '#66fcf1' },
          '& .selected-values': { color: '#66fcf1' },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={selectedValue === option.value} />
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
