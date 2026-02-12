const vm = new Vue({
  el: "#app",
  data: {
    nameInput: "",
    descriptionInput: "",
    toDoList: [],
    completeList: [],
    // categoriesList: ['All'],
    currentPopup: false,
    modalTitle: "Add Task",
    isEditing: false,
    editingIndex: "",
    // categoryInput: '',
    showInput: false,
    searchInput: "",
  },
  methods: {
    //работа с полем ввода
    setTitle(event) {
      //Присваиваем переменной nameInput введенное пользователем значение
      this.nameInput = event.target.value;
    },
    setDescription(event) {
      this.descriptionInput = event.target.value;
    },
    // addNewCategory(){
    //     if(this.categoryInput === '') {return}
    //     this.categoriesList.push({
    //         id: Math.random(),
    //         title: this.categoryInput,
    //     });
    //     this.categoryInput = '';
    // },
    addNewTask() {
      //если пустая строка
      if (this.nameInput === "") {
        return;
      }

      //присваиваем введенное пользователем значение в title элемента из массива toDoList
      this.toDoList.push({
        id: Math.random(),
        title: this.nameInput,
        description: this.descriptionInput,
      });
      this.descriptionInput = "";
      this.nameInput = "";
      // this.currentPopup = false;
      this.closePopup();
      localStorage.toDoList = JSON.stringify(this.toDoList);
    },
    doCheck(index, type) {
      //если у пункта тип "need"
      if (type === "need") {
        //удаляем один пункт из туДу списка
        const completeMask = this.toDoList.splice(index, 1);
        //и вставляем его в массив выполненных задач
        this.completeList.push(...completeMask);
      } else {
        //если нажимаем на чекбокс выполненного пункта, то из массива выполненных задач удаляем один пункт
        const notCompleteMask = this.completeList.splice(index, 1);
        //и вставляем его в массив не выполненных задач
        this.toDoList.push(...notCompleteMask);
      }
      localStorage.toDoList = JSON.stringify(this.toDoList);
      localStorage.completeList = JSON.stringify(this.completeList);
    },
    removeTask(index, type) {
      const list = type === "need" ? this.toDoList : this.completeList;
      list.splice(index, 1);
      localStorage.toDoList = JSON.stringify(this.toDoList);
      localStorage.completeList = JSON.stringify(this.completeList);
    },
    startEditTask(index) {
      this.showPopup("edit");
      // //пишем текущее имя в поле ввода
      // this.nameInput = this.toDoList[index].title;
      // this.descriptionInput = this.toDoList[index].description;
      // this.editingIndex = index;
    },
    setNewData() {
      //проверяем на пустоту
      if (this.nameInput === "") {
        return;
      }

      //присваиваем новое имя
      this.toDoList[this.editingIndex].title = this.nameInput;
      this.toDoList[this.editingIndex].description = this.descriptionInput;

      //очищаем поле ввода
      this.nameInput = "";
      this.descriptionInput = "";
      //и текущий индекс
      this.editingIndex = "";

      //    закрываем модальное окно
      this.closePopup();

      localStorage.toDoList = JSON.stringify(this.toDoList);
    },
    showPopup(action) {
      this.currentPopup = true;
      //добавляем класс к боди
      document.body.style.overflow = "hidden";
      if (action === "edit") {
        this.modalTitle = "Edit Task";
        this.isEditing = true;
        //пишем текущее имя в поле ввода
        this.nameInput = this.toDoList[index].title;
        this.descriptionInput = this.toDoList[index].description;
        this.editingIndex = index;
      } else {
        this.modalTitle = "Add Task";
        this.isEditing = false;
      }
    },
    closePopup() {
      this.currentPopup = false;
      //    удаляем класс у боди
      document.body.style.overflow = "hidden auto";
    },
    toggleMenu(event) {
      const currentMenu = event.target.closest(".task__right").lastChild;
      const isActive = currentMenu.classList.contains("task__menu-active");
      // 1. Сначала закрываем ВСЕ меню
      document
        .querySelectorAll("task__menu-active")
        .forEach((menu) => menu.classList.remove("task__menu-active"));

      // 2. Если текущее меню НЕ было активно — открываем его
      if (!isActive) {
        currentMenu.classList.add("task__menu-active");
      }
    },
  },
  computed: {
    localeDate() {
      return new Date();
    },
    currentDay() {
      let day = this.localeDate.getDay();
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[day] + ",";
    },
    currentNum() {
      let num = this.localeDate.getDate();
      return num > 9 ? num + "th" : " 0" + num + "th";
    },
    currentMonth() {
      let month = this.localeDate.getMonth();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[month];
    },
    filteredTasks() {
      const s = this.searchInput.toLowerCase();
      //фильтруем массив toDoList
      return this.toDoList.filter((n) => {
        if (Object.values(n)[1].toString().toLowerCase().includes(s)) {
          return Object.values(n);
        }
      });
    },
    filteredCompletedTasks() {
      const s = this.searchInput.toLowerCase();
      return this.completeList.filter((n) => {
        if (Object.values(n)[1].toString().toLowerCase().includes(s)) {
          return Object.values(n);
        }
      });
    },
  },
  created() {
    this.intervalId = setInterval(() => (this.date = Date.now()), 1000);
  },
  beforeDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  },
  mounted() {
    if (localStorage.toDoList)
      this.toDoList = JSON.parse(localStorage.toDoList);
    if (localStorage.completeList)
      this.completeList = JSON.parse(localStorage.completeList);
  },
});
