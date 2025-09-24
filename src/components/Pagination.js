export default function Pagination({ totalPages, currentPage, goToPage }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">
                Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
                >
                    {i + 1}
                </button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">
                Next
            </button>
        </div>
    );
}
