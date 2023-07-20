'use client'

import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
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
import Link from 'next/link'
import Earth from '@/components/earth'

const drawerWidth = 295

const menuItemsPrimary = [
  { name: 'Dashboard', icon: <DashboardOutlinedIcon />, route: '/dashboard' },
  {
    name: 'Estadisticas',
    icon: <InsertChartOutlinedRoundedIcon />,
    route: '/statistics',
  },
]

const menuItemsSecondary = [
  {
    name: 'Concesionarios',
    icon: <StoreMallDirectoryOutlinedIcon />,
    route: '/dealerships',
  },
  { name: 'Clientes', icon: <PersonOutlineOutlinedIcon />, route: '/clients' },
  { name: 'Empleados', icon: <BadgeOutlinedIcon />, route: '/staff' },
  {
    name: 'Vehiculos',
    icon: <DirectionsCarOutlinedIcon />,
    route: '/vehicles',
  },
  { name: 'Modelos', icon: <MinorCrashOutlinedIcon />, route: '/models' },
  { name: 'Órdenes', icon: <ShoppingCartOutlinedIcon />, route: '/orders' },
  { name: 'Servicios', icon: <ConstructionOutlinedIcon />, route: '/services' },
  {
    name: 'Servicios Ofrecidos',
    icon: <CarRepairOutlinedIcon />,
    route: '/services-provided',
  },
  {
    name: 'Actividades',
    icon: <ContentPasteOutlinedIcon />,
    route: '/activities',
  },
  {
    name: 'Mantenimientos Recomendados',
    icon: <NoteAltOutlinedIcon />,
    route: '/recommended-maintenances',
  },
  {
    name: 'Especializaciones',
    icon: <EngineeringOutlinedIcon />,
    route: '/specialties',
  },
  { name: 'Productos', icon: <CategoryOutlinedIcon />, route: '/products' },
  {
    name: 'Lineas de Suministros',
    icon: <ViewListOutlinedIcon />,
    route: '/supply-lines',
  },
  {
    name: 'Detalles de orden',
    icon: <ShoppingCartCheckoutOutlinedIcon />,
    route: '/order-details',
  },
  {
    name: 'Disponibilidades',
    icon: <Inventory2OutlinedIcon />,
    route: '/availabilities',
  },
  { name: 'Pagos', icon: <CreditCardOutlinedIcon />, route: '/pagos' },
  { name: 'Facturas', icon: <ReceiptLongOutlinedIcon />, route: '/invoices' },
  {
    name: 'Costos de Actividades',
    icon: <RequestQuoteOutlinedIcon />,
    route: '/costs-activities',
  },
  { name: 'Descuentos', icon: <DiscountOutlinedIcon />, route: '/discounts' },
  {
    name: 'Aplicaciones de productos',
    icon: <PlumbingOutlinedIcon />,
    route: '/product-applications',
  },
  { name: 'Cargos', icon: <WorkOutlineOutlinedIcon />, route: '/charges' },
  { name: 'Ciudades', icon: <LocationCityOutlinedIcon />, route: '/cities' },
  { name: 'Estados', icon: <PublicOutlinedIcon />, route: '/states' },
]

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '0.438rem',
    padding: 10,
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#30A688',
    borderRadius: '5px',
  },
})

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '0.438rem',
    padding: 10,
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#30A688',
    borderRadius: '5px',
  },
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  borderRight: 'none',
  boxSizing: 'border-box',
  overflowX: 'hideen',

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

const ListItemButtonStyled = styled(ListItemButton)({
  borderTopRightRadius: '5rem',
  borderBottomRightRadius: '5rem',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '&.Mui-selected': {
    background:
      'linear-gradient(90deg, rgba(48,166,136,1) 16%, rgba(22,50,73,1) 65%)',
    '& .MuiTypography-root': {
      color: 'white',
    },
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
  },
})

export default function MiniDrawer({ children }) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [selectItem, setSelectItem] = useState(null)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleSelectItem = item => {
    if (selectItem !== item) {
      setSelectItem(item)
    }
  }

  return (
    <Box className="flex flex-row overflow-x-hidden">
      <CssBaseline />
      <Drawer variant="permanent" open={open} className="block">
        <DrawerHeader
          sx={{ display: open ? 'flex' : 'none', position: 'relative' }}
        >
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
        <List className="-pt-2">
          <ListItem
            style={{ display: !open ? 'block' : 'none' }}
            disablePadding
            className="block"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <ListItemButtonStyled
              sx={{
                height: '50px',
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                marginRight: '0.3rem',
                px: 2.5,
              }}
            >
              <ListItemIcon
                className="text-secondary"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MenuIcon />
              </ListItemIcon>
            </ListItemButtonStyled>
          </ListItem>
          {menuItemsPrimary.map(item => (
            <ListItem
              key={item.name}
              disablePadding
              className="block"
              onClick={() => handleSelectItem(item)}
            >
              <Link
                href={item.route}
                key={item.name}
                className="no-underline text-current"
              >
                <ListItemButtonStyled
                  selected={selectItem === item}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    marginRight: '0.3rem',
                  }}
                >
                  <ListItemIcon
                    className="text-secondary"
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
                </ListItemButtonStyled>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider variant="middle" textAlign="left" className="">
          {open ? 'CRUD' : ''}
        </Divider>
        <List>
          {menuItemsSecondary.map(item => (
            <>
              {item.name === 'Ciudades' ? (
                <Divider
                  variant="middle"
                  textAlign="left"
                  className="text-secondary"
                >
                  {open ? 'Localidades' : ''}
                </Divider>
              ) : item.name === 'Servicios' ? (
                <Divider
                  variant="middle"
                  textAlign="left"
                  className="text-secondary"
                >
                  {open ? 'Servicios - Actividades' : ''}
                </Divider>
              ) : (
                ''
              )}
              <ListItem
                key={item.name}
                disablePadding
                className="block"
                onClick={() => handleSelectItem(item)}
              >
                <Link
                  href={item.route}
                  key={item.name}
                  className="no-underline"
                >
                  <ListItemButtonStyled
                    selected={selectItem === item}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      marginRight: '0.3rem',
                    }}
                  >
                    <ListItemIcon
                      className="text-secondary"
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
                  </ListItemButtonStyled>
                </Link>
              </ListItem>
            </>
          ))}
        </List>
      </Drawer>
      <Box className="flex-grow overflow-x-hidden">{children}</Box>

      <Earth />
    </Box>
  )
}
