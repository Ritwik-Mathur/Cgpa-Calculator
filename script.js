let courses = [];

function addSubject() {
    const index = courses.length;
    courses.push({ credits: 0, grade: 0 });

    const tableBody = document.getElementById("courseTable");
    const row = document.createElement("tr");
    row.id = `row-${index}`;
    row.innerHTML = `
        <td id="credits-${index}">Select Credits</td>
        <td id="grade-${index}">Select Grade</td>
        <td>
            <button onclick="deleteCourse(${index})">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);

    showCreditOptions(index);
    showGradeOptions(index);
}

function showCreditOptions(index) {
    const creditCell = document.getElementById(`credits-${index}`);
    creditCell.innerHTML = `<div class="select-buttons">
        <button onclick="setCredits(${index}, 1)">1</button>
        <button onclick="setCredits(${index}, 2)">2</button>
        <button onclick="setCredits(${index}, 3)">3</button>
        <button onclick="setCredits(${index}, 4)">4</button>
        <button onclick="setCredits(${index}, 5)">5</button>
    </div>`;
}

function showGradeOptions(index) {
    const gradeCell = document.getElementById(`grade-${index}`);
    gradeCell.innerHTML = `<div class="select-buttons">
        <button onclick="setGrade(${index}, 10)">O</button>
        <button onclick="setGrade(${index}, 9)">A+</button>
        <button onclick="setGrade(${index}, 8)">A</button>
        <button onclick="setGrade(${index}, 7)">B+</button>
        <button onclick="setGrade(${index}, 6)">B</button>
        <button onclick="setGrade(${index}, 5)">C</button>
        <button onclick="setGrade(${index}, 4)">D</button>
        <button onclick="setGrade(${index}, 0)">F</button>
    </div>`;
}

function setCredits(index, value) {
    courses[index].credits = value;
    document.getElementById(`credits-${index}`).innerText = value;
    calculateCGPA();
}

function setGrade(index, value) {
    courses[index].grade = value;
    document.getElementById(`grade-${index}`).innerText = getGradeLetter(value);
    calculateCGPA();
}

function deleteCourse(index) {
    courses.splice(index, 1);
    updateTable();
}

function updateTable() {
    const tableBody = document.getElementById("courseTable");
    tableBody.innerHTML = "";

    courses.forEach((course, index) => {
        const row = document.createElement("tr");
        row.id = `row-${index}`;
        row.innerHTML = `
            <td id="credits-${index}">${course.credits > 0 ? course.credits : "Select Credits"}</td>
            <td id="grade-${index}">${course.grade > 0 ? getGradeLetter(course.grade) : "Select Grade"}</td>
            <td>
                <button onclick="deleteCourse(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);

        if (course.credits === 0) showCreditOptions(index);
        if (course.grade === 0) showGradeOptions(index);
    });

    calculateCGPA();
}

function calculateCGPA() {
    let totalCredits = 0, weightedSum = 0;

    courses.forEach(course => {
        if (course.credits > 0) {
            totalCredits += course.credits;
            weightedSum += course.credits * course.grade;
        }
    });

    const cgpa = totalCredits ? (weightedSum / totalCredits).toFixed(2) : "0.00";
    document.getElementById("cgpa").textContent = cgpa;
}

function getGradeLetter(grade) {
    const gradeMap = {
        10: "O",
        9: "A+",
        8: "A",
        7: "B+",
        6: "B",
        5: "C",
        4: "D",
        0: "F"
    };
    return gradeMap[grade] || "N/A";
}
