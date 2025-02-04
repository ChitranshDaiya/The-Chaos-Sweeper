window.onload = function() {
    insertName();

    var paragraphs = document.querySelectorAll('p:not(.thoughtDialogue p, .playerDialogue p, .blunderDialogue p, .godDialogue p, .oldManDialogue p, .puppet1Dialogue p, .puppet1Dialogue p)');
    paragraphs.forEach(function(paragraph) { 
        paragraph.classList.add('storyText');
    });

    function applyDialogueStyling(dialogueClass, imagePath, label) {
        var dialogues = document.querySelectorAll(dialogueClass);
        dialogues.forEach(function(dialogue) { 
            var text = dialogue.innerHTML.trim();
            dialogue.innerHTML = `<span class="topDialogue"><img src="${imagePath}" alt="${label}"><p>${label}</p></span><p>${text}</p>`;
        });
    }

    // Applying dialogue styling to each class
    applyDialogueStyling('.blunderDialogue', 'media/Dr. Blunder.png', 'Dr. Blunder');
    applyDialogueStyling('.thoughtDialogue', 'media/Thoughts.png', 'The Mighty Janitor (Thought)');
    applyDialogueStyling('.godDialogue', 'media/God.png', 'The Almighty');
    applyDialogueStyling('.oldManDialogue', 'media/Old Man.png', 'The Old Man');
    applyDialogueStyling('.playerDialogue', 'media/Janitor.png', `<span class = 'pName'></span>`);
    applyDialogueStyling('.puppet1Dialogue', 'media/Puppet1.png', 'Puppet 1');
    applyDialogueStyling('.puppet2Dialogue', 'media/Puppet2.png', 'Puppet 2');
};

function insertName() {
    const playerName = document.getElementById('pName')?.value;
    if (playerName) {
        localStorage.setItem('playerName', playerName);
    }

    const storedName = localStorage.getItem('playerName') || 'Player';
    document.querySelectorAll('.pName').forEach(element => {
        element.textContent = storedName;
    });
}

function showScreen(currentScreen, newScreen) {
    document.querySelector(currentScreen).style.display = 'none';
    document.querySelector(newScreen).style.display = 'block';
    document.querySelector(newScreen).scrollIntoView({behavior: 'smooth', block: 'start'});
    insertName();
};
