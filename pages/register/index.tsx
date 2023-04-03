import Footer from "@app/components/Footer";
import Header from "@app/components/Header";
import Link from "next/link";

import LoginIllustration from "@app/assets/login_illustration.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("id") && localStorage.getItem("username")) {
            window.location.href = "/";
        }
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            return setError("Passwords do not match");
        }

        setLoading(true);
        setError("");

        axios
            .post("http://localhost:8000/register", { username, password, email, firstName, lastName })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                setError(err.response.data.message);
                setLoading(false);
            });
    };

    return (
        <>
            <Header loggedIn={false} />
            <section className="bg-primary">
                <div className="mx-auto container">
                    <div className="grid grid-cols-2 items-center ">
                        <div className="lg:max-w-[660px] w-full mx-auto bg-white py-20 min-h-[600px] flex items-center flex-col px-20 rounded-2xl shadow-md shadow-gray-600">
                            <h1 className="text-5xl mb-12 font-bold text-primary w-full">Register</h1>
                            <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="py-2 px-3 border border-gray-300 rounded-md"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="py-2 px-3 border border-gray-300 rounded-md"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="py-2 px-3 border border-gray-300 rounded-md"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="py-2 px-3 border border-gray-300 rounded-md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="py-2 px-3 border border-gray-300 rounded-md"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="py-2 px-3 border border-gray-300 rounded-md"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button className="py-2 px-3 bg-primary text-white font-medium rounded-md">
                                    Login
                                </button>
                            </form>

                            <div className="mt-5">
                                <p className="text-primary">
                                    Already have an account?
                                    <Link href="/register" className="py-2 px-1 font-bold">
                                        Log in
                                    </Link>
                                </p>
                            </div>

                            {error && <p className="text-red-500 mt-4 font-bold text-lg">{error}</p>}
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
