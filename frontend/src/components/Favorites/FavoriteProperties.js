import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFavoriteProperties, selectFavoritePropertiesIds,
  selectFavorites
} from '../../store/favorite/selectors'
import { Paths, SortBy, SortDirection, ViewType } from '../../constants'
import { useImmer } from 'use-immer'
import { sliceStatus } from '../../store/sliceStatus'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import Card from '../Submission/View/Card'
import SubmissionList from '../Submission/View/List'
import Error from '../Error'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination/Pagination'
import { deleteFavorite, getFavoriteProperties, sendFavorite } from '../../store/favorite/thunks'
import PropertyCard from '../Property/View/PropertyCard'

const FavoriteProperties = () => {
  const { status, error } = useSelector(selectFavorites)
  const { count, properties } = useSelector(selectFavoriteProperties)
  const favoriteProperties = useSelector(selectFavoritePropertiesIds)
  const history = useHistory()
  const [viewType, setViewTile] = useState(ViewType.TILE)
  const dispatch = useDispatch()
  const [sort, setSort] = useImmer({
    page: 1,
    sortBy: SortBy.CREATED_AT,
    direction: SortDirection.DESC
  })

  useEffect(() => {
    dispatch(getFavoriteProperties(sort))
  }, [dispatch, sort])

  const handleSort = (data) => {
    switch (data) {
      case SortBy.PRICE_MAX:
        setSort(draft => {
          draft.page = 1
          draft.sortBy = SortBy.PRICE
          draft.direction = SortDirection.DESC
        })
        break
      case SortBy.PRICE_MIN:
        setSort(draft => {
          draft.page = 1
          draft.sortBy = SortBy.PRICE
          draft.direction = SortDirection.ASC
        })
        break
      case SortBy.CREATED_AT:
        setSort(draft => {
          draft.page = 1
          draft.sortBy = SortBy.CREATED_AT
          draft.direction = SortDirection.DESC
        })
        break
      default:
        break
    }
  }

  const handlePageChange = (event, newPage) => {
    setSort(draft => {
      draft.page = newPage
    })
  }

  const handleLinkClick = (e, id) => {
    if (e && e.target && e.target.nodeName === 'DIV') {
      history.push(`${Paths.PROPERTY}/${id}`)
    } else {
      e.preventDefault()
    }
  }

  const handleSendFavorite = async (id) => {
    const index = favoriteProperties.findIndex(item => item === id)
    if (index > -1) {
      await dispatch(deleteFavorite({ propertyId: id }))
    } else await dispatch(sendFavorite({ propertyId: id }))
  }

  const mappedCards = () => {
    return properties.map(prop => {
      const { property } = prop
      if (property) {
        return (
          <Grid item sm={viewType === ViewType.TILE ? 3 : 12} key={property.id}>
            <Link onClick={handleLinkClick} component={RouterLink} to={`${Paths.PROPERTY}/${property.id}`} underline={'none'}>
              <Card
                avatar={property.user && property.user.avatar}
                isLiked={favoriteProperties.findIndex(item => item === property.id) > -1}
                handleSendFavorite={handleSendFavorite}
                id={property.id}
                user={property.user}
                price={property.price}
                createdAt={property.createdAt}
                replies={property.replies}
                views={property.views}
                saved={property.saved}
                viewType={viewType}
                isAd={false}>
                <PropertyCard property={property} viewType={viewType} isLiked={favoriteProperties.findIndex(item => item === property.id) > -1}
                  handleSendFavorite={handleSendFavorite}/>
              </Card>
            </Link>
          </Grid>
        )
      } else return null
    })
  }
  return (
    <SubmissionList setViewTile={setViewTile} viewType={viewType} isSortVisible={properties && properties.length > 0}
      size={properties && properties.length} sortHandler={handleSort}>
      {status === sliceStatus.FAILED && <Error error={error && error.message}/>}
      {status === sliceStatus.SUCCEEDED && mappedCards()}

      <Grid container justify={'center'}>
        {
          properties && count > 1 && <Box mt={2}>
            <Pagination count={count}
              page={sort.page}
              onChange={(e, p) => handlePageChange(e, p)}/>
          </Box>}
      </Grid>
    </SubmissionList>
  )
}

export default FavoriteProperties