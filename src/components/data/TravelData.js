
import { db } from "../components/firebaseConfig";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp
} from "firebase/firestore";

// Input
export const addTripToCloud = async (userId, tripInfo) => {
    return await addDoc(collection(db, "trips"), {
        ...tripInfo,
        userId,
        timestamp: serverTimestamp()
    });
};

// Output
export const subscribeToUserTrips = (userId, onDataReceived) => {
    const q = query(
        collection(db, "trips"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
    );

    return onSnapshot(q, (snapshot) => {
        const trips = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        onDataReceived(trips);
    });
};