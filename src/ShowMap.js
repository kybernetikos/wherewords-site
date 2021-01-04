import {codeLatLng, decode, wordlist} from "wherewords"
import {MapContainer, Marker, Polygon, Popup, TileLayer, useMapEvents} from "react-leaflet"
import {Icon} from "leaflet"
import {useHistory} from "react-router-dom"
import {useState} from "react"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import markerIconRetinaPng from "leaflet/dist/images/marker-icon-2x.png"
import markerShadowPng from "leaflet/dist/images/marker-shadow.png"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"

const defaultPosition = [51.50083889292473, -0.12459812143438204] // big ben
const defaultZoom = 2

const mapProvider = {
    stamenToner: {
        url: '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    },
    stamenWatercolor: {
        url: '//stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    },
    osm: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    },
    opentopo: {
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        attribution: 'Kartendaten: © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: © <a href="http://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }
}

export function ShowMap({phrase, actual}) {
    const [showEditor, setShowEditor] = useState(false)
    let data = null
    let error = null
    try {
        data = phrase ? decode(phrase.map(word => word.toLowerCase())) : (actual ? codeLatLng(actual) : null)
        console.log(data)
    } catch (e) {
        error = `There is no location matching '${phrase.join(" ")}'`
    }
    const [editorState, setEditorState] = useState(phrase ? phrase : ["", "", "", ""])
    const recommendedZoom = phrase ? (phrase.length * 4) + 1 : defaultZoom
    const history = useHistory()

    const centreMap = actual ? [actual.lat, actual.lng] : (data ? [data.decodedPosition.lat,
        data.decodedPosition.lng] : defaultPosition)

    return (<div className="mainContent map">
        <div className="status" onClick={() => setShowEditor(!showEditor)}>
            {data ? <>
                <div className="left">
                    {data.phrase.join(" ")}
                </div>
                <div className="right">
                    {data.checkmoji}
                </div>
            </> : (error ? error : "attempting to find your location or tap to enter...")}
        </div>
        {showEditor ? <div style={{
            backgroundColor: 'white', color: 'black',
            padding: 10, display: 'flex'
        }}>
            <Autocomplete
                options={wordlist}
                value={editorState[0]}
                onChange={(event, newValue) => {
                    setEditorState([newValue, editorState[1], editorState[2], editorState[3]])
                }}
                getOptionLabel={(a) => a}
                style={{width: 200}}
                renderInput={(parms) => <TextField  {...parms}/>}
            />
            <Autocomplete
                options={wordlist}
                value={editorState[1]}
                onChange={(event, newValue) => {
                    setEditorState([editorState[0], newValue, editorState[2], editorState[3]])
                }}
                getOptionLabel={(a) => a}
                style={{width: 200}}
                renderInput={(parms) => <TextField  {...parms}/>}
            />
            <Autocomplete
                options={wordlist}
                value={editorState[2]}
                onChange={(event, newValue) => {
                    setEditorState([editorState[0], editorState[1], newValue, editorState[3]])
                }}
                getOptionLabel={(a) => a}
                style={{width: 200}}
                renderInput={(parms) => <TextField  {...parms}/>}
            />
            <Autocomplete
                options={wordlist}
                value={editorState[3]}
                onChange={(event, newValue) => {
                    setEditorState([editorState[0], editorState[1], editorState[2], newValue])
                }}
                getOptionLabel={(a) => a}
                style={{width: 200}}
                renderInput={(parms) => <TextField  {...parms}/>}
            />
            <button onClick={() => {
                setShowEditor(false)
                history.push('/'+editorState.join("/"))
            }}>go</button>
        </div>:<></>}
        <MapContainer key={centreMap.join("")} center={centreMap} zoom={recommendedZoom} scrollWheelZoom={true}>
            <TileLayer {...mapProvider.osm}/>
            <CellMarker position={actual} data={data} entryInProgress={showEditor || error}/>
        </MapContainer>
    </div>)
}


const pinkIcon = new Icon({
    iconUrl: markerIconPng,
    iconRetinaUrl: markerIconRetinaPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: markerShadowPng,
    shadowSize: [41, 41],
    className: 'adjusthue'
})

const blueIcon = new Icon({
    iconUrl: markerIconPng,
    iconRetinaUrl: markerIconRetinaPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: markerShadowPng,
    shadowSize: [41, 41],
})

function CellMarker({position, data, entryInProgress}) {
    const history = useHistory()
    const [showCell, setShowCell] = useState(true)

    const recommendedZoom = data ? (data.phrase.length * 4) + 1 : 17
    const minZoomToShowCell = recommendedZoom - 3
    const maxZoomToShowCell = recommendedZoom + 5

    const map = useMapEvents({
        click(e) {
            history.push(`/${e.latlng.lat},${e.latlng.lng}`)
        },
        locationfound(e) {
            if (!entryInProgress) {
                history.push(`/${e.latlng.lat},${e.latlng.lng}`)
            }
        },
        locationerror(e) {
            console.log('location error')
        },
        zoomend(e) {
            if (map._zoom > maxZoomToShowCell || map._zoom < minZoomToShowCell) {
                setShowCell(false)
            } else {
                setShowCell(true)
            }
        }
    })

    if (!position && !data && !entryInProgress) {
        // geolocates you....
        map.locate()
    }

    const corners = data ? data.S2.corners.map(({lat, lng}) => [lat, lng]) : null

    return (<>
        {(showCell && corners) ? <Polygon pathOptions={{color: 'purple', fillOpacity: 0.1}} positions={corners} /> : <></>}
        {(data && !position) ? <Marker position={[data.decodedPosition.lat, data.decodedPosition.lng]} icon={blueIcon}>
            <Popup>
                <p>
                    <span className="wherewords">{data.phrase.join(" ")}</span> <span className="checkmoji">{data.checkmoji}</span>
                    <br/>
                    Cell Center: <span className="latLng">{data.decodedPosition.lat},{data.decodedPosition.lng}</span>
                    See on <a href={`https://www.google.com/maps/place/${data.decodedPosition.lat},${data.decodedPosition.lng}/@${data.decodedPosition.lat},${data.decodedPosition.lng},17z`}>google</a>
                </p>
            </Popup>
        </Marker> : <></>}
        {position ? <Marker position={[position.lat, position.lng]} icon={pinkIcon}>
            <Popup>
                {data ? <><span className="wherewords">{data.phrase.join(" ")}</span> <span className="checkmoji">{data.checkmoji}</span><br/></> : <></>}
                Selected Location: <span className="latLng">{position.lat},{position.lng}</span><br/>
                See on <a href={`https://www.google.com/maps/place/${position.lat},${position.lng}/@${position.lat},${position.lng},17z`}>google</a>
            </Popup>
        </Marker> : <></>}
    </>)
}