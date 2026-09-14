import { FiCheck } from "react-icons/fi";

const ThemeCard = ({
    title,
    description,
    selected,
    isDark,
}: any) => {
    return (
<>

        <div
            className={`rounded-xl border-2 p-4 transition ${selected
                ? "border-blue-500"
                : isDark
                    ? "border-gray-700"
                    : "border-gray-200"
                }`}
        >

            <div className="flex items-center justify-between gap-3">

                <div>

                    <p
                        className={`text-sm font-medium sm:text-base ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        {title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        {description}
                    </p>

                </div>

                {selected && (
                    <FiCheck className="shrink-0 text-blue-500" />
                )}

            </div>

        </div>
</>
    );
};


function RenderAppearance({isDark}:any) {
  return (
    <>
      <div className="space-y-5 lg:space-y-6">
        <div>
          <h2
            className={`text-xl font-semibold lg:text-2xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Appearance
          </h2>

          <p
            className={`mt-1 text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Customize how the application looks.
          </p>
        </div>

        <div
          className={`rounded-xl border p-4 sm:p-5 lg:p-6 ${
            isDark
              ? "border-gray-800 bg-[#111827]"
              : "border-gray-200 bg-white"
          }`}
        >
          <h3
            className={`text-base font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Theme
          </h3>

          <p
            className={`mt-1 text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Your current application theme.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ThemeCard
              title="Light"
              description="Clean and bright interface"
              selected={!isDark}
              isDark={isDark}
            />

            <ThemeCard
              title="Dark"
              description="Easy on the eyes"
              selected={isDark}
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default RenderAppearance