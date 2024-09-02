import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddProducts, ProductsList, UpdateProduct } from "src/components";
import { Login, SignUp } from "src/auth";
import { AuthGuard } from ".";
import { Layout } from 'src/layout';

export const RoutesPage: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            <Route path="/" element={<ProductsList />} />
            <Route path="/add" element={<AddProducts />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Page</h1>} />
            <Route path="/profile" element={<h1>Profile Page</h1>} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};