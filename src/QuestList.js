// Importa o componente responsável por exibir uma quest individual
import QuestItem from "./QuestItem";

// Exporta o componente QuestList como padrão
export default function QuestList(props) {

  // Retorna o JSX do componente
  return (
    // Div principal que organiza a lista de quests
    // d-flex flex-column → organiza em coluna
    // overflow-auto → adiciona scroll se passar do tamanho
    // gap-3 → espaço entre os itens
    // w-75 → largura de 75%
    <div className="d-flex flex-column overflow-auto gap-3 w-75">

      {/* Percorre o array de quests recebido via props */}
      {props.quests.map((quest) => {

        // Para cada quest, retorna um componente QuestItem
        return (
          <QuestItem
            // Key obrigatória no React para listas (ajuda na performance)
            key={quest.id}

            // Envia o objeto da quest para o componente filho
            quest={quest}

            // Envia a função de editar quest para o componente filho
            saveEditQuest={props.saveEditQuest}

            // Envia a função de concluir quest para o componente filho
            saveConcludedQuest={props.saveConcludedQuest}

            saveDeleteQuest={props.saveDeleteQuest}
          />
        );
      })}
    </div>
  );
}
