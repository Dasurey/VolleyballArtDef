// script.js
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const storeInfoDiv = document.getElementById('store-info');
    
    // Limpiar el contenido del div antes de insertar nuevos elementos
    storeInfoDiv.innerHTML = '';

    const titleElement = document.createElement('h5');
    titleElement.className = 'font-weight-bold text-dark mb-4';
    titleElement.textContent = data.storeInfo.title;
    
    const linksContainer = document.createElement('div');
    linksContainer.className = 'd-flex flex-column justify-content-start';
    
    data.storeInfo.links.forEach(link => {
      const linkElement = document.createElement('a');
      linkElement.className = 'text-dark mb-2';
      linkElement.href = link.href;
      linkElement.innerHTML = `<i class="fa-solid fa-angle-right mr-2"></i>${link.text}`;
      linksContainer.appendChild(linkElement);
    });
    
    storeInfoDiv.appendChild(titleElement);
    storeInfoDiv.appendChild(linksContainer);
  })
  .catch(error => console.error('Error al cargar el JSON:', error));