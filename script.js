// URL del álbum de Google Photos
const GOOGLE_PHOTOS_URL = "https://photos.app.goo.gl/e2M2xJxB722fqru97";

// Función para generar un QR REAL usando una librería simple y fiable
function generarQRReal() {
    const qrContainer = document.getElementById('qr-code');
    if (!qrContainer) return;

    // Primero, limpiar el contenedor
    qrContainer.innerHTML = '';

    // Crear un canvas donde dibujaremos el QR real
    const canvas = document.createElement('canvas');
    canvas.width = 170;
    canvas.height = 170;
    canvas.style.borderRadius = '8px';
    canvas.style.border = '1px solid rgba(180, 142, 92, 0.3)';
    canvas.style.cursor = 'pointer';

    // Hacer que al hacer clic en el canvas se abra el enlace
    canvas.addEventListener('click', function() {
        window.open(GOOGLE_PHOTOS_URL, '_blank');
    });

    // Intentar usar una librería QR si está disponible
    if (typeof QRCode !== 'undefined') {
        try {
            new QRCode(canvas, {
                text: GOOGLE_PHOTOS_URL,
                width: 170,
                height: 170,
                colorDark: "#8B4513",
                colorLight: "#fdf8f5",
                correctLevel: QRCode.CorrectLevel.H
            });
            qrContainer.appendChild(canvas);
            console.log("QR generado con librería QRCode");
            return;
        } catch (error) {
            console.error("Error con librería QRCode:", error);
        }
    }

    // Si no funciona la librería, usar un servicio de API externo (Google Charts)
    console.log("Usando API de Google Charts para QR");
    const qrImage = document.createElement('img');
    const encodedURL = encodeURIComponent(GOOGLE_PHOTOS_URL);
    
    // API de Google Charts para generar QR - MÁS FIABLE
    qrImage.src = `https://chart.googleapis.com/chart?cht=qr&chs=170x170&chl=${encodedURL}&chco=8B4513&chf=bg,s,fdf8f5&chld=H|1`;
    
    qrImage.alt = "Código QR para álbum de fotos de Tania y Manuel";
    qrImage.style.width = '100%';
    qrImage.style.height = '100%';
    qrImage.style.borderRadius = '8px';
    qrImage.style.border = '1px solid rgba(180, 142, 92, 0.3)';
    qrImage.style.cursor = 'pointer';
    
    qrImage.addEventListener('click', function() {
        window.open(GOOGLE_PHOTOS_URL, '_blank');
    });

    // Manejar error si la imagen no carga
    qrImage.onerror = function() {
        console.log("Falló Google Charts, usando placeholder con enlace");
        mostrarPlaceholderConEnlace();
    };

    qrContainer.appendChild(qrImage);
}

// Función de respaldo si todo falla
function mostrarPlaceholderConEnlace() {
    const qrContainer = document.getElementById('qr-code');
    if (!qrContainer) return;
    
    qrContainer.innerHTML = `
        <a href="${GOOGLE_PHOTOS_URL}" 
           target="_blank"
           style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-decoration: none; background: linear-gradient(135deg, #f8f5f0, #f0ece5); border-radius: 8px; border: 2px dashed var(--color-dorado); padding: 15px; text-align: center; color: var(--color-cafe);">
            <span style="font-size: 2em; margin-bottom: 10px;">📸</span>
            <span style="font-weight: 600; font-size: 0.95em; line-height: 1.2;">
                Haz clic para<br>acceder al álbum
            </span>
            <span style="font-size: 0.8em; margin-top: 8px; color: #666;">
                (Enlace directo)
            </span>
        </a>
    `;
}

// Función para inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando itinerario de boda...');
    
    // 1. Generar el QR REAL
    generarQRReal();
    
    // 2. Hacer el botón de fotos interactivo
    const btnFotos = document.querySelector('.btn-fotos');
    if (btnFotos) {
        btnFotos.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btnFotos.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Asegurar que el botón tenga el enlace correcto
        btnFotos.href = GOOGLE_PHOTOS_URL;
    }
    
    // 3. Verificar después de 2 segundos si el QR se cargó
    setTimeout(function() {
        const qrContainer = document.getElementById('qr-code');
        if (qrContainer) {
            const tieneQR = qrContainer.querySelector('canvas, img[src*="chart.googleapis"]');
            if (!tieneQR) {
                console.log("QR no se generó, usando método alternativo...");
                mostrarPlaceholderConEnlace();
            }
        }
    }, 2000);
});

// Versión alternativa con API QRServer (muy confiable)
function generarQRConQRServer() {
    const qrContainer = document.getElementById('qr-code');
    if (!qrContainer) return;
    
    const encodedURL = encodeURIComponent(GOOGLE_PHOTOS_URL);
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodedURL}&color=8B4513&bgcolor=fdf8f5`;
    
    qrContainer.innerHTML = `
        <img src="${qrImageUrl}" 
             alt="QR para álbum de fotos"
             style="width: 100%; height: 100%; border-radius: 8px; border: 1px solid rgba(180, 142, 92, 0.3); cursor: pointer;"
             onclick="window.open('${GOOGLE_PHOTOS_URL}', '_blank')">
    `;
    
    // Manejar error de carga
    const img = qrContainer.querySelector('img');
    img.onerror = function() {
        mostrarPlaceholderConEnlace();
    };
}

// Si después de 3 segundos no hay QR, intentar con QRServer
setTimeout(function() {
    const qrContainer = document.getElementById('qr-code');
    if (qrContainer && !qrContainer.innerHTML.includes('img') && !qrContainer.innerHTML.includes('canvas')) {
        console.log("Intentando con QRServer...");
        generarQRConQRServer();
    }
}, 3000);
