import { useState } from "react"; // importa o hook useState do React para criar estados locais no componente

export default function QuestItem(props) { // define e exporta o componente funcional QuestItem que recebe `props`
  const [title, setTitle] = useState(props.quest.title); // estado local `title` inicializado com o título da quest passada via props
  const [checked, setChecked] = useState(false); // estado local `checked` (checkbox visual) inicializado como false
  const [editMode, setEditMode] = useState(false); // estado local `editMode` controla se o item está em modo de edição

  const concluded = props.quest.status === "concluído"; // variável booleana que indica se a quest já está concluída (compara o status)

  return (
    // container principal do item com classes Bootstrap para layout e estilo
    <div className="d-flex flex-column flex-md-row gap-3 align-items-center p-2 border rounded">
      {/* CONTEÚDO PRINCIPAL */}
      {/* área que contém checkbox + título (ou input de edição) */}
      <div className="d-flex gap-3 align-items-center w-100">
        <input
          disabled={concluded} // desabilita o checkbox se a tarefa já estiver concluída
          type="checkbox" // tipo do input
          checked={checked} // controla o estado visual do checkbox com a variável `checked`
          className="form-check-input" // classe bootstrap para checkbox
          onChange={() => { // evento chamado quando o usuário clica no checkbox
            if (concluded) return; // se já concluída, não faz nada
            setChecked(!checked); // inverte o estado `checked` para refletir visualmente a alteração
            props.saveConcludedQuest(props.quest); // chama a função passada via props para salvar/atualizar o estado real da quest (no pai)
          }}
        />

        {editMode && !concluded ? ( // se estiver em modo de edição e a quest não estiver concluída, mostra um input editável
          <input
            placeholder="quest" // texto placeholder no input
            defaultValue={title} // valor inicial do input (não-controlado) vindo do estado `title`
            onChange={(e) => setTitle(e.target.value)} // atualiza o estado `title` sempre que o usuário digita algo
            className="form-control w-100" // classes bootstrap para estilizar o input
          />
        ) : ( // caso contrário (não editando OU concluído), mostra o título como texto
          <p className={`m-0 ${concluded ? "text-decoration-line-through" : ""}`}>
            {props.quest.title} {/* exibe o título atual da quest vindo das props */}
          </p>
        )}
      </div>

      {/* BOTÕES */}
      {!concluded && ( // se a quest NÃO estiver concluída, renderiza os botões (não aparece para itens concluídos)
        <div className="d-flex gap-3 justify-content-center w-100 w-md-auto">
          <button
            className="btn btn-primary btn-sm" // estilo bootstrap para o botão
            onClick={() => { // ação ao clicar no botão Editar / Salvar
              if (editMode) props.saveEditQuest(props.quest, title); // se já estava em editMode, salva a edição chamando função do pai com (quest, novoTitle)
              setEditMode(!editMode); // alterna o modo de edição (se estava editando, fecha; se não, entra em edição)
            }}
          >
            {editMode ? "Salvar" : "Editar"} {/* muda o texto do botão conforme o modo */}
          </button>

          <button className="btn btn-danger btn-sm">
            Excluir {/* botão Excluir — atualmente sem onClick, precisa implementar a ação no futuro */}
          </button>
        </div>
      )}
    </div>
  );
}
