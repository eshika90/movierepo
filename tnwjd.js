{
  /* <div id="comments">
        <div>
            <div class="comment">
                <div class="content">첫 번째 댓글</div>
                <button class="edit-button">수정</button>
            </div>
        </div>
    </div> */
}
// html예시

// 댓글 목록과 수정된 댓글 내용을 저장할 배열
let comments = ["첫 번째 댓글"];

// 수정 버튼 클릭 시 이벤트 핸들러
function handleEdit(event) {
  const commentDiv = event.target.parentNode;
  const contentDiv = commentDiv.querySelector(".content");
  const editButton = commentDiv.querySelector(".edit-button");

  const commentIndex = Array.from(commentDiv.parentNode.children).indexOf(
    commentDiv
  );

  // 입력 폼 생성
  const editInput = document.createElement("input");
  editInput.value = comments[commentIndex];

  // 수정 버튼을 입력 폼으로 변경
  editButton.textContent = "저장";
  editButton.removeEventListener("click", handleEdit);
  editButton.addEventListener("click", handleSave);

  // 기존 내용 숨기고 입력 폼 표시
  contentDiv.style.display = "none";
  commentDiv.insertBefore(editInput, editButton);
}

// 저장 버튼 클릭 시 이벤트 핸들러
function handleSave(event) {
  const commentDiv = event.target.parentNode;
  const contentDiv = commentDiv.querySelector(".content");
  const editButton = commentDiv.querySelector(".edit-button");
  const editInput = commentDiv.querySelector("input");

  const commentIndex = Array.from(commentDiv.parentNode.children).indexOf(
    commentDiv
  );

  // 수정된 댓글 내용 저장
  comments[commentIndex] = editInput.value;

  // 입력 폼을 내용으로 변경
  editButton.textContent = "수정";
  editButton.removeEventListener("click", handleSave);
  editButton.addEventListener("click", handleEdit);

  // 입력 폼 숨기고 내용 표시
  contentDiv.textContent = editInput.value;
  contentDiv.style.display = "block";

  // 입력 폼 제거
  commentDiv.removeChild(editInput);
}

// 수정 버튼에 이벤트 핸들러 등록
const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((button) => {
  button.addEventListener("click", handleEdit);
});
