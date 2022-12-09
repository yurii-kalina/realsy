import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sliceStatus } from '../../store/sliceStatus'
import Error from '../Error'
import Loading from '../Loading'
import Card from '../Submission/View/Card'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { Paths, SortBy, SortDirection, ViewType } from '../../constants'
import SubmissionList from '../Submission/View/List'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'
import { useImmer } from 'use-immer'
import FavoriteCard from './FavoriteCard'

const FavoriteList = () => {
  const { status, error, favorites, count } = useSelector(selectFavorite)
  const [viewType, setViewTile] = useState(ViewType.TILE)
  const dispatch = useDispatch()

  const [sort, setSort] = useImmer({
    page: 1,
    sortBy: SortBy.CREATED_AT,
    direction: SortDirection.DESC
  })

  useEffect(() => {
    if (status === sliceStatus.IDLE) {
      dispatch(getFavoritesList(sort))
    }
  }, [dispatch, sort, status])

  useEffect(() => {
    dispatch(getFavoritesList(sort))
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

  const mappedCards = () => {
    return favorites.map(submission =>
      <Grid item sm={viewType === ViewType.TILE ? 3 : 12} key={submission.id}>
        <Link component={RouterLink} to={`${Paths.FAVORITE}/${submission.id}`} underline={'none'}>
          <Card
            user={submission.user}
            price={submission.price}
            createdAt={submission.createdAt}
            replies={submission.replies}
            views={submission.views}
            saved={submission.saved}
            viewType={viewType}>
            <FavoriteCard submission={submission} viewType={viewType}/>
          </Card>
        </Link>
      </Grid>)
  }

  return (
    <SubmissionList setViewTile={setViewTile} viewType={viewType} isSortVisible={favorites && favorites.length > 0}
      size={favorites && favorites.length} sortHandler={handleSort}>
      {status === sliceStatus.FAILED && <Error error={error && error.message}/>}
      {status === sliceStatus.LOADING && <Loading isFullWidth={true}/>}
      {status === sliceStatus.SUCCEEDED && <>
        {mappedCards()}
      </>}
      <Grid container justify={'center'}>
        {
          favorites && count > 1 && <Box mt={2}>
            <Pagination count={count}
              page={sort.page}
              onChange={(e, p) => handlePageChange(e, p)}/>
          </Box>}
      </Grid>
    </SubmissionList>
  )
}

export default FavoriteList
