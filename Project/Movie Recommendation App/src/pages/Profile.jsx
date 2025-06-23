import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Avatar, Grid, TextField,
  Button, Divider, Card, CardContent, Switch, FormControlLabel,
  Chip, List, ListItem, ListItemText, ListItemIcon, Alert,
  IconButton
} from '@mui/material';
import './Profile.css';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Movie enthusiast and sci-fi lover',
    avatar: '',
    preferences: {
      genres: ['Action', 'Sci-Fi', 'Drama', 'Thriller'],
      notifications: true,
      darkMode: false,
      language: 'English'
    },
    stats: {
      watched: 42,
      watchlist: 15,
      reviews: 8,
      favorites: 12
    }
  });

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to a database or API
    setEditMode(false);
    // Show a success message
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setProfileData({
      ...profileData,
      preferences: {
        ...profileData.preferences,
        [name]: checked
      }
    });
  };

  const handleRemoveGenre = (genreToRemove) => {
    setProfileData({
      ...profileData,
      preferences: {
        ...profileData.preferences,
        genres: profileData.preferences.genres.filter(genre => genre !== genreToRemove)
      }
    });
  };

  return (
    <Container maxWidth="lg" className="profile-container" sx={{ py: 4 }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        This is a demo profile page. In a real app, this would connect to a user authentication system.
      </Alert>
      
      <Grid container spacing={4}>
        {/* Left Side - Profile Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Avatar
                src={profileData.avatar || '/default-avatar.png'}
                alt={profileData.name}
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
              />
              
              {!editMode ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    {profileData.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {profileData.email}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {profileData.bio}
                  </Typography>
                </>
              ) : (
                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" size="small" sx={{ mb: 2 }}>
                    Change Avatar
                  </Button>
                  <TextField
                    name="name"
                    label="Name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                  />
                  <TextField
                    name="bio"
                    label="Bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </Box>
              )}

              <Box sx={{ mt: 3 }}>
                {!editMode ? (
                  <Button 
                    variant="contained" 
                    onClick={handleEditToggle}
                    sx={{ borderRadius: '20px' }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={handleSaveProfile}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={handleEditToggle}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Account Stats
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Card sx={{ textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h4">
                      {profileData.stats.watched}
                    </Typography>
                    <Typography variant="body2">
                      Watched
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h4">
                      {profileData.stats.watchlist}
                    </Typography>
                    <Typography variant="body2">
                      Watchlist
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ textAlign: 'center', mt: 1 }}>
                  <CardContent>
                    <Typography variant="h4">
                      {profileData.stats.reviews}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reviews
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ textAlign: 'center', mt: 1 }}>
                  <CardContent>
                    <Typography variant="h4">
                      {profileData.stats.favorites}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Favorites
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right Side - Preferences & Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle1" gutterBottom fontWeight="500">
              Favorite Genres
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {profileData.preferences.genres.map((genre) => (
                <Chip 
                  key={genre} 
                  label={genre} 
                  color="primary" 
                  variant="outlined"
                  onDelete={editMode ? () => handleRemoveGenre(genre) : undefined}
                />
              ))}
              
              {editMode && (
                <Chip 
                  label="+ Add Genre" 
                  variant="outlined" 
                  color="primary"
                  sx={{ borderStyle: 'dashed' }}
                />
              )}
            </Box>

            <Typography variant="subtitle1" gutterBottom fontWeight="500">
              App Settings
            </Typography>
            {editMode ? (
              <Box sx={{ pl: 1 }}>
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={profileData.preferences.notifications}
                      onChange={handlePreferenceChange}
                      name="notifications"
                      color="primary"
                    />
                  } 
                  label="Email Notifications"
                />
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={profileData.preferences.darkMode}
                      onChange={handlePreferenceChange}
                      name="darkMode"
                      color="primary"
                    />
                  } 
                  label="Dark Mode"
                />
              </Box>
            ) : (
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <span className="material-icons">notifications</span>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email Notifications"
                    secondary={profileData.preferences.notifications ? "Enabled" : "Disabled"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <span className="material-icons">dark_mode</span>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dark Mode"
                    secondary={profileData.preferences.darkMode ? "Enabled" : "Disabled"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <span className="material-icons">language</span>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Language"
                    secondary={profileData.preferences.language}
                  />
                </ListItem>
              </List>
            )}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Security
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
                Change Password
              </Button>
              <Button variant="outlined" color="error">
                Delete Account
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;