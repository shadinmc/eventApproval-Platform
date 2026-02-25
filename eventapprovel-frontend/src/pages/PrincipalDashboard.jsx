import { useEffect, useState } from "react";
import api from "../api/api";

function PrincipalDashboard() {

  const [ideas, setIdeas] = useState([]);
  const [principalNotes, setPrincipalNotes] = useState({});

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const res = await api.get("/principal/ideas");
      setIdeas(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrincipalNote = (id, value) => {
    setPrincipalNotes({
      ...principalNotes,
      [id]: value
    });
  };

  const approveIdea = async (id) => {
    const note = principalNotes[id] || "";

    try {
      await api.put(
        `/principal/${id}/approve`,
        "Approved by Principal" + (note ? " - " + note : ""),
        {
          headers: { "Content-Type": "text/plain" }
        }
      );

      loadIdeas();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectIdea = async (id) => {
    const note = principalNotes[id] || "";

    try {
      await api.put(
        `/principal/${id}/reject`,
        "Rejected by Principal" + (note ? " - " + note : ""),
        {
          headers: { "Content-Type": "text/plain" }
        }
      );

      loadIdeas();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Principal Dashboard</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>HOD Status</th>
            <th>Principal Note</th>
            <th>Final Action</th>
          </tr>
        </thead>

        <tbody>
          {ideas.map((idea) => (
            <tr key={idea.id}>
              <td>{idea.student.id}</td>
              <td>{idea.student.name}</td>
              <td>{idea.title}</td>
              <td>{idea.description}</td>
              <td>{idea.status}</td>

              <td>
                <input
                  placeholder="Optional note"
                  value={principalNotes[idea.id] || ""}
                  onChange={(e) =>
                    handlePrincipalNote(idea.id, e.target.value)
                  }
                />
              </td>

              <td>
                <button onClick={() => approveIdea(idea.id)}>
                  Approve
                </button>

                <button onClick={() => rejectIdea(idea.id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrincipalDashboard;
