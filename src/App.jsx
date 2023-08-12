import { useEffect, useState } from "react";

function App() {
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]);
  const [edit, setEdit] = useState({});
  const [message, setMessage] = useState("");

  const genereteId = () => Date.now();

  const removeActivity = (activityId) => {
    console.log("activiy has been removed with id ", activityId);
    const filterActivities = activities.filter(
      (activity) => activity.id !== activityId
    );

    console.table(filterActivities);
    setActivities(filterActivities);

    if (edit.id) cancelEdit();
  };

  const editActivity = (activity) => {
    console.log(activity);

    setActivity(activity.activity);
    setEdit(activity);
  };

  const cancelEdit = () => {
    setEdit({});
    setActivity("");
  };

  const doneActivity = (activity) => {
    console.log("done activity");
    console.table(activity)

    const updateActivity = {
      ...activity,
      done: activity.done ? false : true,
    };

    const editActivityIndex = activities.findIndex(
      (currentActivity) => currentActivity.id === activity.id
    );

    const updateActivities = [...activities];
    updateActivities[editActivityIndex] = updateActivity;

    console.log(updateActivity);
    setActivities(updateActivities);
  };

  const submitForm = (e) => {
    e.preventDefault();

    console.log("form submit activity");

    if (!activity) {
      return setMessage("activity is required");
    }

    setMessage("");

    if (edit.id) {
      console.log("update form");

      const updateActivity = {
        ...edit,
        activity
      };

      console.log(updateActivity);

      const editActivityIndex = activities.findIndex(
        (activity) => activity.id === updateActivity.id
      );

      const updateActivities = [...activities];
      updateActivities[editActivityIndex] = updateActivity;

      setActivities(updateActivities);

      return cancelEdit();
    }

    // spread operator
    setActivities([
      ...activities,
      {
        id: genereteId(),
        activity,
        done: false,
      },
    ]);

    console.log(activities);
    setActivity("");
  };

  return (
    <>
      <h1>Todo Lists</h1>

      <div>
        {message && (
          <span
            style={{
              color: "red",
            }}
          >
            {message}
          </span>
        )}
        <form onSubmit={submitForm}>
          <div>
            <input
              type="text"
              name="activiy"
              id="activity"
              placeholder="write your activity"
              value={activity}
              onChange={(e) => {
                setActivity(e.target.value);
              }}
            />
          </div>
          <button type="submit">{edit.id ? "Update" : "Save"}</button>
          {edit.id && <button onClick={cancelEdit}>Cancel</button>}
        </form>
      </div>

      <div>
        {activities.length > 0 ? (
          <ul>
            {activities.map((active) => (
              <li key={active.id}>
                <input
                  type="checkbox"
                  name="done"
                  id="done"
                  checked={active.done}
                  onChange={doneActivity.bind(this, active)}
                />
                {active.activity}({active.done ? 'Selesai' : 'Not yet'})
                <button onClick={editActivity.bind(this, active)}>Edit</button>
                <button onClick={removeActivity.bind(this, active.id)}>
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <span>No activities</span>
        )}
      </div>
    </>
  );
}

export default App;
