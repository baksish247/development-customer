import React, { Suspense } from 'react'
import SuccessPage from './Order'
import Pageloader from '../loaders/pageloader'

function page() {
  return (
    <div><Suspense fallback={<div><Pageloader/></div>}>
        <SuccessPage/>
        </Suspense>
    </div>
  )
}

export default page