// JavaScript para a página de agendamento
document.addEventListener('DOMContentLoaded', function() {
    // Configurar data mínima como hoje
    const dataInput = document.getElementById('data');
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.min = hoje;

    // Destacar menu ativo
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Validação do formulário
    const form = document.getElementById('formAgendamento');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario()) {
            agendarConsulta();
        }
    });

    // Validação em tempo real
    const campos = form.querySelectorAll('input, select, textarea');
    campos.forEach(campo => {
        campo.addEventListener('blur', function() {
            validarCampo(this);
        });
    });
});

function validarCampo(campo) {
    const valor = campo.value.trim();
    const isValid = campo.checkValidity();
    
    if (campo.required && !valor) {
        campo.classList.add('is-invalid');
        campo.classList.remove('is-valid');
    } else if (isValid) {
        campo.classList.add('is-valid');
        campo.classList.remove('is-invalid');
    } else {
        campo.classList.remove('is-valid', 'is-invalid');
    }
}

function validarFormulario() {
    const form = document.getElementById('formAgendamento');
    const campos = form.querySelectorAll('input[required], select[required]');
    let valido = true;

    campos.forEach(campo => {
        validarCampo(campo);
        if (!campo.checkValidity()) {
            valido = false;
        }
    });

    return valido;
}

function agendarConsulta() {
    // Simular agendamento
    const formData = {
        especialidade: document.getElementById('especialidade').value,
        medico: document.getElementById('medico').value,
        data: document.getElementById('data').value,
        horario: document.getElementById('horario').value,
        observacoes: document.getElementById('observacoes').value
    };

    console.log('Dados do agendamento:', formData);
    
    // Mostrar mensagem de sucesso
    alert('✅ Consulta agendada com sucesso!\n\nEm breve entraremos em contato para confirmação.');
    
    // Redirecionar para página inicial
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}