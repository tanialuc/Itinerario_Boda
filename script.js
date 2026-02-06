// script.js - VERSIÓN MEJORADA CON VERIFICACIÓN DE CARGA

// URL del álbum de Google Photos
const GOOGLE_PHOTOS_URL = "https://photos.app.goo.gl/e2M2xJxB722fqru97";

// Variable para verificar si ya se generó el QR
let qrGenerado = false;

// Función para verificar si la librería QRCode está cargada
function verificarLibreriaQR() {
    if (typeof QRCode === 'undefined') {
        console.log("⏳ QRCode.js no está cargada todavía...");
        return false;
    }
    console.log("✅ QRCode.js cargada correctamente");
    return true;
}

// Función principal para generar el QR
function generarQRFuncional() {
    if (qrGenerado) {
        console.log("ℹ️ QR ya fue generado anteriormente");
        return;
    }

    const qrContainer = document.getElementById('qr-code');
    if (!qrContainer) {
        console.error("❌ No se encontró el contenedor #qr-code");
        return;
    }

    // Verificar que la librería esté disponible
    if (!verificarLibreriaQR()) {
        console.log("🔄 Esperando a que cargue la librería...");
        setTimeout(generarQRFuncional, 500);
        return;
    }

    try {
        // Limpiar completamente el contenedor
        qrContainer.innerHTML = '';

        // Crear un div interno para el QR
        const qrInner = document.createElement('div');
        qrInner.id = 'qrcode-inner';
        qrContainer.appendChild(qrInner);

        // Generar el QR usando la misma librería que funciona
        new QRCode(qrInner, {
            text: GOOGLE_PHOTOS_URL,
            width: 170,
            height: 170,
            colorDark: "#8B4513",
            colorLight: "#fdf8f5",
            correctLevel: QRCode.CorrectLevel.H
        });

        console.log("✅ QR generado exitosamente");
        qrGenerado = true;

        // Hacer el QR clickeable
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

// Fallback que se muestra SOLO si falla el QR
function mostrarFallbackSeguro() {
    const qrContainer = document.getElementById('qr-code');
    if (!qrContainer) return;
    
    qrContainer.innerHTML = `
        <div onclick="window.open('${GOOGLE_PHOTOS_URL}', '_blank')"
             style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8f5f0, #f0ece5); border-radius: 8px; border: 2px dashed var(--color-dorado); padding: 15px; text-align: center; cursor: pointer;">
            <span style="font-size: 2em; color: var(--color-cafe);">📸</span>
            <span style="font-weight: 600; font-size: 0.95em; color: var(--color-cafe); margin-top: 10px;">
                Haz clic aquí para<br>acceder al álbum
            </span>
        </div>
    `;
}

// Inicializar cuando TODO esté listo
function inicializarAplicacion() {
    console.log('🚀 Inicializando aplicación...');

    // Intentar generar el QR inmediatamente
    generarQRFuncional();

    // Configurar botón de fotos
    const btnFotos = document.querySelector('.btn-fotos');
    if (btnFotos) {
        btnFotos.href = GOOGLE_PHOTOS_URL;
        btnFotos.target = "_blank";
        
        btnFotos.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btnFotos.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // Intentar de nuevo después de 2 segundos por si acaso
    setTimeout(function() {
        if (!qrGenerado) {
            console.log("🔄 Reintentando generar QR...");
            generarQRFuncional();
        }
    }, 2000);
}

// ESPERAR A QUE TODO EL DOM Y LAS LIBRERÍAS ESTÉN CARGADAS
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM cargado');
    
    // Esperar un poco más para asegurar que las librerías carguen
    setTimeout(inicializarAplicacion, 100);
});

// También escuchar cuando todas las librerías se carguen
window.addEventListener('load', function() {
    console.log('🎯 Todos los recursos cargados');
    
    if (!qrGenerado) {
        console.log("🎯 Generando QR después de carga completa...");
        generarQRFuncional();
    }
});

// Función para forzar regeneración del QR (útil para debug)
function regenerarQR() {
    qrGenerado = false;
    generarQRFuncional();
    alert("QR regenerado. Refresca la página para verlo.");
}
