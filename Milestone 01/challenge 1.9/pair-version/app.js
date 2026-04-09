import { createStore } from './src/store.js';
import { TaskList } from './src/components/TaskList.js';

const root = document.getElementById('root');
const container = document.createElement('div'); container.className='app';
container.innerHTML = `
  <h1>Pair Task Manager</h1>
  <div>
    <input id="title" placeholder="Task title" />
    <button id="add">Add</button>
  </div>
  <div class="filters">
    <button id="filter-all" class="active">All</button>
    <button id="filter-active">Active</button>
    <button id="filter-completed">Completed</button>
  </div>
  <div id="list-root"></div>
  <div id="count"></div>
`;
root.appendChild(container);

const store = createStore();
const listRoot = document.getElementById('list-root');
const countEl = document.getElementById('count');
let currentFilter = 'all';

function updateCount() {
  const tasks = store.getTasks();
  const remaining = tasks.filter(t => !t.done).length;
  countEl.textContent = `${remaining} tasks remaining`;
}

const taskList = TaskList(listRoot, store, currentFilter);

store.subscribe(() => {
  taskList.render(currentFilter);
  updateCount();
});

document.getElementById('add').addEventListener('click', ()=>{
  const v = document.getElementById('title').value.trim();
  if(!v) return;
  store.add(v); document.getElementById('title').value='';
});

document.getElementById('title').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('add').click();
  }
});

document.getElementById('filter-all').addEventListener('click', () => {
  setFilter('all');
});
document.getElementById('filter-active').addEventListener('click', () => {
  setFilter('active');
});
document.getElementById('filter-completed').addEventListener('click', () => {
  setFilter('completed');
});

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`filter-${filter}`).classList.add('active');
  taskList.render(filter);
}

updateCount();
