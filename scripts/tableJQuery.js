$(document).ready(function () {

  const searchBtn = $("#search-btn");
  const searchInp = $("#search-inp");

  searchBtn.on("click", function () {
    searchBtn.hide();
    searchInp.show().focus();
  });


  $(document).on("click", async function (e) {

    const editBtn = $(e.target).closest(".edit-btn");
    const deleteBtn = $(e.target).closest(".delete-btn");

    if (editBtn.length) {
      const id = editBtn.data("id");
      window.location.href = `template/form.html?id=${id}`;
    }

    if (deleteBtn.length) {
      const id = deleteBtn.data("id");

      // const confirmDelete = confirm("Are you sure you want to delete?");
      // if (!confirmDelete) return;

      await fetch(`http://localhost:3000/empeloye/${id}`, {
        method: "DELETE"
      });

      location.reload();
    }
  });


  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/empeloye");

      if (!response.ok) {
        throw new Error(`Can't fetch data: ${response.status}`);
      }

      const users = await response.json();
      users.reverse();

      const tb = $("#tbody");
      tb.empty();

      users.forEach(user => {
        const trow = $("<tr>");

        const tname = $(`
          <td>
            <img src="${user.img}" class="avatar" alt="😎">
            ${user.name}
          </td>
        `);
        trow.append(tname);

        const tgender = $("<td>").text(user.gender);
        trow.append(tgender);

        const tdep = $("<td>");
        user.department.forEach(dep => {
          const tspan = $("<span>")
            .addClass("badge badge-costum")
            .text(dep);
          tdep.append(tspan);
        });
        trow.append(tdep);

        const tsalary = $("<td>").html(`&#8377; ${user.salary}`);
        trow.append(tsalary);

        const tdate = $("<td>").html(
          `${user.start_date[0]} ${user.start_date[1]} ${user.start_date[2]}`
        );
        trow.append(tdate);

        const taction = $(`
          <td>
            <button class="btn btn-sm delete-btn" data-id="${user.id}">
              <i class="bi bi-trash3-fill"></i>
            </button>
            <button class="btn btn-sm edit-btn" data-id="${user.id}">
              <i class="bi bi-pencil-fill"></i>
            </button>
          </td>
        `);

        trow.append(taction);
        tb.append(trow);
      });

    } catch (error) {
      console.error("Could not fetch data:", error);
    }
  }

  fetchData();

  /* ================= SEARCH ================= */

  $("#search-inp").on("input", function () {
    const inp = $(this).val().toLowerCase();

    $("#tbody tr").each(function () {
      const nameRow = $(this).find("td:first").text().toLowerCase();
      $(this).toggle(nameRow.includes(inp));
    });
  });

});
