import { Input, ListItem, Typography } from '@mui/material'

export default function TextInputListItem({
  label,
  placeholder,
  name,
  value,
  required,
  handleChange,
}) {
  return (
    <ListItem className="flex flex-row w-full justify-center">
      <Typography
        variant="p"
        align="left"
        className="font-bold w-[15%] text-secondary"
      >
        {label}
      </Typography>
      <Input
        required={required}
        placeholder={placeholder}
        className="ml-5 w-[85%] flex-grow text-secondary"
        name={name}
        value={value}
        onChange={handleChange}
      />
    </ListItem>
  )
}
