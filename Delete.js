// 리뷰를 저장 할 때 password를 입력받게 한다.
// 리뷰가 저장되면 랜덤으로 idReview 라는 값을 만들게 해서 리뷰를 서로 구분한다.
// 서로 겹치지 않게 만들어야하는데 작성 시간 + 랜덤 값이면 겹치지 않을 것 같다.


// index.html 에서 Delete 라는 버튼을 누르면 리뷰를 작성할 때 입력한 password와 비교하고,
// 저장된 값과 일치한다면 일치하는 id의 리뷰를 지운다



function Delete(inputPassword, password, idReview) { // "삭제 버튼을 누른뒤 입력한 비밀번호 = inputPassword" / "리뷰 작성시 입력한 비밀번호 = password" / "리뷰 작성시 생성된 id값 = idReview"를 가져온다.
    if (inputPassword === password) { // 비밀번호가 일치하는지 확인한다.
        localStorage.removeItem(idReview); // 같다면 idReview인 리뷰를 삭제한다.
    } else {
        alert('비밀번호가 일치하지 않습니다.') // 아니라면 알림창을 띄운다.
    }
}