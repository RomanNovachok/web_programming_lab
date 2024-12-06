// Дія для додавання товару в кошик
export const addItemToCart = (item) => ({
    type: "cart/addItem",
    payload: item,
});

// Дія для видалення товару з кошика
export const removeItemFromCart = (_id) => ({
    type: "cart/removeItem",
    payload: _id,
});

export const updateQuantity = (_id, quantity) => ({
    type: "UPDATE_QUANTITY",
    payload: { _id, quantity },
});

// Дія для очищення кошика
export const clearCart = () => ({
    type: "cart/clear",
});

