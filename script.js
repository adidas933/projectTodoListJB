// TODO: Make date and hour at the bottom of task and stick there even when having a scroll bar.
// TODO: make an edit button that can edit a task.
// TODO: when user forgets an input make an alert that the specific input is missing.
// TODO: when clicking the delete button on the task make the tasks list get organize
// TODO: make a transition of 0.3s of creating a task. fade in
// TODO: add a description on the input of time to finish task and also on task itself so it will be more clear what is the time for.
// TODO: when refreshing the unfinished tasks will still be there and the finished ones will be with line thru.
// TODO: design the heading of page with shadows and more
// TODO: use a special font for text and heading
// TODO: the form of inputs and buttons should be centered
// TODO: add a scroller to note task if longer then note
// TODO: make project in github and make a branch for changes and saves

// Variables
const taskInput = document.querySelector('.taskInput');
const dateInput = document.querySelector('.dateInput');
const hourInput = document.querySelector('.hourInput');
const tasksContainer = document.querySelector('.tasksContainer');
const outputsAsArray = getFromStorage(); // the array from LS as variable

// Event listeners

document.addEventListener('DOMContentLoaded', function() { // triggers when page loads
  loadItems(); // creates elements in the objects of the array that are taken from LS
})

document.querySelector('.saveTaskBtn').addEventListener('click', function() {
  isEmpty();
})

document.querySelector('.resetAllBtn').addEventListener('click', function() {
  localStorage.clear();
  location.reload();
})

// Functions

function loadItems() { // for every object in the array triggers the function createElements
  outputsAsArray.forEach(object => {
    createElements(object);
  });
}

function inputEmpty() {
  return (taskInput.value === '' || dateInput.value === '' || hourInput.value === '');
}

function isEmpty() {
  if (inputEmpty()) {
    alert('Please fill all inputs');
  } else {
    let tasksObj = {
      taskContent: taskInput.value,
      date: dateInput.value,
      hour: hourInput.value,
    }
    outputsAsArray.push(tasksObj); 
    createElements(tasksObj);
    addToStorage();
  }
}

function addToStorage() {
  localStorage.setItem('outputsAsArray', JSON.stringify(outputsAsArray));
}

function getFromStorage() {
  return JSON.parse(localStorage.getItem('outputsAsArray')) || []; // convert to array if LC is not empty.
} 

function createObj(tasksObj) { // creates the object of every task note
  return {
    taskContent: tasksObj.taskContent,
    date: tasksObj.date,
    hour: tasksObj.hour,
  }
}

function resetInputs() {
  taskInput.value = '';
  dateInput.value = '';
  hourInput.value = '';
}

function deleteTask(tasksObj, taskVar) { 
  tasksContainer.removeChild(taskVar);
  const index = outputsAsArray.findIndex(obj => obj === tasksObj);
  if (index !== -1) {
    outputsAsArray.splice(index, 1);
    addToStorage();
  }
}

function taskDiv() { // creates a div for every task note
  const taskDivVar = tasksContainer.appendChild(document.createElement('div'));
  taskDivVar.className = 'taskDiv';
  return taskDivVar;
}

function addDeleteButton(taskVar) { // creates a delete button for every task note
  const addDeleteButton = taskVar.appendChild(document.createElement('button'));
  addDeleteButton.innerHTML = '<i class="bi bi-x"></i>';
  addDeleteButton.className = 'deleteBtn';
  return addDeleteButton;
}

function elementCreating(taskVar, input) { // creates task note text.
  const taskPar = document.createElement('p');
  taskPar.className = 'taskPar'
  taskPar.innerText = input;
  taskVar.appendChild(taskPar);
}

function createBottomLine(taskVar, input) {
  const bottomLineDiv = document.createElement('div');
  const bottomLineText = document.createElement('p');
  taskVar.appendChild(bottomLineDiv);
  bottomLineDiv.appendChild(bottomLineText);
  bottomLineText.innerText = input;
  bottomLineDiv.className = 'bottomLineDiv';
}

function createElements(tasksObj) { // creates all elements inside the tasks, object, div, delete button when clicked.
  const taskVar = taskDiv();
  addDeleteButton(taskVar).addEventListener('click', function() {
  deleteTask(tasksObj, taskVar);
});

  createObj(tasksObj);
    elementCreating(taskVar, tasksObj.taskContent);
    createBottomLine(taskVar, tasksObj.date);
    createBottomLine(taskVar, tasksObj.hour);
    resetInputs();
}