document.addEventListener('DOMContentLoaded', function () {
    const listContainer = document.getElementById('ft_list');
    const newBtn = document.getElementById('newBtn');

    // Load tasks from cookie
    loadTasksFromCookie();

    // Add event listener to "New" button
    newBtn.addEventListener('click', function () {
        const newTask = prompt("Enter a new TO DO:");
        
        // If task is not empty, add it
        if (newTask && newTask.trim() !== "") {
            addTask(newTask.trim());
            saveTasksToCookie();
        }
    });

    // Function to add task to the list
    function addTask(taskContent) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('todo-item');
        taskDiv.innerText = taskContent;
        
        // Add event listener to remove the task
        taskDiv.addEventListener('click', function () {
            const confirmRemove = confirm("Do you want to remove this task?");
            if (confirmRemove) {
                taskDiv.remove();
                saveTasksToCookie();  // Update cookie after removal
            }
        });

        // Prepend task to the list (appears at the top)
        listContainer.insertBefore(taskDiv, listContainer.firstChild);
    }

    // Function to save tasks to cookie
    function saveTasksToCookie() {
        const tasks = [];
        const taskDivs = document.querySelectorAll('.todo-item');
        taskDivs.forEach(task => {
            tasks.push(task.innerText);
        });
        document.cookie = "tasks=" + JSON.stringify(tasks) + ";path=/";
    }

    // Function to load tasks from cookie
    function loadTasksFromCookie() {
        const cookie = document.cookie.split(';').find(row => row.startsWith('tasks='));
        if (cookie) {
            const tasks = JSON.parse(cookie.split('=')[1]);
            tasks.forEach(task => {
                addTask(task);
            });
        }
    }
});
