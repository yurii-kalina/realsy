import React, { useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, ZoomControl } from 'react-leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

function LocationMarker () {
  const [position, setPosition] = useState(null)

  const map = useMapEvent({
    click (e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    }
  })

  if (position) {
    return (<Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>)
  } else {
    return null
  }
}

const MapView = () => {
  const [currentLocation] = useState({
    lat: 50.4024,
    lng: 30.5324
  })
  const [zoom] = useState(12)

  return (
    <MapContainer center={currentLocation} zoom={zoom} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <LocationMarker/>
      <ZoomControl position={'topright'}/>
    </MapContainer>
  )
}

export default MapView
