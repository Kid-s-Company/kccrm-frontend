import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './app/layout/index.css'
import {Provider} from "react-redux";
import {store} from "./app/store/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router/router.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
