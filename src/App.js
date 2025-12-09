import AddQuest from "./AddQuest";
import { useState } from "react";
import QuestList from "./QuestList";

function App() {
  const [quests, setQuests] = useState([]);
  function saveAddQuest(title) {
    let auxQuests = quests;
    let id = 0;
    if (auxQuests.length) {
      id = auxQuests[auxQuests.length - 1].id;
    }
    id++;
    const createdQuest = {
      id: id,
      title: title,
      status: "aberto",
      created_at: new Date(Date.now()).toUTCString(),
      last_saved_at: new Date().toUTCString(),
    };
    auxQuests.push(createdQuest);
    localStorage.setItem("quests", JSON.stringify(auxQuests));
    getQuests();
  }
  function getQuests() {
    setQuests(JSON.parse(window.localStorage.getItem("quests")));
  }
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
       <div className="card w-75 h-75 shadow rounded p-4 d-flex flex-collumn align-items-center gap-3">
        <h1 className="fw-bold text-center">Quest To Do</h1>
        <AddQuest saveAddQuest={saveAddQuest}/>
        <QuestList quests={quests} />
       </div>
    </div>
  );
}

export default App;
