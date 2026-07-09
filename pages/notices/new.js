import { useState } from "react";
import { useRouter } from "next/router";

export default function AddNotice() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [isUrgent, setIsUrgent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category,
        isUrgent,
      }),
    });

    if (response.ok) {
      alert("Notice Added Successfully!");
      router.push("/");
    } else {
      alert("Something went wrong.");
    }
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>Add New Notice</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
          <label>Title</label>
          <br />
          <input
            type="text"
            placeholder="Enter notice title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
          <label>Description</label>
          <br />
          <textarea
            rows="5"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>
          <br />
          <input
            type="text"
            placeholder="General / Exam / Event"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Priority</label>
          <br />
          <select
            value={isUrgent ? "Urgent" : "Normal"}
            onChange={(e) => setIsUrgent(e.target.value === "Urgent")}
            style={{ width: "100%", padding: "10px" }}
          >
            <option>Normal</option>
            <option>Urgent</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#0070f3",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Notice
        </button>
      </form>
    </div>
  );
}