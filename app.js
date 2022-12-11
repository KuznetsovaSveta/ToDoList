const vm = new Vue({
    el:"#app",
    data:{
        valueInput: '',
        toDoList: [],
        completeList: [],
    },
    methods:{
        //работа с полем ввода
        handlyInput(event){
            //Присваиваем переменной valueInput введенное пользователем значение
            this.valueInput = event.target.value;
        },
        addNewTask(){
            //если пустая строка
            if(this.valueInput === '') {return}

            //присваиваем введенное пользователем значение в title элемента из массива toDoList
            this.toDoList.push({
                title: this.valueInput,
                id: Math.random(),
            });
            this.valueInput = '';
        },
        doCheck(index, type){
            //если у пункта тип "need"
            if(type === 'need'){
                //удаляем один пункт из туДу списка
                const completeMask = this.toDoList.splice(index, 1);
                //и вставляем его в массив выполненных задач
                this.completeList.push(...completeMask);
            } else{
                //если нажимаем на чекбокс выполненного пункта, то из массива выполненных задач удаляем один пункт
                const notCompleteMask = this.completeList.splice(index, 1);
                //и вставляем его в массив не выполненных задач
                this.toDoList.push(...notCompleteMask);
            }
        },
        removeTask(index, type){
            const list = type === 'need' ? this.toDoList : this.completeList;
            list.splice(index,1);
        }
    }
})