window.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactoForm');
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const asunto = document.getElementById('asunto');
    const mensaje = document.getElementById('mensaje');
    const mensajeRespuesta = document.getElementById('mensajeRespuesta');

    // Verificar que todos los elementos existan
    if (!form || !nombre || !correo || !asunto || !mensaje || !mensajeRespuesta) {
        console.error('No se pudieron encontrar todos los elementos del formulario');
        return;
    }

    // Validar email en tiempo real
    correo.addEventListener('input', function () {
        validarEmail(this);
    });

    // Manejar envío del formulario
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Limpiar mensajes previos
        mensajeRespuesta.className = 'mensaje';
        mensajeRespuesta.textContent = '';
        mensajeRespuesta.style.display = 'none';

        // Remover clases de error
        [nombre, correo, asunto, mensaje].forEach(input => {
            input.classList.remove('error-input');
        });

        // Validaciones
        let errores = [];

        // Validar nombre
        if (!nombre.value.trim()) {
            errores.push('El nombre es obligatorio');
            nombre.classList.add('error-input');
        } else if (nombre.value.trim().length < 3) {
            errores.push('El nombre debe tener al menos 3 caracteres');
            nombre.classList.add('error-input');
        }

        // Validar correo
        if (!correo.value.trim()) {
            errores.push('El correo es obligatorio');
            correo.classList.add('error-input');
        } else if (!validarEmail(correo)) {
            errores.push('Por favor ingresa un correo válido');
            correo.classList.add('error-input');
        }

        // Validar asunto
        if (!asunto.value.trim()) {
            errores.push('El asunto es obligatorio');
            asunto.classList.add('error-input');
        } else if (asunto.value.trim().length < 5) {
            errores.push('El asunto debe tener al menos 5 caracteres');
            asunto.classList.add('error-input');
        }

        // Validar mensaje
        if (!mensaje.value.trim()) {
            errores.push('El mensaje es obligatorio');
            mensaje.classList.add('error-input');
        } else if (mensaje.value.trim().length < 10) {
            errores.push('El mensaje debe tener al menos 10 caracteres');
            mensaje.classList.add('error-input');
        }

        // Mostrar resultado
        if (errores.length > 0) {
            mensajeRespuesta.className = 'mensaje error';
            mensajeRespuesta.textContent = '❌ ' + errores[0];
            mensajeRespuesta.style.display = 'block';

            setTimeout(() => {
                mensajeRespuesta.className = 'mensaje';
                mensajeRespuesta.textContent = '';
                mensajeRespuesta.style.display = 'none';
            }, 5000);
        } else {
            // Mostrar mensaje de procesamiento
            mensajeRespuesta.className = 'mensaje';
            mensajeRespuesta.style.display = 'block';
            mensajeRespuesta.style.backgroundColor = '#2196F3';
            mensajeRespuesta.style.color = '#fff';
            mensajeRespuesta.textContent = '⏳ Enviando tu mensaje...';

            // Simular envío
            setTimeout(() => {
                const exito = Math.random() > 0.1;

                if (exito) {
                    mensajeRespuesta.className = 'mensaje exito';
                    mensajeRespuesta.style.backgroundColor = '#4caf50';
                    mensajeRespuesta.textContent = '✅ ¡Mensaje enviado con éxito! Te responderemos pronto a ' + correo.value;

                    console.log('=== MENSAJE DE CONTACTO ===');
                    console.log('Nombre:', nombre.value);
                    console.log('Correo:', correo.value);
                    console.log('Asunto:', asunto.value);
                    console.log('Mensaje:', mensaje.value);
                    console.log('Timestamp:', new Date().toISOString());
                    console.log('===========================');

                    setTimeout(() => {
                        form.reset();
                        mensajeRespuesta.className = 'mensaje';
                        mensajeRespuesta.textContent = '';
                        mensajeRespuesta.style.display = 'none';
                    }, 4000);
                } else {
                    mensajeRespuesta.className = 'mensaje error';
                    mensajeRespuesta.style.backgroundColor = '#f44336';
                    mensajeRespuesta.textContent = '❌ Error al enviar. Por favor, intenta nuevamente.';

                    setTimeout(() => {
                        mensajeRespuesta.className = 'mensaje';
                        mensajeRespuesta.textContent = '';
                        mensajeRespuesta.style.display = 'none';
                    }, 5000);
                }
            }, 2000);
        }

        return false;
    });

    // Función para validar email
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