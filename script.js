// Función para generar el código QR
function generarQR() {
  const urlGooglePhotos = "https://photos.app.goo.gl/e2M2xJxB722fqru97";
  const qrContainer = document.getElementById('qr-code');
  
  // Limpiar el contenedor
  qrContainer.innerHTML = '';
  
  try {
    // Verificar si la librería QRCode está cargada
    if (typeof QRCode === 'undefined') {
      throw new Error('La librería QRCode no está cargada');
    }
    
    // Generar el código QR
    new QRCode(qrContainer, {
      text: urlGooglePhotos,
      width: 170,
      height: 170,
      colorDark: "#8B4513", // Color café
      colorLight: "#fdf8f5", // Color beige
      correctLevel: QRCode.CorrectLevel.H
    });
    
    // Hacer el QR clickeable
    const canvas = qrContainer.querySelector('canvas');
    if (canvas) {
      canvas.style.cursor = 'pointer';
      canvas.addEventListener('click', function() {
        window.open(urlGooglePhotos, '_blank');
      });
      
      // Agregar borde al canvas
      canvas.style.border = '1px solid rgba(180, 142, 92, 0.3)';
      canvas.style.borderRadius = '8px';
    }
    
  } catch (error) {
    console.error('Error generando QR:', error);
    
    // Mostrar placeholder con enlace como fallback
    qrContainer.innerHTML = `
      <div class="qr-placeholder" onclick="window.open('${urlGooglePhotos}', '_blank')" 
           style="cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="font-size: 2em; margin-bottom: 10px;">📸</div>
        <p style="color: var(--color-cafe); font-weight: 600; text-align: center; margin: 0;">
          Haz clic para acceder al álbum
        </p>
        <p style="color: #666; font-size: 0.8em; margin-top: 5px;">
          (o escanea abajo)
        </p>
      </div>
    `;
  }
}

// Función alternativa por si la primera falla
function generarQRAlternativo() {
  const urlGooglePhotos = "https://photos.app.goo.gl/e2M2xJxB722fqru97";
  const qrContainer = document.getElementById('qr-code');
  
  // Usar un servicio externo para generar QR como última opción
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(urlGooglePhotos)}&color=8B4513&bgcolor=fdf8f5`;
  
  qrContainer.innerHTML = `
    <img src="${qrImageUrl}" 
         alt="Código QR para el álbum de fotos" 
         style="width: 100%; height: 100%; border-radius: 8px; border: 1px solid rgba(180, 142, 92, 0.3);"
         onclick="window.open('${urlGooglePhotos}', '_blank')"
         onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'qr-placeholder\\' style=\\'cursor: pointer;\\' onclick=\\'window.open(\\'${urlGooglePhotos}\\', \\'_blank\\')\\'>Haz clic para acceder al álbum</div>'">
  `;
}

// Función para inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('Itinerario de boda cargado');
  
  // Intentar generar el QR con el método principal
  generarQR();
  
  // Si después de 2 segundos no se generó, intentar método alternativo
  setTimeout(function() {
    const qrContainer = document.getElementById('qr-code');
    if (qrContainer && !qrContainer.querySelector('canvas') && !qrContainer.querySelector('img')) {
      console.log('Intentando método alternativo para QR...');
      generarQRAlternativo();
    }
  }, 2000);
  
  // Hacer el botón de fotos más interactivo
  const btnFotos = document.querySelector('.btn-fotos');
  if (btnFotos) {
    btnFotos.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btnFotos.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  }
});
