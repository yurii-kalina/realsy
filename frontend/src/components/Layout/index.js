import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Grid from '@material-ui/core/Grid'

const Layout = ({ children }) => {
  return (
    <>
      <Header/>
      <Grid container justify={'center'}>
        {children}
      </Grid>
      <Footer/>
    </>
  )
}

export default Layout
