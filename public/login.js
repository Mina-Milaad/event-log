document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://dm.s-badge.com/api/Authentication/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok || !data.token) {
      document.getElementById("error").innerText = data.message || "Login failed";
      return;
    }

    // حفظ الـ token + الـ role
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    // لو Admin → يروح للـ Dashboard
    if (data.role === "admin") {
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("error").innerText = "Access denied. Admins only.";
    }

  } catch (err) {
    console.error(err);
    document.getElementById("error").innerText = "Something went wrong";
  }
});
