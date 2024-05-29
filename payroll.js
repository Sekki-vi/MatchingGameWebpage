function calculatePay(hoursWorked) {
    const hourlyWage = 15;
    const maxRegularHours = 40;
    const overtimeRate=1.5;

    let regularPay = Math.min(hoursWorked, maxRegularHours) * hourlyWage;
    let overtimePay = Math.max(hoursWorked - maxRegularHours, 0) * overtimeRate * hourlyWage;

    return regularPay + overtimePay;
}

function generatePayrollTable() {
    let employeeHours = [];
    let totalPay = 0;
    let employeeCount = 0;

    while (true) {
        let userInput = prompt("Enter hours worked for employee (or -1 to finish):");

        let hoursWorked = parseInt(userInput);

        if (hoursWorked === -1) {
            break;
        }

        if (isNaN(hoursWorked) || hoursWorked < 0) {
            alert("Please enter a valid positive number for hours worked.");
            continue;
        }

        let pay = calculatePay(hoursWorked);

        totalPay += pay;
        employeeCount++;
        employeeHours.push({index: employeeCount, hours: hoursWorked, pay: pay});
    }

    let tableHTML = "<table border='1'><tr><th>Index</th><th>Hours Worked</th><th>Pay</th></tr>";
    for (let employee of employeeHours) {
        tableHTML += `<tr><td>${employee.index}</td><td>${employee.hours}</td><td>${employee.pay.toFixed(2)}</td></tr>`;
    }
    tableHTML += "</table>";

    let summaryHTML = `<p>Total Pay for All Employees: $${totalPay.toFixed(2)}</p>`;

    document.write(tableHTML);
    document.write(summaryHTML);
}

generatePayrollTable();