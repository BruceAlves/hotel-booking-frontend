
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';

const saveToLocalStorage = (state: any) => {
    try {
        localStorage.setItem('userState', JSON.stringify(state.user));
    } catch (error) {
        console.error('Erro ao salvar no localStorage', error);
    }
};


const loadFromLocalStorage = () => {
    try {
        const storedState = localStorage.getItem('userState');
        return storedState ? JSON.parse(storedState) : undefined;
    } catch (error) {
        console.error('Erro ao carregar do localStorage', error);
        return undefined;
    }
};


const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: { user: loadFromLocalStorage() },
});


store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
