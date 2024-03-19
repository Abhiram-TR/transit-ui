import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase, ref, push, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const appsettings = {
    databaseURL: "https://sample-7ef53-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appsettings)
const database = getDatabase(app)
const BUSESRef = ref(database, "LIST OF BUSES");

let busRef = null; // Store reference to the bus node

// Function to push latitude and longitude to Firebase with custom bus_id
function pushLocationToFirebase(latitude, longitude) {
    const customBusId = "bus_id"; // Custom bus_id
    busRef = ref(BUSESRef, customBusId); // Set the reference to the custom bus_id

    update(busRef, {
        latitude: latitude,
        longitude: longitude,
        bus_name: "bus",
        status: "updated"
    });
}

function UpdateLocation(latitude, longitude) {
    if (busRef) {
        update(busRef, {
            latitude: latitude,
            longitude: longitude,
            status: "updated"
        });
    } else {
        console.error("No bus data found.");
    }
}

var latitude;
var longitude;

function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            pushLocationToFirebase(latitude, longitude);
            UpdateLocation(latitude, longitude);

        }, function(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation. Please enable it in your browser settings to continue.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

setInterval(() => getLocation(), 20000);
