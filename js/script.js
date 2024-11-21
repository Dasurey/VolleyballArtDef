document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block'; // Mostrar el indicador de carga

    // Función para cargar el archivo JSON y aplicar las traducciones
    function applyTranslations(data) {
        // Función para actualizar los textos de los elementos
        function updateElements(attribute) {
            const elementsNameSection = document.querySelectorAll(`[${attribute}]`);
            console.log(`Elementos encontrados con ${attribute}:`, elementsNameSection.length);

            elementsNameSection.forEach(element => {
                const keysArray = element.getAttribute(attribute).split(',');
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
                    } else if (keys[0] === 'general') {
                        nameVariable = data.general;
                        position = 'general';
                    }

                    // Navegar por las claves del JSON
                    keys.slice(1).forEach(key => {
                        if (nameVariable && nameVariable[key] !== undefined) {
                            nameVariable = nameVariable[key];
                        } else {
                            console.error(`Clave no encontrada: ${key}`);
                            nameVariable = null;
                        }
                    });

                    // Aplicar la traducción en la posición correcta
                    if (nameVariable) {
                        if (Array.isArray(nameVariable)) {
                            // Si es un array, recorrer los elementos y aplicar los cambios
                            nameVariable.forEach(item => {
                                if (item.href) {
                                    element.href = item.href;
                                }
                                if (item.src) {
                                    element.src = item.src;
                                }
                                if (item.alt) {
                                    element.alt = item.alt;
                                }
                                if (item.text) {
                                    if (position === 'left') {
                                        element.innerHTML = `${item.text} ${element.innerHTML}`; // Añadir el texto a la izquierda del contenido existente
                                    } else if (position === 'right') {
                                        element.innerHTML += `${item.text}`; // Añadir el texto a la derecha del contenido existente
                                    }
                                }
                            });
                        } else {
                            // Si no es un array, aplicar los cambios directamente
                            if (position === 'left') {
                                element.innerHTML = `${nameVariable} ${element.innerHTML}`; // Añadir el texto a la izquierda del contenido existente
                            } else if (position === 'right') {
                                element.innerHTML += `${nameVariable}`; // Añadir el texto a la derecha del contenido existente
                            }
                        }
                        console.log('Texto aplicado:', nameVariable);
                    } else {
                        console.error(`No se pudo aplicar la traducción para: ${keysString}`);
                    }
                });
            });
        }

        // Actualizar los elementos con data-name y data-name-inside
        updateElements('data-name');
        updateElements('data-name-inside');

        loadingIndicator.style.display = 'none'; // Ocultar el indicador de carga
    }

    // Función para cargar el contenido del archivo HTML
    function loadHTMLContent(url, element) {
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                element.innerHTML += data;
            })
            .catch(error => console.error(`Error al cargar el contenido de ${url}:`, error));
    }

    // Función para cargar el archivo JSON
    function loadJSON(url) {
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error(`Error al cargar el archivo JSON: ${url}`, error));
    }

    // Seleccionar los elementos que contienen el contenido de los archivos HTML
    const headElement = document.getElementById('headId');
    const headerElement = document.getElementById('headerId');
    const navPrimaryElement = document.getElementById('nav-primaryId');
    const navSecondaryElement = document.getElementById('nav-secondaryId');
    const navSecondarySecondElement = document.getElementById('nav-secondary-secondId');
    const footerElement = document.getElementById('footerId');

    // Cargar el contenido de los archivos HTML y el archivo JSON, luego aplicar las traducciones
    Promise.all([
        loadHTMLContent('archivo-general/head-content.html', headElement),
        loadHTMLContent('archivo-general/header-content.html', headerElement),
        loadHTMLContent('archivo-general/nav-primary-content.html', navPrimaryElement),
        loadHTMLContent('archivo-general/nav-secondary-content.html', navSecondaryElement),
        loadHTMLContent('archivo-general/nav-secondary-second-content.html', navSecondarySecondElement),
        loadHTMLContent('archivo-general/footer-content.html', footerElement),
        loadJSON('lenguage/general/es.json')
    ]).then((results) => {
        console.log('Contenido HTML y JSON cargado completamente');
        const jsonData = results[6]; // El archivo JSON es el último en la lista de resultados
        applyTranslations(jsonData);
    });
});