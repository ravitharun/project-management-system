
type Cards = { title: string, value: string, icon: any }
export default function Card({ title, value, icon }: Cards) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center justify-between">

      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wider">
          {title}
        </p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>

      <div className="text-blue-500 text-2xl bg-blue-50 p-3 rounded-full">
        {icon}
      </div>

    </div>
  );
}