import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const ReportConfiguration = () => {
    const [categories, setCategories] = useState([]);

  const handleInputChange = (index, event) => {
    const values = [...categories];
    values[index] = event.target.value;
    setCategories(values);
  };

  const handleAddClick = () => {
    setCategories([...categories, '']);
  };

  const handleAlertClick = () => {
    alert(`Categories: ${categories.join(', ')}`);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom sx={{ my: 4 }}>
        You can add categories for the report:
      </Typography>
      <Grid container direction="column" spacing={2}>
        {categories.map((category, index) => (
          <Grid item key={index}>
            <TextField
              label={`Category ${index + 1}`}
              value={category}
              onChange={event => handleInputChange(index, event)}
            />
          </Grid>
        ))}
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddClick}>
            Add Category
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleAlertClick}>
            Show Categories
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportConfiguration;