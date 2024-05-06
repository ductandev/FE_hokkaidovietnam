import ReactDOM from 'react-dom/client';

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';

import './index.css';

// Setup redux store
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from './Redux/configStore';

import router from './routers/router';

import 'react-toastify/dist/ReactToastify.css';
// * Provider authentication Handler
import { AuthProvider } from './Auth/AuthProvider';
// import "react-image-gallery/styles/scss/image-gallery.scss";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Create a client
const queryClient = new QueryClient()

root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastContainer />

                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    </Provider>
);