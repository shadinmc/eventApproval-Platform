import { useEffect, useState } from "react";
import api from "../api/api";

function StudentDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ideas, setIdeas] = useState([]);

  // load ideas on page load
  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const res = await api.get(`/student/ideas/${user.id}`);
      setIdeas(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitIdea = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/student/submit", {
        title,
        description,
        studentId: user.id
      });

      alert("Idea submitted successfully");

      setTitle("");
      setDescription("");

      loadIdeas();
    } catch (err) {
      console.log(err);
      alert("Submission failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Dashboard</h2>

      <p>
        Welcome, <b>{user.name}</b>
      </p>

      <hr />

      <h3>Submit Event Idea</h3>

      <input
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Event description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={submitIdea}>Submit Idea</button>

      <hr />

      <h3>My Submitted Ideas</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>HODComment</th>
            <th>PrincipalComment</th>
          </tr>
        </thead>

        <tbody>
          {ideas.map((idea) => (
            <tr key={idea.id}>
              <td>{idea.title}</td>
              <td>{idea.description}</td>
              <td>{idea.status}</td>
              <td>{idea.hodComment}</td>
              <td>{idea.principalComment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDashboard;
