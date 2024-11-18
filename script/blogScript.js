// Function to store the blog data in localStorage
function storeBlog() {
  let inputBlogImage = document.getElementById("file");
  let inputBlogId = 0;

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("blog-")) {
      inputBlogId++;
    }
  }

  let blogImageBase64 = "";
  if (inputBlogImage.files.length > 0) {
    let reader = new FileReader();
    reader.onloadend = function () {
      blogImageBase64 = reader.result;
      saveBlogData(blogImageBase64, inputBlogId);
    };
    reader.readAsDataURL(inputBlogImage.files[0]);
  } else {
    saveBlogData("", inputBlogId);
  }
}

function saveBlogData(blogImageBase64, inputBlogId) {
  let inputBlogUsername = document.getElementById("name");
  let inputBlogTitle = document.getElementById("title");
  let inputBlogText = document.getElementById("blog");

  const newBlog = {
    username: inputBlogUsername.value,
    title: inputBlogTitle.value,
    blog: inputBlogText.value,
    image: blogImageBase64,
  };

  if (newBlog.username && newBlog.title && newBlog.blog) {
    localStorage.setItem(`blog-${inputBlogId}`, JSON.stringify(newBlog));
    console.log("Blog saved successfully");
  } else {
    console.error("All fields must be filled out.");
    console.log(newBlog);
  }

  inputBlogUsername.value = "";
  inputBlogTitle.value = "";
  inputBlogText.value = "";
  document.getElementById("file").value = "";
}

function getBlog(blogId) {
  return JSON.parse(localStorage.getItem(`blog-${blogId}`));
}
function showBlogs() {
  let blogsContainer = document.getElementById("blogs");
  blogsContainer.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("blog-")) {
      let blogId = key.split('-')[1];
      let blogObj = getBlog(blogId);
      let blogItem = document.createElement("div");
      blogItem.classList.add("blog-item");

      blogItem.innerHTML = `
                <h3 class="blog-title">${blogObj.title}</h3>
                ${
                  blogObj.image
                    ? `<img src="${blogObj.image}" alt="Blog Image" class="blog-image"/>`
                    : ""
                }
                <p class="blog-text">${blogObj.blog}</p>
                <p class="blog-username">By ${blogObj.username}</p>
            `;
      blogsContainer.appendChild(blogItem);

      blogId++;
    }
  }
}
