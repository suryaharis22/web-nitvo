//src/context/CategoryContext.jsx

import { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [categorys, setCategorys] = useState([]);

    return (
        <CategoryContext.Provider value={{ categorys, setCategorys }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategory() {
    return useContext(CategoryContext);
}
