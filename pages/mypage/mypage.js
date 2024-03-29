import { URL } from '../assets/js/constants.js'

// 모달팝업 선택자 모음
const modal = document.querySelector('.modal');
const btnOpenModal = document.querySelector('.profile_btn');
const btnOpenModalText = document.querySelector('.profile_click');
const btnCloseModal= document.querySelector('.user_cancle');
const btnCloseModal2= document.querySelector('.user_agree');
const jwt = localStorage.getItem('jwt');
const $userPassInput = document.querySelector('.user_pass_input');
const $userPassInput02 = document.querySelector('.user_pass_input-02');

btnOpenModal.addEventListener("click", ()=>{
    modal.style.display="flex";
});
btnOpenModalText.addEventListener("click", ()=>{
    modal.style.display="flex";
});
btnCloseModal.addEventListener("click", ()=>{
    modal.style.display="none";
});
btnCloseModal2.addEventListener("click", ()=>{
  modal.style.display="none";
});


// 유저 정보 불러오기 (마이페이지 메인)

fetch(`${URL}/auth/me`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+ localStorage.getItem("jwt")
    },
})
.then(response => response.json())
.then(data => {
  const email = data.data.email;
  const name = data.data.name;
  console.log(email);

  if(email) {
    document.querySelector("#userEmail").innerHTML = email
    document.querySelector("#userName").innerHTML = `${name} 님`
  }

}).catch((error) => {
  console.error('Error', error);
})

// 유저 정보 불러오기(팝업)

fetch(`${URL}/auth/me`, {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+ localStorage.getItem("jwt")
  },
})
.then(response => response.json())
.then(data => {
const email = data.data.email;
const name = data.data.name;
console.log(email);

if(email) {
  document.querySelector("#userEmailPop").innerHTML = email
  document.querySelector("#userNamePop").innerHTML = `${name} 님`
}

}).catch((error) => {
console.error('Error', error);
})


// 배송내역
fetch(`${URL}/orders`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json',
    }
}).then(response => response.json())
    .then(data => {
        const orders = data.data
        console.log(orders);
        //입금대기, 결제완료, 배송준비, 배송중, 배송완료, 구매확정
        let PaymentPendingArr = [];
        let PaymentCompletedArr = [];
        let DeliveryPendingArr = [];
        let DeliveryOngoingArr = [];
        let DeliveryCompletedArr = [];
        let PurchaseCompletedArr = [];


        data.data.forEach((el) => {

            if (el.status == "결제 완료") {
                PaymentCompletedArr.push(el);
            }
            if (el.status == "배송 준비") {
                DeliveryPendingArr.push(el);
            }
            if (el.status == "배송 중") {
                DeliveryOngoingArr.push(el);
            }
            if (el.status == "배송 완료") {
                DeliveryCompletedArr.push(el);
            }
            if (el.status == "구매 확정") {
                PurchaseCompletedArr.push(el);
            }

        })

        document.querySelector('.payment-completed-length').innerHTML = `${PaymentCompletedArr.length}`;
        document.querySelector('.delivery-pending-length').innerHTML = `${DeliveryPendingArr.length}`;
        document.querySelector('.delivery-ongoing-length').innerHTML = `${DeliveryOngoingArr.length}`;
        document.querySelector('.delivery-completed-length').innerHTML = `${DeliveryCompletedArr.length}`;
        document.querySelector('.purchase-completed-length').innerHTML = `${PurchaseCompletedArr.length}`;
       

        // orders.forEach(order => {
        //     `
            
        //     `


        //     console.log(order)
        //     orderStatus.innerHTML = order.status  // 배송상태
        //     // 날짜를 YYYY-MM-DD 형식으로 변환
        //     const createdAt= new Date(order.createdAt)
        //     const year = createdAt.getFullYear();
        //     const month = String(createdAt.getMonth() + 1).padStart(2, '0'); 
        //     const day = String(createdAt.getDate()).padStart(2, '0');
        //     const formattedDate = `${year}-${month}-${day}`; // 결제일
        //     orderDate.innerHTML = formattedDate
        //     orderImage.src = order.product[0].image // 상품 이미지
        //     orderProductName.innerHTML = order.product[0].name // 상품명
          
        //     orderProductOption.innerHTML = order.product[0].options
        //     orderProductPrice.innerHTML = `${order.payment.ttlPrice}원`
        //     orderProductCount.innerHTML = `${order.product[0].count}개`
        //     console.log(order.product[0].count)


        
    })
  

    fetch(`${URL}/orders`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + jwt,
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(data => {
            const order = data.data[data.data.length - 1];
            const orderContainer = document.getElementById('orders'); // 주문 목록을 표시할 요소 선택
    
            const li = document.createElement('li');
            li.classList.add('info-product', 'info-order');
            console.log(order)
            console.log('order 확인')

            let productId = order.product[0].id;
            fetch(`${URL}/products/` + productId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                }
            })
            .then(response => response.json())
            .then(pdtObject => {
                const product = pdtObject.data;
                console.log(product);
                // 주문 정보를 li 요소에 추가
                li.innerHTML = `
                    <div class="section_title">
                        <h2 style="padding: 0">${formatDate(order.createdAt)}</h2>
                    </div>
                    <article class="section_content order-in-progress wrap">
                        <p class="order-status">

                            ${order.status}<span class="_date sub-text">${order.updatedAt.slice(0, 10)}</span>

                            <a href="/order-list/"><span>상세보기>></span></a>
                        </p>
                        <div class="order_content">
                            <ul class="ordered-products">
                                <li class="info_line">
                                    <div class="product_img">
                                        <a href="/pdt-info/?id=${product._id}">
                                            <img src="${product.image}" alt="Product Image" />
                                        </a>
                                    </div>
                                    <div class="product_detail">
                                        <p style="margin-bottom: 10px">${product.name} 외 ${order.product.length}건</p>
                                        <p class="option sub-text">color: black</p>
                                        <p class="price">
                                            ${product.price.toLocaleString()}원
                                            <span class="qty sub-text">${order.product[0].count}개</span>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </article>
                    `;
                })
            .catch(error => {
                console.error('Error fetching data', error);
            });

            orderContainer.appendChild(li); // 새로운 주문 요소를 주문 목록에 추가
        });

// 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
function formatDate(dateString) {
    const createdAt = new Date(dateString);
    const year = createdAt.getFullYear();
    const month = String(createdAt.getMonth() + 1).padStart(2, '0');
    const day = String(createdAt.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
    

// 비밀번호 변경
btnCloseModal2.addEventListener("click", () => {
    if ($userPassInput.value == $userPassInput02.value) {
        fetch(`${URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .then(response => response.json())
            .then(data => {
                let email = data.data.email;
                let address = data.data.address;
                let addressDetail = data.data.addressDetail;

                let userData = {
                    email,
                    password: $userPassInput.value,
                    address,
                    addressDetail,
                }
                console.log(userData);
                fetch(`${URL}/auth/me`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + jwt,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        alert('비밀번호가 변경되었습니다');
                    });
            });
    }
});