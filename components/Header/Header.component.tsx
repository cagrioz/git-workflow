import Link from "next/link";

function Header() {
    return (
        <header className="w-full">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center justify-between py-6">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            GitHub Workflow Teacher
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="py-2 px-3 text-gray-900 font-medium hover:text-gray-700">
                            Home
                        </Link>
                        <Link href="/workflows" className="py-2 px-3 text-gray-900 font-medium hover:text-gray-700">
                            Workflows
                        </Link>
                        <Link href="/exercises" className="py-2 px-3 text-gray-900 font-medium hover:text-gray-700">
                            Exercises
                        </Link>
                        <Link href="#" className="py-2 px-3 text-gray-900 font-medium hover:text-gray-700 ml-4">
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;
