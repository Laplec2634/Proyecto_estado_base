// Esperar a que el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reservaForm');
    const fechaEntrada = document.getElementById('fecha-entrada');
    const fechaSalida = document.getElementById('fecha-salida');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');

    // Verificar que todos los elementos existan
    if (!form || !fechaEntrada || !fechaSalida || !email || !mensaje) {
        console.error('No se pudieron encontrar todos los elementos del formulario');
        return;
    }

    // Establecer fecha mínima como hoy
    const hoy = new Date().toISOString().split('T')[0];
    fechaEntrada.setAttribute('min', hoy);
    fechaSalida.setAttribute('min', hoy);

    // Validar email en tiempo real
    email.addEventListener('input', function () {
        validarEmail(this);
    });

    // Actualizar fecha mínima de salida cuando cambia la entrada
    fechaEntrada.addEventListener('change', function () {
        fechaSalida.setAttribute('min', this.value);
        if (fechaSalida.value && fechaSalida.value < this.value) {
            fechaSalida.value = '';
        }
    });

    // Manejar envío del formulario
    form.addEventListener('submit', function (e) {
        // IMPORTANTE: Prevenir el envío del formulario
        e.preventDefault();
        e.stopPropagation();

        // Limpiar mensajes previos
        mensaje.className = 'mensaje';
        mensaje.textContent = '';
        mensaje.style.display = 'none';

        // Remover clases de error
        [fechaEntrada, fechaSalida, email].forEach(input => {
            input.classList.remove('error-input');
        });

        // Validaciones
        let errores = [];

        // Validar fecha de entrada
        if (!fechaEntrada.value) {
            errores.push('Debes seleccionar una fecha de entrada');
            fechaEntrada.classList.add('error-input');
        }

        // Validar fecha de salida
        if (!fechaSalida.value) {
            errores.push('Debes seleccionar una fecha de salida');
            fechaSalida.classList.add('error-input');
        }

        // Validar que fecha de salida sea posterior a entrada
        if (fechaEntrada.value && fechaSalida.value) {
            if (new Date(fechaSalida.value) <= new Date(fechaEntrada.value)) {
                errores.push('La fecha de salida debe ser posterior a la fecha de entrada');
                fechaSalida.classList.add('error-input');
            }
        }

        // Validar email
        if (!validarEmail(email)) {
            errores.push('Por favor ingresa un email válido');
            email.classList.add('error-input');
        }

        // Mostrar resultado
        if (errores.length > 0) {
            mensaje.className = 'mensaje error';
            mensaje.textContent = '❌ ' + errores[0];
            mensaje.style.display = 'block';

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                mensaje.className = 'mensaje';
                mensaje.textContent = '';
                mensaje.style.display = 'none';
            }, 5000);
        } else {
            // Mostrar mensaje de procesamiento
            mensaje.className = 'mensaje';
            mensaje.style.display = 'block';
            mensaje.style.backgroundColor = '#2196F3';
            mensaje.style.color = '#fff';
            mensaje.textContent = '⏳ Procesando tu reserva...';

            // Simular envío al servidor
            setTimeout(() => {
                // Simular respuesta exitosa del servidor (90% de probabilidad)
                const exito = Math.random() > 0.1;

                if (exito) {
                    // Simulación exitosa
                    mensaje.className = 'mensaje exito';
                    mensaje.style.backgroundColor = '#4caf50';
                    mensaje.textContent = '✅ ¡Reserva confirmada! Hemos enviado los detalles a ' + email.value;

                    // Mostrar detalles de la reserva
                    console.log('=== DATOS ENVIADOS AL SERVIDOR ===');
                    console.log('Fecha de entrada:', fechaEntrada.value);
                    console.log('Fecha de salida:', fechaSalida.value);
                    console.log('Email:', email.value);
                    console.log('Timestamp:', new Date().toISOString());
                    console.log('===================================');

                    // Limpiar formulario después de 3 segundos
                    setTimeout(() => {
                        form.reset();
                        mensaje.className = 'mensaje';
                        mensaje.textContent = '';
                        mensaje.style.display = 'none';
                    }, 4000);
                } else {
                    // Simular error del servidor
                    mensaje.className = 'mensaje error';
                    mensaje.style.backgroundColor = '#f44336';
                    mensaje.textContent = '❌ Error del servidor. Por favor, intenta nuevamente más tarde.';

                    setTimeout(() => {
                        mensaje.className = 'mensaje';
                        mensaje.textContent = '';
                        mensaje.style.display = 'none';
                    }, 5000);
                }
            }, 2000); // Simula 2 segundos de "procesamiento"
        }

        // Asegurarse de que NO se envíe el formulario
        return false;
    });

    // Función para validar formato de email
    function validarEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const esValido = emailRegex.test(input.value);

        if (input.value && !esValido) {
            input.classList.add('error-input');
            return false;
        } else {
            input.classList.remove('error-input');
            return esValido || !input.value;
        }
    }
});