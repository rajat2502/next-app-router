import { Posts } from "@/components/post";
import { deferredRequests, fetchHeroImage } from "@/utils";
import Image from "next/image";

export default function Home({ posts, time, image }) {
  return (
    <>
      <Image
        src={image[0].download_url}
        alt='hero image'
        width={500}
        height={500}
      />
      <h1>Timezone: {time.datetime}</h1>
      <Posts posts={posts} />;
    </>
  );
}

export const getServerSideProps = async () => {
  const [data, image] = await Promise.all([
    deferredRequests(),
    fetchHeroImage(),
  ]);
  // @ts-expect-error
  const [posts, time] = data;

  return {
    props: {
      posts,
      time,
      image,
    },
  };
};
