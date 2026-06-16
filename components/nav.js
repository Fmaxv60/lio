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
                    margin-bottom: 4px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                
                /* Remplissage automatique basé sur la couleur du texte parent */
                .nav-icon svg {
                    width: 20px;
                    height: 20px;
                    fill: currentColor; 
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
                    <span class="nav-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M141.4 2.3C103-8 63.5 14.8 53.3 53.2L2.5 242.7C-7.8 281.1 15 320.6 53.4 330.9l189.5 50.8c38.4 10.3 77.9-12.5 88.2-50.9l50.8-189.5c10.3-38.4-12.5-77.9-50.9-88.2L141.4 2.3zm23 205.7a32 32 0 1 1 55.4-32 32 32 0 1 1 -55.4 32zM79.2 220.3a32 32 0 1 1 32 55.4 32 32 0 1 1 -32-55.4zm185 96.4a32 32 0 1 1 -32-55.4 32 32 0 1 1 32 55.4zm9-208.4a32 32 0 1 1 32 55.4 32 32 0 1 1 -32-55.4zm-121 14.4a32 32 0 1 1 -32-55.4 32 32 0 1 1 32 55.4zM418 192L377.4 343.2c-17.2 64-83 102-147 84.9l-38.3-10.3 0 30.2c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64L418 192z"/>
                        </svg>
                    </span>
                    <span class="nav-label">Jouer</span>
                </a>
                <a href="liste.html" class="nav-item ${isListeActive ? 'active' : ''}">
                    <span class="nav-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM96 312c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0c-13.3 0-24 10.7-24 24zm24-136c-13.3 0-24 10.7-24 24s10.7 24 24 24l272 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-272 0z"/>
                        </svg>
                    </span>
                    <span class="nav-label">Questions</span>
                </a>
            </nav>
        `;
    }
}

// Enregistrement du composant auprès du navigateur
customElements.define('bottom-nav', Nav);