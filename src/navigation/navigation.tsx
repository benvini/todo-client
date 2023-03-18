import { createBrowserRouter } from "react-router-dom";
import AddTodoScreen from "screens/AddTodoScreen/components/AddTodoScreen/AddTodoScreen";
import EditTodoScreen from "screens/EditTodoScreen/components/EditTodoScreen/EditTodoScreen";
import HomeScreen from "screens/HomeScreen/components/HomeScreen/HomeScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/add",
    element: <AddTodoScreen />,
  },
  {
    path: "/edit",
    element: <EditTodoScreen />,
  },
]);
