const positions = {
    "horizontal": {"top": { x: 100, y: -40 }, "bottom": { x: -50, y: 50 }},
    "vertical": {"left": { x: 60, y: 0 }, "right": { x: -30, y: 0 }},
    "diagonal": { "bottomLeft": { x: 60, y: 50 }, "topRight": { x: -30, y: -50 }}
};

export const cantonal_coats_of_arms = {
    "lu": {
        "name": "Luzern",
        "id": "lu",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/6/66/Wappen_Luzern_matt.svg",
        "main_color": "#248BCC",
        "blob_properties": [
            { color: '#248BCC', position: positions.vertical.left, size: 150 }, // blue
            { color: '#FFFFFF', position: positions.vertical.right, size: 150 } // white
        ]
    },

    "bs": {
        "name": "Basel",
        "id": "bs",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Wappen_Basel-Stadt_matt.svg",
        "main_color": "#000000",
        "blob_properties": [
            { color: '#000000', position: positions.diagonal.bottomLeft, size: 150 }, // black
            { color: '#FFFFFF', position: positions.diagonal.topRight, size: 150 } // white
        ]
    },

    "be": {
        "name": "Bern",
        "id": "be",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/4/47/Wappen_Bern_matt.svg",
        "main_color": "#E7423F",
        "blob_properties": [
            { color: '#E7423F', position: positions.vertical.top, size: 150 }, // blue
            { color: '#FFD72E', position: positions.vertical.bottom, size: 150 } // white
        ]
    },

    "zh": {
        "name": "Zürich",
        "id": "zh",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Wappen_Z%C3%BCrich_matt.svg",
        "main_color": "#0F05A0",
        "blob_properties": [
            { color: '#248BCC', position: positions.diagonal.bottomLeft, size: 150 }, // blue
            { color: '#FFFFFF', position: positions.diagonal.topRight, size: 150 } // white
        ]
    },

    "so": {
        "name": "Solothurn",
        "id": "so",
        "svg": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Wappen_Solothurn_matt.svg",
        "main_color": "#E8423F",
        "blob_properties": [
            // white on the bottom, #E8423F on top
            { color: '#E8423F', position: positions.horizontal.top, size: 150 }, // red
            { color: '#FFFFFF', position: positions.horizontal.bottom, size: 150 } // white
        ]
    }
};
