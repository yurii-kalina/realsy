import React, { Suspense } from 'react'
import Routes from './routes'
import 'fontsource-roboto'
import Loading from './components/Loading' // @TODO check designs's required font-weights for optimized imports to reduce bundle size

function App () {
  return (
    <Suspense fallback={<Loading isFullWidth={true}/>}>
      <Routes/>
    </Suspense>
  )
}

export default App
