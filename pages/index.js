import Link from "next/link";
import prisma from "../lib/prisma";

export async function getServerSideProps() {  
  const notices = await prisma.notice.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      notices: JSON.parse(JSON.stringify(notices)),
    },
  };
}

export default function Home({ notices }) {
  async function handleDelete(id) {
    const confirmDelete = confirm("Are you sure you want to delete this notice?");

    if (!confirmDelete) return;

    const response = await fetch("/api/notices", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert("Notice Deleted Successfully!");
      window.location.reload();
    } else {
      alert("Failed to delete notice.");
    }
  }
  return (
    <div
    style={{
     maxWidth: "900px",
     margin: "50px auto",
     fontFamily: "Arial",
     textAlign: "center",
     }}
    >

      <h1>Notice Board</h1>

      <p>
      Welcome to Reno Platforms Notice Board Assignment
      </p>

      <br />

      <Link href="/notices/new">
        <button
         style={{
         padding: "12px 25px",
         background: "#2563eb",
         color: "white",
         border: "none",
         borderRadius: "8px",
         cursor: "pointer",
         fontSize: "16px",
         }}
        >
          + Add Notice
        </button>
      </Link>

      <br />
      <br />

      <table
       style={{
       width: "100%",
       borderCollapse: "collapse",
       }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "white" }}>
            <th style={{ padding: "12px" }}>Title</th>
            <th>Description</th>
            <th style={{ width: "120px" }}>Priority</th>
            <th style={{ width: "140px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {notices.length === 0 ? (
            <tr>
              <td style={{ padding: "12px" }}>No Notice Yet</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          ) : (
            notices.map((notice) => (
              <tr key={notice.id}>
                <td style={{ padding: "12px" }}>{notice.title}</td>
                <td>{notice.description}</td>
                <td>{notice.isUrgent ? "Urgent" : "Normal"}</td>
              <td 
               style={{
               whiteSpace: "nowrap",
               width: "140px",
               }}>
                <Link
                  href={`/notices/${notice.id}`}
                >
                 Edit
                </Link>

               {" | "}

                <button
                 onClick={() => handleDelete(notice.id)}
                 style={{
                 border: "none",
                 background: "transparent",
                 color: "red",
                 cursor: "pointer",
                 }}
                >
                
                  Delete
                </button>
              </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}