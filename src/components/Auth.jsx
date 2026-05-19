// src/components/Auth.jsx
import { useState } from "react";
import { auth } from "../components/firebaseConfig.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setError(err.message.replace("Firebase: ", ""));
        }
    };

    return (
        <div className="flex items-center justify-center bg-white px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-black-100">
                <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-6">
                    {isSignUp ? "Create an Account" : "Welcome Back Travellar!"}
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-900 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98]"
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button>

                </form>

                <div className="mt-6 text-center text-sm text-slate-600">
                    {isSignUp ? "Already have an account?" : "New to Travella?"}{" "}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-blue-900 font-semibold hover:underline"
                    >
                        {isSignUp ? "Sign In" : "Create one now"}
                    </button>
                </div>
            </div>
        </div>
    );
}