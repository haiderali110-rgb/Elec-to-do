const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');
let tasks = [];


window.api.getTasks().then(data => {
    tasks = data;
    render();
});

function render() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `flex items-center justify-between p-3 rounded-lg border ${task.completed ? 'bg-gray-50' : 'bg-white shadow-sm'}`;
        
        li.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggle(${index})" class="w-4 h-4 accent-indigo-600">
                <span class="${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}">${task.text}</span>
            </div>
            <button onclick="remove(${index})" class="text-red-400 hover:text-red-600">Delete</button>
        `;
        list.appendChild(li);
    });
    
    window.api.saveTasks(tasks);
}

addBtn.onclick = () => {
    if (!input.value.trim()) return;
    tasks.push({ text: input.value, completed: false });
    input.value = '';
    render();
};


window.toggle = (index) => {
    tasks[index].completed = !tasks[index].completed;
    render();
};

window.remove = (index) => {
    tasks.splice(index, 1);
    render();
};
