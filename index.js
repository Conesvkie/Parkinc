let map;

// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: 42.69656852638598, lng: 23.33289294603939 },
    });

    let title = document.getElementById("title");

    let button = document.getElementById("button");

    const infowindow = new google.maps.InfoWindow({
        content: document.getElementById("popup"),
    });

    setMarkers(map, infowindow, title, button);
}
// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
const beaches = [
    ["Parking Hotel, St. Sofia", 42.6968, 23.3185, 1],
    ["Bulevard 'Knyaginya Maria Luiza' Parking", 42.6963, 23.3215, 2],
    ["Parking Garage", 42.6542, 23.3986, 3],
    ["Parking 'Todor Aleksandrov'", 42.6942, 23.3155, 4],
    ["Parking Mongo", 42.6943, 23.3255, 5],
];

function setMarkers(map, infowindow, title, button) {
    // Adds markers to the map.
    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.
    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    let icon = {
        url: 'http://127.0.0.1:5500/img/pointer.png',
        scaledSize: { width: 100, height: 100 }
    }

    const image = {
        url:
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    const shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: "poly",
    };

    for (let i = 0; i < beaches.length; i++) {
        const beach = beaches[i];
        let marker = new google.maps.Marker({
            position: { lat: beach[1], lng: beach[2] },
            map,
            // icon: icon,
            shape: shape,
            title: beach[0],
            zIndex: beach[3],
        });
        
        marker.addListener("click", () => {
            title.innerText = beach[0];
            button.parkingSpace = beach[3];
            infowindow.open(map, marker);
        });
    }    
}

function eventListener(e) {
    let button = e.target;
    alert(button.parkingSpace);
}