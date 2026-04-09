import { TaskItem } from './TaskItem.js';

export function TaskList(root, store, initialFilter = 'all'){
  const ul = document.createElement('ul'); ul.className = 'task-list';
  function render(filter = 'all'){
    ul.innerHTML = '';
    const tasks = store.getTasks();
    let filteredTasks;
    if (filter === 'active') {
      filteredTasks = tasks.filter(t => !t.done);
    } else if (filter === 'completed') {
      filteredTasks = tasks.filter(t => t.done);
    } else {
      filteredTasks = tasks;
    }
    filteredTasks.forEach(t=> ul.appendChild(TaskItem(t, store.toggle)));
  }
  store.subscribe(() => render(initialFilter));
  render(initialFilter);
  root.appendChild(ul);
  return { render };
}
