import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST

export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// // DELETE SINGLE POST
// export const DELETE = async (req, { params }) => {
//   const { slug } = params;

//   try {
//     // Delete the post with the specified slug from the database
//     const deletedPost = await prisma.post.delete({
//       where: { slug },
//     });

//     // Return a 204 No Content response for a successful deletion
//     return new NextResponse(null, { status: 204 });
//   } catch (err) {
//     // If an error occurs, log the error and return a 500 Internal Server Error response
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

// DELETE SINGLE POST
export const DELETE = async (req, { params }) => {
  const { slug } = params;

  try {
    // Fetch the post with associated comments
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { comments: true },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found" }, { status: 404 })
      );
    }

    // Delete associated comments
    await prisma.comment.deleteMany({ where: { postSlug: slug } });

    // Now, delete the post
    await prisma.post.delete({ where: { slug } });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error deleting post:", err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete post" }, { status: 500 })
    );
  }
};
