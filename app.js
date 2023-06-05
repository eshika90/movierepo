// TMDB 사용, API-key
const API_KEY = 'api_key=c703ff1b12d45ab110c95c4b764b4a52'
const base_URL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&'
const API_URL = base_URL + API_KEY
// 과제 페이지에 나온 것처럼 authorization을 그대로 따와서 받으면 자꾸 API-KEY가 누락됐다고 나와서 안에 있는 데이터를 볼 수가 없어
// 그냥 URL에 api_key를 넣고 url을 볼 수 있도록 하고 변수선언을 했다.
const searchURL = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=`;
// TMDB에서 제공하는 검색기능 사용하는 방법 base URL
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
// TMDB에서 제공하는 기본 이미지 주소(API data를 보면 기본주소는 나와있지 않고 경로만 나와있음)
// w500은 이미지의 크기
const main = document.getElementById('main')
// HTML에 자료를 가져다가 바꿔줘야 하므로 HTML에 일치하는 dom요소 (main id= "main")를 선택하여 붙인다.
const form = document.getElementById('form')
// HTML : 검색창(input), 검색버튼 포함되어 있는 dom요소 (form id= "form")
const search = document.getElementById('search')
// HTML : input id = search 

getMovies(API_URL)
// getMovies 내부에 showMovies 내장 함수를 실행시키기 위해 실행해준다.


// 데이터를 fetch로 url을 입력하여 받아오는 함수(서버에서 get방식)
function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    
    // console.log(data) result 값들 나오는 것 확인!
    showMovies(data.results) // data안에 results 안에 배열들이 나옴
  })
}

// 받아온 데이터를 보여주기 위한 함수 (웹종에서 했던 서버에서 POST방식)
// 받아온 데이터를 보여주기 위한 함수
function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
    const { title, poster_path, overview, vote_average, id } = movie;
    const roundedVote = vote_average.toFixed(1);
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    const movieImg = document.createElement('img');
    movieImg.src = `${IMG_URL+poster_path}`;
    movieImg.alt = title;
    movieImg.addEventListener('click', () => {
      newPage(id);
    });
    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');
    movieInfo.innerHTML = `
      <h3>${title}</h3>
      <span class="score">${roundedVote}</span>
    `;
    const description = document.createElement('div');
    description.classList.add('description');
    description.textContent = overview;

    movieEl.appendChild(movieImg);
    movieEl.appendChild(movieInfo);
    movieEl.appendChild(description);

    main.appendChild(movieEl);
  })
}



// 검색 기능 구현하는 함수
form.addEventListener('submit', (e) => { //폼을 제출하면 기본동작으로 새로고침을 하게된다.
  e.preventDefault() // 이 메서드를 써서 검색어를 출력하기 전에 새로고침 되는 것을 방지

  const searchInput = search.value // 맨 위에서 선언한 input으로부터 받아온 값을 받는다.

  if(searchInput) { // 검색어가 존재하면
    getMovies(searchURL+'&query='+searchInput) // 검색 매개변수를 받아 TMDB에서 받은 search할 수 있는 기능의 URL을 받아 검색 결과가 나오게해준다.
  } 
})

function newPage(movieId) {
  window.open(`detail.html?id=${movieId}`);
}