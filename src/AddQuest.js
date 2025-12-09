import { useState } from "react";
function AddQuest(props){
    const [title, setTitle] = useState();
    return (
        <div className="d-flex gap-3 w-100 justify-content-center align-items-center">
            <input
                placeholder="Digite uma Tarefa"
                className="form-control form-control-sm w-75"
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                className="btn btn-success px-3 py-1"
                onClick={() => props.saveAddQuest(title)}
            >
                Cadastrar
            </button>
        </div>
    );
}

export default AddQuest;