// Función para cargar el contenido del archivo HTML
fetch('../archivo-general/head-content.html')
    .then(response => response.text())
    .then(data => {
        headElement.innerHTML += data;
    })
    .catch(error => console.error('Error al cargar el contenido del header:', error));

fetch('../archivo-general/header-content.html')
    .then(response => response.text())
    .then(data => {
        headerElement.innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el contenido del header:', error));

fetch('../archivo-general/nav-primary-content.html')
    .then(response => response.text())
    .then(data => {
        navPrimaryElement.innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el contenido del nav-primary:', error));

fetch('../archivo-general/nav-secondary-content.html')
    .then(response => response.text())
    .then(data => {
        navSecondaryElement.innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el contenido del nav-secondary:', error));

fetch('../archivo-general/nav-secondary-second-content.html')
    .then(response => response.text())
    .then(data => {
        navSecondarySecondElement.innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el contenido del nav-secondary-second:', error));

fetch('../archivo-general/footer-content.html')
    .then(response => response.text())
    .then(data => {
        footerElement.innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el contenido del footer:', error));

// Función para cargar el archivo JSON ../lenguage/general/es.json
document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block'; // Mostrar el indicador de carga

    // Función para cargar el archivo JSON y aplicar las traducciones
    function applyTranslations() {
        fetch('../lenguage/general/es.json')
            .then(response => response.json())
            .then(data => {
                // Seleccionar todos los elementos que necesitan traducción
                const elementsNameSection = document.querySelectorAll('[data-name]');

                // Actualizar los textos de los elementos
                elementsNameSection.forEach(element => {
                    const keysArray = element.getAttribute('data-name').split(',');
                    keysArray.forEach(keysString => {
                        const keys = keysString.split('.');
                        let nameVariable = data;
                        let position = null;

                        // Verificar si la clave está en 'left' o 'right'
                        if (keys[0] === 'left') {
                            nameVariable = data.left;
                            position = 'left';
                        } else if (keys[0] === 'right') {
                            nameVariable = data.right;
                            position = 'right';
                        }

                        // Navegar por las claves del JSON
                        keys.slice(1).forEach(key => {
                            if (nameVariable[key] !== undefined) {
                                nameVariable = nameVariable[key];
                            } else {
                                console.error(`Clave no encontrada: ${key}`);
                                nameVariable = null;
                            }
                        });

                        // Aplicar la traducción en la posición correcta
                        if (nameVariable) {
                            if (position === 'left') {
                                element.innerHTML = `${nameVariable} ${element.innerHTML}`; // Añadir el texto a la izquierda del contenido existente
                            } else if (position === 'right') {
                                element.innerHTML += ` ${nameVariable}`; // Añadir el texto a la derecha del contenido existente
                            }
                        }
                    });
                });

                loadingIndicator.style.display = 'none'; // Ocultar el indicador de carga
            })
            .catch(error => {
                console.error('Error al cargar las traducciones:', error);
                loadingIndicator.style.display = 'none'; // Ocultar el indicador de carga en caso de error
            });
    }

    // Función para cargar el contenido del archivo HTML
    function loadHTMLContent(url, element) {
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
            })
            .catch(error => console.error(`Error al cargar el contenido de ${url}:`, error));
    }
    
    // Seleccionar los elementos que contienen el contenido de los archivos HTML
    const headElement = document.getElementById('headId');
    const headerElement = document.getElementById('headerId');
    const navPrimaryElement = document.getElementById('nav-primaryId');
    const navSecondaryElement = document.getElementById('nav-secondaryId');
    const navSecondarySecondElement = document.getElementById('nav-secondary-secondId');
    const footerElement = document.getElementById('footerId');

    // Cargar el contenido de los archivos HTML y luego aplicar las traducciones
    Promise.all([
        loadHTMLContent('../archivo-general/head-content.html', headElement),
        loadHTMLContent('../archivo-general/header-content.html', headerElement),
        loadHTMLContent('../archivo-general/nav-primary-content.html', navPrimaryElement),
        loadHTMLContent('../archivo-general/nav-secondary-content.html', navSecondaryElement),
        loadHTMLContent('../archivo-general/nav-secondary-second-content.html', navSecondarySecondElement),
        loadHTMLContent('../archivo-general/footer-content.html', footerElement)
    ]).then(() => {
        applyTranslations();
    });
});