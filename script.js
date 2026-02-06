// Función para crear la fecha de la boda en zona horaria de Costa Rica
function crearFechaBodaCR() {
  // 7 de marzo 2026, 11:00 AM en UTC-6 (Costa Rica)
  return new Date('2026-03-07T11:00:00-06:00');
}

// Función para actualizar el contador regresivo
function actualizarContador() {
  const fechaBoda = crearFechaBodaCR();
  const ahora = new Date();
  
  // Diferencia en milisegundos
  const diferencia = fechaBoda - ahora;
  
  // Si ya pasó la fecha
  if (diferencia < 0) {
    document.getElementById('dias').textContent = '00';
    document.getElementById('horas').textContent = '00';
    document.getElementById('minutos').textContent = '00';
    document.getElementById('segundos').textContent = '00';
    return;
  }
  
  // Cálculos
  const segundos = Math.floor((diferencia / 1000) % 60);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  
  // Actualizar elementos
  document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
  document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
  document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
  document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('Itinerario de boda cargado');
  
  // Iniciar contador
  actualizarContador();
  setInterval(actualizarContador, 1000);
  
  // Agregar animaciones a las tarjetas de evento
  const eventos = document.querySelectorAll('.evento-detalle');
  eventos.forEach((evento, index) => {
    // Animación de aparición
    setTimeout(() => {
      evento.style.opacity = '0';
      evento.style.transform = 'translateY(20px)';
      evento.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      setTimeout(() => {
        evento.style.opacity = '1';
        evento.style.transform = 'translateY(0)';
      }, 100);
    }, index * 100);
  });
  
  // Agregar efecto hover mejorado a las tarjetas de información
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 10px 25px rgba(180, 142, 92, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
  });
  
  // Botón de Waze con confirmación
  const wazeBtn = document.querySelector('.btn-waze');
  if (wazeBtn) {
    wazeBtn.addEventListener('click', function(e) {
      if (!confirm('¿Quieres abrir la ubicación en Waze?')) {
        e.preventDefault();
      }
    });
  }
});

// Función para mostrar/ocultar detalles del evento
function toggleDetalles(eventoId) {
  const detalles = document.getElementById(`detalles-${eventoId}`);
  if (detalles) {
    detalles.style.display = detalles.style.display === 'none' ? 'block' : 'none';
  }
}
