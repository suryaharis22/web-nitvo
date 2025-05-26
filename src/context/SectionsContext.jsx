//src/context/SectionsContext.jsx

import { createContext, useContext, useState } from 'react';

const SectionsContext = createContext();

export function SectionsProvider({ children }) {
    const [sections, setSections] = useState([]);

    return (
        <SectionsContext.Provider value={{ sections, setSections }}>
            {children}
        </SectionsContext.Provider>
    );
}

export function useSections() {
    return useContext(SectionsContext);
}
