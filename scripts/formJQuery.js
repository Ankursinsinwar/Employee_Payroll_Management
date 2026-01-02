const empId = new URLSearchParams(window.location.search).get("id");


if (empId) {
  $.get(`http://localhost:3000/empeloye/${empId}`, function (data) {
    $("#name").val(data.name);
    $("#salary").val(data.salary);

    $(`input[name="gender"][value="${data.gender}"]`).prop("checked", true);
    $(`input[name="profile"][value="${data.img}"]`).prop("checked", true);

    data.department.forEach(dep => {
      $(`.department[value="${dep}"]`).prop("checked", true);
    });

    $("#day").val(data.start_date[0]);
    $("#month").val(data.start_date[1]);
    $("#year").val(data.start_date[2]);
  });
}


function showError(id) {
  $("#" + id).removeClass("d-none");
}

function hideError(id) {
  $("#" + id).addClass("d-none");
}

function validateForm() {
  let isValid = true;

  const name = $("#name").val().trim();
  const salary = $("#salary").val();
  const img = $("input[name='profile']:checked").val();
  const gender = $("input[name='gender']:checked").val();
  const dept = $(".department:checked").map(function () {
    return this.value;
  }).get();

  const day = $("#day").val();
  const month = $("#month").val();
  const year = $("#year").val();

  // Name
  if (name.length < 3) {
    showError("name-error");
    isValid = false;
  } else {
    hideError("name-error");
  }

  // Profile
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
  if (dept.length === 0) {
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



$("form").on("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) return;

  const employeeData = {
    id: empId ? Number(empId) : undefined,
    img: $("input[name='profile']:checked").val(),
    name: $("#name").val(),
    gender: $("input[name='gender']:checked").val(),
    department: $(".department:checked").map(function () {
      return this.value;
    }).get(),
    salary: $("#salary").val(),
    start_date: [
      Number($("#day").val()),
      Number($("#month").val()),
      Number($("#year").val())
    ]
  };

  $.ajax({
    url: empId
      ? `http://localhost:3000/empeloye/${empId}`
      : "http://localhost:3000/empeloye",
    method: empId ? "PUT" : "POST",
    contentType: "application/json",
    data: JSON.stringify(employeeData),
    success: function () {
      $("form")[0].reset();
      window.location.href = "../index.html";
    }
  });
});



$("#name").on("input", () => hideError("name-error"));
$("input[name='gender']").on("change", () => hideError("gender-error"));
$("input[name='profile']").on("change", () => hideError("img-error"));
$(".department").on("change", () => hideError("dep-error"));
$("#salary").on("change", () => hideError("salary-error"));
$("#day, #month, #year").on("change", () => hideError("date-error"));
