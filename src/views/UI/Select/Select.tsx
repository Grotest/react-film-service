import * as React from 'react';
import Select from '@mui/material/Select';
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

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as string);
    onChange(event.target.value as string);
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
          '& fieldset': { borderColor: '#66fcf1' }, // Цвет рамки
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: '#45a29e' }, // Цвет рамки при наведении
            '&.Mui-focused fieldset': { borderColor: '#66fcf1' }, // Цвет рамки при фокусе
          },
          '& .MuiSelect-icon': { color: '#66fcf1' }, // Цвет иконки выпадающего списка
          '& .MuiListItem-root': { color: '#66fcf1' }, // Цвет текста элементов списка
          '& .Mui-checked': { color: '#66fcf1' }, // Цвет чекбоксов в элементах списка
          '& .MuiListItemText-primary': { color: '#66fcf1' }, // Цвет текста в элементах списка
          '& .selected-values': { color: '#66fcf1' }, // Цвет выбранных значений
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
