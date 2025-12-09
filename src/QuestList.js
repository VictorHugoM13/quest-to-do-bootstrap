import QuestItem from "./QuestItem";

export default function QuestList(props) {
  return (
    <div className="d-flex flex-column overflow-auto gap-3 w-75">
      {props.quests.map((quest) => {
        return (
          <QuestItem
            key={quest.id}
            quest={quest}
            saveEditQuest={props.saveEditQuest}
            saveConcludedQuest={props.saveConcludedQuest}
          />
        );
      })}
    </div>
  );
}
