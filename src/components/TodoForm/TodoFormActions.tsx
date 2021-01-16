import React from 'react'
import { Box, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircleOutline'
import CheckIcon from '@material-ui/icons/Check'

type TodoFormActionsProps = {
  type: 'add' | 'edit',
  addItem: () => void,
  updateItem: () => void,
  deleteItem: () => void
}

const TodoFormActions = (props: TodoFormActionsProps) => {
  const { type, addItem, updateItem, deleteItem } = props

  return (
    <Grid item xs={3}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
      >
        {type === 'edit' && (
          <>
            <IconButton onClick={updateItem}>
              <CheckIcon fontSize='large' />
            </IconButton>
            <IconButton onClick={deleteItem}>
              <DeleteIcon fontSize='large' />
            </IconButton>
          </>
        )}
        {type === 'add' && (
          <>
            <IconButton onClick={addItem}>
              <AddIcon fontSize='large' />
            </IconButton>
          </>
        )}
      </Box>
    </Grid>
  )
}

export default TodoFormActions