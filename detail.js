// URL 쿼리 파라미터에서 movieId 가져오기
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// 상세 정보를 가져오기 위한 API 호출
const API_KEY = 'api_key=c703ff1b12d45ab110c95c4b764b4a52';
const movieURL = `https://api.themoviedb.org/3/movie/${movieId}?${API_KEY}&language=en-US`;

fetch(movieURL)
    .then(res => res.json())
    .then(data => {
        const { title, poster_path, overview, vote_average } = data;
        const roundedVote = vote_average.toFixed(1);

        // 가져온 정보로 HTML 요소 채우기
        document.getElementById('movie').src = `${IMG_URL + poster_path}`;
        document.getElementById('title').textContent = title;
        document.getElementById('overview').textContent = overview;
        document.getElementById('vote').textContent = `Vote Average: ${roundedVote}`;
    });

// 받아온 데이터를 보여주기 위한 함수
function fetchMovieDetails(movie) {
    // 기존 영화 목록을 숨김.
    document.getElementById('movies').style.display = 'none';

    const { title, poster_path, overview, vote_average } = movie;
    const roundedVote = vote_average.toFixed(1);

    // 영화 상세 정보를 표시하는 요소를 생성
    const movieDetailEl = document.createElement('div');
    movieDetailEl.classList.add('movie-detail');

    // 영화 상세 정보를 사용하여 요소를 구성
    movieDetailEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <h2>${title}</h2>
        <p>${overview}</p>
        <p>Vote Average: ${roundedVote}</p>
    `;

    // 영화 상세 정보를 main 요소에 추가.
    const main = document.getElementById('main');
    main.innerHTML = '';
    main.appendChild(movieDetailEl);
}
