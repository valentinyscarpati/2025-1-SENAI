import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente para envio de imagens e descrição
function App() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Carregar imagens no início
    axios.get('http://localhost:3020/foto')
      .then(response => setImages(response.data))
      .catch(error => console.error("Erro ao carregar imagens", error));
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('foto', image);
    formData.append('alternativo', description);

    try {
      await axios.post('http://localhost:3020/foto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Após o upload, limpar o formulário e recarregar as imagens
      setImage(null);
      setDescription('');
      loadImages();
    } catch (error) {
      console.error('Erro ao enviar imagem', error);
    }
  };

  const handleDelete = async (id_foto) => {
    try {
      await axios.delete(`http://localhost:3020/foto/${id_foto}`);
      loadImages(); // Recarregar as imagens após exclusão
    } catch (error) {
      console.error('Erro ao deletar imagem', error);
    }
  };

  const handleEdit = async (id_foto, newDescription) => {
    try {
      await axios.put(`http://localhost:3020/foto/${id_foto}`, { alternativo: newDescription });
      loadImages(); // Recarregar as imagens após a atualização
    } catch (error) {
      console.error('Erro ao atualizar imagem', error);
    }
  };

  const loadImages = () => {
    axios.get('http://localhost:3020/foto')
      .then(response => setImages(response.data))
      .catch(error => console.error("Erro ao carregar imagens", error));
  };

  return (
    <div className="App">
      <h1>Upload de Imagens</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Descrição da imagem"
          required
        />
        <button type="submit">Enviar</button>
      </form>

      <h2>Imagens Enviadas</h2>
      <div className="image-gallery">
        {images.map((image) => (
          <div key={image.id_foto} className="image-item">
            <img
              src={`http://localhost:3020/public/img/${image.caminho}`}
              alt={image.alternativo}
              width={200}
            />
            <p>{image.alternativo}</p>
            <button onClick={() => handleEdit(image.id_foto, prompt("Nova descrição:", image.alternativo))}>
              Editar
            </button>
            <button onClick={() => handleDelete(image.id_foto)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
