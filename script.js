const employees = [
  {
    id: 'EMP-1001',
    name: 'Alicia Morgan',
    department: 'Engineering',
    role: 'Senior Software Engineer',
    location: 'Austin, TX',
    manager: 'Daniel Lee',
    status: 'Active',
    hireDate: '2021-04-18',
    years: 5,
    email: 'alicia.morgan@company.com',
    phone: '(512) 555-0181',
    salary: 148000,
    remote: true
  },
  {
    id: 'EMP-1002',
    name: 'Marcus Chen',
    department: 'Finance',
    role: 'Senior Financial Analyst',
    location: 'Chicago, IL',
    manager: 'Maya Patel',
    status: 'Active',
    hireDate: '2019-08-03',
    years: 7,
    email: 'marcus.chen@company.com',
    phone: '(312) 555-0138',
    salary: 132000,
    remote: false
  },
  {
    id: 'EMP-1003',
    name: 'Sarah Gomez',
    department: 'Human Resources',
    role: 'People Partner',
    location: 'Remote',
    manager: 'Priya Singh',
    status: 'On Leave',
    hireDate: '2020-11-12',
    years: 6,
    email: 'sarah.gomez@company.com',
    phone: '(415) 555-0163',
    salary: 118000,
    remote: true
  },
  {
    id: 'EMP-1004',
    name: 'Noah Brooks',
    department: 'Sales',
    role: 'Account Executive',
    location: 'Denver, CO',
    manager: 'Olivia Bennett',
    status: 'Active',
    hireDate: '2022-02-22',
    years: 3,
    email: 'noah.brooks@company.com',
    phone: '(303) 555-0149',
    salary: 98000,
    remote: false
  },
  {
    id: 'EMP-1005',
    name: 'Grace Kim',
    department: 'Engineering',
    role: 'Product Designer',
    location: 'Seattle, WA',
    manager: 'Daniel Lee',
    status: 'Active',
    hireDate: '2023-01-15',
    years: 2,
    email: 'grace.kim@company.com',
    phone: '(206) 555-0117',
    salary: 124000,
    remote: true
  },
  {
    id: 'EMP-1006',
    name: 'Felix Martinez',
    department: 'Operations',
    role: 'Operations Manager',
    location: 'Miami, FL',
    manager: 'Nina Gomez',
    status: 'Active',
    hireDate: '2018-07-10',
    years: 8,
    email: 'felix.martinez@company.com',
    phone: '(305) 555-0174',
    salary: 142000,
    remote: false
  },
  {
    id: 'EMP-1007',
    name: 'Hannah Price',
    department: 'Marketing',
    role: 'Brand Strategist',
    location: 'Remote',
    manager: 'Will Foster',
    status: 'Contractor',
    hireDate: '2024-06-01',
    years: 1,
    email: 'hannah.price@company.com',
    phone: '(917) 555-0178',
    salary: 87000,
    remote: true
  },
  {
    id: 'EMP-1008',
    name: 'Isaac Patel',
    department: 'IT',
    role: 'Infrastructure Engineer',
    location: 'Boston, MA',
    manager: 'Marie Lewis',
    status: 'Active',
    hireDate: '2017-09-21',
    years: 9,
    email: 'isaac.patel@company.com',
    phone: '(617) 555-0108',
    salary: 154000,
    remote: false
  },
  {
    id: 'EMP-1009',
    name: 'Lena Wright',
    department: 'Customer Success',
    role: 'Customer Success Manager',
    location: 'Remote',
    manager: 'Evan Ross',
    status: 'Active',
    hireDate: '2021-12-06',
    years: 4,
    email: 'lena.wright@company.com',
    phone: '(646) 555-0134',
    salary: 106000,
    remote: true
  },
  {
    id: 'EMP-1010',
    name: 'Owen Davis',
    department: 'Engineering',
    role: 'QA Automation Engineer',
    location: 'Portland, OR',
    manager: 'Daniel Lee',
    status: 'Active',
    hireDate: '2022-08-14',
    years: 3,
    email: 'owen.davis@company.com',
    phone: '(503) 555-0160',
    salary: 116000,
    remote: false
  },
  {
    id: 'EMP-1011',
    name: 'Tara Nguyen',
    department: 'Finance',
    role: 'Payroll Specialist',
    location: 'Remote',
    manager: 'Maya Patel',
    status: 'On Leave',
    hireDate: '2020-03-01',
    years: 5,
    email: 'tara.nguyen@company.com',
    phone: '(646) 555-0115',
    salary: 91000,
    remote: true
  },
  {
    id: 'EMP-1012',
    name: 'Victor Gomez',
    department: 'Sales',
    role: 'Regional Sales Manager',
    location: 'Atlanta, GA',
    manager: 'Olivia Bennett',
    status: 'Active',
    hireDate: '2016-05-09',
    years: 10,
    email: 'victor.gomez@company.com',
    phone: '(404) 555-0188',
    salary: 167000,
    remote: false
  }
];

const searchInput = document.getElementById('searchInput');
const departmentFilter = document.getElementById('departmentFilter');
const statusFilter = document.getElementById('statusFilter');
const employeeTableBody = document.getElementById('employeeTableBody');
const resultCount = document.getElementById('resultCount');
const totalEmployees = document.getElementById('totalEmployees');
const activeEmployees = document.getElementById('activeEmployees');
const avgSalary = document.getElementById('avgSalary');
const remoteEmployees = document.getElementById('remoteEmployees');
const exportBtn = document.getElementById('exportBtn');

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function populateDepartmentFilter() {
  const departments = [...new Set(employees.map((employee) => employee.department))].sort();
  departments.forEach((department) => {
    const option = document.createElement('option');
    option.value = department;
    option.textContent = department;
    departmentFilter.appendChild(option);
  });
}

function getStatusClass(status) {
  if (status === 'Active') return 'status-active';
  if (status === 'On Leave') return 'status-leave';
  return 'status-contractor';
}

function getFilteredEmployees() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedDepartment = departmentFilter.value;
  const selectedStatus = statusFilter.value;

  return employees.filter((employee) => {
    const matchesSearch =
      !searchTerm ||
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.department.toLowerCase().includes(searchTerm) ||
      employee.role.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm) ||
      employee.location.toLowerCase().includes(searchTerm);

    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || employee.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });
}

function updateKpis(filteredEmployees) {
  const total = filteredEmployees.length;
  const active = filteredEmployees.filter((employee) => employee.status === 'Active').length;
  const remote = filteredEmployees.filter((employee) => employee.remote).length;
  const average = total
    ? filteredEmployees.reduce((sum, employee) => sum + employee.salary, 0) / total
    : 0;

  totalEmployees.textContent = total;
  activeEmployees.textContent = active;
  avgSalary.textContent = formatCurrency(average);
  remoteEmployees.textContent = remote;
}

function renderTable(filteredEmployees) {
  if (!filteredEmployees.length) {
    employeeTableBody.innerHTML = `
      <tr>
        <td colspan="12" class="empty-state">No employees match the current filters.</td>
      </tr>
    `;
    resultCount.textContent = '0 results';
    return;
  }

  employeeTableBody.innerHTML = filteredEmployees
    .map(
      (employee) => `
        <tr>
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.department}</td>
          <td>${employee.role}</td>
          <td>${employee.location}</td>
          <td>${employee.manager}</td>
          <td><span class="status-tag ${getStatusClass(employee.status)}">${employee.status}</span></td>
          <td>${new Date(employee.hireDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</td>
          <td>${employee.years}</td>
          <td>${employee.email}</td>
          <td>${employee.phone}</td>
          <td>${formatCurrency(employee.salary)}</td>
        </tr>
      `
    )
    .join('');

  resultCount.textContent = `${filteredEmployees.length} result${filteredEmployees.length === 1 ? '' : 's'}`;
}

function refreshDashboard() {
  const filteredEmployees = getFilteredEmployees();
  updateKpis(filteredEmployees);
  renderTable(filteredEmployees);
}

searchInput.addEventListener('input', refreshDashboard);
departmentFilter.addEventListener('change', refreshDashboard);
statusFilter.addEventListener('change', refreshDashboard);

exportBtn.addEventListener('click', () => {
  const filteredEmployees = getFilteredEmployees();
  const headers = [
    'ID',
    'Name',
    'Department',
    'Role',
    'Location',
    'Manager',
    'Status',
    'Hire Date',
    'Years',
    'Email',
    'Phone',
    'Salary'
  ];

  const rows = filteredEmployees.map((employee) => [
    employee.id,
    employee.name,
    employee.department,
    employee.role,
    employee.location,
    employee.manager,
    employee.status,
    employee.hireDate,
    employee.years,
    employee.email,
    employee.phone,
    employee.salary
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'employee_data.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

populateDepartmentFilter();
refreshDashboard();
