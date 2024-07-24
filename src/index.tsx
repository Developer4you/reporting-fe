import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import App from './App';
import Store from "./store/store"
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {CssBaseline} from "@mui/material";
import {Rout} from "./router/router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

interface State {
    store: Store,
}

const store = new Store();

export const Context = createContext<State>({
    store,
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Context.Provider value={{store}}>
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <CssBaseline/>
                <Rout />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    </Context.Provider>,
);