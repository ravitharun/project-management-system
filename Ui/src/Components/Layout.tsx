import * as FlexLayout from "flexlayout-react";
import "flexlayout-react/style/light.css";

export default function Layout() {

    const json = {
        global: {
            enableMaximize: true,
        },

        layout: {
            type: "row",

            children: [
                {
                    type: "tabset",
                    weight: 50,
                    enableMaximize: true,

                    children: [
                        {
                            type: "tab",
                            name: "Board",
                            component: "board",
                        },
                    ],
                },

                {
                    type: "tabset",
                    weight: 50,
                    enableMaximize: true,

                    children: [
                        {
                            type: "tab",
                            name: "Timeline",
                            component: "timeline",
                        },
                    ],
                },
            ],
        },
    };

    const model = FlexLayout.Model.fromJson(json);

    const factory = (node: any) => {

        const component = node.getComponent();

        if (component === "board") {
            return (
                <div className="
                    h-full w-full
                    bg-white
                    flex items-center justify-center
                    text-xl
                ">
                    Board UI
                </div>
            );
        }

        if (component === "timeline") {
            return (
                <div className="
                    h-full w-full
                    bg-[#F8FAFC]
                    flex items-center justify-center
                    text-xl
                ">
                    Timeline UI
                </div>
            );
        }

        return <div>Not Found</div>;
    };

    return (
        <div className="
            h-screen w-full
            bg-[#EEF2FF]
            p-6
        ">
            <FlexLayout.Layout
                model={model}
                factory={factory}
            />
        </div>
    );
}       