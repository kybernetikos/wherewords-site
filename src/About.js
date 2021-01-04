export function About() {
    return (<div className="mainContent about">
        <p><b>wherewords.id</b> splits the world into approximately 105
            trillion 2m x 2m squares and gives them each a four word name.</p>

        <p>I made it as a fun holiday side project over a few days at the
        beginning of 2021.  The code is available <a href="https://github.com/kybernetikos/wherewords">on github</a>.</p>

        <p>Things still to do:
        </p>
        <ul>
            <li>Make it work off-line, as an app</li>
            <li>Allow searching for locations</li>
            <li>Better sharing of wherewords</li>
            <li>Much better manual entry of the words</li>
            <li>Better maps.  Maybe vectors?  Maybe for-pay?</li>
            <li>Publish wherewords to npm</li>
            <li>Pretty icons</li>
        </ul>

        <p>
            There are three key parts to a project like this.
            <ol>
                <li>The Word List</li>
                <li>The Geographic Encoding</li>
                <li>The Website</li>
            </ol>
        </p>

        <h3>The Word List</h3>

        <p>Turning data from one form into another is very much like changing the base of a number.
        When people started using base 16, they didn't have enough numeric symbols to represent the
        16 possible 'digits' that could be in each place, so they reused letters from the alphabet.
        That's why 0x0A in hexadecimal is 10 in decimal.  Now what if you wanted to work in bigger
        bases?  Well, you can reuse letters, first uppercase then lower and a few other symbols
        and that lets you get to base 64 very easily, but beyond that you're starting to run out of
        symbols.  What you can do then is start treating each word as a symbol (so 156 in decimal
        becomes [1, 5, 6] and then could get turned into 9c in hexadecimal or [9, c] or could be
        be turned into the 156th word of a wordlist  and be maybe [carrot].</p>

        <p>I ended up spending way more time on the word list than I expected.  I started by thinking
        I was very clever in using the
        <a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#Wordlist">BIP39 wordlist</a> which
        has avoided similar words and requires only the first four letters to unambiguously
        identify the word.  This wordlist has been carefully considered and is widely used by the
        cryptocurrency community to store seeds for wallets, e.g. for safe storage of bitcoin or
        ethereum.</p>

        <p>Unfortunately, with only 2048 words, the bip39 wordlist can only provide 11 bits.  This
        meant that to get down to a decent accuracy using the geographic encoding I'd chosen, I
        needed five or six words.</p>

        <p>I started by making sure my code could run with wordlists of different sizes, and
        experimented with a number of different wordlists.  I tried a simple wordlist based on the
        nato phonetic alphabet which would require loads of words, but had the advantage of being
        very distinguishable.  I tried the
        <a href="https://github.com/bandrews/verbal-id#readme">verbal-id</a> wordlist, which has
        put effort into pronounceable, dinstinguishable and inclusive words (but only has 1024 of them).
        </p>

        <p>I also created my own wordlists.  I wrote code to take a large list of words and check
        them against pronunciation dictionaries to remove homophones, against sentiment dictionaries
        to remove negative words, and did a variety of filter steps on a huge dictionary, to get it
        down to a decent size.  The biggest wordlist I created had more than 65536 words in it, which
        gave me 16 bits - this is enough to encode everywhere in 3 words.  It's also getting a bit
        unmanageable.  Lots of problematic words slipped through.</p>

        <p>In the end I settled on a wordlist of 4096 words, which I filtered down from the Oxford 5k
        wordlist of words useful to students, combined with words from verbal-id and extras of my own.
        I still needed to remove words relating to weapons, war, body parts, colonialism, slavery...
        Most of which I discovered after generating wherewords for places and thinking 'oh dear, I
        can't have that'. I'm pretty happy with my 4096 words now, although I'm sure there'll be
        problems.</p>

        <p>I randomise the order of the words before I map them, because I want a bit of variety
        in the generated phrases.</p>

        <h3>The Geographic Encoding</h3>
        <p>
            I use a javascript implementation of <a href="https://s2geometry.io/">S2 Geometry</a> from
            google/niantic.  It's the same system that Pokemon Go uses.  S2 splits a sphere
            (the world is <span style={{}}>nearly</span> spherical) into a hierarchy of cells,
            ordered according to a Hilbert curve.  Hilbert curves are
            great fun because they do something seemingly impossible - they map a 2d surface or even
            a 3d volume into a single 1d line. I first came across them in XKCD's map of the IPv4
            address space.
            <img style={{width: "70vw"}} src="https://imgs.xkcd.com/comics/map_of_the_internet.jpg"/>
        </p>

        <p>
            The S2 system is nice because it creates cells that are consecutively numbered with a
            guarantee that cells that have numberings close together are close in space too.  It
            also subdivides, so as you gain more bits of information, you can address iteratively
            smaller and smaller regions.
        </p>

        <p>
            With my 4096 wordlist, each word gives me 12 bits of information, so with 4 words, I
            have 48 addressible bits.  This is enough to use
            <a href="https://s2geometry.io/resources/s2cell_statistics.html">level 22</a> S2 cells
            (each level requires 4 bits), which gives me cell regions of approximately 2m x
            2m.
        </p>

        <h3>The Website</h3>
        <p>The code for the website is available <a href="https://github.com/kybernetikos/wherewords-site">on github</a>.</p>
        <p>
            I used create-react-app to create the site, react-leaflet for the maps and nginx on
            caprover to easily serve it all from a cheap virtual private server.
        </p>

        <p>I spent quite a bit of time looking at various tile servers for my leaflet maps, but in
            the end I didn't want to be on the hook for any money (beyond voluntary donations), and
            the default OSM tile server gave me the best coverage and zoom of the free options.
            Maybe in the future I'll use vector tiles for faster and deeper zooming.
        </p>
    </div>)
}