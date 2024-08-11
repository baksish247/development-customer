"use client"
import { Suspense } from "react";
import Allevents from "./Allevents";

function Page() {
  return <Suspense fallback={<div>Loading...</div>}>
    <Allevents/>
  </Suspense>;
}

export default Page;
