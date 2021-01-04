import './App.css'
import 'leaflet/dist/leaflet.css'
import {
    BrowserRouter as Router, Link, Redirect, Route, Switch, useLocation, useParams
} from "react-router-dom"
import {codeLatLng} from "wherewords"
import {ShowMap} from "./ShowMap.js"
import {About} from "./About.js"
import {Guide} from "./Guide.js"

export default function App() {
    return (<Router>
        <div className="App">
            <div className="header">
                <div className="left"><Link to="/">wherewords.id</Link></div>
                <div className="right">
                    <Link to="/+guide">how?</Link>
                    <Link to="/+about">why?</Link>
                </div>
            </div>
            <Switch>
                <Route exact path="/">
                    <ShowMap />
                </Route>
                <Route path="/+about">
                    <About/>
                </Route>
                <Route path="/+guide">
                    <Guide/>
                </Route>
                <Route path="/:word1/:word2/:word3/:word4/:word5">
                    <PhraseShow/>
                </Route>
                <Route path="/:word1/:word2/:word3/:word4">
                    <PhraseShow/>
                </Route>
                <Route path="/:word1/:word2/:word3">
                    <PhraseShow/>
                </Route>
                <Route path="/:word1/:word2">
                    <PhraseShow/>
                </Route>
                <Route path="/:lat,:lng">
                    <LocationShow/>
                </Route>
                <Route path="/:word1">
                    <PhraseShow/>
                </Route>
            </Switch>
        </div>
    </Router>);
}

function PhraseShow() {
    const search = new URLSearchParams(useLocation().search)
    const lat = search.get('lat')
    const lng = search.get('lng')

    const actual = (lat != null && lng != null) ? {lat, lng} : undefined
    const {word1, word2, word3, word4, word5} = useParams()
    const phrase = [word1]
    if (word2) {phrase.push(word2)}
    if (word3) {phrase.push(word3)}
    if (word4) {phrase.push(word4)}
    if (word5) {phrase.push(word5)}

    return (<ShowMap phrase={phrase} actual={actual} />)
}

function LocationShow() {
    const {lat, lng} = useParams()
    const data = codeLatLng(lat, lng)
    return <Redirect  to={`/${data.phrase.join("/")}?lat=${lat}&lng=${lng}`} />
}

