export const initialState = {
  user: null,
  transactions: null,
  windowWidth: window.innerWidth,
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

  if (action.type === 'SET_WIDTH') {
    return {
      ...state,
      windowWidth: action.payload,
    };
  }
};

export default reducer;
