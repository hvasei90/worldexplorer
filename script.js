// ==========================================
// WORLD EXPLORER
// Globe + Selected Countries + Videos
// MP4 + APARAT
// ==========================================


// ==========================================
// VIDEO ELEMENTS
// ==========================================

const videoModal =
    document.getElementById("video-modal");

const videoTitle =
    document.getElementById("video-title");

const videoContainer =
    document.getElementById("video-container");

const closeVideo =
    document.getElementById("close-video");


// ==========================================
// SELECTED COUNTRIES
// ==========================================

const selectedCountries = {

    // ======================================
    // 1. JAPAN
    // ======================================

    Japan: {

        name: "Japan",

        type: "mp4",

        video: "videos/japan.mp4"

    },


    // ======================================
    // 2. SPAIN
    // ======================================

    Spain: {

        name: "Spain",

        type: "mp4",

        video: "videos/spain.mp4"

    },


    // ======================================
    // 3. AUSTRALIA
    // ======================================

    Australia: {

        name: "Australia",

        type: "mp4",

        video: "videos/australia.mp4"

    },


    // ======================================
    // 4. KENYA
    // ======================================

    Kenya: {

        name: "Kenya",

        type: "aparat",

        video:
            "https://www.aparat.com/video/video/embed/videohash/vly826r/vt/frame"

    },


    // ======================================
    // 5. COSTA RICA
    // ======================================

    "Costa Rica": {

        name: "Costa Rica",

        type: "mp4",

        video: "videos/costa-rica.mp4"

    },


    // ======================================
    // 6. AFGHANISTAN
    // ======================================

    Afghanistan: {

        name: "Afghanistan",

        type: "aparat",

        video:
            "https://www.aparat.com/video/video/embed/videohash/jzz5ln8/vt/frame"

    },


    // ======================================
    // 7. ENGLAND
    // ======================================

    England: {

        name: "England",

        type: "aparat",

        video:
            "https://www.aparat.com/video/video/embed/videohash/chclgoe/vt/frame"

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

    .width(
        window.innerWidth
    )

    .height(
        window.innerHeight
    );


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


        // ==================================
        // CONVERT TO GEOJSON
        // ==================================

        const countries =
            topojson.feature(
                world,
                world.objects.countries
            );


        console.log(
            "Countries loaded:",
            countries.features.length
        );


        // ==================================
        // COUNTRY POLYGONS
        // ==================================

        globe

            .polygonsData(
                countries.features
            )


            // =================================
            // COUNTRY COLOR
            // =================================

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


            // =================================
            // COUNTRY SIDE
            // =================================

            .polygonSideColor(
                () =>
                    "rgba(20,70,90,0.4)"
            )


            // =================================
            // COUNTRY BORDER
            // =================================

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


            // =================================
            // COUNTRY HEIGHT
            // =================================

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


            // =================================
            // HOVER LABEL
            // =================================

            .polygonLabel(
                country => {

                    const name =
                        country.properties.name;


                    // SELECTED COUNTRY

                    if (
                        selectedCountries[name]
                    ) {

                        return `
                            <div style="
                                padding: 7px 10px;
                                border-radius: 6px;
                                background: #07131e;
                                color: #35e0c1;
                                border: 1px solid #35e0c1;
                                font-weight: bold;
                                font-family: Arial;
                            ">
                                ★ ${name}
                            </div>
                        `;

                    }


                    // NORMAL COUNTRY

                    return `
                        <div style="
                            padding: 6px 9px;
                            border-radius: 6px;
                            background: rgba(0,0,0,0.8);
                            color: white;
                            font-family: Arial;
                        ">
                            ${name}
                        </div>
                    `;

                }
            )


            // =================================
            // CLICK COUNTRY
            // =================================

            .onPolygonClick(
                country => {

                    const name =
                        country.properties.name;


                    console.log(
                        "Clicked country:",
                        name
                    );


                    // Is selected?

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
// OPEN COUNTRY
// ==========================================

function openCountry(country) {


    console.log(
        "Opening video:",
        country.name
    );


    // ======================================
    // SET TITLE
    // ======================================

    videoTitle.textContent =
        country.name;


    // ======================================
    // CLEAR OLD VIDEO
    // ======================================

    videoContainer.innerHTML = "";


    // ======================================
    // MP4
    // ======================================

    if (
        country.type === "mp4"
    ) {


        const video =
            document.createElement(
                "video"
            );


        video.controls = true;

        video.playsInline = true;

        video.autoplay = true;


        video.src =
            country.video;


        videoContainer.appendChild(
            video
        );


        video.load();


        video.play()
            .catch(() => {

                console.log(
                    "Autoplay blocked."
                );

            });

    }


    // ======================================
    // APARAT
    // ======================================

    else if (
        country.type === "aparat"
    ) {


        const iframe =
            document.createElement(
                "iframe"
            );


        iframe.src =
            country.video;


        iframe.allowFullscreen =
            true;


        iframe.setAttribute(
            "webkitallowfullscreen",
            "true"
        );


        iframe.setAttribute(
            "mozallowfullscreen",
            "true"
        );


        iframe.allow =
            "autoplay; fullscreen";


        videoContainer.appendChild(
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


    // Stop video / iframe

    videoContainer.innerHTML = "";


    // Hide modal

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
// CLICK OUTSIDE
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
// RESIZE
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
