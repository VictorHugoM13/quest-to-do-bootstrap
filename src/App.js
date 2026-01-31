// Importa o componente responsável por adicionar novas quests
import AddQuest from "./AddQuest";

// Importa o hook useState do React para controlar estado
import { useState } from "react";

// Importa o componente que lista as quests
import QuestList from "./QuestList";

function App() {

  // Busca as quests salvas no localStorage
  // Se não existir nada, retorna um array vazio
  const localQuests = JSON.parse(window.localStorage.getItem("quests")) || [];

  // Cria o estado 'quests', inicialmente vazio
  const [quests, setQuests] = useState([]);

  // Função responsável por salvar a edição de uma quest
  function saveEditQuest(quest, title){

    // Cria uma variável auxiliar apontando para o estado atual
    let auxQuests = quests;

    // Cria um novo objeto com os dados editados
    const editedQuest = {
      id: quest.id, // mantém o mesmo id
      title: title || quest.title, // usa o novo título ou mantém o antigo
      status: quest.status, // mantém o status atual
      created_at: quest.created_at, // mantém a data de criação
    };

    // Procura a posição da quest pelo id
    const findQuestPosition = auxQuests.findIndex(
      (quest) => quest.id === editedQuest.id
    );

    // Substitui a quest antiga pela nova versão editada
    auxQuests.splice(findQuestPosition, 1, editedQuest);

    // Salva o array atualizado no localStorage
    localStorage.setItem("quests", JSON.stringify(auxQuests));

    // Atualiza o estado com os dados do localStorage
    getQuests();
  }

  // Função responsável por marcar uma quest como concluída
  function saveConcludedQuest(quest) {

    // Cria uma variável auxiliar com as quests atuais
    let auxQuests = quests;

    // Cria um novo objeto com status "concluído"
    const editedQuest = {
      id: quest.id,
      title: quest.title,
      status: "concluído",
      created_at: quest.created_at,
    };

    // Encontra a posição da quest no array
    const findQuestPosition = auxQuests.findIndex(
      (quest) => quest.id === editedQuest.id
    );

    // Substitui a quest antiga pela versão concluída
    auxQuests.splice(findQuestPosition, 1, editedQuest);

    // Atualiza o localStorage
    localStorage.setItem("quests", JSON.stringify(auxQuests));

    // Atualiza o estado
    getQuests();
  }
  
  // Função responsável por adicionar uma nova quest
  function saveAddQuest(title) {

    // Cria uma cópia do array de quests
    let auxQuests = [...quests];

    // Inicializa o id
    let id = 0;

    // Se já existir alguma quest
    if (auxQuests.length) {
      // Pega o id da última quest
      id = auxQuests[auxQuests.length - 1].id;
    }

    // Incrementa o id
    id++;

    // Cria o objeto da nova quest
    const createdQuest = {
      id: id,
      title: title,
      status: "aberto",
      created_at: new Date(Date.now()).toUTCString(), // data de criação
      last_saved: new Date().toUTCString(), // última data de salvamento
    };

    // Adiciona a nova quest ao array
    auxQuests.push(createdQuest);

    // Salva no localStorage
    localStorage.setItem("quests", JSON.stringify(auxQuests));

    // Atualiza o estado
    getQuests();
  }

  // Função que busca as quests do localStorage e atualiza o estado
  function getQuests() {
    setQuests(JSON.parse(window.localStorage.getItem("quests")));
  }

  function saveDeleteQuest(quest) {

    // Cria uma cópia do array de quests
    let auxQuests = [...quests];

    // Remove a quest cujo id é igual ao da quest recebida
    auxQuests = auxQuests.filter(
    (q) => q.id !== quest.id
    );

    // Atualiza o localStorage
    localStorage.setItem("quests", JSON.stringify(auxQuests));

    // Atualiza o estado
    getQuests();
  }


  // Filtra apenas as quests concluídas
  const concludedQuests = quests.filter(
    (quest) => quest.status === "concluído"
  );

  // Filtra apenas as quests abertas
  const notConcludedQuests = quests.filter(
    (quest) => quest.status === "aberto"
  );

  // JSX que renderiza a interface
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="card w-75 w-lg-50 h-75 shadow rounded p-4 d-flex flex-column align-items-center gap-4">
        
        {/* Título da aplicação */}
        <h1 className="fw-bold text-center display-4">
          Quests To Do
        </h1>

        {/* Componente para adicionar novas quests */}
        <AddQuest saveAddQuest={saveAddQuest} />

        {/* Lista de quests abertas */}
        <div className="d-flex flex-column gap-3 w-100 align-items-center">
          <h2>Abertas</h2>
          <QuestList
            quests={notConcludedQuests}
            saveEditQuest={saveEditQuest}
            saveConcludedQuest={saveConcludedQuest}
            saveDeleteQuest={saveDeleteQuest}
          />
        </div>

        {/* Lista de quests concluídas */}
        <div className="d-flex flex-column gap-3 w-100 align-items-center">
          <h2>Concluídas</h2>
          <QuestList
            quests={concludedQuests}
            saveEditQuest={saveEditQuest}
            saveConcludedQuest={saveConcludedQuest}
            saveDeleteQuest={saveDeleteQuest}
          />
        </div>

      </div>
    </div>
  );
}

// Exporta o componente App
export default App;
