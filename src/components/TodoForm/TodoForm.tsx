import React from 'react'
import { Grid } from '@material-ui/core'

import { ITodoItem } from '../../types'
import { newItem } from '../../utils'
import TodoFormActions from './TodoFormActions'
import TodoFormInfo from './TodoFormInfo'

type TodoFormProps = {
  item: ITodoItem,
  selectedItemIndex?: number,
  addItem: (item: ITodoItem) => void,
  updateItem: (itemIndex: number, item: ITodoItem) => void,
  deleteItem: (itemIndex: number) => void,
}

type TodoFormState = {
  item: ITodoItem,
  selectedItemIndex?: number
}

export default class TodoForm extends React.Component<TodoFormProps, TodoFormState> {
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

  updateItemField = (field: keyof ITodoItem, value: any) => {
    const updatedItem = Object.assign({}, this.state.item, {
      [field]: value
    })
    this.setState({
      item: updatedItem
    })
  }

  resetForm = () => {
    this.setState({
      item: newItem
    })
  }

  addItem = () => {
    this.props.addItem(this.state.item)
    this.resetForm()
  }

  render () {
    const {selectedItemIndex, updateItem, deleteItem} = this.props
    const {item} = this.state

    return (
      <form>
        <Grid container>
          <TodoFormInfo
            item={item}
            onChangeCompleted={(event: any) => this.updateItemField('completed', event.target.checked)}
            onChangeDeadline={event => this.updateItemField('deadline', event.target.value)}
            onChangeDescription={event => this.updateItemField('description', event.target.value)}
          />
          <TodoFormActions
            type={selectedItemIndex === undefined ? 'add' : 'edit'}
            addItem={this.addItem}
            deleteItem={() => deleteItem(selectedItemIndex as number)}
            updateItem={() => updateItem(selectedItemIndex as number, item)}
          />
        </Grid>
      </form>
    )
  }
}