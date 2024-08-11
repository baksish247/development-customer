import { Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingPage from "./loaders/LoadingPage";
import FetchAllData from "./Menu/FetchAllData";
import Landing from "./LandingPage/Landing";

export default function Home() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Landing />
    </Suspense>
  );
}
