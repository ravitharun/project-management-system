import {
    Loader2,
    CheckCircle2,
    Trash2,
    Save,
    UploadCloud
} from "lucide-react";

type ActionType =
    | "loading"
    | "delete"
    | "save"
    | "upload"
    | "success";

type ActionProps = {
    title: string|any;
    description: string|any;
    type: ActionType | string|any;
};

function ActionLoading({
    title,
    description,
    type,
}: ActionProps) {

    const actionIcons: any = {
        loading: (
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        ),

        delete: (
            <Trash2 className="w-10 h-10 text-red-500 animate-pulse" />
        ),

        save: (
            <Save className="w-10 h-10 text-green-500 animate-bounce" />
        ),

        upload: (
            <UploadCloud className="w-10 h-10 text-purple-500 animate-pulse" />
        ),

        success: (
            <CheckCircle2 className="w-10 h-10 text-green-500 animate-bounce" />
        ),
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

            <div className="w-[90%] max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">

                <div className="flex flex-col items-center gap-4 text-center">

                    <div className="rounded-full bg-gray-100 p-4 shadow-inner">
                        {actionIcons}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {title}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {description}
                        </p>
                    </div>

                    {/* Loading Progress */}
                    {type === "loading" && (
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-500"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ActionLoading;