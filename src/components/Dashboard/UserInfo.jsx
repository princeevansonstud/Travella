
import { Link } from "react-router-dom";

export default function UserInfo({ user }) {
  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="text-[#003B97] font-black text-xs uppercase tracking-tighter mb-6 block hover:underline">
        Back to Dashboard
      </Link>
      
      <div className="bg-white p-8 rounded-[2.5rem] border border-black shadow-sm">
        <h2 className="text-3xl font-black text-slate-900 italic mb-8">USER CREDENTIALS</h2>
        
        <div className="space-y-6">
          <div className="pb-6 border-b border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated Email: </p>
            <p className="text-lg font-bold text-slate-800">{user.email}</p>
          </div>

          <div className="pb-6 border-b border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Display Username: </p>
            <p className="text-lg font-bold text-slate-800">{user.displayName || "Not Set"}</p>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">System UID (Unique ID): </p>
            <p className="text-xs font-mono text-slate-500 break-all">{user.uid}</p>
          </div>
        </div>
      </div>
    </div>
  );
}