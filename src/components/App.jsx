import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import Auth from "./Auth";
import Dashboard from "./Dashboard/Dashboard";
import FullHistory from "./Dashboard/FullHistory"; 
import UserInfo from "./Dashboard/UserInfo";    
import Header from "./Header";

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  if (initializing) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#003B97] border-t-transparent shadow-sm"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-blue-100 selection:text-[#003B97]">
      <Header user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {user ? (
            <Routes>
              
              <Route path="/" element={<Dashboard />} />

             
              <Route path="/history" element={<FullHistory />} />

              
              <Route path="/profile" element={<UserInfo user={user} />} />

             
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <div className="max-w-md mx-auto mt-12">
              <Auth />
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 text-center">
        <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">
          Safe Travels With Travella!
        </p>
      </footer>
    </div>
  );
}