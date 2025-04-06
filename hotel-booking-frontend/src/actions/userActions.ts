
export const setUser = (user: { username: string; email: string; token: string }) => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: 'CLEAR_USER',
  };
};