async function fetchCategoryId(categoryName) {
  const res = await fetch('http://127.0.0.1:3000/api/v1/categories')
  const resData = await res.json()
  if (!resData || !Array.isArray(resData.data)) {
    console.error('카테고리 데이터가 유효하지 않습니다.')
    return null
  }
  const category = resData.data.find(cat => cat.name === categoryName)
  return category ? category._id : null
}

// 제품 API에서 해당 카테고리의 제품을 조회
async function productsByCategory(categoryName) {
  const categoryId = await fetchCategoryId(categoryName)
  if (!categoryId) {
    console.error('카테고리를 찾을 수 없습니다.')
    return
  }
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/v1/products?categoryId=${categoryId}`)
    const resData = await res.json()
    if (!resData || !Array.isArray(resData.data)) {
      console.error('제품 데이터가 유효하지 않습니다.')
      return
    }
    updateCategoryName(categoryName)
    checkProducts(resData.data)
  } catch (error) {
    console.error('제품을 조회하는 중 에러가 발생했습니다:', error)
  }
}

// 카테고리 이름 업데이트
function updateCategoryName(categoryName) {
  document.getElementById('categoryName').innerText = categoryName;
}

// 제품 목록 체크하여 화면에 표시
function checkProducts(products) {
  const productList = document.getElementById('pdtList')
  const productHTML = products.map(product => `
    <li class="pdt-list-item">
      <div class="pdt-box">
        <div class="pdt-content-image">
          <a href="/pdt-info/">
            <img src="${product.image}" alt="${product.name}">
          </a>
        </div>
        <div class="pdt-content-image-info">
          <p class="pdt-name">
            <a href="/pdt-info/">${product.name}</a>
          </p>
          <p class="pdt-price">
            <span>${product.price.toLocaleString('ko-KR')}원</span>
          </p>
        </div>
      </div>
    </li>
  `).join('')
  productList.innerHTML = productHTML
}

// 페이지 로드 시 카테고리 이름 파라미터를 가져와 해당 카테고리의 제품 조회
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search)
  const categoryName = urlParams.get('category')
  if (categoryName) {
    productsByCategory(categoryName)
  }
})