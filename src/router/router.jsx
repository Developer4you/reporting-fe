import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App'
import LoginPage from '../pages/LoginPage/LoginPage'
import ReportsPage from '../pages/ReportsPage/ReportsPage'
import UserPage from '../pages/UserPage/UserPage'
import MainUserPage from '../pages/MainUserPage/MainUserPage'
import ReportsTable from '../pages/MainUserPage/ReportsTable'

export function Rout() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/reports" element={<ReportsPage />}/>
                <Route path="/user" element={<UserPage />}/>
                <Route path="/main-user" element={<MainUserPage />}/>
                <Route path="/main-user-table" element={<ReportsTable />}/>
            </Routes>
        </Router>
    )
}

// export const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//         errorElement: <ErrorPage />,
//     },
//     {
//         path: 'login',
//         element: <LoginPage />,
//     },
//     {
//         path: 'reports',
//         element: <ReportsPage />,
//     },
//     {
//         path: 'user',
//         element: <UserPage />,
//     },
//     {
//         path: 'main-user',
//         element: <MainUserPage />,
//     },
//     {
//         path: 'main-user-table',
//         element: <ReportsTable />,
//     },
// ]);