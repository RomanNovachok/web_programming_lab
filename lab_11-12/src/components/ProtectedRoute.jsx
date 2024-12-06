import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem("activeUser"); // Перевірка наявності activeUser

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // Перенаправлення на сторінку входу
    }

    return children; // Рендер дочірніх елементів, якщо авторизований
}
