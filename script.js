
// TODO: when refreshing the tasks with line through will stay with the line through style. 
// TODO: why when i make the functions as variables i have bugs?
// TODO: make an edit button that can edit a task.
// TODO: when user forgets an input make an alert that the specific input is missing.
// TODO: when clicking the delete button on the task make the tasks list get organize
// TODO: design the heading of page with shadows and more     
// TODO: use a special font for text and heading
// TODO: make project in github and make a branch for changes and saves
// TODO: make a button to create a test note to appear for testing.

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
// local storage:
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

// create task elements:
function taskDiv() { // creates a div for every task note
  const taskDivVar = tasksContainer.appendChild(document.createElement('div'));
  taskDivVar.className = 'taskDiv';
  return taskDivVar;
}

function elementCreating(taskVar, input) { // creates task note text.
  const taskPar = document.createElement('textarea');
  taskPar.className = 'taskPar'
  taskPar.innerText = input;
  taskPar.setAttribute('readOnly', 'readOnly');
  taskVar.appendChild(taskPar);
}

function createBottomLine(taskVar, input) {
  const bottomLineDiv = document.createElement('div');
  const bottomLineText = document.createElement('p');
  taskVar.appendChild(bottomLineDiv);
  bottomLineDiv.appendChild(bottomLineText);
  bottomLineText.innerText = input;
  bottomLineDiv.className = 'bottomLineDiv';
  bottomLineText.className = 'bottomLineText';
}

// delete button:
function addDeleteButton(taskVar) { // creates a delete button for every task note
  const addDeleteButton = taskVar.appendChild(document.createElement('button'));
  addDeleteButton.className = 'deleteBtn';
  addDeleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  return addDeleteButton;
}

function deleteTask(tasksObj, taskVar) { 
  tasksContainer.removeChild(taskVar);
  const index = outputsAsArray.findIndex(obj => obj === tasksObj);
  if (index !== -1) {
    outputsAsArray.splice(index, 1);
    addToStorage();
  }
}
// mark finished task
function addFinishedTaskBtn(taskVar) {
  const addFinishedTaskBtnVar = taskVar.appendChild(document.createElement('button'));
  addFinishedTaskBtnVar.className = 'markFinishedTask';
  addFinishedTaskBtnVar.innerHTML = '<i class="fa-solid fa-text-slash"></i>';
  return addFinishedTaskBtnVar;
}

function isFinishedTaskMarked(taskVar) {
  return taskVar.children[2].style.textDecoration === 'line-through';
}

function removeLineThrough(taskVar) {
  const taskPar = taskVar.children[2];
  taskPar.style.textDecoration = 'none';
}

function saveStyleToStorage(element) {
  element.style.textDecoration = 'line-through';
}

function markFinishedTask(tasksObj, taskVar) {
  const taskPar = taskVar.children[2];
  taskPar.style.textDecoration = 'line-through';
  saveStyleToStorage(taskPar);
  // const index = outputsAsArray.findIndex(obj => obj === tasksObj);
  // if (index !== -1) {
    // outputsAsArray[index].style.textDecoration = 'line-through';
    // outputsAsArray.splice(index, 1);
    addToStorage();
  }
// }
// main create elements function
function createElements(tasksObj) { // creates all elements inside the tasks, object, div, delete button when clicked.
  const taskVar = taskDiv();
  addDeleteButton(taskVar).addEventListener('click', function() {
    deleteTask(tasksObj, taskVar);
  });

addFinishedTaskBtn(taskVar).addEventListener('click', function() {
  if (isFinishedTaskMarked(taskVar)) {
    removeLineThrough(taskVar);
  } else {
       markFinishedTask(tasksObj, taskVar);
    }
});
    createObj(tasksObj);
    elementCreating(taskVar, tasksObj.taskContent);
    createBottomLine(taskVar, tasksObj.date);
    createBottomLine(taskVar, tasksObj.hour);
    resetInputs();
}