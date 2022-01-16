export default function setState(store) {
  return {
    type: 'SET_STATE',
    payload: store,
  }
}