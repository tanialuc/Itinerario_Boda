// qr-generator.js - Método super simple
(function() {
  // Esperar a que el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    const qrContainer = document.getElementById('qr-code');
    if (!qrContainer) return;
    
    const photosUrl = 'https://photos.app.goo.gl/e2M2xJxB722fqru97';
    
    // Usar el servicio de QR de Google directamente
    const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=170x170&chl=${encodeURIComponent(photosUrl)}&chco=8B4513&chf=bg,s,fdf8f5`;
    
    // Crear imagen del QR
    const img = new Image();
    img.src = qrUrl;
    img.alt = 'Código QR para álbum de fotos';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.borderRadius = '8px';
    img.style.border = '1px solid rgba(180, 142, 92, 0.3)';
    
    // Hacer clickeable
    img.onclick = function() {
      window.open(photosUrl, '_blank');
    };
    img.style.cursor = 'pointer';
    
    // Limpiar y agregar
    qrContainer.innerHTML = '';
    qrContainer.appendChild(img);
    
    // Manejar error
    img.onerror = function() {
      qrContainer.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8f5f0, #f0ece5); border-radius: 8px; border: 2px solid var(--color-dorado); cursor: pointer; padding: 15px; text-align: center; color: var(--color-cafe);" 
             onclick="window.open('${photosUrl}', '_blank')">
          <span style="font-size: 2em;">📸</span>
          <span style="font-weight: 600; margin-top: 10px; font-size: 0.9em;">Álbum de Fotos</span>
          <span style="font-size: 0.8em; margin-top: 5px; color: #666;">Haz clic para abrir</span>
        </div>
      `;
    };
  });
})();
