// Función para generar el código QR
function generarQR() {
  const urlGooglePhotos = "https://photos.app.goo.gl/e2M2xJxB722fqru97";
  const qrContainer = document.getElementById('qr-code');
  
  // Limpiar el contenedor
  qrContainer.innerHTML = '';
  
  // Generar el código QR
  QRCode.toCanvas(qrContainer, urlGooglePhotos, {
    width: 160,
    height: 160,
    margin: 1,
    color: {
      dark: '#8B4513', // Color café
      light: '#fdf8f5' // Color beige
    }
  }, function(error) {
    if (error) {
      console.error('Error generando QR:', error);
      // Mostrar placeholder en caso de error
      qrContainer.innerHTML = `
        <div class="qr-placeholder">
          <p>Acceder al álbum</p>
        </div>
      `;
      
      // Hacer que el placeholder sea clickeable
      const placeholder = qrContainer.querySelector('.qr-placeholder');
      placeholder.style.cursor = 'pointer';
      placeholder.addEventListener('click', function() {
        window.open(urlGooglePhotos, '_blank');
      });
    } else {
      // Agregar estilos al canvas generado
      const canvas = qrContainer.querySelector('canvas');
      if (canvas) {
        canvas.style.borderRadius = '6px';
        // Hacer el QR clickeable
        canvas.style.cursor = 'pointer';
        canvas.addEventListener('click', function() {
          window.open(urlGooglePhotos, '_blank');
        });
      }
    }
  });
}

// Función para inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('Itinerario de boda cargado');
  
  // Generar el código QR
  generarQR();
  
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
