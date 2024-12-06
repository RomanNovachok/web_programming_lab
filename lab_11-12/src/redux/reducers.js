const initialState = {
    items: [], // Товари, що додаються у кошик
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "cart/addItem":
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };

        case "cart/removeItem":
            return {
                ...state,
                items: state.items.filter((item) => item._id !== action.payload),
            };

        case "UPDATE_QUANTITY":
            return {
                ...state,
                items: state.items.map((item) =>
                    item._id === action.payload._id
                        ? { ...item, quantity: Math.max(action.payload.quantity, 0) }
                        : item
                ),
            };

        case "cart/clear": // Очищення кошика
            return {
                ...state,
                items: [],
            };

        default:
            return state;
    }
};

export default cartReducer;
