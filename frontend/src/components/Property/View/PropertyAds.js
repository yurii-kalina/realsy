import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sliceStatus } from '../../../store/sliceStatus'
import Error from '../../Error'
import Loading from '../../Loading'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { Paths, ViewType } from '../../../constants'
import Card from '../../Submission/View/Card'
import { selectPropertyAds } from '../../../store/property/selectors'
import { fetchPropertyAds } from '../../../store/property/thunks'
import SubmissionList from '../../Submission/View/List'
import PropertyCard from './PropertyCard'

const PropertyAds = props => {
  const { id } = useParams()
  const { status, error, items, propertyId } = useSelector(selectPropertyAds)
  const [viewType, setViewTile] = useState(ViewType.TILE)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(+id, propertyId)
    if (+id !== propertyId) {
      dispatch(fetchPropertyAds(id))
    }
  }, [dispatch, id, propertyId])

  const mappedCards = () =>
    items.map(property =>
      <Grid item sm={viewType === ViewType.TILE ? 3 : 12} key={property.id}>
        <Link component={RouterLink} to={`${Paths.AD}/${property.id}`} underline={'none'}>
          <Card
            avatar={property.user && property.user.avatar}
            user={property.user}
            price={property.price}
            createdAt={property.createdAt}
            replies={property.replies}
            views={property.views}
            saved={property.saved}
            viewType={viewType}>
            <PropertyCard property={property} viewType={viewType}/>
          </Card>
        </Link>
      </Grid>)

  return <SubmissionList setViewTile={setViewTile} viewType={viewType} size={items && items.length}>
    {status === sliceStatus.FAILED && <Error error={error && error.message}/>}
    {status === sliceStatus.LOADING && <Loading isFullWidth={true}/>}
    {status === sliceStatus.SUCCEEDED && mappedCards()}
  </SubmissionList>
}

export default PropertyAds
