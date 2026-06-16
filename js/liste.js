let allQuestions = [];
let selectedCategory = 'all';

// Charger le fichier JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        allQuestions = data;
        renderQuestions(allQuestions);
    })
    .catch(err => {
        document.getElementById('questionsList').innerText = "Impossible de charger les questions.";
    });

// Fonction pour générer le HTML de la liste rangée par catégories
function renderQuestions(questionsToDisplay) {
    const container = document.getElementById('questionsList');
    const counter = document.getElementById('questionCounter');
    
    container.innerHTML = "";
    counter.innerText = `${questionsToDisplay.length} question(s) trouvée(s)`;

    if (questionsToDisplay.length === 0) {
        container.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:20px;">Aucune question ne correspond à votre recherche.</div>`;
        return;
    }

    // 1. Regroupement des questions par catégories
    const groups = {};
    questionsToDisplay.forEach(q => {
        if (!groups[q.categorie_nom]) {
            groups[q.categorie_nom] = {
                code: q.categorie_code,
                questions: []
            };
        }
        groups[q.categorie_nom].questions.push(q);
    });

    // 2. Parcourir chaque groupe pour l'afficher proprement
    for (const [categoryName, groupData] of Object.entries(groups)) {
        const prefixCat = groupData.code.split('_')[0];

        // Si on filtre sur "Tout", on affiche un titre pour chaque section de catégorie
        if (selectedCategory === 'all') {
            const groupTitle = document.createElement('h2');
            groupTitle.className = `category-section-title cat-border-${prefixCat}`;
            groupTitle.innerText = categoryName;
            container.appendChild(groupTitle);
        }

        // Affichage des cartes liées à cette catégorie
        groupData.questions.forEach(q => {
            const card = document.createElement('div');
            card.className = "question-card";
            card.innerHTML = `
                <div class="question-text">${q.texte}</div>
                <div class="card-footer">
                    <span class="badge cat-${prefixCat}">${q.categorie_nom}</span>
                    ${q.vibe ? `<span class="vibe">⚡ ${q.vibe}</span>` : ''}
                </div>
            `;
            container.appendChild(card);
        });
    }
}

// Gérer le changement de catégorie
function filterCategory(cat, element) {
    selectedCategory = cat;
    
    // Toggle de la classe active sur les puces
    document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
    element.classList.add('active');
    
    filterQuestions();
}

// Algorithme combiné Recherche + Catégorie
function filterQuestions() {
    const searchField = document.getElementById('searchBox').value.toLowerCase().trim();

    const filtered = allQuestions.filter(q => {
        const matchesCategory = (selectedCategory === 'all' || q.categorie_code === selectedCategory);
        const matchesSearch = q.texte.toLowerCase().includes(searchField);
        return matchesCategory && matchesSearch;
    });

    renderQuestions(filtered);
}