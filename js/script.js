//codigo para dinamizar nuestra aplicación

//capturamos el evento desde el formulario
document.getElementById('formTask').addEventListener('submit', saveTask);


//función para guardar el evento
function saveTask(e){

	let title = document.getElementById('title').value;
	let description = document.getElementById('description').value;
	//console.log(title, description);
	
	//objeto task
	const task = {
		title,
		description
	}
	//console.log(task);
	//
	
	/*la lógica programada a continuación permitirá:
	en caso de no haber tareas almacenadas capturará los datos desde
	el formulario y las almacenará en localStorage.
	Dependiendo del caso de acuerdo al condicional que sigue*/

	/*condicional que permitirá comprobar si hay tareas almacenadas,
	en caso de que no haya, entonces las convertirá en un objeto JSON 
	y las almacenará*/
	if(localStorage.getItem('tasks') === null){
		let tasks = [];
		tasks.push(task);
		localStorage.setItem('tasks', JSON.stringify(tasks));	
	}
	/*en caso de haber tareas las capturará, las actualizará y las
	volvera a almacenar*/
	else{
		let tasks = JSON.parse(localStorage.getItem('tasks'));
		tasks.push(task);
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}
	
	//creamos y guardamos una tarea, sin
	//necesidad de refrescar manualmente
	getTasks();

	//limpiamos el formulario de manera automatica
	document.getElementById('formTask').reset();

	//evitamos el comportamiento por defecto 
	//de la pagina
	e.preventDefault();
}//cierre de la funcion saveTask


//funcion para mostrar los datos almacenados
function getTasks(){
	var tasks = JSON.parse(localStorage.getItem('tasks'));
	let tasksView = document.getElementById('tasks');

	tasksView.innerHTML = '';

	//ciclo para limpiar
	for(let i = 0; i < tasks.length; i++){
		let title = tasks[i].title;
		let description = tasks[i].description;
		//console.log(tasks[i]);
		//agregamos todas las tareas que esten guardadas
		tasksView.innerHTML += `
		<div class="card mb-3">
			<div class="card-body">
				<p>${title} - ${description}</p>
				<a class="btn btn-danger" onclick="deleteTask('${title}')">Borrar</a>				
			</div>
		</div>
		`
	}
}//cierre de la función getTasks


//funcion borrar
function deleteTask(title){
	let tasks = JSON.parse(localStorage.getItem('tasks'));
	for(let i = 0; i < tasks.length; i++){
		if(tasks[i].title == title){
			tasks.splice(i,1);
		}
	}
	localStorage.setItem('tasks', JSON.stringify(tasks));
	getTasks();
}

getTasks();

//desarrollado por edwar 'eddiemonster' vilchez Ago2020
