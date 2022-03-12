// GET POST PUT DELETE

// A - Application P - Programming I - Interface

// GET - // https://api.myapp.com/users - Get All users
// GET - https://api.myapp.com/users/1 - Get Single user
// POST - https://api.myapp.com/users - Add user
// PUT - https://api.myapp.com/users/1 - Update user
// DELETE - https://api.myapp.com/users/1 - Delete user

// //Ex1
// const posts = [
//   {
//     title: "Post 1 title",
//     body: "Post 1 body text",
//   },
//   {
//     title: "Post 2 title",
//     body: "Post 2 body text",
//   },
//   {

//     title: "Post 3 title",
//     body: "Post 3 body text",
//   },
// ];

// function getPosts() {
//   setTimeout(() => {
//     posts.push(post);
//   }, 1000);
// }

// console.log(posts);

// //Ex2
// const posts = [
//   {
//     title: "Post 1 title",
//     body: "Post 1 body text",
//   },
//   {
//     title: "Post 2 title",
//     body: "Post 2 body text",
//   },
//   {
//     title: "Post 3 title",
//     body: "Post 3 body text",
//   },
// ];

// function getPosts() {
//   posts.forEach(item => {
//     console.log(item);
//   });
// }

// getPosts();
// console.log(posts);

// //Ex3
// const posts = [
//   {
//     title: "Post 1 title",
//     body: "Post 1 body text",
//   },
//   {
//     title: "Post 2 title",
//     body: "Post 2 body text",
//   },
//   {
//     title: "Post 3 title",
//     body: "Post 3 body text",
//   },
// ];

// function createPost(post) {
//   setTimeout(() => {
//     posts.push(post);
//   }, 300);
// }

// function getPosts() {
//   setTimeout(() => {
//     let output = "";

//     posts.forEach((post) => {
//       output += `<li>${post.title}</li>`;
//     });

//     document.body.innerHTML = output;
//   }, 1000);
// }

// createPost({title: "Post 4 title", body: "Post 4 bosy text"});

// getPosts();

// console.log(posts);


//Ex3
const posts = [
  {
    title: "Post 1 title",
    body: "Post 1 body text",
  },
  {
    title: "Post 2 title",
    body: "Post 2 body text",
  },
  {
    title: "Post 3 title",
    body: "Post 3 body text",
  },
];

function createPost(post, callback) {
    setTimeout(() => {
      posts.push(post);
      callback();
    }, 3000);
  }

function getPosts() {
    setTimeout(() => {
      let output = "";
  
      posts.forEach((post) => {
        output += `<li>${post.title}</li>`;
      });
  
  document.body.innerHTML = output;
  }, 1000);
}

createPost({title: "Post 4 title", body: "Post 4 bosy text"}, getPosts);

getPosts();

console.log(posts);
