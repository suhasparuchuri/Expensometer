export const initialState = {
  user: null,
  transactions: null,
  windowWidth: window.innerWidth,
  openModal:false
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

  if (action.type === "SET_MODAL_STATE") {
    return {
      ...state,
      openModal:action.payload
    }
  }
};

export default reducer;
