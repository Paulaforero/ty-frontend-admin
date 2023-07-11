import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { MoreVertOutlined } from '@mui/icons-material'
import { Button, Menu } from '@mui/material'
import { useState, forwardRef } from 'react'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function IconMenu({ handleDelete }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDelete, setOpenDelete] = useState(false);
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickDelete = () => {
    handleDelete()
    setAnchorEl(null)
    setOpenDelete(true);
  }

  const handleCloseDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDelete(false);
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='rounded-full min-w-[0.6rem]'
      >
        <MoreVertOutlined color="secondary" />
      </Button>
      <Paper>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Ver</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClickDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Eliminar</ListItemText>
          </MenuItem>
        </Menu>
        <Snackbar open={openDelete} autoHideDuration={5000} onClose={handleCloseDelete}>
          <Alert onClose={handleCloseDelete} severity="success" sx={{ width: '100%' }}>
            Se eliminó con éxito!
          </Alert>
        </Snackbar>
      </Paper>
    </>
  )
}
