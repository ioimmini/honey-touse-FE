document.addEventListener("DOMContentLoaded", function () {
  // 주문 관리 버튼 클릭 시 주문 페이지 표시
  document.getElementById("orderBtn").addEventListener("click", function () {
    fetchOrdersPage();
  });
});

// 주문 관리 페이지 표시 함수
function fetchOrdersPage() {
  const jwt = localStorage.getItem("jwt");

  // 주문 목록 조회 API를 호출하여 주문 상태별 버튼을 동적으로 생성
  fetch("http://localhost:3000/api/v1/admin/orders", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const orders = data.data;
      console.log(orders);
      document.getElementById("content").innerHTML = `
          <div id="order-button">
            <button onclick="pending()">입금 대기</button>
            <button onclick="paid()">결제 완료</button>
            <button onclick="preparing()">배송 준비</button>
            <button onclick="shipping()">배송 중</button>
            <button onclick="delivered()">배송 완료</button>
            <button onclick="confirmed()">구매 확정</button>
          </div>
          `;
    })
    .catch((error) => {
      console.error("주문 관리 페이지를 가져오는 중 오류 발생:", error);
    });
}

function pending() {
  const jwt = localStorage.getItem("jwt");

  fetch(`http://localhost:3000/api/v1/admin/orders/status?status=입금 대기`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const orders = data.data;
      document.getElementById("content").innerHTML = `
          <div id="order-list">
          ${orders
            .map(
              (order) =>
                `
                <ul>
                <li><strong>주문ID:</strong> ${order._id}</li>
                <li><strong>주문상태:</strong> ${order.status}</li>
                <li><strong>주문자ID:</strong> ${order.customerId}</li>
                <li><strong>주문상품ID:</strong> ${order.product ? order.product.id : "없음"}</li>
                <li><strong>주문 수량:</strong> ${order.product ? order.product.count : "없음"}</li>
                <li><strong>주문 메모:</strong> ${order.memo}</li>
              </ul>
              <button onclick="editOrder('${order._id}', '${order.status}', '${order.memo}')">수정</button>
              <button onclick="deleteOrder('${order._id}')">삭제</button>
`
            )
            .join("")}
          </div>
          `;
    })
    .catch((error) => {
      console.error(
        `주문 상태가 입금 대기인 주문을 가져오는 중 오류 발생:`,
        error
      );
    });
}

function paid() {
  const jwt = localStorage.getItem("jwt");

  fetch(`http://localhost:3000/api/v1/admin/orders/status?status=결제 완료`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const orders = data.data;
      console.log(orders);
      document.getElementById("content").innerHTML = `
          <div id="order-list">
          ${orders
            .map(
              (order) =>
                `
                <ul>
                <li><strong>주문ID:</strong> ${order._id}</li>
                <li><strong>주문상태:</strong> ${order.status}</li>
                <li><strong>주문자ID:</strong> ${order.customerId}</li>
                <li><strong>주문상품ID:</strong> ${order.product ? order.product.id : "없음"}</li>
                <li><strong>주문 수량:</strong> ${order.product ? order.product.count : "없음"}</li>
                <li><strong>주문 메모:</strong> ${order.memo}</li>
              </ul>
              <button onclick="editOrder('${order._id}', '${order.status}', '${order.memo}')">수정</button>
              <button onclick="deleteOrder('${order._id}')">삭제</button>
`
            )
            .join("")}
          </div>
          `;
    })
    .catch((error) => {
      console.error(
        `주문 상태가 입금 대기인 주문을 가져오는 중 오류 발생:`,
        error
      );
    });
}

function preparing() {
  const jwt = localStorage.getItem("jwt");

  fetch(`http://localhost:3000/api/v1/admin/orders/status?status=배송 준비`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const orders = data.data;
      console.log(orders);
      document.getElementById("content").innerHTML = `
          <div id="order-list">
          ${orders
            .map(
              (order) =>
                `
                <ul>
                <li><strong>주문ID:</strong> ${order._id}</li>
                <li><strong>주문상태:</strong> ${order.status}</li>
                <li><strong>주문자ID:</strong> ${order.customerId}</li>
                <li><strong>주문상품ID:</strong> ${order.product ? order.product.id : "없음"}</li>
                <li><strong>주문 수량:</strong> ${order.product ? order.product.count : "없음"}</li>
                <li><strong>주문 메모:</strong> ${order.memo}</li>
              </ul>
              <button onclick="editOrder('${order._id}', '${order.status}', '${order.memo}')">수정</button>
              <button onclick="deleteOrder('${order._id}')">삭제</button>
`
            )
            .join("")}
          </div>
          `;
    })
    .catch((error) => {
      console.error(
        `주문 상태가 입금 대기인 주문을 가져오는 중 오류 발생:`,
        error
      );
    });
}

function shipping() {
  const jwt = localStorage.getItem("jwt");

  fetch(`http://localhost:3000/api/v1/admin/orders/status?status=배송 중`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const orders = data.data;
      console.log(orders);
      document.getElementById("content").innerHTML = `
          <div id="order-list">
          ${orders
            .map(
              (order) =>
                `
                <ul>
                <li><strong>주문ID:</strong> ${order._id}</li>
                <li><strong>주문상태:</strong> ${order.status}</li>
                <li><strong>주문자ID:</strong> ${order.customerId}</li>
                <li><strong>주문상품ID:</strong> ${order.product ? order.product.id : "없음"}</li>
                <li><strong>주문 수량:</strong> ${order.product ? order.product.count : "없음"}</li>
                <li><strong>주문 메모:</strong> ${order.memo}</li>
              </ul>
              <button onclick="editOrder('${order._id}', '${order.status}', '${order.memo}')">수정</button>
              <button onclick="deleteOrder('${order._id}')">삭제</button>
`
            )
            .join("")}
          </div>
          `;
    })
    .catch((error) => {
      console.error(
        `주문 상태가 입금 대기인 주문을 가져오는 중 오류 발생:`,
        error
      );
    });
}

function delivered() {
  const jwt = localStorage.getItem("jwt");

  fetch(`http://localhost:3000/api/v1/admin/orders/status?status=배송 완료`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const orders = data.data;
      console.log(orders);
      document.getElementById("content").innerHTML = `
          <div id="order-list">
          ${orders
            .map(
              (order) =>
                `
                <ul>
                <li><strong>주문ID:</strong> ${order._id}</li>
                <li><strong>주문상태:</strong> ${order.status}</li>
                <li><strong>주문자ID:</strong> ${order.customerId}</li>
                <li><strong>주문상품ID:</strong> ${order.product ? order.product.id : "없음"}</li>
                <li><strong>주문 수량:</strong> ${order.product ? order.product.count : "없음"}</li>
                <li><strong>주문 메모:</strong> ${order.memo}</li>
              </ul>
              <button onclick="editOrder('${order._id}', '${order.status}', '${order.memo}')">수정</button>
              <button onclick="deleteOrder('${order._id}')">삭제</button>
`
            )
            .join("")}
          </div>
          `;
    })
    .catch((error) => {
      console.error(
        `주문 상태가 입금 대기인 주문을 가져오는 중 오류 발생:`,
        error
      );
    });
}

function confirmed() {
  const jwt = localStorage.getItem("jwt");

  fetch(`http://localhost:3000/api/v1/admin/orders/status?status=구매 확정`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const orders = data.data;
      console.log(orders);
      document.getElementById("content").innerHTML = `
          <div id="order-list">
          ${orders
            .map(
              (order) =>
                `
                <ul>
                <li><strong>주문ID:</strong> ${order._id}</li>
                <li><strong>주문상태:</strong> ${order.status}</li>
                <li><strong>주문자ID:</strong> ${order.customerId}</li>
                <li><strong>주문상품ID:</strong> ${order.product ? order.product.id : "없음"}</li>
                <li><strong>주문 수량:</strong> ${order.product ? order.product.count : "없음"}</li>
                <li><strong>주문 메모:</strong> ${order.memo}</li>
              </ul>
              <button onclick="editOrder('${order._id}', '${order.status}', '${order.memo}')">수정</button>
              <button onclick="deleteOrder('${order._id}')">삭제</button>
`
            )
            .join("")}
          </div>
          `;
    })
    .catch((error) => {
      console.error(
        `주문 상태가 입금 대기인 주문을 가져오는 중 오류 발생:`,
        error
      );
    });
}

// 주문 수정 함수
function editOrder(orderId, status, memo) {
  const newStatus = prompt("새로운 주문 상태를 입력하세요:", status);
  const newMemo = prompt("새로운 주문 상태를 입력하세요:", memo);
  console.log(orderId, newStatus);
  if (
    newStatus === null ||
    newStatus.trim() === "" ||
    newMemo === null ||
    newMemo.trim() === ""
  ) {
    return;
  }

  const updatedData = {
    status: newStatus,
    memo: newMemo,
  };
  const jwt = localStorage.getItem("jwt");

  fetch(`http://localhost:3000/api/v1/admin/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("주문 수정 성공");
      fetchOrdersPage(); // 수정 후 페이지 다시 로드
    })
    .catch((error) => {
      console.error("주문 수정 중 오류 발생:", error);
    });
}

// 주문 삭제 함수
function deleteOrder(id) {
  if (!confirm("정말로 삭제하시겠습니까?")) {
    return;
  }
  const jwt = localStorage.getItem("jwt");

  fetch(`http://localhost:3000/api/v1/admin/orders/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("주문 삭제 성공");
      fetchOrdersPage(); // 삭제 후 페이지 다시 로드
    })
    .catch((error) => {
      console.error("주문 삭제 중 오류 발생:", error);
    });
}
