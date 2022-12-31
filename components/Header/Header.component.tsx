function Header() {
    return (
        <header className="w-full">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center justify-between py-6">
                    <div className="flex items-center">
                        <a href="/" className="text-xl font-bold text-gray-900">
                            GitHub Workflow Teacher
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="py-2 px-3 text-gray-900 font-medium hover:text-gray-700">
                            Home
                        </a>
                        <a href="#" className="py-2 px-3 text-gray-900 font-medium hover:text-gray-700 ml-4">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;
