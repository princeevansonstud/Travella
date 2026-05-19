import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import TravelForm from "./TravelForm";
import TravelLogCard from "./TravelLogCard";

export default function Dashboard() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {

                const q = query(
                    collection(db, "trips"),
                    where("userId", "==", user.uid)
                );

                const unsubscribeData = onSnapshot(q, (snapshot) => {
                    const fetchedLogs = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    const sortedLogs = fetchedLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

                    setLogs(sortedLogs);
                    setLoading(false);
                }, (error) => {
                    console.error("Firestore Sync Error:", error);
                    setLoading(false);
                });

                return () => unsubscribeData();
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const handleToggleChecklist = async (logId, itemId) => {
        const logToUpdate = logs.find(l => l.id === logId);
        const updatedChecklist = logToUpdate.checklist.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        try {
            await updateDoc(doc(db, "trips", logId), { checklist: updatedChecklist });
        } catch (error) {
            console.error("Update Failed:", error);
        }
    };

    const handleDeleteLog = async (id) => {
        if (window.confirm("Are You Sure You Want To Delete This Log ?")) {
            try {
                await deleteDoc(doc(db, "trips", id));
            } catch (error) {
                console.error("Delete Failed:", error);
            }
        }
    };

    const getNextTripAlert = () => {
        if (logs.length === 0) return null;
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const futureTrips = logs
            .filter(log => new Date(log.date) >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (futureTrips.length === 0) return null;
        const nextTrip = futureTrips[0];
        const diffDays = Math.ceil((new Date(nextTrip.date) - now) / (1000 * 60 * 60 * 24));
        return { destination: nextTrip.destination, days: diffDays };
    };

    const upcomingAlert = getNextTripAlert();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-10 h-10 border-4 border-[#003B97] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">
                    Connecting To Firebase Cloud ...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 pb-20">
            {upcomingAlert && (
                <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white p-6 rounded-[2rem] shadow-xl shadow-blue-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-white/10 animate-in fade-in zoom-in duration-500">
                    <div>
                        <h4 className="font-black text-xl tracking-tight uppercase italic">Your Next Adventure!</h4>
                        <p className="text-blue-100 text-sm mt-1 font-medium">
                            Departure to <strong className="text-white ">{upcomingAlert.destination}</strong> in{" "}
                            <strong className="text-white text-lg font-black">{upcomingAlert.days}</strong> {upcomingAlert.days === 1 ? "day" : "days"}.
                        </p>
                    </div>

                    <span className="bg-blue-700 hover:bg-white text-[10px] hover:text-blue-700 font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-white/20">
                        Safe Travels!
                    </span>

                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                <div className="lg:col-span-1 lg:sticky lg:top-8">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2 italic">Log Journey Form:</h3>
                    <TravelForm />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-end mb-4 px-2">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Travel History</h3>

                    </div>

                    {logs.length === 0 ? (
                        <div className="bg-white border-2 border-black rounded-[2.5rem] p-16 text-center shadow-inner">
                            <p className="font-black text-slate-900 text-xl italic uppercase tracking-tighter">Your Map is Empty</p>
                            <p className="text-xs text-slate-400 mt-2 font-medium">Add a trip to To Your Log.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* .slice(0, 4) ensures only the 4 most recent trips show up */}
                                {logs.slice(0, 4).map((log) => (
                                    <TravelLogCard
                                        key={log.id}
                                        log={log}
                                        onToggleChecklist={handleToggleChecklist}
                                        onDeleteLog={handleDeleteLog}
                                    />
                                ))}
                            </div>

                            {/* Update the button logic to check for 4 logs */}
                            {logs.length > 4 && (
                                <div className="mt-8 text-center">
                                    <Link
                                        to="/history"
                                        className="inline-block px-10 py-4 bg-white border-2 border-black text-black font-black rounded-2xl hover:bg-blue-900 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg active:scale-95"
                                    >
                                        VIEW OTHER TRAVEL LOGS →
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}