const $orderDate = document.querySelector('.order_date');
const $orderNum = document.querySelector('.order_num');

const $receiverMemo = document.getElementById('receiverMemo');

//orders에서 data 가져오기
fetch('http://localhost:3000/api/v1/orders', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(object => {
    console.log(object)
    const datas = object.data;
    //data 객체에서 각 데이터값 가져오기
    const targetId = "65de9565544b3aedec22072a" //직전에 주문한 _id값 넣기
    const targetData = datas.find(data => data._id === targetId);
    if (targetData) {
        // 선택한 객체의 값 가져오기
        const { _id, status, customerId, product: { id, count }, memo, createdAt, updatedAt } = targetData;
        // 가져온 데이터 확인
        console.log(_id, status, customerId, id, count, memo, createdAt, updatedAt);
        $receiverMemo.textContent = memo;
        $orderDate.textContent = createdAt.slice(0, 10);
        $orderNum.textContent = $orderDate.textContent + _id.slice(0, 10);
    } else {
        console.log("해당 _id 값을 가진 주문을 찾을 수 없습니다.");
    }
    //배송정보        
    // $receiverName.value = name;
    // $receiverPhoneNumber.value = autoHypenPhone(phoneNumber);
    // $receiverAddress.value = address;
    // $receiverAddressDetail.value = addressDetail;
    })
.catch(error => {
    console.error('Error fetching data', error);
});
