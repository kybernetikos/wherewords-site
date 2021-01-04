import {Link} from 'react-router-dom'

export function Guide() {
    return (<div className="mainContent about">

        <p><b>wherewords.id</b> splits the world into approximately 105
            trillion 2m x 2m squares and gives them each a four word name - the locations's
            'wherewords'.</p>

        <p>Like "<Link to="/system/steep/according/you">system steep according you</Link>" which
            is a square just outside a bookshop in Niagara Falls, Canada.
            Or "<Link to="/decent/juice/guitar/lawyer">decent juice guitar lawyer</Link>", a
            point on the path up Mount Fuji, Japan.
        </p>

        <p>wherewords that share common prefixes are close to each other, so if you use it a lot,
            you'll quickly learn that wherewords starting <Link to="/bishop/quotation">bishop quotation</Link> are
        in Bristol, UK. and wherewords starting <Link to="/bishop">bishop</Link> are in the UK.</p>

        <p>It's much easier to share the four word name for the point than it is to share a
            latitude and longitude number. For example, in the UK, sharing the wherewords is
            easier than sharing a postcode, and much more accurate. For more technical information
            about the details of how the system works, see <Link to="/+about">why?</Link></p>

        <h3>Find The WhereWords For Your Current Position</h3>

        <p>Go to <Link to="/">wherewords.id/</Link> and the app will try to
            find your position. Once it does, it will show it on the map and show you the wherewords
            that match your position. You will be asked to allow the app access to your
            location. If you do not allow it to, or your device does not support fine grained
            location, then you can enter your position in another way.</p>

        <h3>Find The WhereWords For Another Position</h3>

        <p>Most <Link to="/">wherewords.id/</Link> pages contain a map.  Clicking anywhere on
            the map recenters it, and displays the wherewords for that point.
        </p>

        <h3>Lookup WhereWords That Someone Else Provides</h3>

        <p>On a <Link to="/">wherewords.id/</Link> page, tap the grey bar above the map.
            This will open an editor pane that allows you to choose the four wherewords.  Be aware
            that some possible combinations do not refer to a real place.  If it's easier, you can
            also just navigate directly to the location by entering the words separated by '/' into
            your browser address bar.  For example <Link to="/decent/juice/guitar/lawyer">decent juice guitar lawyer</Link> can be accessed
            by directly typing "wherewords.id/decent/juice/guitar/lawyer" into your browser address
            bar.
        </p>

        <h3>Checkmoji?</h3>

        <p>The emoji on the right hand side of the wherewords is a 'checkmoji'.  Each set of
        wherewords generates an emoji out of 64 commonly used emojis that goes with the wherewords.
        If you want to make sure you've got the wherewords right, you can compare the emojis for an
        extra check. This is an entirely optional extra step you can do if you want to be absolutely
        sure you've copied the words correctly.</p>

        <h3>What about?</h3>

        <p>Encoding data of any sort into words is trivial, so there are other similar
            systems out there.  For more details on how wherewords does it, see <Link to="/+about">why?</Link>.</p>

        <ul>
            <li><a href="https://wolo.codes/about">wolo.codes</a></li>
            <li><a href="https://github.com/bandrews/verbal-id#readme">verbal-id</a></li>
            <li><a href="https://3geonames.org/">3geonames.org</a></li>
            <li><a href="https://www.qalocate.com/solutions/geohashphrase/">Geohashphrase</a></li>
            <li><a href="https://what3words.com">what3words</a></li>
        </ul>

        <p>For any of these systems there are trade-offs based on the size and quality of the
            wordlist they use, how many words they need to represent a location and the particular
            system they use for allocating the words to places on earth.
        </p>
        <p>Generally, smaller wordlists can be better curated to remove homophones, offensive words
            etc, but will require more words in the code to define a position on Earth accurately.
        </p>
        <p>WhereWords uses a wordlist of 4096 words, which is small enough to be both manually and
            automatically curated for quality, and allows me to encode S2 regions (a standard
            system for dividing the world invented by google) into four words. For more detail on
            how it all works, see <Link to="/+about">why?</Link>.
        </p>
    </div>)
}