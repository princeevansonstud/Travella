
const typeColors = {
  Leisure: "bg-white text-black borderblack",
  Business: "bg-white text-black borderblack",
  Adventure: "bg-white text-black borderblack",
  Family: "bg-white text-black borderblack",
};

export default function TravelLogCard({ log, onToggleChecklist, onDeleteLog }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-black flex flex-col justify-between transition-all hover:scale-105 hover:border-blue-900 group animate-in fade-in zoom-in duration-300">
      <div>
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-[#003B97] transition-colors">
            {log.destination}
          </h4>
          <span className={`text-[10px] px-2.5 py-1 rounded-lg border font-black uppercase tracking-widest ${typeColors[log.type] || "bg-slate-50 text-slate-500"}`}>
            {log.type}
          </span>
        </div>

        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-3">
         {log.date}
        </p>

        {log.notes && (
          <div className="relative mb-4">
            <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl italic border border-slate leading-relaxed">
              "{log.notes}"
            </p>
          </div>
        )}

        <div className="border-t border-black pt-4 mb-4">
          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Trip Checklist
          </h5>
          <div className="space-y-2.5">
            {log.checklist?.map((item) => (
              <label
                key={item.id}
                className="flex items-center space-x-3 text-sm text-slate-700 cursor-pointer group/item"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleChecklist(log.id, item.id)}
                  className="rounded-lg border-slate-300 text-[#003B97] focus:ring-[#003B97] h-5 w-5 transition-all cursor-pointer"
                />
                <span className={`font-medium transition-all ${item.completed ? "line-through text-slate-300" : "text-slate-600"}`}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2">
        <button
          onClick={() => onDeleteLog(log.id)}
          className="w-full py-2.5 bg-white hover:bg-red-500 text-black hover:text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all border border-black hover:border-red-100 active:scale-95"
        >
          Delete Trip?
        </button>
      </div>
    </div>
  );
}