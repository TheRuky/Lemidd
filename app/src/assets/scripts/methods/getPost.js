import axios from 'axios';

export default async function() {
  try {
    const postId = this.$node.dataset.postId;
    const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    const { userId, title, body } = postResponse.data;

    const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);

    const { username } = userResponse.data;

    const postTitle = this.$node.querySelector('.post__title');
    const postAuthor = this.$node.querySelector('.post__author');
    const postContent = this.$node.querySelector('.post__content');

    postTitle.innerHTML = title;
    postAuthor.innerHTML = username;
    postContent.innerHTML = body;
  } catch(e) {
    // Error handling...
  }
}