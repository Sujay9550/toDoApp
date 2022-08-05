import editIcon from "../icons/edit.png";
import deleteIcon from "../icons/delete.png";

const Task = (props) => {
  let badgeClass = "badge rounded-pill";

  const status = `${props.status}`;

  switch (status) {
    case "Open":
      badgeClass = "badge primary-badge rounded-pill";
      break;

    case "In-Progress":
      badgeClass = "badge warning-badge rounded-pill";
      break;

    case "Pending Review":
      badgeClass = "badge secondary-badge rounded-pill";
      break;

    case "Overdue":
      badgeClass = "badge danger-badge rounded-pill";
      break;

    case "Closed":
      badgeClass = "badge success-badge rounded-pill";
      break;
  }

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <tr key={props.id}>
      <td>{props.title}</td>
      <td>{props.dueDate}</td>
      <td>{props.description}</td>
      <td>
        <span className={badgeClass}>{props.status}</span>
      </td>
      <td>
        <div className="d-flex justify-content-around">
          <img className="edit-icon" src={editIcon} />
          <img
            className="delete-icon"
            src={deleteIcon}
            onClick={deleteHandler}
          />
        </div>
      </td>
    </tr>
  );
};

export default Task;
