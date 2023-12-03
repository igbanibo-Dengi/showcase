import Image from "next/image";
import Link from "next/link";

const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/user/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};

const page = async ({ params }) => {
  const { id } = params;

  const data = await getData(id);

  // console.log(data);

  return (
    <div className="grid grid-cols-3 gap-5">
      {data.Post && data.Post.length > 0 ? (
        data.Post.map((item) => (
          <div key={item.id} className="p-2 border rounded-lg">
            {item.img ? (
              <Image
                src={item.img}
                alt="post image"
                width={500}
                height={500}
                className="object-cover rounded-md"
              />
            ) : (
              <Image
                src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="default image"
                width={500}
                height={500}
                className="object-cover rounded-md"
              />
            )}
            <p>{item.title}</p>
            <Link href={`/posts/${item.slug}`}>view</Link>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default page;
