import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers';

const store = configureStore({
    reducer: {
        cart: cartReducer, // Додаємо редуктор для кошика
    },
});

export default store;
