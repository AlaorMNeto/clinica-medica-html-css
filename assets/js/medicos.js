// JavaScript específico para a página de médicos
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página médicos carregada');
    
    // 1. Destacar item ativo no menu - REMOVIDO o active do link Médicos
    highlightActiveMenu();
    
    // 2. Configurar links âncora
    setupAnchorLinks();
    
    // 3. Efeitos nos cards
    setupCardEffects();
});

function highlightActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // REMOVER a classe active de TODOS os links
        link.classList.remove('active');
        
        // NÃO adicionar active no link "Médicos" quando estiver na página médicos
        // Isso faz com que nenhum link fique destacado na página médicos
    });
}

function setupAnchorLinks() {
    const anchorLinks = document.querySelectorAll('a[href^="index.html#"]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            // Não adicionar active no clique também
        });
    });
}

function setupCardEffects() {
    const medicoCards = document.querySelectorAll('.medico-card');
    
    medicoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}