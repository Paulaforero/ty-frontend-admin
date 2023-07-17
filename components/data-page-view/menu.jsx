import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import { MoreVertOutlined } from '@mui/icons-material'
import { Button, Menu } from '@mui/material'
import { useState, forwardRef } from 'react'

export default function IconMenu({ handleView, handleEdit, handleDelete }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="rounded-full min-w-[0.6rem]"
      >
        <MoreVertOutlined color="secondary" />
      </Button>
      <Paper>
        <Menu
          /* The `anchorEl={anchorEl}` prop is used to specify the element that the menu should be
          anchored to. In this case, it is set to the value of the `anchorEl` state variable, which
          is initially set to `null`. When the button is clicked, the `anchorEl` state variable is
          updated with the current target of the click event, which is the button itself. This
          causes the menu to be anchored to the button when it is opened. */
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleView}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Ver</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Eliminar</ListItemText>
          </MenuItem>
        </Menu>
      </Paper>
    </>
  )
}
