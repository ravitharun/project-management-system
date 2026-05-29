import { FaTasks } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BsFlagFill } from "react-icons/bs";

type TaskBoxProps = {
  title: string;
  count: number;
};

export default function TaskBox({ title, count }: TaskBoxProps) {

  const getIcon = () => {
    switch (title) {

      case "High":
        return <BsFlagFill className="text-2xl text-red-500" />;

      case "Medium":
        return <MdPendingActions className="text-2xl text-orange-500" />;

      case "Low":
        return <IoCheckmarkDoneCircle className="text-2xl text-green-500" />;

      default:
        return <FaTasks className="text-2xl text-blue-500" />;
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-sm text-gray-500 font-medium">
            Task {title} Total
          </h3>

          <p className="text-3xl font-bold text-gray-800 mt-1">
            {count}
          </p>
        </div>

        <div>
          {getIcon()}
        </div>

      </div>

    </div>
  );
}