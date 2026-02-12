let employees = JSON.parse(localStorage.getItem('employees')) || [];
let editId = null;

const fioInput = document.getElementById('fio');
const deptInput = document.getElementById('department');
const phoneInput = document.getElementById('phone');
const mainBtn = document.getElementById('mainBtn');

function renderTable() {
    let tableHtml = `
        <div class="search-box">
            <input type="text" id="search" placeholder="Поиск по имени..." oninput="filterTable()">
        </div>
        <table id="empTable">
            <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Отдел</th>
                    <th>Телефон</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
    `;

    employees.forEach(emp => {
        tableHtml += `
            <tr>
                <td>${emp.fio}</td>
                <td>${emp.department}</td>
                <td>${emp.phone}</td>
                <td>
                    <button class="btn-edit" onclick="editEmployee(${emp.id})">Редактировать</button>
                    <button class="btn-delete" onclick="deleteEmployee(${emp.id})">Удалить</button>
                </td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table>`;
    
    const existingTable = document.querySelector('table');
    const existingSearch = document.querySelector('.search-box');
    if (existingTable) existingTable.remove();
    if (existingSearch) existingSearch.remove();
    
    document.body.insertAdjacentHTML('beforeend', tableHtml);
}

function saveEmployee() {
    const fio = fioInput.value.trim();
    const department = deptInput.value;
    const phone = phoneInput.value.trim();

    if (!fio || !department || !phone) return;

    if (editId) {
        employees = employees.map(emp => emp.id === editId ? { id: editId, fio, department, phone } : emp);
        editId = null;
        mainBtn.textContent = "Добавить сотрудника";
    } else {
        const newEmployee = {
            id: Date.now(),
            fio,
            department,
            phone
        };
        employees.push(newEmployee);
    }

    localStorage.setItem('employees', JSON.stringify(employees));
    clearInputs();
    renderTable();
}

function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    fioInput.value = emp.fio;
    deptInput.value = emp.department;
    phoneInput.value = emp.phone;
    editId = id;
    mainBtn.textContent = "Обновить данные";
}

function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderTable();
}

function filterTable() {
    const query = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#empTable tbody tr');
    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        row.style.display = name.includes(query) ? '' : 'none';
    });
}

function clearInputs() {
    fioInput.value = '';
    deptInput.value = '';
    phoneInput.value = '';
}

renderTable();