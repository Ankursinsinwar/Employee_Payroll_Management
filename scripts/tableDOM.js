
const searchBtn = document.getElementById("search-btn");
const searchInp = document.getElementById("search-inp");

searchBtn.addEventListener("click", () => {
    searchBtn.style.display = "none";
    searchInp.style.display = "block";
    searchInp.focus();
});


document.addEventListener("click", async (e) => {
    if (e.target.closest(".edit-btn")) {
        const id = e.target.closest(".edit-btn").dataset.id;
        window.location.href = `template/form.html?id=${id}`;
    }

    if (e.target.closest(".delete-btn")) {
        const id = e.target.closest(".delete-btn").dataset.id;

        const confirmDelete = confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        await fetch(`http://localhost:3000/empeloye/${id}`, {
            method: "DELETE"
        });

        location.reload(); // refresh table
    }
});


async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/empeloye');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        users.reverse();


        const tb = document.getElementById('tbody');
        tb.innerHTML = '';

        users.forEach(user => {
            const trow = document.createElement('tr');


            const tname = document.createElement('td');
            tname.innerHTML = `<img src=${user.img} class="avatar" alt="😎">
          ${user.name}`;
            trow.appendChild(tname);

            const tgender = document.createElement('td');
            tgender.textContent = user.gender
            trow.appendChild(tgender);

            const tdep = document.createElement('td');
            user.department.forEach(dep => {
                const tspan = document.createElement('span');
                tspan.classList.add("badge", "badge-costum","mx-1");
                tspan.textContent = dep;
                tdep.appendChild(tspan);
            })
            trow.appendChild(tdep);


            const tsalary = document.createElement('td');
            tsalary.innerHTML += `&#8377; ${user.salary}`;
            trow.appendChild(tsalary);

            const tdate = document.createElement('td');
            tdate.innerHTML = `${user.start_date[0]} ${user.start_date[1]} ${user.start_date[2]}`;
            trow.appendChild(tdate);

            const taction = document.createElement('td');
            taction.innerHTML +=`<button class="btn btn-sm delete-btn" data-id="${user.id}"><i class="bi bi-trash3-fill"></i></button><button class="btn btn-sm edit-btn" data-id="${user.id}"><i class="bi bi-pencil-fill"></i></button>`;

            trow.appendChild(taction);

            tb.appendChild(trow);

        });
    } catch (error) {
        console.error('Could not fetch data:', error);
    }
}

fetchData();

const searchInput = document.getElementById("search-inp");

searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("#tbody tr");

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    const nameCell = cells[0].innerText.trim().toLowerCase();
    const depCell = cells[2].innerText.trim().toLowerCase();
    // console.log(nameCell);
    // console.log(depCell);
    row.style.display = (nameCell.includes(filter) || depCell.includes(filter)) ? "" : "none";
  });
});

