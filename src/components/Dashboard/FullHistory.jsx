
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import TravelLogCard from "./TravelLogCard";

export default function FullHistory() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(collection(db, "trips"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLogs(fetched.sort((a, b) => new Date(b.date) - new Date(a.date)));
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 pb-20">
            <Link to="/" className="inline-block text-[#003B97] font-black text-xs uppercase tracking-tighter mb-8 hover:underline">
                 Back to Dashboard
            </Link>

            <h2 className="text-4xl font-black text-slate-900 italic mb-10 tracking-tighter">Your Travel Logs :</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {logs.map((log) => (
                    <TravelLogCard key={log.id} log={log} />
                ))}
            </div>
        </div>
    );
}