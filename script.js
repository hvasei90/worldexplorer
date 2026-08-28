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
// ==========================================

const selectedCountries = {

    Japan: {
        name: "Japan",
        video: "bvl607w"
    },

    Spain: {
        name: "Spain",
        video: "iiwd9gm"
    },

    Australia: {
        name: "Australia",
        video: "nmdq98x"
    },

    Kenya: {
        name: "Kenya",
        video: "vly826r"
    },

    "Costa Rica": {
        name: "Costa Rica",
        video: "uupa29t"
    },

    Afghanistan: {
        name: "Afghanistan",
        video: "jzz5ln8"
    },

    England: {
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
        "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    )

    .bumpImageUrl(
        "https://unpkg.com/three-globe/example/img/earth-topology.png"
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

                    const name =
                        country.properties.name;


                    if (
                        selectedCountries[name]
                    ) {

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

                    const name =
                        country.properties.name;


                    if (
                        selectedCountries[name]
                    ) {

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

                    const name =
                        country.properties.name;


                    if (
                        selectedCountries[name]
                    ) {

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

                    const name =
                        country.properties.name;


                    if (
                        selectedCountries[name]
                    ) {

                                               

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

                    const name =
                        country.properties.name;


                    console.log(
                        "Clicked:",
                        name
                    );


                    if (
                        selectedCountries[name]
                    ) {

                        openCountry(
                            selectedCountries[name]
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


    // Set title

    videoTitle.textContent =
        country.name;


    // Clear previous player

    countryVideo.innerHTML = "";


    // ======================================
    // NO VIDEO YET
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

        const iframe =
            document.createElement("iframe");


        iframe.src =
            "https://www.aparat.com/video/video/embed/videohash/" +
            country.video +
            "/vt/frame";


        iframe.width =
            "100%";


        iframe.height =
            "400";


        iframe.frameBorder =
            "0";


        iframe.allow =
            "autoplay; fullscreen";


        iframe.allowFullscreen =
            true;


        iframe.style.border =
            "none";


        countryVideo.appendChild(
            iframe
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
