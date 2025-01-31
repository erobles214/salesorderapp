import {React, useEffect, forwardRef, useState  } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Container from '@mui/material/Container';
import Home from './Home';
import OrderSheet from './OrderSheet';
import Manage from './Manage';
import Inventory from './Inventory';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));


const Link = forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

function Content() {
  const location = useLocation();
  if (location.pathname === '/home') {
    return <Home />;
  } else if (location.pathname === '/orders') {
    return <OrderSheet />;
  } else if (location.pathname === '/manage') {
    return <Manage />;
  } else if (location.pathname === '/inventory') {
    return <Inventory />;
  }
  return <Home />;
}

const DashboardPage = () => {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking for a token)
    const isAuthenticated = !!localStorage.getItem('token');

    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: '24px' }}>
        <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
              </IconButton>
              <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </ Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
      <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
              <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
            </Toolbar>
            <Divider />
            <Paper elevation={0}>
            <List arial-label="main mailbox folders">
            <ListItemLink
                to="/home"
                primary="Home"
                icon={<DashboardIcon />}
              />
            <ListItemLink
                to="/orders"
                primary="Orders"
                icon={<BorderColorIcon />}
              />
               <ListItemLink
                to="/manage"
                primary="Manage"
                icon={<ManageAccountsIcon />}
              />
              <ListItemLink
                to="/inventory"
                primary="Inventory"
                icon={<InventoryIcon />}
              />
              </List>
            </Paper>
      </Drawer>
      <Container maxWidth="lg" sx={{ mt: 14, mb: 114 }}>
        <Routes>
      <Route path="*" element={<Content />} />
      </Routes>
        </Container>
    </Box>
  );
};

export default DashboardPage;