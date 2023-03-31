import Footer from "@app/components/Footer";
import Header from "@app/components/Header";
import Link from "next/link";

import LoginIllustration from "@app/assets/login_illustration.png";
import Image from "next/image";

export default function Login() {
    return (
        <>
            <Header loggedIn={false} />
            <section className="bg-primary">
                <div className="mx-auto container">
                    <div className="grid grid-cols-2 items-center ">
                        <div className="lg:max-w-[660px] w-full mx-auto bg-white py-20 min-h-[600px] flex items-center flex-col px-20 rounded-2xl shadow-md shadow-gray-600">
                            <h1 className="text-5xl mb-12 font-bold text-primary w-full">Login</h1>
                            <form className="flex flex-col gap-5 w-full">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="py-2 px-3 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="py-2 px-3 border border-gray-300 rounded-md"
                                />
                                <Link className="text-primary font-medium" href="#">
                                    Forgot password?
                                </Link>
                                <button className="py-2 px-3 bg-primary text-white font-medium rounded-md">
                                    Login
                                </button>
                            </form>

                            <div className="mt-5">
                                <p className="text-primary">
                                    Don&&apos;t have an account?{" "}
                                    <Link href="/register" className="py-2 px-1 font-bold">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="h-[78vh] bg-primary px-20 flex items-center">
                            <Image src={LoginIllustration} alt="Login Illustration" className="object-cotnain" />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
