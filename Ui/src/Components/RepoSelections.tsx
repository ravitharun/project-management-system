import axios from "axios";
import { useEffect, useState } from "react";
import {
    FiGithub,
    FiX,
    FiCheck,
    FiGitBranch,
    FiSearch,
    FiLock,
    FiGlobe,
    FiStar,
    FiCode,
} from "react-icons/fi";

function RepoSelections({ dataRepo }: any) {
    const [open, setOpen] = useState(true);

    const [repositories, setRepositories] = useState<any[]>([]);

    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
    const [FilterRepo, setFilter] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRepos = async () => {
            if (!dataRepo) {
                setRepositories([]);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await axios.get(dataRepo);

                console.log("Repository response:", response.data);



                setRepositories(response.data);
                setFilter(response.data);
            } catch (error: any) {
                console.error("Failed to fetch repositories:", error);

                setRepositories([]);

                setError(
                    error?.response?.data?.message ||
                    "Failed to load repositories"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [dataRepo]);

    // Filter repositories
    useEffect(() => {
        const checkSearch = () => {
            if (search) {

                const filteredRepos = repositories.filter((repo: any) =>
                    repo?.name?.toLowerCase().includes(search.toLowerCase())
                );

                return setRepositories(filteredRepos)
            }
            setRepositories(FilterRepo)

        }
        checkSearch()
    }, [search])

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

            {/* Popup */}
            <div className="relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-gray-700 bg-[#111827] shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-700 px-5 py-4 sm:px-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800">
                            <FiGithub className="text-xl text-white" />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                Select Repository
                            </h2>

                            <p className="text-xs text-gray-400">
                                Choose a repository for this project
                            </p>
                        </div>

                    </div>

                    {/* Close */}
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
                    >
                        <FiX className="text-xl" />
                    </button>

                </div>

                {/* Search */}
                <div className="border-b border-gray-800 px-5 py-4 sm:px-6">

                    <div className="relative">

                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

                        <input
                            type="text"
                            placeholder="Search repositories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-gray-500"
                        />

                    </div>

                </div>

                {/* Repository List */}
                <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">

                    {/* Repository Header */}
                    <div className="mb-3 flex items-center justify-between">

                        <span className="text-sm font-medium text-gray-300">
                            Repositories
                        </span>

                        <span className="text-xs text-gray-500">
                            {repositories.length} repositories
                        </span>

                    </div>

                    <div className="space-y-3">

                        {/* Loading */}
                        {loading ? (

                            <div className="flex flex-col items-center justify-center py-12 text-center">

                                <div className="mb-4 h-7 w-7 animate-spin rounded-full border-2 border-gray-600 border-t-blue-500" />

                                <p className="text-sm font-medium text-gray-300">
                                    Loading repositories...
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Fetching repositories for this workspace
                                </p>

                            </div>

                        ) : error ? (

                            /* Error */
                            <div className="flex flex-col items-center justify-center py-12 text-center">

                                <FiGithub className="mb-3 text-3xl text-gray-600" />

                                <p className="text-sm font-medium text-gray-300">
                                    Unable to load repositories
                                </p>

                                <p className="mt-1 text-xs text-red-400">
                                    {error}
                                </p>

                            </div>

                        ) : repositories.length === 0 ? (

                            /* Empty */
                            <div className="flex flex-col items-center justify-center py-12 text-center">

                                <FiGithub className="mb-3 text-3xl text-gray-600" />

                                <p className="text-sm font-medium text-gray-300">
                                    {search
                                        ? "No repositories found"
                                        : "No repositories available"}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    {search
                                        ? "Try a different repository name."
                                        : "No GitHub repositories are available for this workspace."}
                                </p>

                            </div>

                        ) : (

                            /* Repository Cards */
                            repositories.map((repo: any) => (

                                <button
                                    key={repo?.id}
                                    onClick={() =>
                                        setSelectedRepo(repo?.name || "")
                                    }
                                    className={`w-full rounded-xl border p-4 text-left transition ${selectedRepo === repo?.name
                                        ? "border-blue-500 bg-blue-500/10"
                                        : "border-gray-700 bg-[#1a2230] hover:border-gray-600 hover:bg-[#202938]"
                                        }`}
                                >

                                    <div className="flex items-start justify-between gap-3">

                                        <div className="min-w-0 flex-1">

                                            {/* Repository Name */}
                                            <div className="flex items-center gap-2">

                                                <FiGithub className="shrink-0 text-gray-300" />

                                                <h3 className="truncate font-medium text-white">
                                                    {repo?.name}
                                                </h3>

                                            </div>

                                            {/* Full Repository Name */}
                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                {repo?.full_name}
                                            </p>

                                            {/* Description */}
                                            <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                                                {repo?.description ||
                                                    "No description available"}
                                            </p>

                                            {/* Repository Details */}
                                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">

                                                {/* Branch */}
                                                <div className="flex items-center gap-1">
                                                    <FiGitBranch />

                                                    <span>
                                                        {repo?.default_branch ||
                                                            "main"}
                                                    </span>
                                                </div>

                                                {/* Language */}
                                                {repo?.language && (
                                                    <div className="flex items-center gap-1">
                                                        <FiCode />

                                                        <span>
                                                            {repo.language}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Visibility */}
                                                <div className="flex items-center gap-1">

                                                    {repo?.private ? (
                                                        <FiLock />
                                                    ) : (
                                                        <FiGlobe />
                                                    )}

                                                    <span>
                                                        {repo?.private
                                                            ? "Private"
                                                            : "Public"}
                                                    </span>

                                                </div>

                                                {/* Stars */}
                                                <div className="flex items-center gap-1">

                                                    <FiStar />

                                                    <span>
                                                        {repo?.stargazers_count ||
                                                            0}
                                                    </span>

                                                </div>

                                                {/* Forks */}
                                                <div className="flex items-center gap-1">

                                                    <span>
                                                        🍴
                                                    </span>

                                                    <span>
                                                        {repo?.forks_count || 0}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                        {/* Selected */}
                                        <div
                                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selectedRepo === repo?.name
                                                ? "border-blue-500 bg-blue-500 text-white"
                                                : "border-gray-600"
                                                }`}
                                        >

                                            {selectedRepo === repo?.name && (
                                                <FiCheck className="text-sm" />
                                            )}

                                        </div>

                                    </div>

                                </button>

                            ))

                        )}

                    </div>

                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-3 border-t border-gray-700 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                    <p className="text-xs text-gray-500">
                        {selectedRepo
                            ? `Selected: ${selectedRepo}`
                            : "Select a repository to continue"}
                    </p>

                    <div className="flex gap-3">

                        <button
                            onClick={() => setOpen(false)}
                            className="flex-1 rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-gray-800 sm:flex-none"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={!selectedRepo}
                            className="flex-1 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                        >
                            Continue
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default RepoSelections;