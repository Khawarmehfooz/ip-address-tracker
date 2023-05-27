const ipInput = document.getElementById("ip-input")
const btn = document.getElementById("btn")
const ipOutput = document.getElementById("ip-output")
const ipLocation = document.getElementById("ip-location")
const timeZone = document.getElementById("timezome")
const isp = document.getElementById("isp")
const mapContainer = document.getElementById("map-container")
const IPIFY_API_KEY = `at_qYF02rSF8AqF3U2e0mdyz6t73cfTQ`
let map;

// View Map By Default
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const { latitude } = position.coords
//             const { longitude } = position.coords
//             let userCoords = [latitude, longitude]
//             console.log(userCoords)
//             map = L.map('map-container').setView(userCoords, 13);

//             L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             }).addTo(map);
//             let myIcon = L.icon({
//                 iconUrl: "./images/icon-location.svg"
//             })

//             L.marker(userCoords, { icon: myIcon }).addTo(map)


//         }
//     )
// }


// Get Ip
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const ip = fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API_KEY}&ipAddress=${ipInput.value}`
    ).then(res => res.json()).then((data) => {
        console.log(data)
        let ispInfo = data.isp;
        let ipInfo = data.ip
        let cityInfo = data.location["region"]
        let countryInfo = data.location["country"]
        let timezomeInfo = data.location["timezone"]
        let ipLatitude = data.location["lat"]
        let ipLongitude = data.location["lng"]
        ipOutput.innerText = ipInfo;
        isp.innerText = ispInfo
        ipLocation.innerText = `${cityInfo}, ${countryInfo}`
        timeZone.innerText = timezomeInfo

        // Map
        let coords = [ipLatitude, ipLongitude]
        console.log(coords)
        map = L.map('map-container').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        let myIcon = L.icon({
            iconUrl: "./images/icon-location.svg"
        })

        L.marker(coords, { icon: myIcon }).addTo(map)


    })
    // console.log(ip.json())
})
