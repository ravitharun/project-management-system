import { useContext, useEffect, useState } from "react";
import {
    FaTimes,
    FaUpload,
    FaCheck,
    FaImage,
} from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import bgthemeContext from "../Context/ThemeContext";
// import GlobalToast from "./GlobalToast"
import { toast } from "react-toastify";
import axios from "axios";
import { instance } from "../services/apiservices";

type WallpaperPopupProps = {
    open?: boolean;
    onClose?: () => void;
    Tasks: any
};

const WallpaperPopup = ({
    open,
    onClose,
    Tasks
}: WallpaperPopupProps) => {
    console.log(Tasks, 'Tasks')
    const themeContext = useContext(bgthemeContext)
    const [search, setSearch] = useState("workspace");
    const [searchedImages, setSearchedImages] = useState<any[]>([]);
    const [pages, setpages] = useState<number>(1)

    const [totalpages, settotalpages] = useState<number>(0)
    const { theme }: any = themeContext
    const wallpapers = [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
        "https://images.unsplash.com/photo-1511300636408-a63a89df3482",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    ];

    const [selectedWallpaper, setSelectedWallpaper] =
        useState<string>("");
    useEffect(() => {
        const FetchImges = async () => {
            try {
                // data.total_pages
                const response = await axios.get(`https://api.unsplash.com/search/photos?query=${search}&page=${pages}&per_page=20&client_id=${import.meta.env.VITE_Unsplash_AccessKey}`)
                console.log(response.data, 'response pages', pages)
                settotalpages(response.data.total_pages)
                setSearchedImages(response.data.results)

            } catch (error: any) {
                return console.log(error)

            }
        }
        FetchImges()

    }, [search, pages])
    console.log(searchedImages, 'searchedImages')

    // handelSearch
    const handelSearch = async () => {

        if (!search) {
            return toast.info("Required")
        }

    }
    console.log(pages, 'pages')
    // Custom File Upload Image
    const handleUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setSelectedWallpaper(imageUrl);
    };

    const handleApply = async () => {
        if (!selectedWallpaper) return;




        try {
            const response = await instance.put(`/api/Task/${Tasks.Taskid}/wallpaper`, { selectedWallpaper: selectedWallpaper })
            console.log(response)

            if(response.status==200){return toast.success(response.data.message)}
        } catch (error: any) {
            console.log(error.response.data.message)
            console.log(error.response.data)
            return console.log(error.response.status)

        }


    };

    if (!open) return null;
    return (

        <>


            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6">
                <div
                    className={`w-full max-w-lg max-h-[90vh] mt-4 sm:mt-8 rounded-2xl overflow-hidden border shadow-2xl flex flex-col
    ${theme === "Dark"
                            ? "bg-[#111111] border-white/10 text-white"
                            : "bg-white border-black/10 text-black"
                        }`}
                >
                    {/* Header */}
                    <div
                        className={`flex items-start justify-between px-5 py-4 border-b shrink-0
      ${theme === "Dark" ? "border-white/10" : "border-black/10"}`}
                    >
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight">
                                Customize Task Wallpaper
                            </h2>
                            <p
                                className={`text-sm mt-1 ${theme === "Dark" ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                Select a wallpaper or upload your own.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className={`h-10 w-10 flex items-center justify-center rounded-xl transition duration-200
        ${theme === "Dark"
                                    ? "hover:bg-white/10 text-gray-300 hover:text-white"
                                    : "hover:bg-black/5 text-gray-600 hover:text-black"
                                }`}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

                        {/* Search Section */}
                        <div>
                            <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-blue-500">
                                Searchs Wallpapers
                            </h3>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Nature, Coding, Space..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={`flex-1 px-4 py-2.5 rounded-xl outline-none border
                ${theme === "Dark"
                                            ? "bg-[#181818] border-white/10 text-white placeholder:text-gray-500"
                                            : "bg-white border-gray-300"
                                        }`}
                                />

                                <button
                                    className="h-11 w-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                                    onClick={handelSearch}
                                >
                                    <FaSearch />
                                </button>
                            </div>
                        </div>


                        {/* Selected Preview */}
                        {selectedWallpaper && (
                            <div>
                                <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-blue-500">
                                    Preview
                                </h3>

                                <div
                                    className={`rounded-xl overflow-hidden border ${theme === "Dark"
                                        ? "border-white/10"
                                        : "border-black/10"
                                        }`}
                                >
                                    <img
                                        src={selectedWallpaper}
                                        alt="preview"
                                        loading="lazy"

                                        className="w-full h-32 object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        <hr
                            className={`my-4 border-0 h-px ${theme === "Dark"
                                ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                : "bg-gradient-to-r from-transparent via-black/15 to-transparent"
                                }`}
                        />
                        {/* Search Results */}
                        {searchedImages?.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-blue-500">
                                    Search Results -{totalpages}
                                </h3>

                                <div className="grid grid-cols-3 gap-2">
                                    {searchedImages.map((img, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() =>
                                                setSelectedWallpaper(img.urls?.thumb)
                                            }
                                            className="relative overflow-hidden rounded-xl"
                                        >
                                            <img
                                                src={img.urls.thumb}
                                                loading="lazy"
                                                alt=""
                                                className="w-full h-20 object-cover"
                                            />

                                            {selectedWallpaper ===
                                                img.urls?.regular && (
                                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                        <FaCheck className="text-white" />
                                                    </div>
                                                )}
                                        </button>
                                    ))}
                                </div>
                                <div
                                    className={`flex items-center justify-between p-3 rounded-2xl mt-4
  ${theme === "Dark"
                                            ? "bg-white/[0.03] border border-white/10"
                                            : "bg-gray-50 border border-gray-200"
                                        }`}
                                >
                                    <button
                                        onClick={() => {
                                            setpages((page) => page - 1);
                                            setSearchedImages([]);
                                        }}
                                        disabled={pages === 0}
                                        className="px-4 py-2 rounded-xl bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>

                                    <span className="font-medium text-sm">
                                        Page <span className="text-blue-500">{pages + 1}</span>
                                    </span>

                                    <button
                                        onClick={() => {
                                            setpages((page) => page + 1);
                                            setSearchedImages([]);
                                        }}
                                        className="px-4 py-2 rounded-xl bg-blue-500 text-white"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Default Wallpapers */}
                        <div>
                            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-blue-500">
                                Default Wallpapers
                            </h3>

                            <div className="grid grid-cols-3 gap-2">
                                {wallpapers.map((wallpaper, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() =>
                                            setSelectedWallpaper(wallpaper)
                                        }
                                        className={`relative overflow-hidden rounded-xl border transition-all
                    ${selectedWallpaper === wallpaper
                                                ? "border-blue-500 ring-2 ring-blue-500/20"
                                                : theme === "Dark"
                                                    ? "border-white/10"
                                                    : "border-black/10"
                                            }`}
                                    >
                                        <img
                                            src={wallpaper}
                                            alt=""
                                            className="w-full h-20 object-cover"
                                        />

                                        {selectedWallpaper === wallpaper && (
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                <FaCheck className="text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Upload Section */}
                        <hr
                            className={`my-4 border-0 h-px ${theme === "Dark"
                                ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                : "bg-gradient-to-r from-transparent via-black/15 to-transparent"
                                }`}
                        />                          <div>
                            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-blue-500">
                                Upload Custom Wallpaper
                            </h3>

                            <label
                                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition
            ${theme === "Dark"
                                        ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                                    }`}
                            >
                                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <FaUpload className="text-blue-500" />
                                </div>

                                <div>
                                    <h4 className="font-medium">
                                        Upload Wallpaper
                                    </h4>

                                    <p className="text-xs text-gray-500">
                                        JPG, PNG, WEBP
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleUpload}
                                />
                            </label>
                        </div>

                    </div>

                    {/* Footer */}
                    <div
                        className={`shrink-0 px-5 py-4 border-t flex justify-end gap-3
      ${theme === "Dark" ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-gray-50"}`}
                    >
                        <button
                            onClick={onClose}
                            className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition
        ${theme === "Dark"
                                    ? "border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleApply}
                            disabled={!selectedWallpaper}
                            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <FaImage />
                            Apply Wallpaper
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WallpaperPopup;