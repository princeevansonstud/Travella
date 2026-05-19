import { useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function TravelForm() {
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("Leisure");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const travelTypes = ["Leisure", "Business", "Adventure", "Family"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        if (!user) {
            alert("Please Sign In To Log your Journey(s).");
            return;
        }

        if (!destination || !date) return;

        setIsSubmitting(true);

        try {
            await addDoc(collection(db, "trips"), {
                destination,
                date,
                type,
                notes,
                userId: user.uid,
                createdAt: serverTimestamp(),
                // Using dynamic IDs so the checklist toggle actually works
                checklist: [
                    { id: Date.now() + 1, text: "Pack bags", completed: false },
                    { id: Date.now() + 2, text: "Check documents/tickets", completed: false },
                ],
            });

            // Reset Form
            setDestination("");
            setDate("");
            setNotes("");
            setType("Leisure");

        } catch (error) {
            console.error("Firebase Error:", error);
            alert("Could Not Save To FireBase Cloud. Check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
            <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight italic uppercase">
                Log A New Journey
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                        Where to?
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Hapo Karibu Na Kwenu"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003B97] focus:bg-white transition-all placeholder:text-slate-300"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                        Departure Date
                    </label>
                    <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003B97] focus:bg-white transition-all"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
                        Travel Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {travelTypes.map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                className={`px-5 py-2 rounded-xl text-xs font-black transition-all duration-200 active:scale-95 border-2 ${type === t
                                        ? "bg-[#003B97] text-white border-[#003B97] shadow-lg shadow-blue-100"
                                        : "bg-transparent text-black border-black hover:bg-slate-50"
                                    }`}
                            >
                                {t.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-black mb-2 ml-1">
                        What Do You Need or What Happened?
                    </label>
                    <textarea
                        rows="3"
                        placeholder="Write It Down Here ... "
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003B97] focus:bg-white transition-all resize-none placeholder:text-slate-300"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl transition-all active:scale-[0.98] ${isSubmitting
                            ? "bg-slate-300 cursor-not-allowed"
                            : "bg-[#003B97] hover:bg-blue-800 shadow-blue-100"
                        }`}
                >
                    {isSubmitting ? "Syncing..." : "Add Trip"}
                </button>
            </form>
        </div>
    );
}