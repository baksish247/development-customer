"use client"
import Link from 'next/link'
import React from 'react'

function Button() {
  return (
    <div>
        <Link href={'/Events?id=RES_7d56adc3-bbb0-4aea-ae7d-6aa332e36d14&table=1&name=ABC%20Restaurant'} className='bg-indigo-400 tracking-wider rounded-full px-5 texxt-lg text-white fixed right-4 bottom-24 p-4 z-50'>%</Link>
    </div>
  )
}

export default Button