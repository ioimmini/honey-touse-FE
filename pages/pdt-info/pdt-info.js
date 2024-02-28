//상품 옵션 이벤트
let optionItemList = [
  {
      id: 1,
      name: "크래킹 스냅 레글런 후드티",
      category: 1, // 카테고리->카테고리인덱스?
      price: 58000,
      image: "/img/pl_01.jpg",
      allOption: {
          size: ['S', 'M', 'L'],
          color: ['블랙', '그레이', '화이트']
      },
      choiceOption: {
          size: 'S',
          color: "블랙"
      },
      count: 1, //사용자가 장바구니에 담아놓은 수량
      isChecked: false
  },
  {
      id: 2,
      name: "1인용 원룸 일체형 매트리스 싱글침대 슈퍼싱글침대",
      category: 1,
      price: 119000,
      image: "/img/pl_02.jpg",
      allOption: {
          size: ['싱글 S', '슈퍼싱글 SS'],
      },
      choiceOption: {
          size: '싱글 S',
      },
      count: 2,
      isChecked: false
  },
  {
      id: 3,
      name: "농담곰 무드등",
      category: 1,
      price: 89000,
      image: "/img/pl_03.jpg",
      allOption: {
          size: ['소형', '중형'],
      },
      choiceOption: {
          size: '소형',
      },
      count: 3,
      isChecked: false
  },
]

//이미지 슬라이드
new Swiper('.pdt-info .swiper', {
  loop: true,
  speed: 500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.pdt-selling-cover-image_list',
    clickable: true,
    renderBullet: function(index, className) {
      return  '<li class="' + className + '"><img>' + (getCustomImage[index]) + '</img></li>'
    },
  },
})

// 이미지 주소 가져오기 방법?
function getImagesFromOptionItemList(optionItemList) {
  return optionItemList.map(item => item.image);
}

// 해당 인덱스에 맞는 이미지 주소 가져오기 방법??
function getCustomImage(index) {
  let images = getImagesFromOptionItemList(optionItemList);
  return images[index];
}

//상품 이름 설정
const pdtId = 1; //예시 상품 아이디

// 리스트에서 가져오기
const selectedPdt = optionItemList.find(item => item.id === pdtId)
document.querySelector('.pdt-name').textContent = selectedPdt.name;
document.querySelector('.pdt-number').textContent = selectedPdt.price;

const $optionContainer = document.querySelector('.selling-option-select-input_option')
const $optionList = document.getElementById('optionList')
//각 옵션에 대한 select 태그 생성
function createSelect(options, optionType) {
  const optionSelect = document.createElement('select')
  optionSelect.id = `${optionType}Options`
  optionSelect.classList.add('pdt-option-select')
  optionSelect.innerHTML = `<option value="">-- ${optionType} 선택 --</option>`
  for(let option of options) {
    const optionEl = document.createElement('option')
    optionEl.value = option
    optionEl.textContent = option
    optionSelect.appendChild(optionEl)
  }
  return optionSelect
}

//모든 옵션에 대한 select 태그 추가
for (let key in selectedPdt.allOption) {
  const selectEl = createSelect(selectedPdt.allOption[key], key)
  $optionContainer.appendChild(selectEl)
}
//선택된 옵션 저장
let selectedOptions = []

$optionContainer.addEventListener("change", function() {
    const allSelects = Array.from($optionContainer.querySelectorAll('select'));
    const allValues = allSelects.map(select => select.value)

    // 모든 옵션 선택되었는지 확인
    const allOptionSelected = allValues.every(value => value !== '')

    // 모든 옵션이 선택되었을 때 정보 업데이트
    if (allOptionSelected) {
        const optionKey = allValues.join('-'); // 선택된 옵션들을 구분하기 위한 키 생성

        // 이미 선택된 옵션인지 확인
        if (!selectedOptions.includes(optionKey)) {
            $optionList.innerHTML += `
        <li data-option="${optionKey}">
          <h3 class="pdt-title">${selectedPdt.name}</h3>
          <div class="pdt-options">
            ${allValues.map((value, index) => `<span>${Object.keys(selectedPdt.allOption)[index]}: ${value}</br></span>`).join('')}
          </div
          <div class="pdt-close_button">
              <button onclick="deleteOptionLi(this)">
                  <i class="fa-solid fa-xmark"></i>
              </button>
          </div>
          <div class="pdt-info-container-inner">
            <div class="pdt-quantity">
                <button onclick="decreaseCount(this)">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <span class="pdt_count">${selectedPdt.count}</span>
                <button onclick="increaseCount(this)">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div> 
            <div class="pdt_price">
              <p>${(selectedPdt.price * selectedPdt.count).toLocaleString('ko-KR')}원</p>
            </div>
          </div> 
        </li>
      `
      //선택된 옵션 추가
      selectedOptions.push(optionKey)
      updateOrderPrice()
    } else {
      alert('이미 선택된 옵션입니다.')
    }
    // 선택된 옵션 초기화
    allSelects.forEach(select => {
      select.selectedIndex = 0
    })
  }
})

// 옵션 삭제
function deleteOptionLi(button) {
  const li = button.closest('li')
  if (li) {
      const optionKey = li.getAttribute('data-option')

      // 선택된 옵션 배열에서 제거
      const index = selectedOptions.indexOf(optionKey)
      if (index !== -1) {
          selectedOptions.splice(index, 1)
      }
      li.remove()

      // 삭제된 옵션을 다시 사용 가능하도록 설정
      enableOption(optionKey)
      updateOrderPrice()
  }
}

// 삭제된 옵션을 다시 사용 가능하도록 설정하는 함수
function enableOption(optionKey) {
  if (optionKey) { // 옵션 키가 null이 아닌 경우에만 처리
      const optionValues = optionKey.split('-')
      const allSelects = Array.from($optionContainer.querySelectorAll('select'))

      allSelects.forEach(select => {
          const optionType = select.id.replace('Options', '')
          const optionValue = optionValues.find(value => value.startsWith(optionType))
          
          // 현재 선택된 옵션이 삭제된 옵션이면 다시 사용 가능하도록 설정
          if (optionValue) {
              const optionElement = select.querySelector(`option[value="${optionValue}"]`)
              if (optionElement) { // 옵션 요소가 존재하는 경우에만 처리
                  optionElement.disabled = false
              }
          }
      })
  }
}
// 수량 증가
function increaseCount(button) {
  const li = button.closest('li');
  if (li) {
      const pdtCount = li.querySelector('.pdt_count');
      const pdtPrice = li.querySelector('.pdt_price p');

      let count = parseInt(pdtCount.textContent);
      count++;
      pdtCount.textContent = count;

      updatePrice(li)
      updateOrderPrice()
  }
}

// 수량 감소
function decreaseCount(button) {
  const li = button.closest('li');
  if (li) {
      const pdtCount = li.querySelector('.pdt_count');
      const pdtPrice = li.querySelector('.pdt_price p');

      let count = parseInt(pdtCount.textContent);
      if (count > 1) {
          count--;
          pdtCount.textContent = count;

          updatePrice(li)
          updateOrderPrice()
      }
  }
}

// // 가격 업데이트 
function updatePrice(li) {
  const pdtCount = li.querySelector('.pdt_count');
  const pdtPrice = li.querySelector('.pdt_price p');

  const count = parseInt(pdtCount.textContent);
  const pricePerItem = selectedPdt.price; // 상품의 가격 가져오기
  const totalPrice = count * pricePerItem;

  pdtPrice.textContent = totalPrice.toLocaleString('ko-KR') + '원';
}

// 총 주문 금액 업데이트
function updateOrderPrice() {
  const $allLiItems = $optionList.querySelectorAll('li');
  let totalPrice = 0;

  $allLiItems.forEach(li => {
    const pdtPrice = li.querySelector('.pdt_price p');
    const priceText = pdtPrice.textContent.trim();
    const priceValue = parseInt(priceText.replace('원', '').replace(',', '')); // 숫자 값만 추출하여 사용합니다.
    totalPrice += priceValue;
  });

  const $pdtOrderPrice = document.querySelector('.pdt-order-price');
  $pdtOrderPrice.textContent = totalPrice.toLocaleString('ko-KR') + '원';
}
//장바구니와 바로구매

//데이터 저장
function addToBasket() {
  const selectedOPtionsEls = document.querySelectorAll('#optionList li')
  const basketItems = []
  selectedOPtionsEls.forEach(function(optionEl) {
    const productName = optionEl.querySelector('.pdt-title').textContent
    const selectedOptions = optionEl.querySelectorAll('.pdt-options span')
    const options = {}
    selectedOptions.forEach(function(span) {
      const [optionName, optionValue] = span.textContent.split(": ")
      options[optionName] = optionValue
    })
    const count = parseInt(optionEl.querySelector(".pdt_count").textContent)
    const totalPrice = optionEl.querySelector('.pdt_price p').textContent
    basketItems.push({productName, options, count, totalPrice})
  })
  //출력 예시
  console.log("추가된 상품:")
  basketItems.forEach(function (item){
    console.log(item)
  })
}

//바로구매
const $pdtBuyBtn =document.getElementById('pdtBuyBtn')

$pdtBuyBtn.addEventListener('click', function() {
  const $selectedOptionsEls = document.querySelectorAll('#optionList li')

  if($selectedOptionsEls.length > 0) {
    addToBasket()
    window.location.href = "/checkout/"
  } else {
    alert("옵션을 선택해 주세요.")
  }
})


//장바구니
document.addEventListener("DOMContentLoaded",function() {
  const $pdtBasketBtn = document.getElementById('pdtBasketBtn')
  const $pdtmodal = document.querySelector('.alertly')
  const $goShoppingBtn = document.getElementById('goShoppingBtn')
  const $goBasketBtn = document.getElementById('goBasketBtn')

  $pdtBasketBtn.addEventListener('click', function() { 
    const selectedOPtionsEls = document.querySelectorAll('#optionList li')
    if(selectedOPtionsEls.length > 0) {
      //장바구니에 정보 전달
      addToBasket()
      $pdtmodal.style.display = 'block'
    } else {
      alert("옵션을 선택해 주세요.")
    }
  })
  $optionContainer.addEventListener('change', function() {
    updateBasketBtn()
  })

  function updateBasketBtn() {
    const selectedOPtionsEls = document.querySelectorAll('#optionList li')
    if(selectedOPtionsEls.length > 0) {
      $pdtBasketBtn.disabled = false
    } else {
      $pdtBasketBtn.disabled = true
    }
  }
  $goShoppingBtn.addEventListener('click', function() {
    $pdtmodal.style.display = 'none'
  })
  
  $goBasketBtn.addEventListener("click", function() {
    window.location.href = "javascript:void(0)"
    window.location.href = "/basket/"
    console.log("성공입니당")
  })
})

// nav 클릭 이벤트
let navItems = document.querySelectorAll('.pdt-selling-nav_item')
navItems.forEach(function(item) {
    item.addEventListener('click', function() {
        navItems.forEach(function(item) {
          item.classList.remove('pdt-selling-nav_item-active')
        });
        this.classList.add('pdt-selling-nav_item-active');
    })
})

//totop옵션
document.addEventListener("scroll", handleScroll)
let $toTopEl = document.querySelector(".to-top")
function handleScroll() {
  if(document.documentElement.scrollTop > 650) {
    $toTopEl.style.display = "block"
  } else {
    $toTopEl.style.display = "none"
  }
}

$toTopEl.addEventListener("click", scrollToTop)
function scrollToTop() {
  document.body.scrollTop = { //body는 사파리
    top : 0,
    behavior: "smooth", 
  }, 
  document.documentElement.scrollTop = {
    top : 0,
    behavior: "smooth", // documentElement는 윈도우 외 기타 등등
  }
}