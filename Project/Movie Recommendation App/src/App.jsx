import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { 
  AppBar, Toolbar, Typography, Container, Box, Button, 
  Card, CardContent, Grid, ThemeProvider, createTheme,
  IconButton, Menu, MenuItem, Avatar, Badge, Drawer, List, 
  ListItem, ListItemIcon, ListItemText, Divider, useMediaQuery
} from '@mui/material'
import {
  Home as HomeIcon,
  Movie as MovieIcon,
  Favorite as FavoriteIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import './App.css'

// Import pages
import Home from './pages/Home';
import MovieRecommendation from './pages/MovieRecommendation';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import Profile from './pages/Profile';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
  },
});

function App() {
  const [favorites, setFavorites] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === movie.id);
      
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to search results page with query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          Movie Recommender
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/recommendations">
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="Discover" />
        </ListItem>
        <ListItem button component={Link} to="/favorites">
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              <Typography 
                variant="h6" 
                component={Link} 
                to="/" 
                sx={{ 
                  flexGrow: 1, 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Movie Recommender
              </Typography>
              
              {!isMobile && (
                <>
                  <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
                    Home
                  </Button>
                  <Button color="inherit" component={Link} to="/recommendations" startIcon={<MovieIcon />}>
                    Discover
                  </Button>
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/favorites" 
                    startIcon={
                      <Badge badgeContent={favorites.length} color="secondary">
                        <FavoriteIcon />
                      </Badge>
                    }
                  >
                    Favorites
                  </Button>
                </>
              )}
              
              <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', ml: 2 }}>
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px 0 0 4px',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="secondary" 
                  sx={{ 
                    borderRadius: '0 4px 4px 0',
                    minWidth: 'auto',
                    p: '6px'
                  }}
                >
                  <SearchIcon />
                </Button>
              </Box>
              
              <IconButton 
                color="inherit" 
                sx={{ ml: 2 }}
                onClick={handleMenuOpen}
              >
                <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
            }}
          >
            {drawer}
          </Drawer>
          
          <Box component="main" sx={{ flexGrow: 1, minHeight: 'calc(100vh - 64px - 200px)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/recommendations" 
                element={
                  <MovieRecommendation 
                    favorites={favorites} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <Favorites 
                    favorites={favorites} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                } 
              />
              <Route 
                path="/movie/:id" 
                element={
                  <MovieDetails 
                    favorites={favorites} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                } 
              />
              <Route 
                path="/search" 
                element={
                  <SearchResults 
                    favorites={favorites} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                } 
              />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Box>
          
          {/* Footer */}
          <Box 
            component="footer" 
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: (theme) => theme.palette.grey[100]
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    Movie Recommender
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Find your next favorite movie with our personalized recommendation system.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    Quick Links
                  </Typography>
                  <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
                    <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
                    <li><Link to="/recommendations" style={{ textDecoration: 'none', color: 'inherit' }}>Discover</Link></li>
                    <li><Link to="/favorites" style={{ textDecoration: 'none', color: 'inherit' }}>Favorites</Link></li>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    Contact
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: info@movierecommender.com
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: +1 (555) 123-4567
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, borderTop: '1px solid #ddd', pt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  © {new Date().getFullYear()} Movie Recommender. All rights reserved.
                </Typography>
              </Box>
            </Container>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
