import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { 
  AppBar, Toolbar, Typography, Container, Box, Button, 
  Card, CardContent, Grid, ThemeProvider, createTheme
} from '@mui/material'
import './App.css'

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
});

// Home component
function Home() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pt: 8,
          pb: 6,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ my: 5, textAlign: 'center', py: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
              Find Your Next Favorite Movie
            </Typography>
            <Typography variant="h5" component="p" paragraph sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
              Get personalized movie recommendations based on your taste
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ 
                mb: 2, 
                px: 4, 
                py: 1.5, 
                fontSize: '1.1rem', 
                backgroundColor: '#f50057',
                '&:hover': {
                  backgroundColor: '#c51162',
                }
              }}
            >
              Get Recommendations
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            How It Works
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            Our smart algorithm learns from your preferences and viewing history to suggest movies you'll love
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                  Discover New Releases
                </Typography>
                <Typography>
                  Stay up to date with the latest movies from your favorite genres and directors.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                  Personalized Picks
                </Typography>
                <Typography>
                  Our algorithm learns your preferences to suggest movies you'll love.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                  Create Watchlists
                </Typography>
                <Typography>
                  Save your favorite movies and track what you want to watch next.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Popular Movies Section */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" fontWeight="bold">
            Popular Movies
          </Typography>
          <Typography variant="body1" paragraph textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            Check out what everyone is watching right now
          </Typography>
          
          <Grid container spacing={3}>
            {[
              { id: 1, title: "The Shawshank Redemption", rating: "9.3", year: "1994", image: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
              { id: 2, title: "The Godfather", rating: "9.2", year: "1972", image: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" },
              { id: 3, title: "The Dark Knight", rating: "9.0", year: "2008", image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg" },
              { id: 4, title: "Pulp Fiction", rating: "8.9", year: "1994", image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" }
            ].map((movie) => (
              <Grid item xs={12} sm={6} md={3} key={movie.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ position: 'relative', paddingTop: '150%', overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={movie.image}
                      alt={movie.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" component="div" noWrap>
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.year} • Rating: {movie.rating}/10
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="outlined" size="large">
              View More Movies
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Movie Recommender
              </Typography>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/recommendations">Discover</Button>
              <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
            </Toolbar>
          </AppBar>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommendations" element={<div style={{ padding: '20px' }}>Recommendations Page Coming Soon</div>} />
            <Route path="/favorites" element={<div style={{ padding: '20px' }}>Favorites Page Coming Soon</div>} />
          </Routes>
          
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
