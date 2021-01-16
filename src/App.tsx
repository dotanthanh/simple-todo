import React, { useState } from 'react'
import { Box, Card, CardContent, CardHeader, Checkbox, Container, createMuiTheme, Divider, FormControl, Grid, IconButton, Paper, TextField, ThemeProvider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import './App.css'
import AddIcon from '@material-ui/icons/AddCircleOutline'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import CheckIcon from '@material-ui/icons/Check'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#323232',
      light: '#c8c8c8'
    },
  },
});

interface TodoItem {
  description: string,
  deadline?: string,
  completed: boolean
}

interface AppState {
  items: TodoItem[],
  selectedItemIndex?: number
}

const initialState: AppState = {
  items: [],
  selectedItemIndex: undefined
}

const selectItemReducer = (itemIndex: number, state: AppState): AppState =>
  Object.assign({}, state, {
    selectedItemIndex: state.selectedItemIndex === itemIndex
      ? undefined
      : itemIndex
  })

const addItemReducer = (item: TodoItem, state: AppState): AppState => {
  const newItemList = state.items
  newItemList.unshift(item)

  return Object.assign({}, state, {
    items: newItemList,
    selectedItemIndex: undefined
  })
}

const deleteItemReducer = (itemIndex: number, state: AppState): AppState =>
Object.assign({}, state, {
  items: state.items.filter((_, index) => index !== itemIndex),
  selectedItemIndex: undefined
})

const updateItemReducer = (itemIndex: number, item: TodoItem, state: AppState): AppState => {
  const newItemList = state.items
  newItemList.splice(itemIndex, 1)
  newItemList.unshift(item)

  return Object.assign({}, state, {
    items: newItemList,
    selectedItemIndex: undefined
  })
}

const App = () => {
  const [state, setState] = useState(initialState)

  const newItem: TodoItem = {
    description: '',
    deadline: undefined,
    completed: false
  }
  const selectedItem: TodoItem = state.selectedItemIndex
    ? state.items[state.selectedItemIndex]
    : newItem

  const addItem = (item: TodoItem) => {
    setState(addItemReducer(item, state))
  }
  const selectItem = (itemIndex: number) => {
    setState(selectItemReducer(itemIndex, state))
  }
  const updateItem = (itemIndex: number, item: TodoItem) => {
    setState(updateItemReducer(itemIndex, item, state))
  }
  const deleteItem = (itemIndex: number) => {
    setState(deleteItemReducer(itemIndex, state))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container className="App">
        <TodoForm
          item={selectedItem}
          selectedItemIndex={state.selectedItemIndex}
          addItem={addItem}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
        <br />
        <br />
        <br />
        <TodoList items={state.items} selectItem={selectItem} />
      </Container>
    </ThemeProvider>
  )
}

type TodoFormProps = {
  item: TodoItem,
  selectedItemIndex?: number,
  addItem: (item: TodoItem) => void,
  updateItem: (itemIndex: number, item: TodoItem) => void,
  deleteItem: (itemIndex: number) => void,
}

const TodoForm = (props: TodoFormProps) => {
  const {item: selectedItem, selectedItemIndex, addItem, updateItem, deleteItem} = props
  const [item, setItem] = useState(selectedItem)

  const updateItemField = (field: keyof TodoItem, value: any) => {
    const newItem = Object.assign({}, item, {
      [field]: value
    })
    setItem(newItem)
  }
  console.log('coll', item)

  return (
    <Box
      display='flex'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
    >
      <Card elevation={0}>
        <Box
          border={2}
          borderColor='secondary.light'
        >
          <form>
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <FormControl>
                <Checkbox
                  color='primary'
                  checked={item.completed}
                  onClick={(event: any) => updateItemField('completed', event.target.checked)}
                />
              </FormControl>
              <FormControl>            
                <TextField
                  type="datetime-local"
                  defaultValue={item.deadline}
                  InputProps={{ disableUnderline: true }}
                  onChange={event => updateItemField('deadline', event.target.value)}
                />
              </FormControl>
            </Box>
            <Divider />
            <Box padding={2}>
              <TextField
                defaultValue={item.description}
                onChange={event => updateItemField('description', event.target.value)}
                multiline
                fullWidth
                InputProps={{ disableUnderline: true }}
              />
            </Box>
          </form>
        </Box>
      </Card>
      <Box>
        {selectedItemIndex
          ? (
            <>
              <IconButton onClick={() => updateItem(selectedItemIndex, item)}>
                <CheckIcon fontSize='large' />
              </IconButton>
              <IconButton onClick={() => deleteItem(selectedItemIndex)}>
                <DeleteIcon fontSize='large' />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => addItem(item)}>
                <AddIcon fontSize='large' />
              </IconButton>
            </>
          )
        }
      </Box>
    </Box>
  )
}

type TodoListProps = {
  items: TodoItem[],
  selectItem: (itemIndex: number) => void
}

const TodoList = (props: TodoListProps) => {
  const {items, selectItem} = props

  return (
    <Grid
      container
      direction="row"
      spacing={2}
    >
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index} >  
          <TodoItem item={item} toggleSelect={() => selectItem(index)} />
        </Grid>
      ))}
    </Grid>
  )
}

type TodoItemProps = {
  item: TodoItem,
  toggleSelect: () => void
}

const TodoItem = (props: TodoItemProps) => {
  const {item, toggleSelect} = props

  return (
    <Card onClick={toggleSelect}>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        padding={2}
      >
        <TimelapseIcon />
        <span>{item.deadline}</span>
      </Box>
      <Divider />
      <Box padding={2}>
        {item.description}
      </Box>
    </Card>
  )
}

export default App;
