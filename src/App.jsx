import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  // Bora declarar os nossos useStates?

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then(({data}) => setUsers(data));
  }, []);
  // I <3 Axios. (Meu melhor amigo é o Axios.)

  const handleUserSelect = async (userId) => {
    const [postsRes, commentsRes, albumsRes, photosRes] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
      axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${userId}`),
      axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`),
      axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${userId}`)
    ]);
    setSelectedUser(userId);
    setPosts(postsRes.data);
    setComments(commentsRes.data);
    setAlbums(albumsRes.data);
    setPhotos(photosRes.data);
  };
  // Central de Dados 3000.

  return (
    <>
      <h1>Buscador de Dados 2000</h1>
      
      <select onChange={(e) => handleUserSelect(e.target.value)}>
        <option value="">Escolha um usuário</option>
        {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
      </select>
      
      {selectedUser && (
        <div>

          <h2>Postagens</h2>
          <div className="grid">
            {posts.map(post => <div key={post.id} className="box">{post.title}</div>)}
          </div>

          <h2>Comentários</h2>
          <div className="grid">
            {comments.map(comment => <div key={comment.id} className="box">{comment.body}</div>)}
          </div>

          <h2>Álbuns</h2>
          <div className="grid">
            {albums.map(album => <div key={album.id} className="box">{album.title}</div>)}
          </div>

          <h2>Fotos</h2>
          <div className="grid">
            {photos.map(photo => <div key={photo.id} className="box">{photo.title}</div>)}
          </div>

        </div>
      )}
    </>
  );
}
// BTW, esquece, eu amo o Next.JS agora.

export default App;