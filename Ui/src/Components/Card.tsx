type Cards = {
  title: string;
  value: number;
  icon: any;
};

export default function Card({ title, value, icon }: Cards) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center justify-between gap-3 overflow-hidden">

      <div className="flex-1 min-w-0">
        <p className="text-gray-500 text-xs uppercase tracking-wider break-words">
          {title}
        </p>

        <h2 className="text-xl font-bold text-gray-800 break-words">
          {value}
        </h2>
      </div>

      <div className="shrink-0 text-blue-900 text-2xl bg-blue-50 p-3 rounded-full">
        {icon}
      </div>

    </div>
  );
}