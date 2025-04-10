import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import UserEdit from './components/UserEdit';

const Main = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/users/:id" element={<UserEdit />} />


                <Route path="*" element={<h3>404 not found</h3>} />
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

