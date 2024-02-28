//주문수정버튼 페이지이동 이벤트
document.getElementById("btnModifyOrder").addEventListener("click", function() {
    location.href = "/order-modify/index.html";
});

//교환반품 페이지이동 이벤트
document.getElementById("btnReturnOrder").addEventListener("click", function() {
    location.href = "/return/index.html";
});

//문의버튼 페이지이동 이벤트
document.getElementById("btnQuestion").addEventListener("click", function() {
    location.href = "/pdt-info/#pdt-selling-question";
});