let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let nbtasktermine=0;
let nbtasktencours=0;



console.log("bienvenue dans ma todo list");

function afficherStats() {
    let nbtasktermine=0;
    let nbtasktencours=0;
    tasks.forEach(task => {
        if (task.terminee) {
            nbtasktermine++;
        } else {
            nbtasktencours++;
        }
    });

    let statsDiv = document.getElementById("stats");
    if (!statsDiv) {
        statsDiv = document.createElement("div");
        statsDiv.id = "stats";
        document.getElementById("app").prepend(statsDiv);
    }


    // Clear old stats before adding updated ones
    statsDiv.innerHTML = "";
    const t = document.createElement("p");
    const e = document.createElement("p");
    t.textContent = "Taches terminées : " + nbtasktermine;
    e.textContent = "Taches en cours : " + nbtasktencours;

    t.id = "done";
    e.id = "pending";
    statsDiv.appendChild(t);
    statsDiv.appendChild(e);

}

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addbtn");
afficherTaches();

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
        
    if (task) {
        
        tasks.push({texte: task, terminee: false});
        taskInput.value = '';
        saveTaskes();
        afficherTaches();
        
    }
}

function afficherTaches() {
    taskList.innerHTML = '';
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    tasks.forEach((task , index) => {
        if (searchInput && !task.texte.toLowerCase().includes(searchInput)) {
            return;
        }
        const li = document.createElement('li');
        li.textContent = task.texte;
        if (task.terminee) {
            li.style.textDecoration = 'line-through';
        }   

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.style.float = 'right';
        deleteBtn.id = 'deleteBtn';
        const terminerBtn = document.createElement('button');
        terminerBtn.textContent = 'Terminer';
        terminerBtn.style.float = 'right';
        terminerBtn.style.marginLeft = '10px';
        terminerBtn.id = 'terminerBtn';

        terminerBtn.onclick = () => terminerTache(index);

        

        deleteBtn.onclick = () => supprimerTache(index);
        

        li.appendChild(terminerBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
    afficherStats();


}    

function terminerTache(index) {
    tasks[index].terminee= true;
    nbtasktencours--;
    nbtasktermine++;
    saveTaskes();
    afficherTaches();
}

function supprimerTache(index) {
    if (tasks[index].terminee) {
        nbtasktermine--;
    } else {
        nbtasktencours--;
    }
    tasks.splice(index, 1);
    saveTaskes();
    afficherTaches();
}
 
function saveTaskes() {
    localStorage.setItem("tasks", JSON.stringify (tasks));
}



addBtn.onclick = addTask;
deleteAll.onclick = () => {
    tasks = [];
    saveTaskes();
    afficherTaches();
}   

document.getElementById('searchInput').addEventListener('input', afficherTaches);


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
