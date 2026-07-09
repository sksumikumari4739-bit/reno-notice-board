// export default function EditNotice() {
//   return (
//     <div
//       style={{
//         maxWidth: "600px",
//         margin: "40px auto",
//         fontFamily: "Arial",
//       }}
//     >
//       <h1>Edit Notice</h1>
//     </div>
//   );
// }

import { useState } from "react";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const notice = await prisma.notice.findUnique({
    where: {
      id: Number(id),
    },
  });

  return {
    props: {
      notice: JSON.parse(JSON.stringify(notice)),
    },
  };
}

export default function EditNotice({ notice }) {
  const router = useRouter();

  const [title, setTitle] = useState(notice.title);
  const [description, setDescription] = useState(notice.description);
  const [category, setCategory] = useState(notice.category);
  const [isUrgent, setIsUrgent] = useState(notice.isUrgent);

  async function handleSubmit(e) {
  e.preventDefault();

  const response = await fetch("/api/notices", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: notice.id,
      title,
      description,
      category,
      isUrgent,
    }),
  });

  if (response.ok) {
    alert("Notice Updated Successfully!");
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
        fontFamily: "Arial",
      }}
    >
      <h1>Edit Notice</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Title</label>
          <br />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <br />
          <textarea
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>
          <br />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <select
          value={isUrgent ? "Urgent" : "Normal"}
          onChange={(e) => setIsUrgent(e.target.value === "Urgent")}
          style={{ width: "100%", padding: "10px" }}
        >
          <option>Normal</option>
          <option>Urgent</option>
        </select>

        <br />
        <br />

        <button
            type="submit"
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
          }}
        >
          Update Notice
        </button>
      </form>
    </div>
  );
}