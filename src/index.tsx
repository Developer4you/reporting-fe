import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import App from './App';
import Store from "./store/store"
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {CssBaseline} from "@mui/material";
import {router} from "./router/router";

interface State {
    store: Store,
}

const store = new Store();

export const Context = createContext<State>({
    store,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Context.Provider value={{store}}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router} />
        </ThemeProvider>
    </Context.Provider>,
);