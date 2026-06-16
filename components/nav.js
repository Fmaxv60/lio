class Nav extends HTMLElement {
    connectedCallback() {
        // 1. Détecter sur quelle page on se trouve pour activer le bon bouton
        const currentPath = window.location.pathname;
        const isListeActive = currentPath.includes('liste.html');

        // 2. Injecter le HTML et le CSS du composant
        this.innerHTML = `
            <style>
                .bottom-nav {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 65px;
                    background-color: var(--card-bg, #1e293b);
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    z-index: 1000;
                    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
                    padding-bottom: env(safe-area-inset-bottom);
                }

                .nav-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted, #94a3b8);
                    text-decoration: none;
                    font-size: 0.75rem;
                    font-weight: 600;
                    width: 50%;
                    height: 100%;
                    transition: color 0.2s;
                }

                .nav-icon {
                    font-size: 1.3rem;
                    margin-bottom: 2px;
                }

                .nav-item:hover {
                    color: var(--text-main, #f8fafc);
                }

                /* Classe active dynamique */
                .nav-item.active {
                    color: var(--accent, #6366f1) !important;
                }
            </style>

            <nav class="bottom-nav">
                <a href="index.html" class="nav-item ${!isListeActive ? 'active' : ''}">
                    <span class="nav-icon">🎲</span>
                    <span class="nav-label">Jouer</span>
                </a>
                <a href="liste.html" class="nav-item ${isListeActive ? 'active' : ''}">
                    <span class="nav-icon">📚</span>
                    <span class="nav-label">Questions</span>
                </a>
            </nav>
        `;
    }
}

// Enregistrement du composant auprès du navigateur
customElements.define('bottom-nav', Nav);