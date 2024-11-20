import { useState } from "react";

const InputCreate = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [createdTask, setCreatedTask] = useState("");
  const urlApi = import.meta.env.VITE_APP_API_URL+'create'; 

  const handleAddTask = async () => {
    if (!taskTitle.trim()) {
      alert("La tarea no puede estar vacía.");
      return;
    }

    const payload = { title: taskTitle };

    try {
      //Con Axios
      //const response = await axios.post(urlApiCreate, payload)
      //setCreatedtask(`Success', ${response.data.title}`)
      //setTitle('')

      const response = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json()
        setCreatedTask(`Se ha agregado la tarea: ${data.title}`)
        setTaskTitle(""); 
      }

    } catch (error) {
      console.error("Error al añadir tarea:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Escribe una nueva tarea"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        required
      />
      <button onClick={handleAddTask}>Añadir tarea</button>
      {createdTask && <p>{createdTask}</p>}
    </div>
  );
};

export default InputCreate;


