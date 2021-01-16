import React, { useState } from 'react'
import { Box, Card, Checkbox, Container, createMuiTheme, Divider, Grid, IconButton, Snackbar, TextField, ThemeProvider } from '@material-ui/core';
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
  }
});

interface TodoItem {
  description: string,
  deadline: string,
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

const shouldAlertItem = (item: TodoItem) => {
  const deadlineTime = new Date(item.deadline).getTime()
  const currentTime = new Date().getTime()

  return currentTime - deadlineTime <= 5 * 60 * 1000 
}

const compareItemByDeadline = (itemA: TodoItem, itemB: TodoItem) => {
  const deadlineA = new Date(itemA.deadline).getTime()
  const deadlineB = new Date(itemB.deadline).getTime()

  return deadlineA - deadlineB
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

const newItem: TodoItem = {
  description: '',
  deadline: '',
  completed: false
}

const App = () => {
  const [state, setState] = useState(initialState)
  const [alertItem, setAlertItem] = useState(undefined as TodoItem | undefined)

  const setItemTimeout = (item: TodoItem) => {
    if (item.deadline) {
      const deadlineTime = new Date(item.deadline).getTime()
      const currentTime = new Date().getTime()
    
      setTimeout(() => {
        setAlertItem(item)
      }, deadlineTime - currentTime)
    }
  }
  const addItem = (item: TodoItem) => {
    setItemTimeout(item)
    setState(addItemReducer(item, state))
  }
  const selectItem = (itemIndex: number) => {
    setState(selectItemReducer(itemIndex, state))
  }
  const updateItem = (itemIndex: number, item: TodoItem) => {
    setItemTimeout(item)
    setState(updateItemReducer(itemIndex, item, state))
  }
  const deleteItem = (itemIndex: number) => {
    setState(deleteItemReducer(itemIndex, state))
  }

  const selectedItem: TodoItem = state.selectedItemIndex !== undefined
    ? state.items[state.selectedItemIndex]
    : newItem

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
        <TodoList
          items={state.items}
          selectedItemIndex={state.selectedItemIndex}
          selectItem={selectItem}
        />
        <Box>
          {alertItem && (
            <Alert item={alertItem} />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

type AlertProps = {
  item: TodoItem
}

const Alert = ({item}: AlertProps) => {
  const [open, setOpen] = useState(true)

  return item && (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={5000}
      message={`Deadline is up for "${item.description.slice(0, 30)}..." !`}
    />
  )
}

type TodoFormProps = {
  item: TodoItem,
  selectedItemIndex?: number,
  addItem: (item: TodoItem) => void,
  updateItem: (itemIndex: number, item: TodoItem) => void,
  deleteItem: (itemIndex: number) => void,
}

type TodoFormState = {
  item: TodoItem,
  selectedItemIndex?: number
}

class TodoForm extends React.Component<TodoFormProps, TodoFormState> {
  state = {
    item: newItem,
    selectedItemIndex: undefined
  }

  static getDerivedStateFromProps(props: TodoFormProps, state: TodoFormState) {
    if (props.selectedItemIndex !== state.selectedItemIndex) {
      return {
        item: props.item,
        selectedItemIndex: props.selectedItemIndex
      }
    }

    return null
  }

  updateItemField = (field: keyof TodoItem, value: any) => {
    const newItem = Object.assign({}, this.state.item, {
      [field]: value
    })
    this.setState({
      item: newItem
    })
  }

  render () {
    const {selectedItemIndex, addItem, updateItem, deleteItem} = this.props
    const {item} = this.state

    return (
      <form>
        <Grid container>
          <Grid item xs={9}>
            <Box border={1} borderRadius={4} borderColor='secondary.light'>
              <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Checkbox
                  color='primary'
                  checked={item.completed}
                  onClick={(event: any) => this.updateItemField('completed', event.target.checked)}
                />            
                <TextField
                  type="datetime-local"
                  value={item.deadline}
                  InputProps={{ disableUnderline: true }}
                  onChange={event => this.updateItemField('deadline', event.target.value)}
                />
              </Box>
              <Divider />
              <Box padding={2}>
                <TextField
                  placeholder='Description'
                  value={item.description}
                  onChange={event => this.updateItemField('description', event.target.value)}
                  multiline
                  fullWidth
                  rows={5}
                  InputProps={{ disableUnderline: true }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexWrap='wrap'
            >
              {selectedItemIndex !== undefined
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
          </Grid>
        </Grid>
      </form>
    )
  }
}

type TodoListProps = {
  items: TodoItem[],
  selectedItemIndex?: number,
  selectItem: (itemIndex: number) => void
}

const TodoList = (props: TodoListProps) => {
  const {items, selectedItemIndex, selectItem} = props

  return (
    <Grid
      container
      direction="row"
      spacing={2}
    >
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index} >  
          <TodoItem
            item={item}
            isSelected={index === selectedItemIndex}
            toggleSelect={() => selectItem(index)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

type TodoItemProps = {
  item: TodoItem,
  isSelected: boolean,
  toggleSelect: () => void
}

const TodoItem = (props: TodoItemProps) => {
  const {item, isSelected, toggleSelect} = props

  const deadline: string = Boolean(item.deadline)
    ? item.deadline.split('T').join(', ')
    : ''

  return (
    <Card onClick={toggleSelect}>
      <div className={isSelected ? 'element-overlay' : ''} />
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        padding={2}
      >
        {item.completed
          ? <CheckIcon color='primary' />
          : <TimelapseIcon color='secondary' />
        }
        <span>{deadline}</span>
      </Box>
      <Divider />
      <Box padding={2} whiteSpace='pre-wrap'>
        {item.description}
      </Box>
    </Card>
  )
}

export default App
