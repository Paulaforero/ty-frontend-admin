import { Input, ListItem, Typography } from '@mui/material'

export default function TextInputListItem({
  label,
  placeholder,
  name,
  value,
  handleChange
}) {
  return (
    <ListItem className="flex flex-row w-full justify-center">
      <Typography variant="p" align="left" className="font-bold w-[15%]">
        {label}
      </Typography>
      <Input
        placeholder={placeholder}
        className="ml-5 w-[85%] flex-grow"
        name={name}
        value={value}
        onChange={handleChange}
      />
    </ListItem>
  )
}