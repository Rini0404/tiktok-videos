import axios from "axios";

export const getFeed = () =>
  new Promise(async (resolve, reject) => {
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYmY5YjJmZTg0MzVjYTU0ZTMwOTMzIiwibmFtZSI6IlN3aXRjaCBSaW5pIiwiZW1haWwiOiJ0ZXN0QHN3aXRjaGVzLmNvbSJ9LCJpYXQiOjE2NzUzNjA2OTMsImV4cCI6MTY3NTcyMDY5M30.G4366S66WY0X56Oo9FVC7dR-OiLdxQhs5dAySn1zE9U";

    await axios
      .get(`https://dev.devusol.net/pops/all`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        // randomize the order of the posts
        const posts = response.data;

        for (let i = posts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [posts[i], posts[j]] = [posts[j], posts[i]];
        }

        resolve(posts);
      })
      .catch((error) => {
        // console.log("error getting all ", error)
        reject(error);
      });
  });
