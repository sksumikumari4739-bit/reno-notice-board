// import { prisma } from "../../../lib/prisma";
// import { useState } from "react";
// import { useRouter } from "next/router";


// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     try {
//       const notices = await prisma.notice.findMany({
//         orderBy: {
//           createdAt: "desc",
//         },
//       });

//       return res.status(200).json(notices);
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   }

//   if (req.method === "POST") {
//     try {
//       const { title, description, category, isUrgent } = req.body;

//       const notice = await prisma.notice.create({
//         data: {
//           title,
//           description,
//           category,
//           isUrgent,
//         },
//       });

//       return res.status(201).json(notice);
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   }

//   const router = useRouter();

//  const [title, setTitle] = useState("");
//  const [description, setDescription] = useState("");
//  const [category, setCategory] = useState("General");
//  const [isUrgent, setIsUrgent] = useState(false);

//  async function handleSubmit(e) {
//   e.preventDefault();

//   const response = await fetch("/api/notices", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title,
//       description,
//       category,
//       isUrgent,
//     }),
//   });

//   if (response.ok) {
//     alert("Notice Added Successfully!");
//     router.push("/");
//   } else {
//     alert("Something went wrong.");
//   }
//  }

//   return res.status(405).json({
//     message: "Method Not Allowed",
//   });
// }

import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(notices);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, description, category, isUrgent } = req.body;

      const notice = await prisma.notice.create({
        data: {
          title,
          description,
          category,
          isUrgent,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  if (req.method === "PUT") {
  try {
    const { id, title, description, category, isUrgent } = req.body;

    const notice = await prisma.notice.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        category,
        isUrgent,
      },
    });

    return res.status(200).json(notice);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
 }

 if (req.method === "DELETE") {
  try {
    const { id } = req.body;

    await prisma.notice.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      message: "Notice Deleted Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
 }
  return res.status(405).json({
    message: "Method Not Allowed",
  });
}