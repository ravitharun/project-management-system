export default function TaskBox({ title, count }) {
  return (
    <div className="p-5 border rounded-xl text-center bg-gray-50 hover:bg-white hover:shadow-md transition">

      <h3 className="text-gray-600 font-semibold">{title}</h3>

      <p className="text-3xl font-bold text-gray-800 mt-2">
        {count}
      </p>

    </div>
  );
}