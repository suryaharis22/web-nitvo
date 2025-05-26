
import { ProductProvider } from './ProductContext';
import { LoadingProvider } from './LoadingContext';
import { CategoryProvider } from './CategoryContext';
import { SectionsProvider } from './SectionsContext';

// List semua provider kamu di sini
const providers = [ProductProvider, LoadingProvider, CategoryProvider, SectionsProvider];

const ContextManager = ({ children }) => {
    return providers.reduce((PrevProvider, CurrentProvider) => {
        return <CurrentProvider>{PrevProvider}</CurrentProvider>;
    }, children);
};

export default ContextManager;
