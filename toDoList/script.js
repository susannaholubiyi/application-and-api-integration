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
document.addEventListener("DOMContentLoaded", ()=> {
    const addTask = document.querySelector(".addTask");

    addTask.addEventListener("submit", (e) => {
        e.preventDefault()
        const inputValue = addTask.querySelector('input',).value.trim();

        if (inputValue) {
            const {divTag1, pTag, divTag, inputTag, buttonTag} = createParentChildTags();
            addClassName(divTag1, inputTag, buttonTag);
            addId(divTag);

            divTag.appendChild(inputTag);
            divTag.appendChild(buttonTag);

            divTag1.appendChild(pTag);
            divTag1.appendChild(divTag);

            pTag.textContent = inputValue;
            buttonTag.textContent = "delete"

            console.log(divTag1)

            listOfTasks.appendChild(divTag1)
            addTask.querySelector('input').value = '';
        }
    });
});