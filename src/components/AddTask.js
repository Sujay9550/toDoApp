import useInput from "../hooks/use-input";
import taskSendIcon from "../icons/rocket.png";
const isNotEmpty = (value) => {
  return value.trim() !== "";
};

const AddTask = (props) => {
  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(isNotEmpty);
  const {
    value: dueDate,
    isValid: dueDateIsValid,
    hasError: dueDateHasError,
    valueChangeHandler: dueDateChangeHandler,
    inputBlurHandler: dueDateBlurHandler,
    reset: resetDueDateInput,
  } = useInput(isNotEmpty);
  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(isNotEmpty);
  const {
    value: status,
    isValid: statusIsValid,
    hasError: statusHasError,
    valueChangeHandler: statusChangeHandler,
    inputBlurHandler: statusBlurHandler,
    reset: resetStatusInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (titleIsValid && dueDateIsValid && descriptionIsValid && statusIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const task = {
      title: title,
      dueDate: dueDate,
      description: description,
      status: status,
    };

    props.onSendTask(task);

    resetTitleInput();
    resetDueDateInput();
    resetDescriptionInput();
    resetStatusInput();
  };

  const titleClasses = titleHasError
    ? "form-control title is-invalid"
    : "form-control title";
  const dueDateClasses = dueDateHasError
    ? "form-control duedate is-invalid"
    : "form-control duedate";
  const descriptionClasses = descriptionHasError
    ? "form-control description is-invalid"
    : "form-control description";
  const statusClasses = statusHasError
    ? "form-select status is-invalid"
    : "form-select status";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onBlur={titleBlurHandler}
          onChange={titleChangeHandler}
          className={titleClasses}
          placeholder="Title"
          aria-label="Title"
        />
        {titleHasError && <p className="text-danger">Please enter a title</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Due Date
        </label>
        <input
          type="date"
          id="duedate"
          value={dueDate}
          onBlur={dueDateBlurHandler}
          onChange={dueDateChangeHandler}
          className={dueDateClasses}
          aria-label="Due Date"
        />
        {dueDateHasError && (
          <p className="text-danger">Please enter a due date</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className={descriptionClasses}
          id="description"
          value={description}
          onBlur={descriptionBlurHandler}
          onChange={descriptionChangeHandler}
          placeholder="Description"
          aria-label="Description"
          rows="3"
        ></textarea>
        {descriptionHasError && (
          <p className="text-danger">Please enter a short description</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          className={statusClasses}
          value={status}
          onBlur={statusBlurHandler}
          onChange={statusChangeHandler}
          aria-label="Status"
        >
          <option defaultValue=""></option>
          <option value="Open">Open</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Overdue">Overdue</option>
          <option value="Closed">Closed</option>
        </select>
        {statusHasError && <p className="text-danger">Please enter a status</p>}
      </div>
      <div className="mb-3 text-center d-grid">
        <button className={props.loading ? "btn sent-btn" : "btn add-btn"}>
          {props.loading ? (
            <img className="tasksend-icon" src={taskSendIcon}></img>
          ) : (
            "Add Task"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddTask;
