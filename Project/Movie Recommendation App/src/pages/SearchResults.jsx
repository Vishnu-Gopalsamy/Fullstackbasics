import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Container, Typography, Box, TextField, Button, Grid, 
  Card, CardMedia, CardContent, CardActions, Rating, 
  Chip, InputAdornment, IconButton, FormControl,
  Select, MenuItem, Pagination, Alert, CircularProgress,
  FormLabel, FormGroup
} from '@mui/material';
import { movieApi } from '../services/movieApi';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    genre: 'all',
    year: 'all',
    sort: 'popularity.desc'
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Simulated search function
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the actual API
      setTimeout(() => {
        const mockResults = [
          {
            id: 278,
            title: "The Shawshank Redemption",
            poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            vote_average: 8.7,
            overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
            genre_ids: [18, 80],
            release_date: "1994-09-23"
          },
          {
            id: 238,
            title: "The Godfather",
            poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            vote_average: 8.7,
            overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
            genre_ids: [18, 80],
            release_date: "1972-03-14"
          },
          {
            id: 240,
            title: "The Godfather Part II",
            poster_path: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
            vote_average: 8.5,
            overview: "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York.",
            genre_ids: [18, 80],
            release_date: "1974-12-20"
          },
          {
            id: 424,
            title: "Schindler's List",
            poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
            vote_average: 8.6,
            overview: "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis.",
            genre_ids: [18, 36],
            release_date: "1993-12-15"
          }
        ];
        
        setSearchResults(mockResults);
        setTotalPages(5); // Mock total pages
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to perform search. Please try again.");
      setLoading(false);
    }
  };

  // Perform search when query changes
  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery]);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
    setPage(1); // Reset to first page when changing filters
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  // Genre mapping for display
  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    18: 'Drama',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10749: 'Romance',
    878: 'Sci-Fi'
  };

  return (
    <Container maxWidth="lg" className="search-results-container" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Search Movies
      </Typography>

      {/* Search Form */}
      <Card sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search for movies..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" edge="end">
                        <span className="material-icons">search</span>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, fontSize: '0.75rem' }}>
                  Genre
                </FormLabel>
                <Select
                  value={filters.genre}
                  name="genre"
                  onChange={handleFilterChange}
                  size="small"
                >
                  <MenuItem value="all">All Genres</MenuItem>
                  <MenuItem value="28">Action</MenuItem>
                  <MenuItem value="18">Drama</MenuItem>
                  <MenuItem value="35">Comedy</MenuItem>
                  <MenuItem value="878">Sci-Fi</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, fontSize: '0.75rem' }}>
                  Year
                </FormLabel>
                <Select
                  value={filters.year}
                  name="year"
                  onChange={handleFilterChange}
                  size="small"
                >
                  <MenuItem value="all">All Years</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                  <MenuItem value="2020">2020</MenuItem>
                  <MenuItem value="older">Before 2020</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, fontSize: '0.75rem' }}>
                  Sort By
                </FormLabel>
                <Select
                  value={filters.sort}
                  name="sort"
                  onChange={handleFilterChange}
                  size="small"
                >
                  <MenuItem value="popularity.desc">Popularity</MenuItem>
                  <MenuItem value="vote_average.desc">Rating</MenuItem>
                  <MenuItem value="release_date.desc">Newest</MenuItem>
                  <MenuItem value="release_date.asc">Oldest</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Card>

      {/* Results */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 3 }}>{error}</Alert>
      ) : searchResults.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 5 }}>
          {initialQuery ? (
            <Alert severity="info">
              No movies found matching "{initialQuery}". Try a different search term.
            </Alert>
          ) : (
            <Typography color="text.secondary">
              Enter a search term to find movies.
            </Typography>
          )}
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Search Results {initialQuery ? `for "${initialQuery}"` : ''}
          </Typography>
          
          <Grid container spacing={3}>
            {searchResults.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <Card className="search-result-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" className="movie-title" noWrap>
                      {movie.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                      <Rating value={movie.vote_average / 2} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {movie.vote_average.toFixed(1)}/10
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 1 }}>
                      {movie.genre_ids.slice(0, 2).map((genreId) => (
                        <Chip 
                          key={genreId}
                          label={genreMap[genreId] || 'Unknown'} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                      <Chip 
                        label={movie.release_date.substring(0, 4)} 
                        size="small" 
                        variant="outlined"
                        sx={{ mb: 0.5 }}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {movie.overview.length > 100 
                        ? `${movie.overview.substring(0, 100)}...` 
                        : movie.overview}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ padding: 2, pt: 0 }}>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      component={Link} 
                      to={`/movie/${movie.id}`}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              size="large" 
              showFirstButton 
              showLastButton
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default SearchResults;