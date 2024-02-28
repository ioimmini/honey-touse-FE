const $exchangeButton = document.getElementById('btnExchange');
const $returnButton = document.getElementById('btnReturn');
const $infoExchange = document.getElementById('infoExchange');
const $infoReturn = document.getElementById('infoReturn');
const $submitButton = document.getElementById('btnSubmit');

//교환&반품 버튼 클릭 이벤트

// 교환 버튼 클릭 시 옵션 선택과 배송비 기재란을 보이게 함
$exchangeButton.addEventListener('click', function(e) {
    e.preventDefault();
    $infoExchange.classList.remove('hidden');
    $infoReturn.classList.add('hidden');
    $submitButton.classList.remove('hidden');

    choiceOption();
});

// 취소 버튼 클릭 시 취소 사유 입력란과 환불예정금액 기재란을 보이게 함
$returnButton.addEventListener('click', function(e) {
    e.preventDefault();
    $infoExchange.classList.add('hidden');
    $infoReturn.classList.remove('hidden');
    $submitButton.classList.remove('hidden');
});

//옵션 선택한 것들 p태그에 넣어서 출력하기
const selects = document.getElementsByTagName('select');
const $selectedText = document.getElementById('selectedText');

Array.from(selects).forEach(select => {
    select.addEventListener('change', function () {
        let optionsText = ''; // 선택된 옵션들의 텍스트 값을 저장할 변수를 선언합니다.

        // 현재 select에서 선택된 모든 옵션들의 텍스트 값을 가져와서 optionsText에 추가합니다.
        Array.from(select.selectedOptions).forEach(option => {
            optionsText += `${select.options[0].text} : ${option.text} / `;
        });
        
        // optionsText를 출력합니다.
        $selectedText.innerHTML = optionsText;
    });
});
