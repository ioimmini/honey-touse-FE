const modal = document.querySelector('.modal');
const btnOpenModal = document.querySelector('.profile_btn');
const btnCloseModal= document.querySelector('.user_cancle');

btnOpenModal.addEventListener("click", ()=>{
    modal.style.display="flex";
});
btnCloseModal.addEventListener("click", ()=>{
    modal.style.display="none";
});
