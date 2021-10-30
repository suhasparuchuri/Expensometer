export const initialState = {
  user: null,
  transactions: null,
};

const reducer = (state, action) => {
  if (action.type === 'SET_USER') {
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === 'SET_TRANSACTIONS') {
    return {
      ...state,
      transactions: action.payload,
    };
  }
};

export default reducer;
