"use client"
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { alpha } from '@mui/material/styles';
import Image from 'next/image'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { mainListItems } from '@/components/listItems';
import Events from '@/components/events';
import EvenstList from '@/components/eventList';
import logo from '../../../assets/logo.png';
import { getEventsData } from '@/components/api';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
    backgroundColor: '#818181',
  },
  marginLeft: '50px !important',
  width: '100%',
  borderRadius: '50px',
  background: 'rgba(249, 250, 252, 1)',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '35ch',
      '&:focus': {
        width: '45ch',
      },
    },
  },
}));

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: 400,
  overflowY: 'auto',
  boxShadow: 'none',
  width: 'fit-content',
  maxWidth: '60vw',
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: 4,
  },
  '@media (min-width: 1020px)': {
    maxWidth: '90vw',
    minWidth: 'auto'
  },
  '@media (max-width: 768px)': {
    maxWidth: '80vw',
    minWidth: 'auto'
  },
}));

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [activeItem, setActiveItem] = React.useState(0);
  const [eventsCount, setEventsCount] = React.useState(0);

  const handleListItemClick = (index) => {
    setActiveItem(index);
  };

  React.useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const { allEvents } = await getEventsData();
        setEventsCount(allEvents);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataFromApi();
  }, []);
  console.log(eventsCount, 'total counts');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
              color: '#000',
              background: '#fff',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <Image
                src={logo}
                width={49}
                height={49}
                alt="Picture of the author"
              />

            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search events…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
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
          <List component="nav">
            {React.Children.map(mainListItems.props.children, (child, index) => {
              return React.cloneElement(child, {
                isActive: index === activeItem,
                handleClick: handleListItemClick,
                index: index,
              });
            })}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4,  ml: { xs: 0, lg: 1 }  }}>
            <Grid container spacing={3}>

              <Grid item xs={12}>
                <StyledPaper >
                  <EvenstList />
                </StyledPaper>
              </Grid>

              {/* All Events */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '20px',
                  }}
                >
                  <Events title='All Events' number={eventsCount} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '20px',
                  }}
                >
                  <Events title='This Month Events' number={2}/>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '20px',
                  }}
                >
                  <Events title='Favourite Events' number={2} />
                </Paper>
              </Grid>
              {/* Recent Orders */}

            </Grid>
            
          </Container>
        </Box>

        
      </Box>
    </ThemeProvider>
  );
}