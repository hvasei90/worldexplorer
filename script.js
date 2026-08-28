// ==========================================
// WORLD EXPLORER
// 7 Selected Countries + Aparat Videos
// ==========================================

// ==========================================
// VIDEO ELEMENTS
// ==========================================

const videoModal =
document.getElementById("video-modal");

const countryVideo =
document.getElementById("country-video");

const videoTitle =
document.getElementById("video-title");

const closeVideo =
document.getElementById("close-video");

// ==========================================
// SELECTED COUNTRIES
// ISO 3166-1 NUMERIC IDS
// ==========================================

const selectedCountries = {

```
// Japan
"392": {
    name: "Japan",
    video: "bvl607w"
},

// Spain
"724": {
    name: "Spain",
    video: "iiwd9gm"
},

// Australia
"036": {
    name: "Australia",
    video: "nmdq98x"
},

// Kenya
"404": {
    name: "Kenya",
    video: "vly826r"
},

// Costa Rica
"188": {
    name: "Costa Rica",
    video: "uupa29t"
},

// Afghanistan
"004": {
    name: "Afghanistan",
    video: "jzz5ln8"
},

// United Kingdom
"826": {
    name: "England",
    video: "chclgoe"
}
```

};

// ==========================================
// CREATE GLOBE
// ==========================================

const globe =
Globe()(
document.getElementById(
"globe-container"
)
);

// ==========================================
// GLOBE APPEARANCE
// ==========================================

globe

```
.globeImageUrl(
    "https://unpkg.com/globe.gl/example/img/earth-blue-marble.jpg"
)

.bumpImageUrl(
    "https://unpkg.com/globe.gl/example/img/earth-topology.png"
)

.showAtmosphere(true)

.atmosphereColor("#4ac6ff")

.atmosphereAltitude(0.12)

.backgroundColor("#02070b")

.width(window.innerWidth)

.height(window.innerHeight);
```

// ==========================================
// CONTROLS
// ==========================================

const controls =
globe.controls();

controls.enableRotate = true;

controls.enableZoom = true;

controls.enablePan = false;

controls.rotateSpeed = 0.6;

controls.zoomSpeed = 0.8;

// ==========================================
// CAMERA
// ==========================================

globe.pointOfView({

```
lat: 20,

lng: 10,

altitude: 2.3
```

});

// ==========================================
// GET COUNTRY ID
// ==========================================
// مهم:
// شناسایی کشور فقط با ID انجام می‌شود.
// بنابراین وابسته به نام انگلیسی کشور نیست.
// ==========================================

function getCountryId(country) {

```
if (
    country === null ||
    country === undefined
) {

    return null;

}


if (
    country.id === null ||
    country.id === undefined
) {

    return null;

}


return String(country.id)
    .padStart(3, "0");
```

}

// ==========================================
// GET SELECTED COUNTRY
// ==========================================

function getSelectedCountry(country) {

```
const id =
    getCountryId(country);


if (!id) {

    return null;

}


return selectedCountries[id] || null;
```

}

// ==========================================
// LOAD WORLD MAP
// ==========================================

const worldURL =
"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

fetch(worldURL)

```
.then(response => {

    if (!response.ok) {

        throw new Error(
            "World map could not be loaded"
        );

    }

    return response.json();

})

.then(world => {

    console.log(
        "World map loaded successfully"
    );


    // ======================================
    // CONVERT TO GEOJSON
    // ======================================

    const countries =
        topojson.feature(
            world,
            world.objects.countries
        );


    console.log(
        "Countries loaded:",
        countries.features.length
    );


    // ======================================
    // CHECK SELECTED COUNTRIES
    // ======================================

    console.log(
        "Checking selected countries..."
    );


    countries.features.forEach(
        country => {

            const id =
                getCountryId(country);

            const selected =
                getSelectedCountry(country);


            if (selected) {

                console.log(
                    "Selected country found:",
                    id,
                    selected.name
                );

            }

        }
    );


    // ======================================
    // COUNTRY POLYGONS
    // ======================================

    globe

        .polygonsData(
            countries.features
        )


        // ==================================
        // COUNTRY COLOR
        // ==================================

        .polygonCapColor(
            country => {

                const selected =
                    getSelectedCountry(country);


                if (selected) {

                    return "rgba(53,224,193,0.75)";

                }


                return "rgba(0,0,0,0)";

            }
        )


        // ==================================
        // COUNTRY SIDE
        // ==================================

        .polygonSideColor(
            () =>
                "rgba(20,70,90,0.4)"
        )


        // ==================================
        // COUNTRY BORDER
        // ==================================

        .polygonStrokeColor(
            country => {

                const selected =
                    getSelectedCountry(country);


                if (selected) {

                    return "#35e0c1";

                }


                return "rgba(150,220,240,0.75)";

            }
        )


        // ==================================
        // COUNTRY HEIGHT
        // ==================================

        .polygonAltitude(
            country => {

                const selected =
                    getSelectedCountry(country);


                if (selected) {

                    return 0.035;

                }


                return 0.008;

            }
        )


        // ==================================
        // HOVER LABEL
        // ==================================

        .polygonLabel(
            country => {

                const selected =
                    getSelectedCountry(country);


                const name =
                    country.properties &&
                    country.properties.name
                        ? country.properties.name
                        : "Unknown";


                if (selected) {

                    return (
                        '<div style="' +
                        'padding:7px 10px;' +
                        'border-radius:6px;' +
                        'background:#07131e;' +
                        'color:#35e0c1;' +
                        'border:1px solid #35e0c1;' +
                        'font-weight:bold;' +
                        'font-family:Arial;' +
                        '">' +
                        '★ ' +
                        selected.name +
                        '</div>'
                    );

                }


                return (
                    '<div style="' +
                    'padding:6px 9px;' +
                    'border-radius:6px;' +
                    'background:rgba(0,0,0,0.8);' +
                    'color:white;' +
                    'font-family:Arial;' +
                    '">' +
                    name +
                    '</div>'
                );

            }
        )


        // ==================================
        // CLICK COUNTRY
        // ==================================

        .onPolygonClick(
            country => {

                const id =
                    getCountryId(country);


                const selected =
                    getSelectedCountry(country);


                console.log(
                    "Clicked country:",
                    id
                );


                if (selected) {

                    openCountry(
                        selected
                    );

                }

            }
        );

})


.catch(error => {

    console.error(
        "World map error:",
        error
    );

});
```

// ==========================================
// OPEN COUNTRY VIDEO
// ==========================================

function openCountry(country) {

```
console.log(
    "Opening:",
    country.name
);


// ======================================
// SET TITLE
// ======================================

videoTitle.textContent =
    country.name;


// ======================================
// CLEAR PREVIOUS VIDEO
// ======================================

countryVideo.innerHTML = "";


// ======================================
// CREATE VIDEO
// ======================================

if (country.video) {


    // ----------------------------------
    // VIDEO WRAPPER
    // ----------------------------------

    const videoWrapper =
        document.createElement("div");


    videoWrapper.className =
        "video-wrapper";


    // ----------------------------------
    // IFRAME
    // ----------------------------------

    const iframe =
        document.createElement("iframe");


    iframe.src =
        "https://www.aparat.com/video/video/embed/videohash/" +
        country.video +
        "/vt/frame";


    iframe.title =
        country.name + " video";


    iframe.allow =
        "autoplay; fullscreen";


    iframe.allowFullscreen =
        true;


    iframe.frameBorder =
        "0";


    // ----------------------------------
    // ADD IFRAME
    // ----------------------------------

    videoWrapper.appendChild(
        iframe
    );


    countryVideo.appendChild(
        videoWrapper
    );

}


// ======================================
// SHOW MODAL
// ======================================

videoModal.classList.add(
    "show"
);


// جلوگیری از اسکرول صفحه هنگام باز بودن Modal
document.body.classList.add(
    "modal-open"
);
```

}

// ==========================================
// CLOSE COUNTRY VIDEO
// ==========================================

function closeCountryVideo() {

```
// حذف iframe
// باعث توقف ویدئو نیز می‌شود

countryVideo.innerHTML = "";


// مخفی کردن Modal

videoModal.classList.remove(
    "show"
);


// فعال کردن دوباره اسکرول

document.body.classList.remove(
    "modal-open"
);
```

}

// ==========================================
// CLOSE BUTTON
// ==========================================

closeVideo.addEventListener(
"click",
closeCountryVideo
);

// ==========================================
// CLICK OUTSIDE VIDEO
// ==========================================

videoModal.addEventListener(
"click",
event => {

```
    if (
        event.target === videoModal
    ) {

        closeCountryVideo();

    }

}
```

);

// ==========================================
// ESC KEY
// ==========================================

document.addEventListener(
"keydown",
event => {

```
    if (
        event.key === "Escape"
    ) {

        closeCountryVideo();

    }

}
```

);

// ==========================================
// WINDOW RESIZE
// ==========================================

window.addEventListener(
"resize",
() => {

```
    globe

        .width(
            window.innerWidth
        )

        .height(
            window.innerHeight
        );

}
```

);
