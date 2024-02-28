window.onload = async () => {
  const jwt = localStorage.getItem("jwt");
  const user = await fetch("http://localhost:3000/api/v1/auth/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwt,
    },
  }).then((response) => response.json());
  const role = user.data.role;
  if (role !== "admin" || jwt === null) {
    alert("너는 권한이 없단다. 아가야");
    window.location.href = "/";
  }
};
