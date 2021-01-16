export interface IAppState {
  items: ITodoItem[],
  selectedItemIndex?: number
}

export interface ITodoItem {
  description: string,
  deadline: string,
  completed: boolean
}

