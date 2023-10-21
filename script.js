
const subjectForm = document.getElementById('subject-form');
const scheduleTable = document.getElementById('schedule-table');
const searchInput = document.getElementById('search');

subjectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const subject = document.getElementById('subject').value;
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    const room = document.getElementById('room').value;
    const instructor = document.getElementById('instructor').value;

   
    if (subjectForm.getAttribute('data-action') === 'edit') {
        editRow(subject, day, time, room, instructor);
        subjectForm.setAttribute('data-action', 'add');
        clearForm();
    } else {
        addRowToTable(subject, day, time, room, instructor);
        clearForm();
    }
});


scheduleTable.addEventListener('click', function (e) {
    if (e.target && e.target.nodeName === "BUTTON") {
        let tr = e.target.parentNode.parentNode;

        if (e.target.classList.contains('delete-btn')) {
            deleteRow(tr);
        } else if (e.target.classList.contains('edit-btn')) {
            editForm(tr);
        }
    }
});


function addRowToTable(subject, day, time, room, instructor) {
    let tbody = scheduleTable.getElementsByTagName('tbody')[0];
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${subject}</td>
        <td>${day}</td>
        <td>${time}</td>
        <td>${room}</td>
        <td>${instructor}</td>
        <td><button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></td>
    `;
    tbody.appendChild(tr);
}

function editForm(row) {
    let cells = row.getElementsByTagName('td');
    document.getElementById('subject').value = cells[0].textContent;
    document.getElementById('day').value = cells[1].textContent;
    document.getElementById('time').value = cells[2].textContent;
    document.getElementById('room').value = cells[3].textContent;
    document.getElementById('instructor').value = cells[4].textContent;

    subjectForm.setAttribute('data-action', 'edit');
    subjectForm.setAttribute('data-editing-row', row);
}


function editRow(subject, day, time, room, instructor) {
    let row = subjectForm.getAttribute('data-editing-row');
    let cells = row.getElementsByTagName('td');
    cells[0].textContent = subject;
    cells[1].textContent = day;
    cells[2].textContent = time;
    cells[3].textContent = room;
    cells[4].textContent = instructor;

    clearForm();
}


function deleteRow(row) {
    row.parentNode.removeChild(row);
}


function clearForm() {
    document.getElementById('subject-form').reset();
}


function searchSubjects() {
    let filter = searchInput.value.toUpperCase();
    let rows = scheduleTable.getElementsByTagName('tr');
    
    for (let row of rows) {
        let cells = row.getElementsByTagName('td');
        if (cells && cells.length > 0) {
            let subjectCell = cells[0];
            if (subjectCell) {
                let subject = subjectCell.textContent || subjectCell.innerText;
                if (subject.toUpperCase().indexOf(filter) > -1) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        }
    }
}
