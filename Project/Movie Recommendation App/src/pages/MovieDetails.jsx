import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, Container, Typography, Grid, Paper, Chip, 
  Rating, Button, CircularProgress, Divider, Card, 
  CardContent, Avatar, List, ListItem, ListItemText
} from '@mui/material';
import { movieApi } from '../services/movieApi';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        // This would be implemented in the real movieApi service
        // For now, we're simulating the response
        setTimeout(() => {
          setMovie({
            id: id,
            title: "The Shawshank Redemption",
            poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
            release_date: "1994-09-23",
            vote_average: 8.7,
            overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
            genres: [{"id": 18, "name": "Drama"}, {"id": 80, "name": "Crime"}],
            runtime: 142,
            tagline: "Fear can hold you prisoner. Hope can set you free.",
            budget: 25000000,
            revenue: 28341469,
            production_companies: [
              {
                name: "Castle Rock Entertainment",
                logo_path: "/iVNtBvUffBvWpldoSD8JdqNqEjk.png"
              }
            ],
            credits: {
              cast: [
                {id: 504, name: "Tim Robbins", character: "Andy Dufresne", profile_path: "/hsCu1JUzQQ4pl7uFxAVFLOs9yHh.jpg"},
                {id: 192, name: "Morgan Freeman", character: "Ellis Boyd 'Red' Redding", profile_path: "/oIciQWrLmUkXKXmhI6BFttv7n1D.jpg"}
              ],
              crew: [
                {id: 4027, name: "Frank Darabont", job: "Director", profile_path: "/yRrBl4tHwUHveFOcXAYwdBrUuLE.jpg"},
                {id: 4027, name: "Frank Darabont", job: "Screenplay", profile_path: "/yRrBl4tHwUHveFOcXAYwdBrUuLE.jpg"}
              ]
            }
          });

          setSimilarMovies([
            {id: 278, title: "The Shawshank Redemption", poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", vote_average: 8.7},
            {id: 238, title: "The Godfather", poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", vote_average: 8.7},
            {id: 240, title: "The Godfather Part II", poster_path: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg", vote_average: 8.5},
            {id: 424, title: "Schindler's List", poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", vote_average: 8.6}
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">{error}</Typography>
          <Button component={Link} to="/recommendations" variant="contained" sx={{ mt: 2 }}>
            Go Back to Recommendations
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box className="movie-details-page">
      {movie && (
        <>
          {/* Backdrop Header */}
          <Box 
            className="movie-backdrop" 
            sx={{
              position: 'relative',
              height: { xs: '300px', md: '500px' },
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mb: 4
            }}
          >
            <Box className="backdrop-overlay" sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))',
              display: 'flex',
              alignItems: 'flex-end'
            }}>
              <Container maxWidth="lg" sx={{ pb: 4, color: 'white' }}>
                <Grid container spacing={4} alignItems="flex-end">
                  <Grid item xs={12} md={3}>
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-poster"
                      style={{ 
                        width: '100%', 
                        borderRadius: '8px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)' 
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Box>
                      <Typography variant="h3" component="h1" fontWeight="bold">
                        {movie.title}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mt: 1, fontStyle: 'italic', opacity: 0.8 }}>
                        {movie.tagline}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, flexWrap: 'wrap' }}>
                        {movie.genres.map(genre => (
                          <Chip 
                            key={genre.id} 
                            label={genre.name} 
                            size="small" 
                            sx={{ mr: 1, mb: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} 
                          />
                        ))}
                        <Chip 
                          label={`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`} 
                          size="small" 
                          sx={{ mr: 1, mb: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} 
                        />
                        <Chip 
                          label={movie.release_date.substring(0, 4)} 
                          size="small" 
                          sx={{ mb: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} 
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Rating 
                          value={movie.vote_average / 2} 
                          precision={0.5} 
                          readOnly 
                          sx={{ color: 'yellow' }} 
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {movie.vote_average.toFixed(1)}/10
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>

          {/* Content */}
          <Container maxWidth="lg" sx={{ mb: 8 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 4, mb: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight="500">
                    Overview
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {movie.overview}
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6} md={3}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Budget
                      </Typography>
                      <Typography variant="body1">
                        ${movie.budget.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Revenue
                      </Typography>
                      <Typography variant="body1">
                        ${movie.revenue.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Cast Section */}
                <Paper sx={{ p: 4, mb: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight="500">
                    Cast
                  </Typography>
                  <Grid container spacing={2}>
                    {movie.credits.cast.map(person => (
                      <Grid item xs={6} sm={4} md={3} key={person.id}>
                        <Card sx={{ height: '100%' }}>
                          <Avatar
                            variant="rounded"
                            src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                            sx={{ 
                              width: '100%', 
                              height: 180,
                              borderRadius: '4px 4px 0 0'
                            }}
                          />
                          <CardContent sx={{ p: 2 }}>
                            <Typography variant="subtitle2" component="div" noWrap>
                              {person.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {person.character}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Movie Info
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Director" 
                        secondary={movie.credits.crew.find(c => c.job === "Director")?.name || "N/A"} 
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText 
                        primary="Writer" 
                        secondary={movie.credits.crew.find(c => c.job === "Screenplay")?.name || "N/A"} 
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText 
                        primary="Production" 
                        secondary={movie.production_companies.map(c => c.name).join(", ")} 
                      />
                    </ListItem>
                  </List>
                </Paper>

                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Similar Movies
                  </Typography>
                  <List>
                    {similarMovies.map(similarMovie => (
                      <ListItem 
                        key={similarMovie.id} 
                        component={Link} 
                        to={`/movie/${similarMovie.id}`}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          color: 'inherit',
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.04)'
                          }
                        }}
                      >
                        <Avatar 
                          variant="rounded" 
                          src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                          sx={{ width: 50, height: 75, marginRight: 2 }}
                        />
                        <ListItemText 
                          primary={similarMovie.title}
                          secondary={`Rating: ${similarMovie.vote_average}/10`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button 
                      variant="outlined" 
                      component={Link} 
                      to="/recommendations" 
                      fullWidth
                    >
                      More Recommendations
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </Box>
  );
};

export default MovieDetails;