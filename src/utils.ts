import { ITodoItem, IAppState } from './types'

export const selectItemReducer = (itemIndex: number, state: IAppState): IAppState =>
  Object.assign({}, state, {
    selectedItemIndex: state.selectedItemIndex === itemIndex
      ? undefined
      : itemIndex
  })

export const addItemReducer = (item: ITodoItem, state: IAppState): IAppState => {
  const newItemList = state.items
  newItemList.unshift(item)

  return Object.assign({}, state, {
    items: newItemList
  })
}

export const deleteItemReducer = (itemIndex: number, state: IAppState): IAppState =>
  Object.assign({}, state, {
    items: state.items.filter((_, index) => index !== itemIndex),
    selectedItemIndex: undefined
  })

export const updateItemReducer = (itemIndex: number, item: ITodoItem, state: IAppState): IAppState => {
  const newItemList = state.items
  newItemList.splice(itemIndex, 1)
  newItemList.unshift(item)

  return Object.assign({}, state, {
    items: newItemList,
    selectedItemIndex: undefined
  })
}

export const newItem: ITodoItem = {
  description: '',
  deadline: '',
  completed: false
}