import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout, balance } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => Swal.fire("Logged out!", "", "success"))
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <nav className="bg-base-100 shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo on left */}
        <Link to="/" className="text-3xl font-extrabold text-blue-600">
          BillPay💸
        </Link>

        {/* Centered nav links */}
        <div className="flex-1 flex justify-center space-x-10 text-xl font-semibold">
          <NavLink
            to="/bills"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Bills
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            My Profile
          </NavLink>
        </div>

        {/* Right side user auth */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full border-2 border-blue-400">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.icons8.com/?size=48&id=13042&format=png"
                    }
                    alt={user.displayName || "User"}
                    title={user.displayName || "User"}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box w-56 p-4 shadow mt-3"
              >
                <li className="mb-3">
                  <p className="text-lg font-bold text-gray-800 truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-md text-gray-600 truncate">{user.email}</p>
                  <p className="mt-2 text-lg font-semibold text-gray-800">
                    Balance:{" "}
                    {balance === null
                      ? "Loading..."
                      : `${balance.toLocaleString()} BDT`}
                  </p>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-md font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 hover:underline text-lg font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-blue-600 hover:underline text-lg font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
