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
          <p>Haz clic para acceder al álbum</p>
        </div>
      `;
    } else {
      // Agregar estilos al canvas generado
      const canvas = qrContainer.querySelector('canvas');
      if (canvas) {
        canvas.style.borderRadius = '6px';
      }
    }
  });
}

// Función para inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('Itinerario de boda cargado');
  
  // Generar el código QR
  generarQR();
  
  // Agregar efectos de hover a los eventos
  const eventos = document.querySelectorAll('.evento');
  eventos.forEach(evento => {
    // Efecto de sombra al pasar el mouse
    evento.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 12px 25px rgba(139, 69, 19, 0.12)';
    });
    
    evento.addEventListener('mouseleave', function() {
      this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    });
  });
  
  // Agregar funcionalidad para abrir enlace al hacer clic en QR
  const qrCode = document.getElementById('qr-code');
  if (qrCode) {
    qrCode.addEventListener('click', function() {
      const canvas = this.querySelector('canvas');
      if (canvas) {
        // Si hay QR, abrir el enlace
        window.open('https://photos.app.goo.gl/e2M2xJxB722fqru97', '_blank');
      } else {
        // Si no hay QR (placeholder), también abrir
        window.open('https://photos.app.goo.gl/e2M2xJxB722fqru97', '_blank');
      }
    });
    
    // Cambiar cursor
    qrCode.style.cursor = 'pointer';
  }
});
