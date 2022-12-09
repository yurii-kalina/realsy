import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { useSelector } from 'react-redux'
import { selectPropertyItem } from '../../../store/property/selectors'

const useStyles = makeStyles(theme => ({
  tiles: ({ size }) => ({
    cursor: 'pointer',
    height: 116.5,
    flexBasis: size <= 3 ? '100%' : '50%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    paddingLeft: 5,
    '&:nth-of-type(1)': {
      paddingBottom: size > 3 ? 5 : 0
    },
    '&:nth-child(2)': {
      paddingBottom: size > 3 ? 5 : 0,
      '& img': {
        borderTopRightRadius: size > 5 ? 8 : 0
      }
    },
    '&:nth-child(4)': {
      '& img': {
        borderBottomRightRadius: size > 5 ? 8 : 0
      }
    },
    '& img': {
      objectFit: 'cover',
      maxWidth: '100%'
    }

  }),
  secondTile: ({ size }) => ({
    cursor: 'pointer',
    flexBasis: size <= 4 ? '100%' : '50%',
    height: size === 2 ? 233 : 116.5,
    paddingBottom: size >= 3 ? 5 : 0,
    paddingLeft: 5,
    boxSizing: 'border-box',
    overflow: 'hidden',
    '& img': {
      objectFit: 'cover',
      maxWidth: '100%'
    }
  }),
  firstTile: ({ size }) => ({
    cursor: 'pointer',
    flexBasis: size === 1 ? '100%' : '50%',
    justifyContent: 'center',
    height: 233,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    '& img': {
      objectFit: 'cover',
      maxWidth: '100%'
    },
    rightImages: {
      marginLeft: 2.5
    }
  })
}))
const PropertyImages = () => {
  const [isGalleryOpen, setGalleryOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const { images } = useSelector(selectPropertyItem)
  const imageContainer = () => {
    let firstImage = null
    let secondImage = null
    let otherImages = null
    if (images && images.length > 0) {
      if (images[0] && images[0].url) {
        firstImage = <Box onClick={() => openGallery(images[0].url)} display='flex' className={classes.firstTile}>
          <img src={images[0].url} alt={images[0].name}/>
        </Box>
      }
      if (images[1] && images[1].url) {
        secondImage = <Box onClick={() => openGallery(images[1].url)} display='flex' className={classes.secondTile}>
          <img src={images[1].url} alt={images[1].name}/>
        </Box>
      }
      if (images.length > 2) {
        const others = images.slice(2, 5)
        if (others) {
          otherImages = others.map(img => <Box onClick={() => openGallery(img.url)} key={img.id} display='flex' className={classes.tiles}>
            <img src={img.url} alt={img.name}/>
          </Box>)
        }
      }
    }

    return (
      <Box mt={6.25} display='flex' height={233} overflow='hidden' flexWrap='wrap' borderRadius={8}>
        <Grid container>
          <Grid item sm={images.length === 1 ? 12 : 6}>
            {firstImage}
          </Grid>
          <Grid item sm={6} className={classes.rightImages}>
            <Grid container>
              {secondImage}
              {otherImages}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  }

  const openGallery = (url) => {
    const imageIndex = images.findIndex(item => item.url === url)
    setIndex(imageIndex)
    setGalleryOpen(true)
  }
  const classes = useStyles({ size: images && images.length })
  return (
    <>
      {images && images.length > 0 &&
      imageContainer()
      }
      {isGalleryOpen &&
        <Lightbox
          mainSrc={images[index].url}
          nextSrc={images[(index + 1) % images.length].url}
          prevSrc={images[(index + images.length - 1) % images.length].url}
          onCloseRequest={() => setGalleryOpen(false)}
          onMovePrevRequest={() =>
            setIndex((index + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setIndex((index + 1) % images.length)
          }/>
      }
    </>
  )
}

export default PropertyImages