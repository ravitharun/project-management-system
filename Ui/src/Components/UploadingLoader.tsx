type porps = {
    type: string,
    useCase: string
}
function UploadingLoader({ type,useCase }: porps) {
    return (
        <>

            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">

                <div className="bg-white dark:bg-[#111827] px-8 py-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 min-w-[260px]">

                    {/* Loader */}
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>

                        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                    </div>

                    {/* Text */}
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {type}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Please wait while we upload your {useCase}...
                        </p>
                    </div>
                </div>
            </div>        </>
    )
}

export default UploadingLoader