import ReactDOM from 'react-dom/client';

import './index.css';

// Setup redux store
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from './Redux/configStore';

import router from './routers/router';

import 'react-toastify/dist/ReactToastify.css';
// import "react-image-gallery/styles/scss/image-gallery.scss";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <ToastContainer />

        <RouterProvider router={router} />
    </Provider>
);