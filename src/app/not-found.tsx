import Link from "next/link";

export default function NotFound() {
    return (
        <main className="p-6 max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-semibold mb-4">404 - Task Not Found</h1>
            <p className="text-gray-500 mb-6">We couldn’t find the task you were looking for.</p>
            <Link
                href="/"
                className="text-blue-600 hover:underline"
            >
                Back to Dashboard
            </Link>
        </main>
    );
}
