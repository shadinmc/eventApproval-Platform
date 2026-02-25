import { useEffect, useState } from "react";
import api from "../api/api";

function HodDashboard() {

  const [ideas, setIdeas] = useState([]);
  const [comment, setComment] = useState(""); // clarify
  const [hodComments, setHodComments] = useState({}); // approve/reject notes

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const res = await api.get("/hod/ideas");
      setIdeas(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHodComment = (id, value) => {
    setHodComments({
      ...hodComments,
      [id]: value
    });
  };

  const approveIdea = async (id) => {
    const note = hodComments[id] || "";

    try {
      await api.put(
        `/hod/${id}/approve`,
        "Approved by HOD" + (note ? " - " + note : ""),
        { headers: { "Content-Type": "text/plain" } }
      );

      loadIdeas();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectIdea = async (id) => {
    const note = hodComments[id] || "";

    try {
      await api.put(
        `/hod/${id}/reject`,
        "Rejected by HOD" + (note ? " - " + note : ""),
        { headers: { "Content-Type": "text/plain" } }
      );

      loadIdeas();
    } catch (err) {
      console.log(err);
    }
  };

  const clarifyIdea = async (id) => {
    if (!comment) {
      alert("Enter clarification comment");
      return;
    }

    try {
      await api.put(
        `/hod/${id}/clarify`,
        "Clarification requested by HOD - " + comment,
        { headers: { "Content-Type": "text/plain" } }
      );

      setComment("");
      loadIdeas();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>HOD Dashboard</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>HOD Note</th>
            <th>Actions</th>
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
                  value={hodComments[idea.id] || ""}
                  onChange={(e) =>
                    handleHodComment(idea.id, e.target.value)
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

                <br /><br />

                <input
                  placeholder="Clarification comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button onClick={() => clarifyIdea(idea.id)}>
                  Clarify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HodDashboard;
