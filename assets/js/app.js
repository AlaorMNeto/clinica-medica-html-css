$(document).ready(function() {
  // ===== LOGIN =====
  $("#loginForm").submit(function(e) {
    e.preventDefault();

    const email = $("#email").val().trim();
    const senha = $("#senha").val().trim();

    if (email === "admin@example.com" && senha === "Admin123") {
      localStorage.setItem("usuarioLogado", email);
      window.location.href = "paineladmin.html";
    } else {
      $("#erroLogin").removeClass("d-none");
    }
  });

  // ===== PROTEÇÃO DE PÁGINAS =====
  const paginaPrivada = ["paineladmin.html", "pacientes.html"];
  const estaNaPrivada = paginaPrivada.some(p => window.location.href.includes(p));

  if (estaNaPrivada && !localStorage.getItem("usuarioLogado")) {
    window.location.href = "login.html";
  }

  // ===== LOGOUT =====
  $("#logoutBtn").click(function() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
  });

  // ===== PACIENTES =====
  let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

  function renderPacientes() {
    const busca = $("#buscaPaciente").val().toLowerCase();
    const filtrados = pacientes.filter(p => 
      p.nome.toLowerCase().includes(busca) ||
      (p.email && p.email.toLowerCase().includes(busca)) ||
      (p.telefone && p.telefone.toLowerCase().includes(busca))
    );

    $("#tabelaPacientes").html(
      filtrados.map((p, i) => `
        <tr>
          <td>
            <strong>${p.nome}</strong>
            ${p.email ? `<br><small class="text-muted">${p.email}</small>` : ''}
          </td>
          <td>${p.idade}</td>
          <td>${p.telefone}</td>
          <td>
            ${p.especialidade ? `<span class="badge bg-info">${p.especialidade}</span><br>` : ''}
            ${p.dataConsulta ? `<small>${formatarData(p.dataConsulta)} ${p.horarioConsulta || ''}</small>` : ''}
          </td>
          <td>
            <button class="btn btn-sm btn-primary editar" data-index="${i}" title="Editar">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-danger excluir" data-index="${i}" title="Excluir">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `).join("")
    );

    $("#totalPacientes").text(pacientes.length);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }

  function formatarData(data) {
    if (!data) return '';
    const date = new Date(data + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  }

  // Adicionar paciente
  $("#addPacienteBtn").click(function() {
    $("#pacienteIndex").val("");
    $("#formPaciente")[0].reset();
    $("#modalPaciente .modal-title").text("Adicionar Paciente");
    $("#modalPaciente").modal("show");
  });

  $("#formPaciente").submit(function(e) {
    e.preventDefault();
    const nome = $("#nomePaciente").val().trim();
    const idade = $("#idadePaciente").val();
    const telefone = $("#telefonePaciente").val().trim();
    const email = $("#emailPaciente").val().trim();
    const especialidade = $("#especialidadePaciente").val();
    const index = $("#pacienteIndex").val();

    const pacienteData = { 
      nome, 
      idade, 
      telefone,
      email: email || '',
      especialidade: especialidade || '',
      dataCadastro: index ? pacientes[index].dataCadastro : new Date().toISOString()
    };

    if (index) {
      pacientes[index] = { ...pacientes[index], ...pacienteData };
    } else {
      pacientes.push(pacienteData);
    }

    $("#modalPaciente").modal("hide");
    renderPacientes();
  });

  $(document).on("click", ".editar", function() {
    const index = $(this).data("index");
    const p = pacientes[index];
    $("#pacienteIndex").val(index);
    $("#nomePaciente").val(p.nome);
    $("#idadePaciente").val(p.idade);
    $("#telefonePaciente").val(p.telefone);
    $("#emailPaciente").val(p.email || '');
    $("#especialidadePaciente").val(p.especialidade || '');
    $("#modalPaciente .modal-title").text("Editar Paciente");
    $("#modalPaciente").modal("show");
  });

  $(document).on("click", ".excluir", function() {
    const index = $(this).data("index");
    if (confirm("Tem certeza que deseja excluir este paciente?")) {
      pacientes.splice(index, 1);
      renderPacientes();
    }
  });

  $("#buscaPaciente").on("keyup", renderPacientes);

  renderPacientes();
});