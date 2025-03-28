
interface UserState {
  username: string | null;
  email: string | null;
  token: string | null;
}

const initialState: UserState = {
  username: null,
  email: null,
  token: null,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
      case 'SET_USER':
          return { ...state, ...action.payload }; 
      case 'CLEAR_USER':
          return initialState; 
      default:
          return state;
  }
};

export default userReducer;
