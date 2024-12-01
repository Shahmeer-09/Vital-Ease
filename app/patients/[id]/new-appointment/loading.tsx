import { LoaderCircle } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
      <div className=' h-screen max-h-screen   ' >
          <div className=' flex items-center justify-center h-full min-w-full ' >
            <LoaderCircle className=' animate-spin text-primary size-20' />
          </div>
      </div>
  )
}

export default loading