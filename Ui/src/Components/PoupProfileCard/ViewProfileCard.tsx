import { Mail, User } from "lucide-react";

function ViewProfileCard({ userInof }: any) {
    console.log(userInof, 'userInof')
    return (
        <div
            className="
             absolute
        left-0
        top-8
        z-[999999999]
        w-80
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-2xl
            "
        >
            <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <User size={28} />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Tharun Ravi
                    </h2>

                    <a
                        href="mailto:tharunravi@example.com"
                        className="mt-1 flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
                    >
                        <Mail size={14} />
                        tharunravi@example.com
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ViewProfileCard;