import {
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

export default function SelectInputListItem({
  label,
  placeholder,
  value,
  options,
  required,
  name,
  handleChange,
}) {
  return (
<<<<<<< Updated upstream
    <ListItem className="flex flex-row">
      <Typography
        variant="p"
        align="left"
        className="font-bold w-[15%] text-secondary"
      >
        {label}
      </Typography>
      <FormControl fullWidth>
        <InputLabel
          id={`${name}-select`}
          size="small"
          className="items-center ml-7 lg:ml-9 w-[95%]"
=======
    <ListItem className="flex flex-row w-full">
      <FormControl className='w-full m-1'>
        <InputLabel
          id={`${name}-select`}
          className="items-center  w-full"
>>>>>>> Stashed changes
        >
          {placeholder}
        </InputLabel>
        <Select
          id={`${name}-select`}
<<<<<<< Updated upstream
          size="small"
=======
>>>>>>> Stashed changes
          value={value}
          label={placeholder}
          name={name}
          required={required}
<<<<<<< Updated upstream
          className="ml-7 lg:ml-9 w-[95%] text-secondary"
=======
          className=" w-full text-secondary"
>>>>>>> Stashed changes
          onChange={handleChange}
        >
          <MenuItem value="" className="text-secondary">
            {placeholder}
          </MenuItem>
          {options.map(option => (
            <MenuItem
              key={option.value}
              value={option.value}
              className="text-secondary"
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ListItem>
  )
}
