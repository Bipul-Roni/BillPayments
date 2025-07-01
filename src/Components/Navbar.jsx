import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { Menu, X } from "lucide-react"; // optional icons

const Navbar = () => {
  const { user, logout, balance } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-extrabold text-blue-600">
          BillPay💸
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 text-lg font-semibold">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* User Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-blue-400">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.icons8.com/?size=48&id=13042&format=png"
                    }
                    alt={user.displayName || "User"}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box w-56 p-4 shadow mt-3"
              >
                <li className="mb-3">
                  <p className="font-bold text-gray-800 truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  <p className="mt-2 font-semibold text-gray-800">
                    Balance:{" "}
                    {balance === null ? "Loading..." : `${balance} BDT`}
                  </p>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow space-y-3">
          <NavLink
            to="/bills"
            className="block text-gray-800 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Bills
          </NavLink>
          <NavLink
            to="/profile"
            className="block text-gray-800 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </NavLink>

          {user ? (
            <>
              <div className="mt-4 border-t pt-3 text-sm">
                <p className="font-bold">{user.displayName || "User"}</p>
                <p>{user.email}</p>
                <p>Balance: {balance} BDT</p>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="mt-2 w-full bg-red-600 text-white py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-blue-600 hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block text-blue-600 hover:underline"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
