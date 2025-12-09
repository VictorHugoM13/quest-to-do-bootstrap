export default function QuestList(props) {
  return (
    <div className="d-flex flex-column overflow-auto gap-3 w-75">
      {props.quests.map((quest) => {
        return <p key={quest.id} className="mb-0">{quest.last_saved_at} {quest.title}</p>;
      })}
    </div>
  );
}
