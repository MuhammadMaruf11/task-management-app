'use client'
import Link from "next/link"
import ThemeToggle from "../Theme/ThemeToggle"

const Header = () => {
    return (
        <header className="max-w-4xl mx-auto flex justify-between items-center mb-6 py-3">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold">
                    <Link href="/">Dashboard</Link>
                </h1>
                <ThemeToggle />
            </div>
            <Link
                href="/tasks/new"
                className="bg-blue-600 block text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                + Add Task
            </Link>
        </header>
    )
}

export default Header