import React from 'react'
import { Box, Checkbox, Divider, Grid, TextField } from '@material-ui/core';

import { ITodoItem } from '../../types'

type TodoFormInfoProps = {
  item: ITodoItem,
  onChangeDeadline: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeCompleted: (event: React.MouseEvent<HTMLButtonElement>) => void,
  onChangeDescription: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TodoFormInfo = (props: TodoFormInfoProps) => {
  const {item, onChangeCompleted, onChangeDeadline, onChangeDescription} = props

  return (
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
            onClick={onChangeCompleted}
          />            
          <TextField
            type="datetime-local"
            value={item.deadline}
            inputProps={{ step: 1 }}
            InputProps={{ disableUnderline: true }}
            onChange={onChangeDeadline}
          />
        </Box>
        <Divider />
        <Box padding={2}>
          <TextField
            placeholder='Description'
            value={item.description}
            onChange={onChangeDescription}
            multiline
            fullWidth
            rows={5}
            InputProps={{ disableUnderline: true }}
          />
        </Box>
      </Box>
    </Grid>
  )
}

export default TodoFormInfo