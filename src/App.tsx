import React from 'react';
import './App.css';
import { Box, Card, Checkbox, Container, createMuiTheme, Divider, Grid, IconButton, TextField, ThemeProvider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const App = () => {
  return (
    <Container className="App">
      
      <Grid
        container
        direction="row"
        spacing={2}
      >
        {[1,2,3,4,5,6,7].map(x => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >  
            <ToDoItem />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const ToDoItem = () => (
  <Card>
    <Box>
      <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Checkbox />
        <TextField
          id="datetime-local"
          type="datetime-local"
          focused={false}        
          defaultValue="2017-05-24T10:30"
          InputProps={{ disableUnderline: true }}
          disabled
        />
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box padding={2}>
        <TextField
          defaultChecked={true}
          defaultValue='keke'
          focused={false}
          multiline
          fullWidth
          InputProps={{ disableUnderline: true }}
        />
      </Box>
    </Box>
  </Card>
)

export default App;
