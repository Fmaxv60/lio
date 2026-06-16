let questions = [];
let currentCategory = 'all';
// Objet pour stocker les questions déjà posées par catégorie
let history = { 'all': [] }; 

// Chargement du fichier JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        // Initialise l'historique pour chaque catégorie unique présente dans le JSON
        questions.forEach(q => {
            if (!history[q.categorie_code]) {
                history[q.categorie_code] = [];
            }
        });
    })
    .catch(err => {
        console.error("Erreur de chargement du JSON.");
    });

function setCategory(cat) {
    currentCategory = cat;
    
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Correction pour s'assurer que event.target fonctionne bien
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    } else if (event && event.target) {
        event.target.classList.add('active');
    }
}

function drawQuestion() {
    const box = document.getElementById('displayBox');
    
    // 1. Filtrage initial de la catégorie
    let filtered = currentCategory === 'all' 
        ? questions 
        : questions.filter(q => q.categorie_code === currentCategory);

    if (filtered.length === 0) {
        alert("Aucune question trouvée pour cette catégorie.");
        return;
    }

    // 2. Exclure les questions déjà posées dans cette catégorie
    let availableQuestions = filtered.filter(q => !history[currentCategory].includes(q.texte));

    // 3. Si toutes les questions ont été vues, on réinitialise l'historique de cette catégorie
    if (availableQuestions.length === 0) {
        history[currentCategory] = [];
        availableQuestions = filtered; // On recharge la liste complète
        console.log(`Historique réinitialisé pour la catégorie : ${currentCategory}`);
    }

    // 4. Sélection aléatoire parmi les questions restantes (sans doublons possibles)
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    // 5. Ajouter la question à l'historique pour ne plus la revoir
    history[currentCategory].push(selectedQuestion.texte);

    // --- Affichage et animations ---
    box.classList.add('pop');
    
    const badge = document.getElementById('badge');
    const qText = document.getElementById('questionText');
    const vText = document.getElementById('vibeText');

    badge.style.display = "inline-block";
    qText.innerText = selectedQuestion.texte;
    badge.innerText = selectedQuestion.categorie_nom;
    vText.innerText = selectedQuestion.vibe ? "⚡ " + selectedQuestion.vibe : "";

    // Update couleur du badge
    badge.className = "badge";
    badge.classList.add('cat-' + selectedQuestion.categorie_code.split('_')[0]);

    // Retire l'effet de pop juste après l'animation
    setTimeout(() => {
        box.classList.remove('pop');
    }, 100);
}

// Fonction pour afficher/masquer le formulaire
function toggleSuggestionForm() {
    const form = document.getElementById('suggestionForm');
    const btn = document.getElementById('toggleFormBtn');
    
    if (form.classList.contains('hidden')) {
        form.classList.remove('hidden');
        btn.innerText = "Fermer le formulaire ❌";
    } else {
        form.classList.add('hidden');
        btn.innerText = "Proposer une question 💡";
    }
}

// Fonction qui intercepte la soumission du formulaire HTML
function handleFormSubmit(event) {
    event.preventDefault(); // Empêche la page de se recharger
    
    const texteQuestion = document.getElementById('suggestInput').value;
    const categorie = document.getElementById('suggestCategory').value;
    
    // Appel de ta fonction Discord
    envoyerADiscord(texteQuestion, categorie);
}

// Ta fonction Discord adaptée (Remplace bien l'URL par ton Webhook)
function envoyerADiscord(texteQuestion, categorie) {
    // On appelle notre propre API Vercel à la place de Discord directement
    fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texteQuestion, categorie })
    })
    .then(response => {
        if (!response.ok) throw new Error();
        document.getElementById('suggestionForm').reset();
        toggleSuggestionForm();
    })
    .catch((err) => {
        console.error(err);
        alert("Erreur lors de l'envoi. Réessaye plus tard !");
    });
}