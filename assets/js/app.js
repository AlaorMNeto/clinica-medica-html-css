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
    const filtrados = pacientes.filter(p => p.nome.toLowerCase().includes(busca));

    $("#tabelaPacientes").html(
      filtrados.map((p, i) => `
        <tr>
          <td>${p.nome}</td>
          <td>${p.idade}</td>
          <td>${p.telefone}</td>
          <td>
            <button class="btn btn-sm btn-primary editar" data-index="${i}">Editar</button>
            <button class="btn btn-sm btn-danger excluir" data-index="${i}">Excluir</button>
          </td>
        </tr>
      `).join("")
    );

    $("#totalPacientes").text(pacientes.length);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }

  // Adicionar paciente
  $("#addPacienteBtn").click(function() {
    $("#pacienteIndex").val("");
    $("#formPaciente")[0].reset();
    $("#modalPaciente").modal("show");
  });

  $("#formPaciente").submit(function(e) {
    e.preventDefault();
    const nome = $("#nomePaciente").val();
    const idade = $("#idadePaciente").val();
    const telefone = $("#telefonePaciente").val();
    const index = $("#pacienteIndex").val();

    if (index) pacientes[index] = { nome, idade, telefone };
    else pacientes.push({ nome, idade, telefone });

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
    $("#modalPaciente").modal("show");
  });

  $(document).on("click", ".excluir", function() {
    const index = $(this).data("index");
    pacientes.splice(index, 1);
    renderPacientes();
  });

  $("#buscaPaciente").on("keyup", renderPacientes);

  renderPacientes();
});
