interface State {
  msg: string;
  type: string;
}
type Action =
  | { type: 'SET_ALERT'; payload: { msg: string; type: string } }
  | { type: 'REMOVE_ALERT' };

const alertReducer = (state: State | null, action: Action) => {
  switch (action.type) {
    case 'SET_ALERT':
      return action.payload;
    case 'REMOVE_ALERT':
      return null;
    default:
      return state;
  }
};
export default alertReducer;
