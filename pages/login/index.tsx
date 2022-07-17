import React from "react";
import Link from "next/link";
import { NextPageWithLayout } from "@type/page";

const Login: NextPageWithLayout = () => {
    return (
        <div>
            <Link href="/api/auth/login">Login</Link>
        </div>
    );
};

export default Login;
