import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip, 
  OutlinedInput, 
  Checkbox, 
  ListItemText,
  Slider,
  Paper,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { movieApi } from '../services/movieApi';

// Genre mapping (normally would come from API)
const GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

const RecommendationForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    favoriteGenres: [],
    favoriteMovies: '',
    favoriteActors: '',
    releaseYearRange: [1970, new Date().getFullYear()],
    minRating: 7,
    includeAdult: false
  });
  
  const [errors, setErrors] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleGenreChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      favoriteGenres: value
    });
  };

  const handleYearRangeChange = (event, newValue) => {
    setFormData({
      ...formData,
      releaseYearRange: newValue
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      minRating: newValue
    });
  };

  const handleAdultChange = (event) => {
    setFormData({
      ...formData,
      includeAdult: event.target.checked
    });
  };

  const handleMovieSearch = async () => {
    if (!formData.favoriteMovies.trim()) return;
    
    setSearchLoading(true);
    setSearchError(null);
    
    try {
      const data = await movieApi.searchMovies(formData.favoriteMovies);
      setSearchResults(data.results || []);
    } catch (error) {
      setSearchError('Failed to search movies. Please try again.');
      console.error('Movie search error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.favoriteGenres.length === 0) {
      newErrors.favoriteGenres = 'Please select at least one genre';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Get Personalized Movie Recommendations
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Tell us about your preferences and we'll suggest movies you might enjoy.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h6" gutterBottom>
          Genre Preferences
        </Typography>
        
        <FormControl 
          fullWidth 
          margin="normal" 
          error={!!errors.favoriteGenres}
          required
        >
          <InputLabel id="genres-label">Favorite Genres</InputLabel>
          <Select
            labelId="genres-label"
            id="favoriteGenres"
            name="favoriteGenres"
            multiple
            value={formData.favoriteGenres}
            onChange={handleGenreChange}
            input={<OutlinedInput label="Favorite Genres" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((genreId) => (
                  <Chip key={genreId} label={GENRES[genreId] || genreId} />
                ))}
              </Box>
            )}
          >
            {Object.entries(GENRES).map(([id, name]) => (
              <MenuItem key={id} value={Number(id)}>
                <Checkbox checked={formData.favoriteGenres.indexOf(Number(id)) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          {errors.favoriteGenres && (
            <Typography variant="caption" color="error">
              {errors.favoriteGenres}
            </Typography>
          )}
        </FormControl>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Movie Preferences
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Favorite Movies (separate with commas)"
            name="favoriteMovies"
            value={formData.favoriteMovies}
            onChange={handleChange}
            margin="normal"
            helperText="Enter movies you've enjoyed in the past"
          />
          
          <Button 
            variant="outlined" 
            onClick={handleMovieSearch}
            disabled={searchLoading || !formData.favoriteMovies.trim()}
            sx={{ mt: 1 }}
          >
            {searchLoading ? <CircularProgress size={24} /> : 'Search Movies'}
          </Button>
          
          {searchError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {searchError}
            </Alert>
          )}
          
          {searchResults.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Search Results:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {searchResults.slice(0, 5).map(movie => (
                  <Chip 
                    key={movie.id} 
                    label={movie.title} 
                    onClick={() => {
                      // Add to favorite movies
                      const currentMovies = formData.favoriteMovies.split(',').map(m => m.trim()).filter(Boolean);
                      if (!currentMovies.includes(movie.title)) {
                        const newMovies = [...currentMovies, movie.title].join(', ');
                        setFormData({
                          ...formData,
                          favoriteMovies: newMovies
                        });
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
        
        <TextField
          fullWidth
          label="Favorite Actors/Directors (separate with commas)"
          name="favoriteActors"
          value={formData.favoriteActors}
          onChange={handleChange}
          margin="normal"
          helperText="Enter actors or directors whose work you enjoy"
        />
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Additional Filters
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography id="year-range-slider" gutterBottom>
            Release Year Range: {formData.releaseYearRange[0]} - {formData.releaseYearRange[1]}
          </Typography>
          <Slider
            value={formData.releaseYearRange}
            onChange={handleYearRangeChange}
            valueLabelDisplay="auto"
            min={1900}
            max={new Date().getFullYear()}
            aria-labelledby="year-range-slider"
          />
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography id="rating-slider" gutterBottom>
            Minimum Rating: {formData.minRating}/10
          </Typography>
          <Slider
            value={formData.minRating}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            step={0.5}
            marks
            min={0}
            max={10}
            aria-labelledby="rating-slider"
          />
        </Box>
        
        <FormControl component="fieldset" margin="normal">
          <Typography component="legend">Content Preferences</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={formData.includeAdult}
              onChange={handleAdultChange}
              name="includeAdult"
              color="primary"
            />
            <Typography>Include adult content</Typography>
          </Box>
        </FormControl>
        
        <Box sx={{ mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Get Recommendations'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default RecommendationForm;