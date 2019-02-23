//przygotować aplikację że będzie to podpięte przez backend często wczytywanie do api wrzuca sie do fukncji naywanych serwisami
//bazy danych po stronie przeglądarki
//.localStorage. - mozna wrzucać różne informacje - działa na poziomie przegladarki - zapisuje dane w przeglądarce loklanie - unikalna na poziomie strony
//.sessionStorage. - podobnie jak localStorage ale dane są usuwane po wyjściu ze strony
//mają warości setItem i getItem

document.addEventListener('DOMContentLoaded', function () {
    var taskInput = document.getElementById('taskInput');
    var priorityInput = document.getElementById('priorityInput');
    var addTaskBt = document.getElementById('addTaskButton');
    var removeFinBt = document.getElementById('removeFinishedTasksButton');
    var ul = document.getElementById('taskList');
    var numberOfTask = document.querySelector('.numberOfTask');
    var numberOfActiveTasks = 0;
//usuwanie wszystkich finished task
    removeFinBt.addEventListener('click', function () {
        var allTasks = document.querySelectorAll('#taskList li');
        //completed tasks
        for (var i = 0; i < allTasks.length; i++) {
            if (allTasks[i].className === 'done') {
                allTasks[i].parentElement.removeChild(allTasks[i]);
            }
        }
    });
    
    function deleteTask() {
        var toDelete = this.parentElement;
        toDelete.parentElement.removeChild(toDelete);
        if(this.parentElement.className !== 'done'){
            numberOfActiveTasks--;
            numberOfTask.innerText = "pozostało zadań: " + numberOfActiveTasks;
        }
    }

    function completeTask() {
        var toDone = this.parentElement;
        if (toDone.className !== "done"){
            toDone.classList = "done";
            numberOfActiveTasks--;
            numberOfTask.innerText = "pozostało zadań: " + numberOfActiveTasks;
            return
        }
        if (toDone.className === 'done'){
            toDone.classList.remove("done");
            numberOfActiveTasks++;
            numberOfTask.innerText = "pozostało zadań: " + numberOfActiveTasks;
        }

    }


//funkcja dodawanie zadań
function addNewTasks() {

    var inputValue = taskInput.value;
    var priority = priorityInput.value;

//tworzenie nowych elementów
    var newLi = document.createElement('li');
    var newH1 = document.createElement('h1');
    var newH3 = document.createElement('h3');
    var newDelBt = document.createElement('button');
    newDelBt.addEventListener("click", deleteTask);
    newDelBt.innerText = 'Delete';
    var newComplBt = document.createElement('button');
    newComplBt.addEventListener("click", completeTask);
    newComplBt.innerText = 'Complete';

//dodawanie elementów na początku
    if(inputValue.length > 4 && inputValue.length < 100 && priority >=1 && priority<=10) {
        ul.insertBefore(newLi, ul.children[0]);
        newLi.appendChild(newH1);
        newH1.innerText = inputValue;
        newLi.appendChild(newH3);
        newH3.innerText = priority;
        newLi.appendChild(newDelBt);
        newLi.appendChild(newComplBt);
        taskInput.value = '';
        priorityInput.value = '';
        ++numberOfActiveTasks;
        numberOfTask.innerText = "pozostało zadań: " + numberOfActiveTasks;
    }
}

//dodawanie nowych zadań

    addTaskBt.addEventListener('click', addNewTasks );

    addTaskBt.addEventListener('click', sorting );

 //fucus na inputach
var inputy = document.querySelector(".inputHolder").children;

for (var i=0; i<inputy.length; i++){
    if (i%2 ===0){
        inputy[i].addEventListener("focus", function () {
            this.classList.add('focus');
        })
    }
}

for (var j=0; j<inputy.length; j++){
        if (i%2 ===0){
            inputy[j].addEventListener("focusout", function () {
                this.classList.remove('focus');
            })
        }
}

//sortowanie listy
function sorting() {
    var items = ul.children;
    var itemsArr = [];
    for (var i=0; i<items.length; i++){
            itemsArr.push(items[i]);
    }
    itemsArr.sort(function (a,b) {
        return b.children[1].innerHTML - a.children[1].innerHTML
    });
    for (var j=0; j<itemsArr.length; j++){
        ul.appendChild(itemsArr[j]);
    }
}

});


