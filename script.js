// Función para generar el código QR
function generarQR() {
  const urlGooglePhotos = "https://photos.app.goo.gl/e2M2xJxB722fqru97";
  const qrContainer = document.getElementById('qr-code');
  
  // Limpiar el contenedor
  qrContainer.innerHTML = '';
  
  // Generar el código QR
  QRCode.toCanvas(qrContainer, urlGooglePhotos, {
    width: 170,
    height: 170,
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
          <p>Error generando QR</p>
          <a href="${urlGooglePhotos}" target="_blank" 
             style="color: var(--color-cafe); text-decoration: underline;">
            Haz clic aquí para acceder
          </a>
        </div>
      `;
    } else {
      // Agregar estilos al canvas generado
      const canvas = qrContainer.querySelector('canvas');
      if (canvas) {
        canvas.style.borderRadius = '8px';
        canvas.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      }
    }
  });
}

// Función para inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('Itinerario de boda cargado');
  
  // Generar el código QR
  generarQR();
  
  // Agregar efectos de hover a los eventos
  const eventos = document.querySelectorAll('.evento');
  eventos.forEach(evento => {
    // Efecto de sombra al pasar el mouse
    evento.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 15px 30px rgba(139, 69, 19, 0.15)';
    });
    
    evento.addEventListener('mouseleave', function() {
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
  });
  
  // Agregar efecto al botón de fotos
  const btnFotos = document.querySelector('.btn-fotos');
  if (btnFotos) {
    btnFotos.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 15px 25px rgba(180, 142, 92, 0.4)';
    });
    
    btnFotos.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 10px 20px rgba(180, 142, 92, 0.3)';
    });
  }
  
  // Agregar funcionalidad para copiar el enlace (opcional)
  const qrCode = document.getElementById('qr-code');
  if (qrCode) {
    qrCode.addEventListener('click', function() {
      // Solo si el QR se generó correctamente
      const canvas = this.querySelector('canvas');
      if (canvas) {
        // Crear un enlace de descarga para el QR
        const link = document.createElement('a');
        link.download = 'qr-boda-tania-manuel.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Mostrar mensaje temporal
        const mensaje = document.createElement('div');
        mensaje.textContent = 'QR descargado';
        mensaje.style.position = 'fixed';
        mensaje.style.bottom = '20px';
        mensaje.style.left = '50%';
        mensaje.style.transform = 'translateX(-50%)';
        mensaje.style.background = 'var(--color-dorado)';
        mensaje.style.color = 'white';
        mensaje.style.padding = '10px 20px';
        mensaje.style.borderRadius = '6px';
        mensaje.style.zIndex = '1000';
        document.body.appendChild(mensaje);
        
        setTimeout(() => {
          document.body.removeChild(mensaje);
        }, 2000);
      }
    });
    
    // Cambiar cursor cuando hay canvas
    qrCode.style.cursor = 'pointer';
  }
});

// Función para compartir el álbum (opcional)
function compartirAlbum() {
  if (navigator.share) {
    navigator.share({
      title: 'Álbum de fotos - Boda Tania y Manuel',
      text: 'Sube tus fotos de la boda al álbum compartido',
      url: 'https://photos.app.goo.gl/e2M2xJxB722fqru97'
    })
    .catch(console.error);
  } else {
    // Copiar al portapapeles como fallback
    navigator.clipboard.writeText('https://photos.app.goo.gl/e2M2xJxB722fqru97')
      .then(() => {
        alert('Enlace copiado al portapapeles');
      })
      .catch(err => {
        console.error('Error copiando:', err);
      });
  }
}
