import { Posts } from "@/components/post";
import { deferredRequests, fetchHeroImage } from "@/utils";
import Image from "next/image";
import { Suspense } from "react";

const Home = async () => {
  const image = await fetchHeroImage();

  return (
    <>
      <Image
        src={image[0].download_url}
        alt='hero image'
        width={500}
        height={500}
      />
      <Suspense fallback={"Loading..."}>
        <Poster />
      </Suspense>
    </>
  );
};

const Poster = async () => {
  const data = await deferredRequests();
  const posts = data[0];
  const time = data[1];
  return (
    <>
      <h1>Timezone: {time.datetime}</h1>
      <Posts posts={posts} />
    </>
  );
};

export default Home;
