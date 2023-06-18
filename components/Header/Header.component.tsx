import Link from "next/link";

import Logo from "@app/assets/logo.png";
import Image from "next/image";

function Header({ loggedIn }: { loggedIn: boolean }) {
    return (
        <header className="w-full bg-primary text-white border-b border-gray-500 shadow-2xl shadow-white">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center justify-between py-6">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            <Image src={Logo} alt="Logo" width={84} height={34} />
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        
                        {loggedIn ? (
                            <>
                                <Link href="/workflows" className="py-2 px-3 font-medium">
                                Workflows
                                </Link>
                                <Link
                                    href="/create-workflow"
                                    className="py-2 px-3 font-medium bg-white rounded-xl text-primary"
                                >
                                    Create Workflow
                                </Link>
                                <Link
                                    href="#"
                                    className="py-2 px-3 font-medium ml-4"
                                    onClick={() => {
                                        localStorage.removeItem("id");
                                        localStorage.removeItem("username");
                                        localStorage.removeItem("accessToken");
                                        window.location.href = "/login";
                                    }}
                                >
                                    Logout
                                </Link>
                            </>
                        ): (
                            <Link href="/login" className="py-2 px-3 font-medium" >
                                Login
                            </Link>
                            <Link href="/register" className="py-2 px-3 font-medium">
                                Register
                            </Link>
                        ) }
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;
