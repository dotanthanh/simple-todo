import React from 'react'
import { Grid } from '@material-ui/core';
import TodoItem from '../TodoItem/TodoItem'
import { ITodoItem } from '../../types'

type TodoListProps = {
  items: ITodoItem[],
  selectedItemIndex?: number,
  selectItem: (itemIndex: number) => void
}

export const TodoList = (props: TodoListProps) => {
  const {items, selectedItemIndex, selectItem} = props

  return (
    <Grid
      container
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

export default TodoList