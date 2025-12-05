import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./App"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Main } from "./pages/Main"
import { Profile } from "./pages/Profile"
import { Product } from "./pages/Product"
import { Category } from "./pages/Category"
import { Products } from "./pages/Products"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { NotFound } from "./pages/NotFound"
import { Layout } from "./components/Layout"
import { UpdateProfileForm as UpdateProfile } from "./pages/UpdateProfile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Main /> },
      { path: "auth/register", element: <Register /> },
      { path: "auth/login", element: <Login /> },
      { path: "user/profile", element: <Profile /> },
      { path: "user/profile/update", element: <UpdateProfile /> },
      { path: "products/catalog/:id", element: <Product /> },
      { path: "products/:category", element: <Category /> },
      { path: "products", element: <Products /> },
      { path: "*", element: <NotFound /> },
    ],
  },
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
