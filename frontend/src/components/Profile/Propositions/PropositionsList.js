import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sliceStatus } from '../../../store/sliceStatus'
import Error from '../../Error'
import Loading from '../../Loading'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { ViewType } from '../../../constants'
import Card from '../../Submission/View/Card'
import { selectPropositions } from '../../../store/propositions/selectors'
import { fetchPropositions } from '../../../store/propositions/thunks'
import SubmissionList from '../../Submission/View/List'
import PropertyCard from '../../Property/View/PropertyCard'

const PropositionsList = () => {
  const { status, error, propositions } = useSelector(selectPropositions)
  const [viewType, setViewTile] = useState(ViewType.ROW)
  const dispatch = useDispatch()
  useEffect(() => {
    if (status === sliceStatus.IDLE) {
      dispatch(fetchPropositions())
    }
  }, [dispatch, status])

  const mappedCards = () => {
    return propositions.map(proposition =>
      <Grid item sm={viewType === ViewType.TILE ? 3 : 12} key={proposition.id}>
        <Link component={RouterLink} to={`/propositions/${proposition.id}`} underline={'none'}>
          <Card
            user={proposition.property.user}
            price={proposition.price}
            createdAt={proposition.createdAt}
            replies={proposition.replies}
            views={proposition.views}
            saved={proposition.saved}
            viewType={viewType}>
            <PropertyCard property={proposition.property} viewType={viewType}/>
          </Card>
        </Link>
      </Grid>)
  }

  return (
    <SubmissionList setViewTile={setViewTile} viewType={viewType}
      isSortVisible={propositions && propositions.length > 0}
      size={propositions && propositions.length}>
      {status === sliceStatus.FAILED && <Error error={error && error.message}/>}
      {status === sliceStatus.LOADING && <Loading isFullWidth={true}/>}
      {status === sliceStatus.SUCCEEDED && mappedCards()}
    </SubmissionList>
  )
}

export default PropositionsList
