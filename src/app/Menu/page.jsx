import React from 'react'
import { Suspense } from "react";
import FetchAllData from './FetchAllData';
import LoadingPage from '../loaders/LoadingPage';
import Button from '../OffersButton/button';

function page() {
  return (
    <Suspense fallback={<LoadingPage/>}>
      <Button/>
      <FetchAllData/>
      </Suspense>
  )
}

export default page