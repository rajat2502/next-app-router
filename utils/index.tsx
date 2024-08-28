export const fetchPosts = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-cache",
  });
  console.log("fetching");
  const posts = await data.json();

  return [posts];
};

export const fetchTime = async () => {
  const data = await fetch(
    "http://worldtimeapi.org/api/timezone/Asia/Kolkata",
    {
      next: { revalidate: 20 },
    }
  );
  const time = await data.json();
  return time;
};

export const deferredRequests = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      console.log("deferred request");
      try {
        const results = await Promise.all([fetchPosts(), fetchTime()]);
        resolve(results);
      } catch (error) {
        console.error("Error in deferredRequests:", error);
        resolve([]); // or reject(error) if you want to propagate the error
      }
    }, 5000);
  });
};

export const fetchHeroImage = async () => {
  console.log("fetching image");
  const data = await fetch("https://picsum.photos/v2/list?page=1&limit=1");
  const image = await data.json();
  console.log("image fetched");
  return image;
};
