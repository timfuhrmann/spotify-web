import React from "react";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../src/components/layout/PrimaryLayout";

const Home: NextPageWithLayout = () => {
    return <div>home</div>;
};

Home.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Home;
