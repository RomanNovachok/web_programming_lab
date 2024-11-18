const initialState = {
    items: [], // Товари, що додаються у кошик
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "cart/addItem": // Дія для додавання товару
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }], // Додаємо товар із кількістю 1
            };

        case "cart/removeItem": // Дія для видалення товару
            return {
                ...state,
                items: state.items.filter((item) => item._id !== action.payload),
            };

        case "UPDATE_QUANTITY": // Оновлення кількості
            return {
                ...state,
                items: state.items.map((item) =>
                    item._id === action.payload._id
                        ? { ...item, quantity: Math.max(action.payload.quantity, 0) }
                        : item
                ),
            };

        default:
            return state;
    }
};

export default cartReducer;
