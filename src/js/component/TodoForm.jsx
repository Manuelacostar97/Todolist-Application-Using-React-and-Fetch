import React, { useState } from "react";

//create your first component
function TodoForm  ()  {
	const [ tasks, setTasks ] = useState([]);
	const [ newTask, setNewTask ] = useState("");
	const [status, setStatus] = useState(true);	
	
	function pressEnter  (e) {
		if (e.key === 'Enter' && newTask.trim()) {
			console.log('estas presionando enter')
			setStatus(false)
			setTasks([...tasks, newTask])
			setNewTask('')
		}
	}
	function deleteTask  (i) {
        const newTasks= tasks.filter((task, index)=>{
			if (i === index){
				return false
			}
			return true
		})
		if (newTasks.length == 0) {
			setStatus (true)
		}
		setTasks(newTasks)
    }

	const ListTask = tasks.map((todo , index)=>{
						return (
						<li key={index} className="list-group-item d-flex justify-content-between onButton" >
									{todo}
									<button className="btn-close btn-close-dark float-end hideButton" key={index} type="button" onClick={(event) => deleteTask(index)} ></button>
								</li>
						)			
					})

	return (
		<div className=" container">
			<div>

				<h1 className="text-center mt-5">Todo List</h1>
				<input type="text"
					id="inputText"
					className="form-control"
					aria-describedby="todoList"
					placeholder='Escriba una tarea y presione enter.'
					value={newTask}
					onChange={(event) => {setNewTask(event.target.value)}}
					onKeyDown={pressEnter} />
			</div>
			<div className="pt-1 text-center container">
				{status ? (
					<div>
						<h3>No hay tareas, añadir tareas</h3>
					</div>)
					: (
						<div className="container">
							<ul className="p-0 mt-3">
								{ListTask}
							</ul>
							<div className="justify-content-center">You have {tasks.length} pending tasks!</div>
						</div>
					)}
			</div>	
		</div>
	);
};

export default TodoForm;
