import React, { Suspense } from 'react'
import EventDetail from './EventDetails'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <EventDetail/>
  </Suspense>
  )
}

export default page