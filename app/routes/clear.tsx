import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";

const Clear = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            files.forEach(async (file) => {
                await fs.delete(file.path);
            });
            await kv.flush();
            await loadFiles();
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <main className="bg-[url('/images/bg-main.svg')] bg-cover">
                <Navbar />
                <section className="main-section">
                    <div className="flex flex-col items-center justify-center">
                        <img src='/images/resume-scan-2.gif' className="w-[200px]" />
                        <h2 className="mt-4">Loading...</h2>
                    </div>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="bg-[url('/images/bg-main.svg')] bg-cover">
                <Navbar />
                <section className="main-section">
                    <div className="page-heading">
                        <h1>Error</h1>
                        <h2 className="text-red-600">Error: {error}</h2>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading">
                    <h1>Data Management</h1>
                    <h2>
                        Manage your application data and clear stored files
                    </h2>
                </div>

                <div className="w-full max-w-4xl">
                    {/* User Info Card */}
                    <div className="gradient-border mb-8">
                        <div className="bg-white rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-dark-200 mb-2">
                                Account Information
                            </h3>
                            <p className="text-dark-200">
                                Authenticated as: <span className="font-medium">{auth.user?.username}</span>
                            </p>
                        </div>
                    </div>

                    {/* Files Section */}
                    <div className="gradient-border mb-8">
                        <div className="bg-white rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-dark-200 mb-4">
                                Existing Files ({files.length})
                            </h3>
                            
                            {files.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-dark-200">No files found</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {files.map((file) => (
                                        <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-dark-200">{file.name}</p>
                                                    <p className="text-sm text-gray-500">File</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="border-2 border-red-200 rounded-2xl p-6 bg-red-50">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-red-800 mb-2">
                                    Danger Zone
                                </h3>
                                <p className="text-red-700 mb-4">
                                    This action will permanently delete all your application data, including files and cached information. This cannot be undone.
                                </p>
                                <button
                                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                                        isDeleting 
                                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                                            : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                                    }`}
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Wiping Data...
                                        </div>
                                    ) : (
                                        'Wipe App Data'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Clear;