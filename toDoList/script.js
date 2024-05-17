const listOfTasks = document.querySelector(".taskLists");


    function createParentChildTags(){
        const pTag = document.createElement('p');
        const divTag = document.createElement('div');
        const divTag1 = document.createElement('div');
        const inputTag = document.createElement('input');
        const buttonTag = document.createElement('button');
        inputTag.type = 'checkbox';
        return {pTag,inputTag, buttonTag ,divTag1, divTag};
    }

    function addClassName(divTag1, inputTag, buttonTag){
        inputTag.className = "checkBox"
        buttonTag.className = "delete"
        divTag1.className = "task"
    }

    function addId(divTag){
        divTag.id = "actions";
    }

    function saveTasksToLocalStorage(tasks){
        return new Promise((resolve, reject)=>{
            try{
                localStorage.setItem('tasks', JSON.stringify(tasks));
                resolve();
            }catch (error){
                reject(error);
            }
        });
    }
    function getTasksFromLocalStorage(){
        return new Promise((resolve, reject)=>{
            try{
                const  tasks = JSON.parse(localStorage.getItem('tasks'))
                resolve(tasks || []);
            }catch (error){
                reject(error);
            }
        });

    }
document.addEventListener("DOMContentLoaded", async ()=> {
    try{
        const tasks = await  getTasksFromLocalStorage();
        tasks.forEach((task, index)=> createTaskElement(task, index));}
    catch (error){
        console.error("Can't save tasks to local storage")
    }
    const addTask = document.querySelector(".addTask");

    function createTaskElement(inputValue, index) {
        const {divTag1, pTag, divTag, inputTag, buttonTag} = createParentChildTags();
        addClassName(divTag1, inputTag, buttonTag);
        addId(divTag);

        divTag.appendChild(inputTag);
        divTag.appendChild(pTag);

        divTag1.appendChild(divTag);
        divTag1.appendChild(buttonTag);

        pTag.textContent = inputValue;
        buttonTag.textContent = "delete"
        divTag1.dataset.index = index;

        console.log(divTag1)

        listOfTasks.appendChild(divTag1)
    }

    addTask.addEventListener("submit", async (e) => {
        e.preventDefault()
        const inputValue = addTask.querySelector('input',).value.trim();

        if (inputValue) {
            try {
                const tasks = await getTasksFromLocalStorage();
                tasks.push(inputValue);
                await saveTasksToLocalStorage(tasks);
                createTaskElement(inputValue, tasks.length-1);
                addTask.querySelector('input').value = '';
            }catch (error){
                console.error("can't save tasks to local storage")
            }
        }
    });

});
    listOfTasks.addEventListener('click',async(e)=>{
        if(e.target.classList.contains("delete")){
            const taskItem = e.target.closest('.task');
            const taskIndex = taskItem.dataset.index;
            taskItem.remove();
            try{
                let tasks = await getTasksFromLocalStorage();
                tasks.splice(taskIndex, 1)
                await saveTasksToLocalStorage(tasks);
                Array.from(listOfTasks.children).forEach((task, index) => {
                    task.dataset.index = index;
                });
            }catch (error){
                console.error("Error uploading task")
            }
        }
    });
function updateLocalStorage(){
    const tasks = Array.from(listOfTasks.querySelectorAll('.task p')).map(task=> task.textContent);
    localStorage.setItem('task',JSON.stringify(tasks));
}
