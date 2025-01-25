function showScreen(currentScreen, newScreen) {
    document.querySelector(currentScreen).style.display = 'none';
    document.querySelector(newScreen).style.display = 'block';
    document.querySelector(newScreen).scrollIntoView({behavior: 'smooth', block: 'start'});
    insertName();
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

document.addEventListener('DOMContentLoaded', insertName);


document.addEventListener("DOMContentLoaded", function() { 
    var dialogues = document.querySelectorAll('.thoughtDialogue');
    dialogues.forEach(function(dialogue) { 
        var text = dialogue.innerHTML.trim();
        dialogue.innerHTML = ` <span class="topDialogue"> <img src="media/Thoughts.png" alt="The Mighty Janitor"> <p>The Mighty Janitor (Thought)</p> </span> <p>${text}</p> `;
    }); 
});

document.addEventListener("DOMContentLoaded", function() { 
    var dialogues = document.querySelectorAll('.blunderDialogue');
    dialogues.forEach(function(dialogue) { 
        var text = dialogue.innerHTML.trim();
        dialogue.innerHTML = ` <span class="topDialogue"> <img src="media/Dr. Blunder.png" alt="Dr. Blunder"> <p>Dr. Blunder</p> </span> <p>${text}</p> `;
    }); 
});

document.addEventListener("DOMContentLoaded", function() { 
    var dialogues = document.querySelectorAll('.godDialogue');
    dialogues.forEach(function(dialogue) { 
        var text = dialogue.innerHTML.trim();
        dialogue.innerHTML = ` <span class="topDialogue"> <img src="media/God.png" alt="God"> <p>The Almighty</p> </span> <p>${text}</p> `;
    }); 
});

document.addEventListener("DOMContentLoaded", function() { 
    var dialogues = document.querySelectorAll('.oldManDialogue');
    dialogues.forEach(function(dialogue) { 
        var text = dialogue.innerHTML.trim();
        dialogue.innerHTML = ` <span class="topDialogue"> <img src="media/Old Man.png" alt="Old Man"> <p>The Old Man</p> </span> <p>${text}</p> `;
    }); 
});

document.addEventListener("DOMContentLoaded", function() {
    var dialogues = document.querySelectorAll('.playerDialogue');
    dialogues.forEach(function(dialogue) { 
        var text = dialogue.innerHTML.trim(); 
        dialogue.innerHTML = ` <span class="topDialogue"> <img src="media/Janitor.png" alt="Janitor"> <span class="pName"></span> </span> <p>${text}</p> `; 
    }); 
});

document.addEventListener("DOMContentLoaded", function() { 
    var dialogues = document.querySelectorAll('.puppet1Dialogue');
    dialogues.forEach(function(dialogue) { 
        var text = dialogue.innerHTML.trim();
        dialogue.innerHTML = ` <span class="topDialogue"> <img src="media/Puppet1.png" alt="Puppet 1"> <p>Puppet 1</p> </span> <p>${text}</p> `;
    }); 
});

document.addEventListener("DOMContentLoaded", function() { 
    var dialogues = document.querySelectorAll('.puppet2Dialogue');
    dialogues.forEach(function(dialogue) { 
        var text = dialogue.innerHTML.trim();
        dialogue.innerHTML = ` <span class="topDialogue"> <img src="media/Puppet2.png" alt="Puppet 2"> <p>Puppet 2</p> </span> <p>${text}</p> `;
    }); 
});