
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
        // 1. Fetch data from API
        const response = await fetch('http://localhost:3000/empeloye');

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 2. Parse the JSON
        const users = await response.json();
        users.reverse();


        // 3. Select the DOM element
        const tb = document.getElementById('tbody');

        // 4. Manipulate the DOM
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
                tspan.classList.add("badge", "badge-costum");
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

// Call the function
fetchData();

const searchInput = document.getElementById("search-inp");

searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("#tbody tr");

  rows.forEach(row => {
    const nameCell = row.querySelector("td").innerText.toLowerCase();
    row.style.display = nameCell.includes(filter) ? "" : "none";
  });
});

