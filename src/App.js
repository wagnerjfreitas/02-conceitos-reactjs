import React from "react";

import "./styles.css";
import api from "./services/api";
import { useState, useEffect } from "react";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      // console.log(response);
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', { 
      title: `Novo repository ${Date.now()}`,
      url: "https://github.com/wagnerjfreitas/02-conceitos-reactjs",
      techs: [
        "dsg",
        "teste"
      ],
    });

    const repository = response.data;
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    /*exibe todos os registros menos aquele cujo id é igual ao id passado por parametro*/
    setRepository(repositories.filter(repository => repository.id !== id));    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
