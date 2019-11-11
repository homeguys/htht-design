import { fromJS } from 'immutable'

const defaultState = fromJS({
  forced: false
})

export default (state = defaultState, action) => {
  return state
}
