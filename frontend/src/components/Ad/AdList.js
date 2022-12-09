import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sliceStatus } from '../../store/sliceStatus'
import Error from '../Error'
import Loading from '../Loading'
import Card from '../Submission/View/Card'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { useTranslation } from 'react-i18next'
import { Paths, SortBy, SortDirection, ViewType } from '../../constants'
import { sortAds } from '../../store/ad/thunks'
import EmptyCard from '../Property/View/EmptyCard'
import SubmissionList from '../Submission/View/List'
import AdCard from './AdCard'
import Box from '@material-ui/core/Box'
import { selectAds } from '../../store/ad/selectors'
import Pagination from '@material-ui/lab/Pagination'
import { useImmer } from 'use-immer'
import { selectFavoriteAdsIds } from '../../store/favorite/selectors'
import { deleteFavorite, sendFavorite } from '../../store/favorite/thunks'

const AdList = ({ isSortVisible }) => {
  const { t } = useTranslation()
  const { status, error, ads, count } = useSelector(selectAds)
  const favoriteAds = useSelector(selectFavoriteAdsIds)
  const [viewType, setViewTile] = useState(ViewType.TILE)
  const dispatch = useDispatch()
  const history = useHistory()

  const [sort, setSort] = useImmer({
    page: 1,
    sortBy: SortBy.CREATED_AT,
    direction: SortDirection.DESC
  })

  useEffect(() => {
    dispatch(sortAds(sort))
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
    return ads.map(submission =>
      <Grid item sm={viewType === ViewType.TILE ? 3 : 12} key={submission.id}>
        <Link onClick={handleLinkClick} component={RouterLink} to={`${Paths.AD}/${submission.id}`} underline={'none'}>
          <Card
            avatar={submission.user && submission.user.avatar}
            isLiked={favoriteAds.findIndex(item => item === submission.id) > -1}
            handleSendFavorite={handleSendFavorite}
            id={submission.id}
            user={submission.user}
            price={submission.price}
            createdAt={submission.createdAt}
            replies={submission.replies}
            views={submission.views}
            saved={submission.saved}
            viewType={viewType}>
            <AdCard submission={submission} viewType={viewType} handleSendFavorite={handleSendFavorite} isLiked={favoriteAds.findIndex(item => item === submission.id) > -1}/>
          </Card>
        </Link>
      </Grid>)
  }
  return (
    <SubmissionList setViewTile={setViewTile} viewType={viewType} isSortVisible={ads && ads.length > 0}
      size={ads && ads.length} sortHandler={handleSort}>
      {status === sliceStatus.FAILED && <Error error={error && error.message}/>}
      {status === sliceStatus.LOADING && <Loading isFullWidth={true}/>}
      {status === sliceStatus.SUCCEEDED && <>
        <Grid item sm={viewType === ViewType.TILE ? 3 : 12} size={ads && ads.length}>
          <Link component={RouterLink} to={`${Paths.AD}/create`} underline={'none'}>
            <EmptyCard text={t('addAd')} viewType={viewType}/>
          </Link>
        </Grid>
        {mappedCards()}
      </>}
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

export default AdList
