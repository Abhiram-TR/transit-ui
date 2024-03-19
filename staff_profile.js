import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"

import { getDatabase , ref, push, update} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"



const appsettings = {

    databaseURL : "https://sample-7ef53-default-rtdb.firebaseio.com/"

}



const app = initializeApp(appsettings)

const database = getDatabase(app)

const BUSESRef = ref(database, "LIST OF BUSES");



let firstBusRef = null; // Store reference to the first pushed bus



// Function to push latitude and longitude to Firebase

function pushLocationToFirebase(latitude, longitude) {

    const newBusRef = push(BUSESRef);

    if (!firstBusRef) {

        firstBusRef = newBusRef; // Store the reference to the first pushed bus

    }

    update(newBusRef, { 

        latitude: latitude,

        longitude: longitude,

        bus_name : "bus",

        status : "initial"

    });

} 



function UpdateLocation(latitude, longitude){

    if (firstBusRef) {

        update(firstBusRef, { // Update the properties of the first pushed bus

            latitude: latitude,

            longitude: longitude,

            status : "updated"

        });

    } else {

        console.error("No bus data found.");

    }

}



function getLocation() {

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function(position) {

            var latitude = position.coords.latitude;

            var longitude = position.coords.longitude;

            

            pushLocationToFirebase(latitude, longitude);

           // setInterval(UpdateLocation(latitude, longitude),40000);

           // setInterval(() => UpdateLocation(latitude, longitude), 40000);



           UpdateLocation(latitude, longitude);

           // document.getElementById("location").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;

        }, function(error) {

            switch(error.code) {

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

        // Geolocation not supported

        alert("Geolocation is not supported by this browser.");

    }

}



getLocation(); // Call the function to request geolocation when the page loads
setInterval(() => getLocation(), 40000);
            
