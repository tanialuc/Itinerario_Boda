// script.js - VERSIÓN CORREGIDA CON LIBRERÍA CONFIABLE

// URL del álbum de Google Photos
const GOOGLE_PHOTOS_URL = "https://photos.app.goo.gl/e2M2xJxB722fqru97";

// Función principal para generar el QR - IGUAL QUE EN TU TARJETA
function generarQRFuncional() {
    const qrContainer = document.getElementById('qr-code');
    if (!qrContainer) return;

    // Limpiar completamente el contenedor
    qrContainer.innerHTML = '';

    // Crear un div interno para el QR (como en tu tarjeta)
    const qrInner = document.createElement('div');
    qrInner.id = 'qrcode-inner';
    qrContainer.appendChild(qrInner);

    try {
        // USAR EXACTAMENTE EL MISMO MÉTODO QUE EN TU TARJETA
        new QRCode(qrInner, {
            text: GOOGLE_PHOTOS_URL,
            width: 170,
            height: 170,
            colorDark: "#8B4513",      // Color café de tu paleta
            colorLight: "#fdf8f5",     // Color beige de tu paleta
            correctLevel: QRCode.CorrectLevel.H
        });

        console.log("✅ QR generado exitosamente con QRCode.js");

        // Hacer el QR clickeable (como extra)
        const canvas = qrInner.querySelector('canvas');
        if (canvas) {
            canvas.style.cursor = 'pointer';
            canvas.style.borderRadius = '8px';
            canvas.style.border = '1px solid rgba(180, 142, 92, 0.3)';
            
            canvas.addEventListener('click', function() {
                window.open(GOOGLE_PHOTOS_URL, '_blank');
            });
        }

    } catch (error) {
        console.error("❌ Error generando QR:", error);
        mostrarFallbackSeguro();
    }
}

// Fallback simple si algo sale mal
function mostrarFallbackSeguro() {
    const qrContainer = document.getElementById('qr-code');
    if (!qrContainer) return;
    
    qrContainer.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8f5f0, #f0ece5); border-radius: 8px; border: 2px dashed var(--color-dorado); padding: 15px; text-align: center;">
            <a href="${GOOGLE_PHOTOS_URL}" 
               target="_blank"
               style="text-decoration: none; color: var(--color-cafe); display: flex; flex-direction: column; align-items: center; gap: 10px;">
                <span style="font-size: 2em;">📸</span>
                <span style="font-weight: 600; font-size: 0.95em;">
                    Haz clic aquí para<br>acceder al álbum
                </span>
            </a>
        </div>
    `;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando itinerario de boda...');

    // 1. Generar el QR FUNCIONAL
    generarQRFuncional();

    // 2. Configurar botón de fotos
    const btnFotos = document.querySelector('.btn-fotos');
    if (btnFotos) {
        // Asegurar que el enlace sea correcto
        btnFotos.href = GOOGLE_PHOTOS_URL;
        btnFotos.target = "_blank";
        
        // Efectos hover
        btnFotos.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btnFotos.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // 3. Verificar después de 1 segundo
    setTimeout(function() {
        const qrContainer = document.getElementById('qr-code');
        if (qrContainer) {
            const tieneCanvas = qrContainer.querySelector('canvas');
            if (!tieneCanvas) {
                console.log("🔄 QR no se generó, intentando de nuevo...");
                generarQRFuncional();
            } else {
                console.log("✅ QR verificado y listo para escanear");
            }
        }
    }, 1000);
});

// Función para probar el QR (opcional)
function probarQR() {
    const qrContainer = document.getElementById('qr-code');
    if (qrContainer) {
        const canvas = qrContainer.querySelector('canvas');
        if (canvas) {
            alert("✅ QR está listo. Puedes escanearlo con tu cámara.");
        } else {
            alert("❌ QR no se generó correctamente.");
        }
    }
}
