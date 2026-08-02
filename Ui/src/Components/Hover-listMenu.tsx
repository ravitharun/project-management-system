import { useContext } from "react";
import bgthemeContext from "../Context/ThemeContext";

const HoverlistMenu = ({ HoverElement }: any) => {
    const context = useContext(bgthemeContext);
    console.log(HoverElement, 'HoverElement');

    const { theme } = context || {};

    return (
<>


<div
    className={`
        absolute
        left-full
        top-1/2
        -translate-y-1/2
        ml-3
        flex items-center gap-2
        px-3 py-2
        rounded-lg
        whitespace-nowrap
        shadow-lg
        transition-all duration-200
        opacity-0
        group-hover:opacity-100
        pointer-events-none
        z-[9999]

        ${
            theme === "Dark"
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-white text-black border border-gray-200"
        }
    `}
>
    <span className="text-lg">{HoverElement?.icon}</span>
    <span className="text-sm font-medium">{HoverElement?.name}</span>
</div>
</>
    );
};

export default HoverlistMenu;