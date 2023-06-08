// URL 쿼리 파라미터에서 movieId 가져오기
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
// TMDB에서 제공하는 검색기능 사용하는 방법 base URL
const IMG_URL = "https://image.tmdb.org/t/p/w400";
const IMG_URL2 = "https://image.tmdb.org/t/p/w500";
// 상세 정보를 가져오기 위한 API 호출
const API_KEY = "api_key=c703ff1b12d45ab110c95c4b764b4a52";
const movieURL = `https://api.themoviedb.org/3/movie/${movieId}?${API_KEY}&language=en-US`;
fetch(movieURL)
  .then(res => res.json())
  .then(data => {
    const { title, poster_path, backdrop_path, overview, vote_average } = data;
    const roundedVote = vote_average.toFixed(1);
    // 가져온 정보로 HTML 요소 채우기
    document.getElementById("movieposter").innerHTML = `<img src="${
      IMG_URL + poster_path
    }" alt="${title}">`;
    document.getElementById("moviebackdrop").innerHTML = `<img src="${
      IMG_URL2 + backdrop_path
    }" alt="${title}">`;
    document.getElementById("title").textContent = title;
    document.getElementById("overview").textContent = overview;
    document.getElementById("vote").textContent = `Vote Average: ${roundedVote}`;
  });

// 받아온 데이터를 보여주기 위한 함수
function fetchMovieDetails(movie) {
  const { title, poster_path, backdrop_path, overview, vote_average } = movie;
  const roundedVote = vote_average.toFixed(1);

  // 영화 상세 정보를 표시하는 요소를 생성
  const movieDetailEl = document.createElement("div");
  movieDetailEl.classList.add("movie-detail");

  // 영화 상세 정보를 사용하여 요소를 구성
  movieDetailEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <img src="${IMG_URL2 + backdrop_path}" alt="${title}">
        <h2>${title}</h2>
        <p>${overview}</p>
        <p>Vote Average: ${roundedVote}</p>
    `;

  // 영화 상세 정보를 main 요소에 추가.
  const main = document.getElementById("main");
  main.appendChild(movieDetailEl);
}

// dom
const reviewForm = document.querySelector(".reviews form");
const submitButton = document.querySelector(".reviews .submit");
const formInput = document.querySelectorAll(".form-control");
const reviewList = document.getElementById("review_list");
const modalEl = document.querySelector(".modal");
const modalSubmitBtn = document.querySelector(".modal .submit");
const modalCancelBtn = document.querySelector(".modal .cancel");
const modalInput = document.querySelector(".modal input");
let selectedReviewIndex;
let isDeleteModal;
// review 저장 시 localStorage 추가
const createLocalStorage = data => {
  const originalData = JSON.parse(localStorage.getItem(movieId) || "[]");

  originalData.push(data);

  localStorage.setItem(movieId, JSON.stringify(originalData));

  updateReviewList();
};

// review list 업데이트
const updateReviewList = () => {
  const newData = JSON.parse(localStorage.getItem(movieId) || "[]");
  // ${newData.length > 0 && <h2>Comments</h2>}

  if (newData.length === 0) return (reviewList.innerHTML = "");
  reviewList.innerHTML = `
      ${newData
        .map((el, index) =>
          el.isUpdate
            ? `
        <div class="comments">
          <h5>NAME ${el.title}</h5>
          <p>COMMENTS ${el.contents}</p>
          <button id="edit_submit" name="${index}" >확인</button>
          <button id="edit_cancel" name="${index}" >취소</button>
        </div>
          
        
          `
            : `
        <div class="comments">
          <h5>NAME ${el.title}</h5>
          <p>COMMENTS ${el.contents}</p>
          <button class="review_update" name="${index}">수정</button>
          <button class="review_delete" name="${index}">삭제</button>
        </div>
        `
        )
        .join("")}
    `;
  const reviewUpdateBtn = document.querySelectorAll(".review_update");
  const reviewDeleteBtn = document.querySelectorAll(".review_delete");
  const editInput = document.getElementById("edit_text");
  const editSubmit = document.getElementById("edit_submit");
  const editCancel = document.getElementById("edit_cancel");

  if (editCancel) {
    editCancel.addEventListener("click", e => {
      const index = e.target.name;
      const target = JSON.parse(localStorage.getItem(movieId));

      target[index].isUpdate = false;
      localStorage.setItem(movieId, JSON.stringify(target));
      updateReviewList();
    });
  }
  if (editSubmit) {
    editSubmit.addEventListener("click", e => {
      const index = e.target.name;
      const target = JSON.parse(localStorage.getItem(movieId));
      target[index].isUpdate = false;
      target[index].contents = editInput.value;

      localStorage.setItem(movieId, JSON.stringify(target));
      updateReviewList();
    });
  }
  reviewUpdateBtn.forEach(el => {
    const name = el.name;

    el.addEventListener("click", function (event) {
      openModal();
      selectedReviewIndex = Number(el.name);
      isDeleteModal = false;
    });
  });
  reviewDeleteBtn.forEach(el => {
    el.addEventListener("click", function (event) {
      openModal();
      selectedReviewIndex = Number(el.name);
      isDeleteModal = true;
    });
  });
};

const openModal = () => {
  modalEl.style.display = "block";
};
const closeModal = () => {
  modalEl.style.display = "none";
};
const deleteLocalStorage = () => {};

const checkPassword = value => {
  const target = JSON.parse(localStorage.getItem(movieId));
  // 비밀번호 틀렸을때
  if (value !== target[selectedReviewIndex].password) return alert("비밀번호를 확인해주세요");
  closeModal();
  // 삭제
  if (isDeleteModal) {
    target.splice(selectedReviewIndex, 1);

    localStorage.setItem(movieId, JSON.stringify(target));
    updateReviewList();
    modalInput.value = "";
    alert("삭제되었습니다");
  }
  // 수정
  else {
    target[selectedReviewIndex].isUpdate = true;
    localStorage.setItem(movieId, JSON.stringify(target));
    modalInput.value = "";
    updateReviewList();
  }
};

modalSubmitBtn.addEventListener("click", e => {
  checkPassword(modalInput.value);
});
modalCancelBtn.addEventListener("click", e => {
  closeModal();
  modalInput.value = "";
});
reviewForm.addEventListener("submit", () => {
  event.preventDefault();
  const data = new FormData(reviewForm);
  const formDataObj = {};
  data.forEach((value, key) => (formDataObj[key] = value));

  createLocalStorage(formDataObj);
  console.log(formInput, "formInput");
  formInput.forEach(el => {
    el.value = "";
  });
  // 댓글 달고 새로고침되게끔 코드 추가
  // location.reload();
});
submitButton.addEventListener("click", () => {});

const reviewsContents = localStorage.getItem("movieId");

// 처음 접속시 리뷰 리스트 조회
updateReviewList();

// 헤더 클릭 시 메인페이지로 들어가기
const gotoMainpage = () => {
  window.location.href = "index.html";
};

document.getElementById("main").addEventListener("click", gotoMainpage);
