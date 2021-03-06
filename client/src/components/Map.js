import React, { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import ContextMenu from './ContextMenu';
import UserContext from '../Context';
import PoiMarker from './PoiMarker';
import TrackMarker from './TrackMarker';


const RenderMap = React.memo(({createPoi, editPoi, movePoi, deletePoi, poi_data, editTrack, deleteTrack, track_data, loggedIn, splitTrack}) => {
    return (
        <MapContainer className='Map' center={[65.43662791576793, 13.401348570518797]} zoom={8} zoomControl={false}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {loggedIn && <ContextMenu createPoi={createPoi}/>}

            <MarkerClusterGroup>
                {poi_data !== undefined && 
                    poi_data.map((item, index) => (
                        <PoiMarker 
                            key={item._id} 
                            item={item} 
                            editPoi={editPoi}
                            movePoi={movePoi}
                            deletePoi={deletePoi}
                        />
                    ))
                }
            </MarkerClusterGroup>


            {track_data.length !== 0 &&
                track_data.map((item, index) => (
                    <TrackMarker
                        key={item._id}
                        item={item}
                        editTrack={editTrack}
                        splitTrack={splitTrack}
                        deleteTrack={deleteTrack}
                    />
                ))  
            }
        </MapContainer>
    )
});

export default function Map({createPoi, editPoi, movePoi, deletePoi, poi_data, editTrack, deleteTrack, splitTrack, track_data}) {
    const user = useContext(UserContext);
    return <RenderMap
                createPoi={createPoi}
                editPoi={editPoi}
                movePoi={movePoi}
                deletePoi={deletePoi}
                poi_data={poi_data}
                editTrack={editTrack}
                deleteTrack={deleteTrack}
                splitTrack={splitTrack}
                track_data={track_data}
                loggedIn={user.loggedIn}>
            </RenderMap>
}