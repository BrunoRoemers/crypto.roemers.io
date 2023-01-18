import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Template from "./components/Template";
import Error from "./components/Error";
import AccountingHome, {
  loader as accountingHomeLoader,
} from "./routes/accounting/Home";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    errorElement: (
      <Template>
        <Error />
      </Template>
    ),
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "accounting",
        element: <AccountingHome />,
        loader: accountingHomeLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
