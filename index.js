let globalId = 0;
const API_URL = 'https://node-app-jl2h.onrender.com/tasks';
function onAddTaskButtonClicked(e){
    console.log(e);
    const el = e.target;
    postDataToDb();
    addNewInputBlock()
}
async function postDataToDb() {
  const type = document.getElementsByClassName('taskType')[0].value;
  const deadline = document.getElementsByClassName('taskTime')[0].value;
 const taskpriority = document.getElementsByClassName('priority')[0].value;
 const done = 'done';
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, deadline ,taskpriority,done})
    });

    const data = await res.json();
    console.log(data);
    fetchTasks();
  } catch (error) {
    console.error('Error posting task:', error);
  }
}


async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    document.getElementById('taskList').innerHTML = '';
    let sortedArray = [];
   tasks.forEach((e)=>{
    sortedArray.push(e);
  //  addTask(e.type,e.deadline,e.taskpriority,e._id,e.done)
   })
   sortedArray = sortPrioirty(sortedArray);
   sortedArray.forEach((e)=>{
    addTask(e.type,e.deadline,e.taskpriority,e._id,e.done)
   })

    console.log(tasks);
    console.log(sortedArray);
}

function sortPrioirty(tasks){
  tasks.sort((a, b) => {
  // Sort by priority (ascending)  
  if (a.done === "undone" && b.done !== "undone") return 1;
  if (a.done !== "undone" && b.done === "undone") return -1;
  const priorityA = parseInt(a.taskpriority);
  const priorityB = parseInt(b.taskpriority);
  if (priorityA !== priorityB) return priorityA - priorityB;

  // Sort by deadline (earlier first)
  const [monthA, dayA] = a.deadline.trim().split('-').map(Number);
  const [monthB, dayB] = b.deadline.trim().split('-').map(Number);

  if (monthA !== monthB) return monthA - monthB;
  return dayA - dayB;
});
return tasks;
}

fetchTasks();
addNewInputBlock();
function addNewInputBlock() {
    document.querySelectorAll('#inputContainer').forEach(container => {
  container.querySelectorAll('div').forEach(childDiv => {
    container.removeChild(childDiv);
  });
});

  const container = document.getElementById('inputContainer');
  const div = document.createElement('div');
  div.className = 'task-input';
  div.id = globalId;
  const inputType = document.createElement('input');
  inputType.className = 'taskType';
  inputType.placeholder = 'Task Type';
  const Priorty = document.createElement('input');
  Priorty.className = 'priority';
  Priorty.placeholder = 'level of priority';
  const inputTime = document.createElement('input');
  inputTime.className = 'taskTime';
  inputTime.placeholder = 'dd-mm';
  div.appendChild(inputType);
  div.appendChild(inputTime);
  div.appendChild(Priorty);
  
  container.appendChild(div);
  globalId++;
}


window.onAddTaskButtonClicked = onAddTaskButtonClicked;
console.log(document.getElementById('taskType'))


// function addTask(description, priority, date) {
    
//   const li = document.createElement('li');

//   const descDiv = document.createElement('div');
//   descDiv.className = 'taskDiscription';
//   descDiv.textContent = description;

//   const priorityDiv = document.createElement('div');
//   priorityDiv.className = 'taskpriority';
//   priorityDiv.textContent = priority;

//   const dateDiv = document.createElement('div');
//   dateDiv.className = 'datelast';
//   dateDiv.textContent = date;

//   const editDiv = document.createElement('div');
//   editDiv.className = 'editButton';
//   editDiv.textContent = 'edit';

//   li.appendChild(descDiv);
//   li.appendChild(priorityDiv);
//   li.appendChild(dateDiv);
//   li.appendChild(editDiv);

//   document.getElementById('taskList').appendChild(li);
// }
let taskCount = 0;
fixedc();
function fixedc() {
  

  const li = document.createElement('li');

  const serialDiv = document.createElement('div');
  serialDiv.className = 'serialNumber';
  serialDiv.textContent = 'Task Count';

  const descDiv = document.createElement('input');
  descDiv.className = 'taskDiscription';
  descDiv.value = 'Task Discription';

  const priorityDiv = document.createElement('input');
  priorityDiv.className = 'taskpriority';
  priorityDiv.value = 'Task priority';

  const dateDiv = document.createElement('input');
  dateDiv.className = 'datelast';
  dateDiv.value = 'date';

  const editDiv = document.createElement('div');
  editDiv.className = 'editButton';
  editDiv.textContent = 'edit';



  const doneDiv = document.createElement('div');
  doneDiv.className = 'doneButton';
  doneDiv.textContent = 'done';




const delet = document.createElement('div');
  delet.className = 'deleteButton';
  delet.textContent = 'delete';

  
  li.appendChild(serialDiv);
  li.appendChild(descDiv);
  li.appendChild(priorityDiv);
  li.appendChild(dateDiv);
  li.appendChild(editDiv);
  li.appendChild(doneDiv);
  li.appendChild(delet);
document.getElementById('taskListper').appendChild(li);
}


function addTask(description, priority, date,id,done) {
  taskCount++;

  const li = document.createElement('li');

  const serialDiv = document.createElement('div');
  serialDiv.className = 'serialNumber';
  serialDiv.textContent = taskCount;

  const descDiv = document.createElement('input');
  descDiv.className = 'taskDiscription';
  descDiv.value = description;

  const priorityDiv = document.createElement('input');
  priorityDiv.className = 'taskpriority';
  priorityDiv.value = priority;

  const dateDiv = document.createElement('input');
  dateDiv.className = 'datelast';
  dateDiv.value = date;

  const editDiv = document.createElement('div');
  editDiv.className = 'editButton';
  editDiv.textContent = 'edit';
  editDiv.id = id
  editDiv.onclick = function(event) {
  editTask(event); // or pass parameters if needed
};

  const doneDiv = document.createElement('div');
  doneDiv.className = 'doneButton';
  doneDiv.textContent = done;
  doneDiv.id = id;
doneDiv.onclick = function(event) {
  editTask(event); // or pass parameters if needed
};


const delet = document.createElement('div');
  delet.className = 'deleteButton';
  delet.textContent = 'delete';
  delet.id = id;
delet.onclick = function(event) {
  deleteTask(id); // or pass parameters if needed
};

  
console.log(done);
console.log(descDiv);
toggledone(doneDiv);
if(done == 'done'){
    descDiv.classList.add('done');
}else {descDiv.classList.remove('done');descDiv.classList.add('taskDone');}

  li.appendChild(serialDiv);
  li.appendChild(descDiv);
  li.appendChild(priorityDiv);
  li.appendChild(dateDiv);
  li.appendChild(editDiv);
  li.appendChild(doneDiv);
  li.appendChild(delet);

  document.getElementById('taskList').appendChild(li);
}
function toggledone(doneDiv){
      doneDiv.addEventListener('click', (event) => {
        const descDiv = event.target;
        console.log(descDiv);
    descDiv.parentElement.childNodes[1].classList.toggle('taskDone'); 
    doneDiv.textContent = descDiv.classList.contains('taskDone') ? 'undo' : 'done'; 
  });

}

async function deleteTask(id) {
  const confirmDelete = confirm('Are you sure you want to delete this task?');
  if (!confirmDelete) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    const data = await res.json();
    console.log(data.message);
    fetchTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

async function editTask(event) {
    const element = event.target;
    console.log(element);
    let id = element.id
      const type = element.parentElement.getElementsByClassName('taskDiscription')[0].value;
     const taskpriority  = element.parentElement.getElementsByClassName('datelast')[0].value;
    const  deadline = element.parentElement.getElementsByClassName('taskpriority')[0].value;
    let done = element.parentElement.getElementsByClassName('doneButton')[0].innerHTML;
    if(element.className != 'editButton'){
    if(done=='done' ) done = 'undone'
    else done = 'done'
    }

 console.log(type,deadline,taskpriority,done)
  if (element.id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, deadline,taskpriority,done})
    });
    fetchTasks();
  }
}

