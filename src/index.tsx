import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from "./store/store"
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {CssBaseline} from "@mui/material";

interface State {
    store: Store,
}

const store = new Store();

export const Context = createContext<State>({
    store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Context.Provider value={{store}}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </Context.Provider>
);