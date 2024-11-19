import { useState } from "react";

const InputCreate = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = async () => {
    if (!taskTitle.trim()) {
      alert("La tarea no puede estar vacía.");
      return;
    }

    const urlApi = "http://localhost:3000/create"; 
    const payload = { title: taskTitle };

    try {
      const response = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
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
      />
      <button onClick={handleAddTask}>Añadir tarea</button>
    </div>
  );
};

export default InputCreate;
