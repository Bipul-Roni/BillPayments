import { Route, Routes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../pages/Login";
import Register from "../Pages/Register";
import Profile from "../pages/Profile";
import Bills from "../pages/Bills";
import BillDetails from "../Pages/BillDetails";
import ForgetPass from "../pages/ForgetPass"; // <-- import it
import PrivateRoute from "./PrivateRoutes";
import NotFound from "../Pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPass />} /> {/* Added here */}

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/bills"
          element={
            <PrivateRoute>
              <Bills />
            </PrivateRoute>
          }
        />
        <Route
          path="/bills/:id"
          element={
            <PrivateRoute>
              <BillDetails />
            </PrivateRoute>
          }
        />

        <Route path="*"
        element ={<NotFound></NotFound>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
