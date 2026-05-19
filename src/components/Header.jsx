import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Link } from "react-router-dom";
import Logo from "../assets/Travella-Logo.png";

export default function Header({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <header className="bg-[#003B97] text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">


        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img
            src={Logo}
            alt="Travella Logo"
            className="h-30 w-30 object-contain"
          />
          <h1 className="text-2xl font-black tracking-tighter italic">
            TRAVELLA
          </h1>
        </Link>

        {user && (
          <div className="flex items-center space-x-6">

            <Link
              to="/profile"
              className="group flex flex-col items-end"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-300 group-hover:text-white transition-colors">
               Your Profile
              </span>
              <strong className="text-sm font-bold text-white border-b-2 border-transparent group-hover:border-white transition-all">
                {user.displayName || user.email.split('@')[0]}
              </strong>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-white text-[#003B97] border-2 border-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white hover:border-white transition-all duration-200 active:scale-95 shadow-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}