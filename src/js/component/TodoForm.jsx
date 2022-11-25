import React, { useEffect, useState } from "react";

function TodoForm () {	
	const [newTasks, setNewtasks] = useState('')
	const [tasks, setTasks] = useState([])
	const [pending, setPending] = useState(true)
	const [userReady, setUserReady] = useState()
	
	let user = "https://assets.breatheco.de/apis/fake/todos/user/luiss"

	const isUserReady = async () => {
		try {
			let response = await fetch(user)
			if (response.ok) {
				setUserReady(true),
				console.log('User is already created isUserReady')
				const body = await response.json()
				setPending(false)
				setTasks(body)
			}
			else (
				setUserReady(false),
				console.log('User is not created')
			)
		}
		catch {
			error => console.log(error)
		}
	}
	

	const userCreation = async () => {
		try {
			let response = await fetch(user,{
				method: "POST",
				body: JSON.stringify([]),
				headers: {"Content-Type" : "application/json"}
			})
			if (response.ok) {
				console.log('user created succesfully') //should be replaced with GET to get the user's tasks
				setUserReady(true)
			}
			
		} catch (error) {
			console.log(error)			
		}

	}
	

	
	async function submit (event) {
		try {
			if (event.key === 'Enter' && newTasks.trim() !== "") {
				if (tasks.length === 0) {
					setPending(true)
				}
				else {
					setPending(false)
				}
				let body = [...tasks, {"label": newTasks, "done": false}]
				const response = await fetch(user, {
					method: "PUT",
					body: JSON.stringify(body),
					headers: {"Content-Type": "application/json"}
				})
				
				if(response.ok) {
					await isUserReady()
					setNewtasks('')
					return response.json()
				}
				else{
					console.log('Something unexpected happened')
				}
				
			}
		} catch (error) {
			console.log(error)
		}
		
	}

	async function deleteTask (i) {
		const newTask = tasks.filter((task, index) => {
			if (i == index) {
				return false
			}
			return true
		})
			if (newTask.length === 0) {
				deleteUser()
				setPending (true)

		}
			setTasks(newTask)
			
	}

	async function deleteUser () {
		try {
			const response = await fetch (user, {
				method: "DELETE",
				headers: {"Content-Type": "application/json"}
			})
			console.log(response)
			if (response.ok) {
				await userCreation()
				await isUserReady()
			}
		} catch {
			error => console.log(error)
		}
	}

	const ListTasks = tasks.map((task, index) => {
		return (
			<li key={index} className="list-group-item d-flex justify-content-between onButton" >
				{task.label}
				<button className="btn-close btn-close-dark float-end hideButton" key={index} type="button" onClick={(event) => deleteTask(index)} ></button>
			</li>
		)
	})

	useEffect(() => {
		if (userReady === false) {
		userCreation()
	}}, [userReady])

	useEffect(() => {
		isUserReady()
	}, [])
	
	
	return (
		<div className="container-fluid">  
			<div> 
				<div>
					<h1 className="text-center mt-5">Todo List</h1>
				</div>
				<div>
					<input type="text"
					className="form-control"
					id="taskMaker"
					placeholder="Escriba una tarea y presione enter."
					onChange={(event) => {
						setNewtasks(event.target.value)
					}}
					onKeyDown={submit}
					value={newTasks}/>
					
				</div>
				<div className="pt-1 text-center container">
					{pending ? (
						<div>
							No ha creado ninguna tarea.
						</div>) : (
							<div className="container">
								<ul className="p-0 mt-3">
									{ListTasks}
								</ul>
								<div className="justify-content-center"> Te quedan {tasks.length} disponibles.</div>	
							</div>			
						)}
				</div>
			</div>			 
		</div>
	)
	
}

export default TodoForm;
