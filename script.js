```javascript
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
// Using ISO numeric country IDs
// ==========================================

const selectedCountries = {

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

};


// ==========================================
// CREATE GLOBE
// ==========================================

const globe = Globe()(
    document.getElementById(
        "globe-container"
    )
);


// ==========================================
// GLOBE APPEARANCE
// ==========================================

globe

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

    lat: 20,

    lng: 10,

    altitude: 2.3

});


// ==========================================
// GET COUNTRY ID
// ==========================================

function getCountryId(country) {

    /*
       world-atlas normally stores the country
       identifier in country.id.

       Convert it to a string so that IDs such as
       004, 036, 392 and 826 can be compared.
    */

    return String(country.id).padStart(3, "0");

}


// ==========================================
// GET SELECTED COUNTRY
// ==========================================

function getSelectedCountry(country) {

    const id =
        getCountryId(country);

    return selectedCountries[id] || null;

}


// ==========================================
// LOAD WORLD MAP
// ==========================================

const worldURL =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


fetch(worldURL)

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
                        country.properties.name ||
                        "Unknown";


                    if (selected) {

                        return (
                            '<div style="' +
                            'padding: 7px 10px;' +
                            'border-radius: 6px;' +
                            'background: #07131e;' +
                            'color: #35e0c1;' +
                            'border: 1px solid #35e0c1;' +
                            'font-weight: bold;' +
                            'font-family: Arial;' +
                            '">' +
                            '★ ' +
                            selected.name +
                            '</div>'
                        );

                    }


                    return (
                        '<div style="' +
                        'padding: 6px 9px;' +
                        'border-radius: 6px;' +
                        'background: rgba(0,0,0,0.8);' +
                        'color: white;' +
                        'font-family: Arial;' +
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
                        id,
                        country.properties.name
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


// ==========================================
// OPEN COUNTRY VIDEO
// ==========================================

function openCountry(country) {

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
    // CLEAR PREVIOUS PLAYER
    // ======================================

    countryVideo.innerHTML = "";


    // ======================================
    // NO VIDEO
    // ======================================

    if (!country.video) {

        countryVideo.innerHTML =
            '<div style="' +
            'width: 100%;' +
            'min-height: 300px;' +
            'display: flex;' +
            'align-items: center;' +
            'justify-content: center;' +
            'color: white;' +
            'font-family: Arial;' +
            'font-size: 18px;' +
            'text-align: center;' +
            '">' +
            'Video coming soon...' +
            '</div>';

    }


    // ======================================
    // APARAT VIDEO
    // ======================================

    else {

        // ----------------------------------
        // VIDEO WRAPPER
        // ----------------------------------

        const videoWrapper =
            document.createElement("div");


        videoWrapper.style.position =
            "relative";


        videoWrapper.style.width =
            "100%";


        videoWrapper.style.paddingTop =
            "57%";


        videoWrapper.style.overflow =
            "hidden";


        videoWrapper.style.borderRadius =
            "12px";


        // ----------------------------------
        // IFRAME
        // ----------------------------------

        const iframe =
            document.createElement("iframe");


        iframe.src =
            "https://www.aparat.com/video/video/embed/videohash/" +
            country.video +
            "/vt/frame";


        iframe.style.position =
            "absolute";


        iframe.style.top =
            "0";


        iframe.style.left =
            "0";


        iframe.style.width =
            "100%";


        iframe.style.height =
            "100%";


        iframe.style.border =
            "none";


        iframe.frameBorder =
            "0";


        iframe.allow =
            "autoplay; fullscreen";


        iframe.allowFullscreen =
            true;


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

}


// ==========================================
// CLOSE VIDEO
// ==========================================

function closeCountryVideo() {

    countryVideo.innerHTML = "";

    videoModal.classList.remove(
        "show"
    );

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

        if (
            event.target === videoModal
        ) {

            closeCountryVideo();

        }

    }
);


// ==========================================
// ESC KEY
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeCountryVideo();

        }

    }
);


// ==========================================
// WINDOW RESIZE
// ==========================================

window.addEventListener(
    "resize",
    () => {

        globe

            .width(
                window.innerWidth
            )

            .height(
                window.innerHeight
            );

    }
);
```
