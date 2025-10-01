import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router";
import { Users } from "./components/Users";
import UserDetail from "./components/Users/UserDetail";
import UserPosts from "./components/UserPosts";
import Tasks from "./components/Tasks";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<App />} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/:userId" element={<UserDetail />} />
                    <Route path="users/:userId/posts" element={<UserPosts />} />
                    <Route path="tasks" element={<Tasks />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
