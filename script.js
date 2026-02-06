// URL del álbum de Google Photos
const GOOGLE_PHOTOS_URL = "https://photos.app.goo.gl/e2M2xJxB722fqru97";

// Función para inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('Itinerario de boda cargado');
  
  // Generar el QR usando un servicio externo confiable
  generarQRConServicioExterno();
  
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
  
  // Hacer todo el contenedor de QR clickeable
  const qrContainer = document.querySelector('.qr-code');
  if (qrContainer) {
    qrContainer.style.cursor = 'pointer';
    qrContainer.addEventListener('click', function() {
      window.open(GOOGLE_PHOTOS_URL, '_blank');
    });
  }
});

// Función principal para generar QR
function generarQRConServicioExterno() {
  const qrContainer = document.getElementById('qr-code');
  if (!qrContainer) return;
  
  // URL del servicio QR de Google Charts (muy confiable)
  const qrImageUrl = `https://chart.googleapis.com/chart?cht=qr&chs=170x170&chld=H|0&chl=${encodeURIComponent(GOOGLE_PHOTOS_URL)}&chco=8B4513&chf=bg,s,fdf8f500`;
  
  // Crear la imagen del QR
  qrContainer.innerHTML = `
    <img src="${qrImageUrl}" 
         alt="Código QR para el álbum de fotos de Tania y Manuel"
         title="Escanea para acceder al álbum de fotos"
         style="width: 100%; height: 100%; border-radius: 8px;">
  `;
  
  // Manejar errores de carga de la imagen
  const qrImage = qrContainer.querySelector('img');
  qrImage.onerror = function() {
    // Si falla la imagen, mostrar un placeholder con enlace
    qrContainer.innerHTML = `
      <div class="qr-placeholder" 
           style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;">
        <div style="font-size: 2em; margin-bottom: 10px; color: var(--color-cafe);">📸</div>
        <p style="color: var(--color-cafe); font-weight: 600; text-align: center; margin: 0; font-size: 0.9em;">
          Haz clic aquí para<br>acceder al álbum
        </p>
        <p style="color: #666; font-size: 0.75em; margin-top: 8px; text-align: center;">
          (O copia el enlace)
        </p>
      </div>
    `;
    
    // Hacer el placeholder clickeable
    const placeholder = qrContainer.querySelector('.qr-placeholder');
    placeholder.addEventListener('click', function() {
      window.open(GOOGLE_PHOTOS_URL, '_blank');
    });
  };
}

// Función para crear un QR básico con canvas (como alternativa)
function generarQRConCanvas() {
  const qrContainer = document.getElementById('qr-code');
  if (!qrContainer) return;
  
  try {
    // Crear un canvas para dibujar un QR básico
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 170;
    canvas.height = 170;
    
    // Fondo
    ctx.fillStyle = '#fdf8f5';
    ctx.fillRect(0, 0, 170, 170);
    
    // Dibujar un patrón de QR simple (solo como placeholder visual)
    ctx.fillStyle = '#8B4513';
    
    // Patrón básico de QR (marcadores de posición)
    // Marcador superior izquierdo
    ctx.fillRect(20, 20, 30, 30);
    ctx.clearRect(25, 25, 20, 20);
    ctx.fillRect(27, 27, 16, 16);
    
    // Marcador superior derecho
    ctx.fillRect(120, 20, 30, 30);
    ctx.clearRect(125, 25, 20, 20);
    ctx.fillRect(127, 27, 16, 16);
    
    // Marcador inferior izquierdo
    ctx.fillRect(20, 120, 30, 30);
    ctx.clearRect(25, 125, 20, 20);
    ctx.fillRect(27, 127, 16, 16);
    
    // Alinear marcadores
    ctx.fillRect(70, 70, 30, 5);
    ctx.fillRect(70, 80, 5, 30);
    
    // Texto indicativo
    ctx.fillStyle = '#8B4513';
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ÁLBUM FOTOS', 85, 160);
    
    canvas.style.borderRadius = '8px';
    canvas.style.border = '1px solid rgba(180, 142, 92, 0.3)';
    canvas.style.cursor = 'pointer';
    
    canvas.addEventListener('click', function() {
      window.open(GOOGLE_PHOTOS_URL, '_blank');
    });
    
    qrContainer.innerHTML = '';
    qrContainer.appendChild(canvas);
    
  } catch (error) {
    console.error('Error creando QR con canvas:', error);
    // Si todo falla, mostrar un simple enlace
    qrContainer.innerHTML = `
      <a href="${GOOGLE_PHOTOS_URL}" 
         target="_blank" 
         style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; text-decoration: none; color: var(--color-cafe); font-weight: 600; text-align: center; background: linear-gradient(135deg, #f8f5f0, #f0ece5); border-radius: 8px; border: 2px dashed var(--color-dorado); padding: 20px;">
        📸<br>
        Haz clic para<br>acceder al álbum
      </a>
    `;
  }
}

// Intentar con el método principal, y si falla, usar el canvas
setTimeout(function() {
  const qrContainer = document.getElementById('qr-code');
  if (qrContainer && !qrContainer.querySelector('img') && !qrContainer.querySelector('canvas')) {
    console.log('Usando método alternativo (canvas) para QR');
    generarQRConCanvas();
  }
}, 3000);
