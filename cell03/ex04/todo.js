$(document).ready(function () {

    // Add event listener to "New" button
    $('#newBtn').click(function () {
        var newTask = prompt("Enter a new TO DO:");
        
        // If task is not empty, add it
        if (newTask && newTask.trim() !== "") {
            var taskDiv = $('<div class="todo-item"></div>').text(newTask.trim());
            
            // Click event to remove task
            taskDiv.click(function () {
                if (confirm("Do you want to remove this task?")) {
                    $(this).remove();
                }
            });

            // Add task to the top of the list
            $('#ft_list').prepend(taskDiv);
        }
    });
});
