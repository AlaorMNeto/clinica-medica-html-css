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
        
        campo.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validarCampo(this);
            }
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

function formatarTelefone(telefone) {
    // Remove tudo que não é número
    const numeros = telefone.replace(/\D/g, '');
    
    // Formatação básica para telefone brasileiro
    if (numeros.length === 11) {
        return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 10) {
        return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
}

function agendarConsulta() {
    // Coletar dados do formulário
    const formData = {
        nome: document.getElementById('nome').value.trim(),
        idade: document.getElementById('idade').value,
        telefone: formatarTelefone(document.getElementById('telefone').value),
        email: document.getElementById('email').value.trim(),
        especialidade: document.getElementById('especialidade').value,
        medico: document.getElementById('medico').value,
        data: document.getElementById('data').value,
        horario: document.getElementById('horario').value,
        observacoes: document.getElementById('observacoes').value.trim(),
        dataAgendamento: new Date().toISOString()
    };

    console.log('Dados do agendamento:', formData);
    
    // Salvar paciente no localStorage
    salvarPaciente(formData);
    
    // Mostrar mensagem de sucesso
    alert('✅ Consulta agendada com sucesso!\n\nEm breve entraremos em contato para confirmação.');
    
    // Redirecionar para página inicial
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function salvarPaciente(dados) {
    try {
        // Recuperar pacientes existentes do localStorage
        let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
        
        // Verificar se o paciente já existe (por telefone ou email)
        const pacienteExistente = pacientes.find(p => 
            p.telefone === dados.telefone || p.email === dados.email
        );
        
        if (!pacienteExistente) {
            // Adicionar novo paciente
            pacientes.push({
                nome: dados.nome,
                idade: dados.idade,
                telefone: dados.telefone,
                email: dados.email,
                especialidade: dados.especialidade,
                medico: dados.medico,
                dataConsulta: dados.data,
                horarioConsulta: dados.horario,
                observacoes: dados.observacoes,
                dataCadastro: dados.dataAgendamento
            });
            
            // Salvar no localStorage
            localStorage.setItem('pacientes', JSON.stringify(pacientes));
            console.log('Paciente salvo com sucesso!');
        } else {
            console.log('Paciente já cadastrado');
        }
        
    } catch (error) {
        console.error('Erro ao salvar paciente:', error);
    }
}