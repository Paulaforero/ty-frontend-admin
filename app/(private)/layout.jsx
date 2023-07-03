'use client'

import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Divider, Typography } from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined'
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined'
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined'
import PlumbingOutlinedIcon from '@mui/icons-material/PlumbingOutlined'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import MinorCrashOutlinedIcon from '@mui/icons-material/MinorCrashOutlined'

const drawerWidth = 240

const menuItemsPrimary = [
  { name: 'Dashboard', icon: <DashboardOutlinedIcon color="secondary" /> },
  {
    name: 'Estadisticas',
    icon: <InsertChartOutlinedRoundedIcon color="secondary" />,
  },
]

const menuItemsSecondary = [
  {
    name: 'Concesionarios',
    icon: <StoreMallDirectoryOutlinedIcon color="secondary" />,
  },
  { name: 'Usuarios', icon: <PersonOutlineOutlinedIcon color="secondary" /> },
  { name: 'Empleados', icon: <BadgeOutlinedIcon color="secondary" /> },
  { name: 'Vehiculos', icon: <DirectionsCarOutlinedIcon color="secondary" /> },
  { name: 'Modelos', icon: <MinorCrashOutlinedIcon color="secondary" /> },
  { name: 'Órdenes', icon: <ShoppingCartOutlinedIcon color="secondary" /> },
  { name: 'Servicios', icon: <ConstructionOutlinedIcon color="secondary" /> },
  {
    name: 'Servicios Ofrecidos',
    icon: <CarRepairOutlinedIcon color="secondary" />,
  },
  { name: 'Actividades', icon: <ContentPasteOutlinedIcon color="secondary" /> },
  {
    name: 'Mantenimientos Recomendados',
    icon: <NoteAltOutlinedIcon color="secondary" />,
  },
  {
    name: 'Especializaciones',
    icon: <EngineeringOutlinedIcon color="secondary" />,
  },
  { name: 'Productos', icon: <CategoryOutlinedIcon color="secondary" /> },
  {
    name: 'Lineas de Suministros',
    icon: <ViewListOutlinedIcon color="secondary" />,
  },
  {
    name: 'Detalles de orden',
    icon: <ShoppingCartCheckoutOutlinedIcon color="secondary" />,
  },
  {
    name: 'Disponibilidades',
    icon: <Inventory2OutlinedIcon color="secondary" />,
  },
  { name: 'Pagos', icon: <CreditCardOutlinedIcon color="secondary" /> },
  { name: 'Facturas', icon: <ReceiptLongOutlinedIcon color="secondary" /> },
  {
    name: 'Costos de Actividades',
    icon: <RequestQuoteOutlinedIcon color="secondary" />,
  },
  { name: 'Descuentos', icon: <DiscountOutlinedIcon color="secondary" /> },
  {
    name: 'Aplicaciones de productos',
    icon: <PlumbingOutlinedIcon color="secondary" />,
  },
  { name: 'Cargos', icon: <WorkOutlineOutlinedIcon color="secondary" /> },
  { name: 'Ciudades', icon: <LocationCityOutlinedIcon color="secondary" /> },
  { name: 'Estados', icon: <PublicOutlinedIcon color="secondary" /> },
]

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  whiteSpace: 'nowrap',
  overflow: 'overlay',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const CollapseButton = styled(Box, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'white',
  boxShadow: 'none',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  borderRight: 'none',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      borderRight: 'none',
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      border: 'none',
    },
  }),
}))

export default function MiniDrawer({ children }) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <CssBaseline />
      <CollapseButton position="fixed" open={open}></CollapseButton>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader style={{ display: open ? 'flex' : 'none' }}>
          <IconButton
            onClick={handleDrawerClose}
            style={{ display: open ? 'block' : 'none' }}
            color="secondary"
          >
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>

          <Typography
            variant="h5"
            style={{ display: open ? 'block' : 'none' }}
            className="ml-12"
            color="secondary"
          >
            T&Y
          </Typography>
        </DrawerHeader>
        <List>
          <ListItem
            style={{ display: !open ? 'block' : 'none' }}
            disablePadding
            className="block"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MenuIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {menuItemsPrimary.map(item => (
            <ListItem key={item.name} disablePadding className="block">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  className="text-secondary"
                  sx={{ opacity: open ? 1 : 0 }}
                  primary={item.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider variant="middle" textAlign="left">
          {open ? 'CRUD' : ''}
        </Divider>
        <List>
          {menuItemsSecondary.map(item => (
            <ListItem key={item.name} disablePadding className="block">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  className="text-secondary"
                  sx={{ opacity: open ? 1 : 0 }}
                  primary={item.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box className="ml-[35px]">{children}</Box>
    </>
  )
}
