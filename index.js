document.addEventListener("DOMContentLoaded", () => {
   let select = document.querySelector('select')
   let showMovieInfo = document.querySelector('#data')
   let form = document.querySelector('form')
   let input = document.querySelector('#userReview')
   let ul = document.querySelector('ul')
   let h3 = document.createElement('h3');
   let movieData;
   let filmId;
  
   

   const fetchMovie = async () => {
      try {
         let res = await axios.get("https://ghibliapi.herokuapp.com/films")
         movieData = res.data

         movieData.forEach(movie=> {
            let option = document.createElement('option');
            option.innerText = movie.title
            option.value = movie.id
            select.appendChild(option)
         })
      }
      catch (err) {
         console.log(err)
      }
   }

   const movieDetails = async (e) => {
      
      filmId = e.target.value
      let info = await axios.get(`https://ghibliapi.herokuapp.com/films/${filmId}`)
      
      let section = document.querySelector('section')
      if(section) section.innerHTML = "";

      section = document.createElement('section')
      h3 = document.createElement('h3');
      let pReleaseYear = document.createElement('p');
      let pMovieDescription = document.createElement('p');

      h3.innerText = info.data.title;
      pReleaseYear.innerText = info.data.release_date; 
      pMovieDescription.innerText = info.data.description

      section.append(h3, pReleaseYear, pMovieDescription)

      showMovieInfo.appendChild(section)
      
   }

   const userReview = (e) => {
      e.preventDefault()
      let userInput = input.value


      h3 = document.querySelector('h3').innerText
      let li = document.createElement('li');
      li.innerHTML = `<strong>${h3}</strong>: ${userInput}`;
      ul.appendChild(li)

      input.value ="";
   }

  const dropDownListener = () => {
     select.addEventListener('change', movieDetails)
  }

  const btnListener = () => {
     form.addEventListener('submit', userReview)
  }

   fetchMovie()
   dropDownListener()
   btnListener()  
})