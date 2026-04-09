export function TaskItem(task, onToggle){
  const li = document.createElement('li');
  li.className = task.done ? 'completed' : '';
  li.textContent = task.title;
  li.addEventListener('click', () => onToggle(task.id));
  return li;
}
