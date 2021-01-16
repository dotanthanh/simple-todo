import React from 'react'
import { Box, Card, Divider } from '@material-ui/core';
import TimelapseIcon from '@material-ui/icons/Timelapse'
import CheckIcon from '@material-ui/icons/Check'

import { ITodoItem } from '../../types'

type TodoItemProps = {
  item: ITodoItem,
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
        <span><b>{deadline}</b></span>
      </Box>
      <Divider />
      <Box padding={2} whiteSpace='pre-wrap'>
        {item.description}
      </Box>
    </Card>
  )
}

export default TodoItem