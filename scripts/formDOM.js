const params = new URLSearchParams(window.location.search);
const empId = params.get("id");

/* ================== EDIT MODE ================== */

if (empId) {
  fetch(`http://localhost:3000/empeloye/${empId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").value = data.name;
      document.getElementById("salary").value = data.salary;

      document.querySelector(`input[name="gender"][value="${data.gender}"]`).checked = true;
      document.querySelector(`input[name="profile"][value="${data.img}"]`).checked = true;

      data.department.forEach(dep => {
        document.querySelector(`.department[value="${dep}"]`).checked = true;
      });

      document.getElementById("day").value = data.start_date[0];
      document.getElementById("month").value = data.start_date[1];
      document.getElementById("year").value = data.start_date[2];
    });
}

/* ================== VALIDATION HELPERS ================== */
function showError(id) {
  document.getElementById(id).classList.remove("d-none");
}

function hideError(id) {
  document.getElementById(id).classList.add("d-none");
}

function validateForm() {
  let isValid = true;

  const name = document.getElementById("name").value.trim();
  const salary = document.getElementById("salary").value;
  const img = document.querySelector("input[name='profile']:checked");
  const gender = document.querySelector("input[name='gender']:checked");
  const dept = Array.from(
    document.querySelectorAll(".department:checked")
  ).map(dep => dep.value);

  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;
  let nv = true;
  let pr = true;
  // Name
  if (name.length < 3) {
    showError("name-error");
    isValid = false;
  }
  else {
    hideError("name-error");
    const us = []
    fetch(`http://localhost:3000/empeloye`)
      .then(res => res.json())
      .then(data => {
        console.log("data:",data)
        data.forEach(n => {
          console.log("e" ,n)
          us.push(n.name);
        })
        console.log("us",us)
        console.log("nm",name)
        console.log("nm",us[0])
        console.log(us.includes(name))

      });
    // if (!us.includes(name)) {
    //   // nv = false;
    //   console.log("nv",nv)
    //   // showError("name-present");

    // }else{
    //   nv = false;
    //   console.log("nv",nv)
    //   showError("name-present");
    // }
  }

  // profile
  if (!img) {
    showError("img-error");
    isValid = false;
  } else hideError("img-error");

  // Gender
  if (!gender) {
    showError("gender-error");
    isValid = false;
  } else hideError("gender-error");

  // Department
  if (dept[0] == null) {
    showError("dep-error");
    isValid = false;
  } else hideError("dep-error");

  // Salary
  if (salary === "Select Salary") {
    showError("salary-error");
    isValid = false;
  } else hideError("salary-error");

  // Date
  if (day === "Day" || month === "Month" || year === "Year") {
    showError("date-error");
    isValid = false;
  } else hideError("date-error");

  return isValid;
}

/* ================== SUBMIT ================== */
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const name = document.getElementById("name").value;
  const img = document.querySelector("input[name='profile']:checked")?.value;
  const gender = document.querySelector("input[name='gender']:checked")?.value;

  const department = Array.from(
    document.querySelectorAll(".department:checked")
  ).map(dep => dep.value);

  const salary = document.getElementById("salary").value;

  const start_date = [
    Number(document.getElementById("day").value),
    Number(document.getElementById("month").value),
    Number(document.getElementById("year").value)
  ];

  const employeeData = {
    id: empId ? Number(empId) : undefined,
    img,
    name,
    gender,
    department,
    salary,
    start_date
  };

  const url = empId
    ? `http://localhost:3000/empeloye/${empId}`
    : "http://localhost:3000/empeloye";

  const method = empId ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData)
  });

  form.reset();
  window.location.href = "../index.html";
});

/* ================== UX IMPROVEMENTS ================== */
document.getElementById("name").addEventListener("input", () => hideError("name-error"));
document.getElementById("salary").addEventListener("change", () => hideError("salary-error"));
document.getElementById("day").addEventListener("change", () => hideError("day-error"));
document.getElementById("month").addEventListener("change", () => hideError("month-error"));
document.getElementById("year").addEventListener("change", () => hideError("year-error"));
