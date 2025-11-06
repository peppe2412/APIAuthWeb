import { RouterProvider } from "react-router-dom"
import router from "./routing/Router"

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
