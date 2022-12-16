import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [pages, setPages] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [infos, setInfos] = useState([]);


  useEffect(() => {
    axios.get('http://api.github.com/users/Rhine?client_id=59d0e53ac4b858d5d320&client_secret=1b1f4d8d4f6abace4384ea0ae8bd29e9bb48aabf&sort=created')
    .then((res) => {setPages(res.data);})
    .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('https://api.github.com/users/coryhouse/repos')
    .then((repositories) => setRepositories(repositories.data))
    .catch((err) => console.log(err));
  }); 

  useEffect(() => {
    axios.get('https://api.github.com/users/coryhouse')
    .then((infos) => setInfos(infos.data))
    .catch((err) => console.log(err));
  }); 

  const photo = infos.avatar_url
  return (
    <div className="container">
      <div className='box1'>
        <div className='profilePhoto'>
          <img src={photo} alt="photo" />
        </div>
        <div className='info'>
          <p>Full Name:  {infos.name}</p>
          <p>User Name:  {infos.login}</p>
          <p>Location:  {infos.location}</p>
          <p>Email:  {infos.email}</p>
        </div>
      </div>

      <hr></hr>
      <div className='box2'>
        <h3>User Repositories</h3>
      </div>
      <div className='box3'>
        <ul>
          {repositories.map((item) => {
            return <li key={item.id}><a href={'https://github.com/' + item.full_name}>{item.name}</a></li>
          })}
        </ul>

      </div>
    </div>
  );
}

export default App;
