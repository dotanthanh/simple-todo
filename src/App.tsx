import React, { useState } from 'react'
import { Box, Container, Divider, ThemeProvider } from '@material-ui/core';

import './App.css'
import { theme } from './custom/theme'
import { ITodoItem, IAppState } from './types'
import {
  newItem,
  addItemReducer,
  selectItemReducer,
  deleteItemReducer,
  updateItemReducer
} from './utils'
import TodoList from './components/TodoList/TodoList'
import TodoForm from './components/TodoForm/TodoForm';
import Alert from './general/Alert/Alert';

const initialAppState: IAppState = {
  items: [],
  selectedItemIndex: undefined
}

const App = () => {
  const [state, setState] = useState(initialAppState)
  const [alertItem, setAlertItem] = useState(undefined as ITodoItem | undefined)
  const [snackBarOpen, setSnackbarOpen] = useState(false)

  // set timeout to alert when the task's deadline come
  const setItemTimeout = (item: ITodoItem) => {
    if (item.deadline) {
      const deadlineTime = new Date(item.deadline).getTime()
      const currentTime = new Date().getTime()
    
      setTimeout(() => {
        setAlertItem(item)
        setSnackbarOpen(true)
      }, deadlineTime - currentTime)
    }
  }
  // handlers for CRUD actions
  const addItem = (item: ITodoItem) => {
    setItemTimeout(item)
    setState(addItemReducer(item, state))
  }
  const selectItem = (itemIndex: number) => {
    setState(selectItemReducer(itemIndex, state))
  }
  const updateItem = (itemIndex: number, item: ITodoItem) => {
    setItemTimeout(item)
    setState(updateItemReducer(itemIndex, item, state))
  }
  const deleteItem = (itemIndex: number) => {
    setState(deleteItemReducer(itemIndex, state))
  }

  // existing item selected for editing, or a new item for adding
  const selectedItem: ITodoItem = state.selectedItemIndex !== undefined
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
        <Box marginTop={4} marginBottom={4}>
          <Divider />
        </Box>
        <TodoList
          items={state.items}
          selectedItemIndex={state.selectedItemIndex}
          selectItem={selectItem}
        />

        {/* alert toast for when deadline comes */}
        {alertItem && (
          <>
            <Alert
              open={snackBarOpen}
              onClose={() => setSnackbarOpen(false)}
              message={`Deadline is up for "${alertItem.description.slice(0, 30)}..." !`}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
