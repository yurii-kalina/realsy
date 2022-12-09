import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFavoriteAds, selectFavoriteAdsIds, selectFavorites } from '../../store/favorite/selectors'
import { Paths, SortBy, SortDirection, ViewType } from '../../constants'
import { useImmer } from 'use-immer'
import { sliceStatus } from '../../store/sliceStatus'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import Card from '../Submission/View/Card'
import AdCard from '../Ad/AdCard'
import SubmissionList from '../Submission/View/List'
import Error from '../Error'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination/Pagination'
import { deleteFavorite, getFavoriteAds, sendFavorite } from '../../store/favorite/thunks'
import NoResults from '../common/NoResults'

const FavoriteAds = () => {
  const { status, error } = useSelector(selectFavorites)
  const { count, ads } = useSelector(selectFavoriteAds)
  const favoriteAds = useSelector(selectFavoriteAdsIds)
  const history = useHistory()
  const [viewType, setViewTile] = useState(ViewType.TILE)
  const dispatch = useDispatch()

  const [sort, setSort] = useImmer({
    page: 1,
    sortBy: SortBy.CREATED_AT,
    direction: SortDirection.DESC
  })

  useEffect(() => {
    dispatch(getFavoriteAds(sort))
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
      history.push(`${Paths.AD}/${id}`)
    } else {
      e.preventDefault()
    }
  }

  const handleSendFavorite = async (id) => {
    const index = favoriteAds.findIndex(item => item === id)
    if (index > -1) {
      await dispatch(deleteFavorite({ adId: id }))
    } else await dispatch(sendFavorite({ adId: id }))
  }

  const mappedCards = () => {
    return ads.map(submission => {
      const { ad } = submission
      if (ad) {
        return (
          <Grid item sm={viewType === ViewType.TILE ? 3 : 12} key={ad.id}>
            <Link onClick={handleLinkClick} component={RouterLink} to={`${Paths.AD}/${ad.id}`} underline={'none'}>
              <Card
                avatar={ad.user && ad.user.avatar}
                isLiked={favoriteAds.findIndex(item => item === ad.id) > -1}
                handleSendFavorite={handleSendFavorite}
                id={ad.id}
                user={ad.user}
                price={ad.price}
                createdAt={ad.createdAt}
                replies={ad.replies}
                views={ad.views}
                saved={ad.saved}
                viewType={viewType}>
                <AdCard submission={ad} viewType={viewType}/>
              </Card>
            </Link>
          </Grid>
        )
      } else return null
    })
  }
  return (
    <SubmissionList setViewTile={setViewTile} viewType={viewType} isSortVisible={ads && ads.length > 0}
      size={ads && ads.length} sortHandler={handleSort}>
      {status === sliceStatus.FAILED && <Error error={error && error.message}/>}
      {status === sliceStatus.SUCCEEDED && mappedCards()}
      {status === sliceStatus.SUCCEEDED && ads && ads.length === 0 && <NoResults/>}
      <Grid container justify={'center'}>
        {
          ads && count > 1 && <Box mt={2}>
            <Pagination count={count}
              page={sort.page}
              onChange={(e, p) => handlePageChange(e, p)}/>
          </Box>}
      </Grid>
    </SubmissionList>
  )
}

export default FavoriteAds