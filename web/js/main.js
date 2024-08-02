// js/main.js

// Variables globales
let map;
let markers = [];

// Lista de marcadores (puedes obtener estos datos de una API o base de datos)
const markersData = [
    { lat: 20.6402102, lng: -103.3105452, title: "Parada 1" },
    { lat: 20.6389033, lng: -103.3102037, title: "Parada 2" },
    { lat: 20.6388481, lng: -103.3513083, title: "Parada 3" },
    { lat: 20.6386884, lng: -103.3105347, title: "Parada 4" },
    { lat: 20.6349325, lng: -103.2835546, title: "Parada 5" },
    { lat: 20.6316231, lng: -103.292251, title: "Parada 6" },
    { lat: 20.6310332, lng: -103.2666455, title: "Parada 7" },
    { lat: 20.6245079, lng: -103.244455, title: "Parada 8" },
    { lat: 20.6225945, lng: -103.2475369, title: "Parada 9" },
    { lat: 20.6095452, lng: -103.3408591, title: "Parada 10" },
];

// Estilos personalizados para ocultar los íconos por defecto
const mapStyle = [
    {
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
    }
];

// Función para inicializar el mapa
function initMap() {
    const mapOptions = {
        zoom: 12,
        center: { lat: 20.4652714, lng: -103.4995227 }, // Coordenadas iniciales
        styles: mapStyle // Aplicar estilos personalizados
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Ruta del marcador personalizado para las paradas de autobús
    const busStopIcon = {
        url: 'assets/images/bus_stop_marker.png', // Ruta de la imagen
        scaledSize: new google.maps.Size(96, 72), // Tamaño del marcador
        origin: new google.maps.Point(0, 0), // Origen de la imagen
        anchor: new google.maps.Point(48, 36) // Anclaje del marcador
    };

    // Añade marcadores al mapa
    markersData.forEach(markerData => {
        const marker = new google.maps.Marker({
            position: { lat: markerData.lat, lng: markerData.lng },
            map: map,
            title: markerData.title,
            icon: busStopIcon, // Usar el icono personalizado para las paradas de autobús
        });
        markers.push(marker);

        // Agregar evento de clic al marcador
        google.maps.event.addListener(marker, 'click', () => {
            window.open(`https://www.google.com/maps?q=${markerData.lat},${markerData.lng}`, '_blank');
        });
    });

    // Añadir eventos a los elementos de la lista de paradas
    document.querySelectorAll('.stop-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const lat = markersData[index].lat;
            const lng = markersData[index].lng;
            map.setCenter({ lat: lat, lng: lng });
            map.setZoom(15); // Aumentar el nivel de zoom
        });
    });

    // Usar la geolocalización para centrar el mapa en la ubicación actual del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(userLocation);
                map.setZoom(14);

                // Agregar un marcador para la ubicación actual del usuario
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: 'Mi Ubicación',
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: '#4285F4',
                        fillOpacity: 1,
                        strokeWeight: 1,
                        strokeColor: '#fff'
                    }
                });
            },
            () => {
                // Manejar errores de geolocalización
                console.error("Error al obtener la ubicación");
            }
        );
    } else {
        // Navegador no soporta geolocalización
        console.error("El navegador no soporta geolocalización");
    }
}

// Asegúrate de que initMap está disponible en el ámbito global
window.initMap = initMap;
