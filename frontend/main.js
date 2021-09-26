function fetchPalavra() {
  axios.get('http://localhost:3000/palavra')
    .then(response => {
      const { palavra, dica } = response.data;
      document.getElementById('dica').innerHTML = dica;
      document.getElementById('palavra').innerHTML = palavra;
    });
}

window.onload = fetchPalavra;
