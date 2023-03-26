import Link from "next/link";

function Footer() {
    // Get the current year
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-100">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center justify-between py-12">
                    <div className="flex items-center">
                        <Link href="/" className="text-lg font-bold text-gray-900">
                            GitHub Workflow Teacher
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="py-2 px-3 text-gray-900 font-medium hover:text-gray-700">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="py-2 px-3 text-gray-900 font-medium hover:text-gray-700 ml-4">
                            Terms of Service
                        </Link>
                        <Link href="#" className="py-2 px-3 text-gray-900 font-medium hover:text-gray-700 ml-4">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-center py-6 bg-gray-200">
                <div className="flex items-center">
                    <p className="text-gray-900 font-medium">© {year} GitHub Workflow Teacher. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
