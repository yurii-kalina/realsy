import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import ImgCard from './component/ImgCard'
import { Scrin1Left } from './component/Scrin1Left'
import { Scrin1Right } from './component/Scrin1Right'
import { Header } from './component/Header'
import { Scrin2Top } from './component/Scrin2Top'
import { Scrin2Left } from './component/Scrin2Left'
import { Scrin2Right } from './component/Scrin2Right'
import { Scrin3Top } from './component/Scrin3Top'
import ImgCardVert from './component/ImgCardVert'
import Footer from '../Layout/Footer/Footer'
import { Scrin4Top } from './component/Scrin4Top'
import { Scrin4Left } from './component/Scrin4Left'
import { Scrin4Right } from './component/Scrin4Right'

const useStyles = makeStyles(theme => ({

  header: {
    position: 'relative',
    background: '#eeeff1',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, .25)'
  },
  section_1: {
    backgroundColor: '#eeeff1',
    position: 'relative',
    marginBottom: '50px',
    height: '620px'
  },
  s1_text: {
    paddingLeft: '50px'
  },

  section_2: {
    justifyContent: 'center'
  },

  s2_title: {
    fontSize: '42px',
    width: '100%',
    textAlign: 'center'
  },
  s2_title_icon: {
    width: '100px',
    height: '5px',
    backgroundColor: '#FF8901',
    borderRadius: '2px',
    marginLeft: '-75px',
    marginBottom: '20px'
  },
  s2_desc_block: {
    marginTop: '40px',
    flexGrow: '20px'
  },
  s2_b2_title: {
    marginTop: '100px',
    fontSize: '42px',
    width: '100%',
    textAlign: 'center',
    marginBottom: '45px'
  },
  s2_client_owner: {
    display: 'flex',
    justifyContent: 'center'
  },
  lineImg: {
    position: 'absolute',
    left: '226px',
    zIndex: -1,
    top: '50px'
  },
  s3_cartList: {
    position: 'relative'
  },
  video: {
    marginTop: '50px',
    marginBottom: '70px'
  },
  s4: {
    background: '#eeeff1',
    textAlign: 'center',
    paddingTop: '35px',
    paddingBottom: '100px'
  },
  s4_sub: {
    background: 'url(/s4_bg.png)'
  }

}))

const HomePage = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <Grid container spacing={0} justify={'center'} alignItems={'center'} className={classes.header}>
        <Header/>
      </Grid>

      <Grid container className={classes.section_1}>
        <Scrin1Left/>
        <Scrin1Right/>
      </Grid>

      <Grid container spacing={0} justify={'center'} alignItems={'center'}>
        <Grid lg={10} container item className={classes.section_2}>
          <Scrin2Top/>
          <Grid container className={classes.s2_desc_block}>
            <Grid lg={6}>
              <Scrin2Left/>
            </Grid>
            <Grid lg={6}>
              <Scrin2Right/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={0} justify={'center'} alignItems={'center'}>
        <Typography variant="h4" className={classes.s2_b2_title}>
          {t('s2_title2')}
        </Typography>
        <Container container className={classes.s2_client_owner}>
          <ImgCard img="./client.png" title={t('clientTitle')} desc={t('clientDesc')}
            btnText={t('clientBtn')} color="#2DACFD" btnHover="#2899e2 !important"/>
          <ImgCard img="./owner.png" title={t('ownerTitle')} desc={t('ownerDesc')} btnText={t('ownerBtn')}
            color="#1AD365" btnHover="#18c55e !important"/>
        </Container>
      </Grid>

      <Grid container spacing={0} justify={'center'} alignItems={'center'}>
        <Scrin3Top/>
        <Grid className={classes.s3_cartList} container lg={8}>
          <ImgCardVert img="./s3_icon1.png" title={t('s3_icon1Title')} desc={t('s3_icon1Desc')}/>
          <ImgCardVert img="./s3_icon2.png" desc={t('s3_icon2Desc')}/>
          <ImgCardVert img="./s3_icon3.png" title={t('s3_icon3Title')} desc={t('s3_icon3Desc')}/>
          <img className={classes.lineImg} src="./s3_line.png" alt={''}/>
          <img className={classes.video} src="./s3_video.png" alt={''}/>
        </Grid>
      </Grid>

      <Grid container spacing={0} justify={'center'} alignItems={'center'} className={classes.s4}>
        <Grid lg={10} container item className={classes.s4_sub}>
          <Scrin4Top/>
          <Grid container>
            <Grid lg={6}>
              <Scrin4Left/>
            </Grid>
            <Grid lg={6} container alignItems="center">
              <Scrin4Right/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Footer/>

    </>
  )
}

export default HomePage