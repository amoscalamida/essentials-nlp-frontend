const positions = {
    "horizontal": {"top": { x: 100, y: -40 }, "bottom": { x: -50, y: 50 }},
    "vertical": {"left": { x: 60, y: 0 }, "right": { x: -30, y: 0 }},
    "diagonal": { "bottomLeft": { x: 60, y: 50 }, "topRight": { x: -30, y: -50 }}
};

export const cantonal_coats_of_arms = {
    "lu": {
        "name": "Luzern",
        "id": "lu",
        "svg": "/resources/Wappen_Luzern_matt.svg",
        "main_color": "#248BCC",
        "blob_properties": [
            { color: '#248BCC', position: positions.vertical.left, size: 150 }, // blue
            { color: '#FFFFFF', position: positions.vertical.right, size: 150 } // white
        ]
    },

    "bs": {
        "name": "Basel",
        "id": "bs",
        "svg": "/resources/Wappen_Basel-Stadt_matt.svg",
        "main_color": "#000000",
        "blob_properties": [
            { color: '#000000', position: positions.diagonal.bottomLeft, size: 150 }, // black
            { color: '#FFFFFF', position: positions.diagonal.topRight, size: 150 } // white
        ]
    },

    "be": {
        "name": "Bern",
        "id": "be",
        "svg": "/resources/Wappen_Bern_matt.svg",
        "main_color": "#E7423F",
        "blob_properties": [
            { color: '#E7423F', position: positions.horizontal.top, size: 150 }, // blue
            { color: '#FFD72E', position: positions.horizontal.bottom, size: 150 } // white
        ]
    },

    "zh": {
        "name": "Zürich",
        "id": "zh",
        "svg": "/resources/Wappen_Z%C3%BCrich_matt.svg",
        "main_color": "#0F05A0",
        "blob_properties": [
            { color: '#248BCC', position: positions.diagonal.bottomLeft, size: 150 }, // blue
            { color: '#FFFFFF', position: positions.diagonal.topRight, size: 150 } // white
        ]
    },

    "so": {
        "name": "Solothurn",
        "id": "so",
        "svg": "/resources/Wappen_Solothurn_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            // white on the bottom, #E8423F on top
            { color: '#E8423F', position: positions.horizontal.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.horizontal.bottom, size: 150 } // white
        ]
    },

    // starting from here down, the svgs and colors are not correct and need to be adjusted
    // if those cantons would be added to the prediction model

    "vs"    : {
        "name": "Valais",
        "id": "vs",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Wappen_Wallis_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            { color: '#E8423F', position: positions.vertical.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.vertical.bottom, size: 150 } // white
        ]
    },
     
    "sg": {
        "name": "St. Gallen",
        "id": "sg",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Wappen_St_Gallen_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            { color: 'green', position: positions.vertical.top, size: 150 }, // green
            { color: '#FFFFFF', position: positions.vertical.bottom, size: 150 } // white
        ]
    },

    "gr": {
        "name": "Graubünden",
        "id": "gr",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Wappen_Graub%C3%BCnden_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            { color: '#E8423F', position: positions.horizontal.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.horizontal.bottom, size: 150 } // white
        ]
    },

    "sz": {
        "name": "Schwyz",
        "id": "sz",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Wappen_Schwyz_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            { color: '#E8423F', position: positions.horizontal.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.horizontal.bottom, size: 150 } // white
        ]
    },

    "ow": {
        "name": "Obwalden",
        "id": "ow",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Wappen_Obwalden_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            { color: '#E8423F', position: positions.horizontal.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.horizontal.bottom, size: 150 } // white
        ]
    },

    "nw": {
        "name": "Nidwalden",
        "id": "nw",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Wappen_Nidwalden_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            { color: '#E8423F', position: positions.horizontal.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.horizontal.bottom, size: 150 } // white
        ]
    },

    "gl": {
        "name": "Glarus",
        "id": "gl",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Wappen_Glarus_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            { color: '#E8423F', position: positions.horizontal.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.horizontal.bottom, size: 150 } // white
        ]
    },

    "ar": {
        "name": "Appenzell Ausserrhoden",
        "id": "ar",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Wappen_Appenzell_Ausserrhoden_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            { color: '#E8423F', position: positions.horizontal.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.horizontal.bottom, size: 150 } // white
        ]
    },

    "ai": {
        "name": "Appenzell Innerrhoden",
        "id": "ai",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Wappen_Appenzell_Innerrhoden_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            { color: '#E8423F', position: positions.horizontal.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.horizontal.bottom, size: 150 } // white
        ]
    },

    "sh": {
        "name": "Schaffhausen",
        "id": "sh",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Wappen_Schaffhausen_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            { color: '#E8423F', position: positions.vertical.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.vertical.bottom, size: 150 } // white
        ]
    },

    "ag": {
        "name": "Aargau",
        "id": "ag",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wappen_Aargau_matt.svg",
        "main_color": "#248BCC",
        "blob_properties": [
            { color: '#248BCC', position: positions.vertical.left, size: 150 }, // blue
            { color: '#FFFFFF', position: positions.vertical.right, size: 150 } // white
        ]
    },

    "zg": {
        "name": "Zug",
        "id": "zg",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wappen_Zug_matt.svg",
        "main_color": "#248BCC",
        "blob_properties": [
            { color: '#248BCC', position: positions.vertical.left, size: 150 }, // blue
            { color: '#FFFFFF', position: positions.vertical.right, size: 150 } // white
        ]
    },

    "fr": {
        "name": "Fribourg",
        "id": "fr",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Wappen_Freiburg_matt.svg",
        "main_color": "#248BCC",
        "blob_properties": [
            { color: '#248BCC', position: positions.vertical.left, size: 150 }, // blue
            { color: '#FFFFFF', position: positions.vertical.right, size: 150 } // white
        ]
    },

    "ur": {
        "name": "Uri",
        "id": "ur",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Wappen_Uri_matt.svg",
        "main_color": "#248BCC",
        "blob_properties": [
            { color: '#248BCC', position: positions.vertical.left, size: 150 }, // blue
            { color: '#FFFFFF', position: positions.vertical.right, size: 150 } // white
        ]
    },

    "tg": {
        "name": "Thurgau",
        "id": "tg",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wappen_Thurgau_matt.svg",
        "main_color": "#248BCC",
        "blob_properties": [
            { color: '#248BCC', position: positions.vertical.left, size: 150 }, // blue
            { color: '#FFFFFF', position: positions.vertical.right, size: 150 } // white
        ]
    },

};
