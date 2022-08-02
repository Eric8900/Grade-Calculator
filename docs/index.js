let maP;
let miP;
let otP;
let want;
let isTest;
let numMa;
let numMi;

// ADDING GRADES
function addDiv() {
    numMa = document.getElementById("numMa").value;
    numMi = document.getElementById("numMi").value;

    var majors = document.getElementById("majors");
    var minors = document.getElementById("minors");

    while (majors.hasChildNodes()) {
        majors.removeChild(majors.lastChild);
    }

    while (minors.hasChildNodes()) {
        minors.removeChild(minors.lastChild);
    }

    for (let i = 0; i < numMa; i++) {
        majors.appendChild(document.createTextNode("Major Grade " + (i+1)));
        majors.appendChild(document.createElement("br"));

        var input = document.createElement("input");
        input.type = "number";
        input.id = "ma" + i;

        majors.appendChild(input);
        majors.appendChild(document.createElement("br"));
    }
    for (let i = 0; i < numMi; i++) {
        minors.appendChild(document.createTextNode("Minor Grade " + (i+1)));
        minors.appendChild(document.createElement("br"));

        var input = document.createElement("input");
        input.type = "number";
        input.id = "mi" + i;

        minors.appendChild(input);
        minors.appendChild(document.createElement("br"));
    }
}


// SUBMIT
document.getElementById("Submit").onclick = function() {
    var gNeed = 0;
    let majors = [numMa];
    let minors = [numMi];
    maP = document.getElementById("maP").value;
    miP = document.getElementById("miP").value;
    otP = document.getElementById("otP").value;
    want = parseFloat(document.getElementById("want").value);
    isTest = document.getElementById("isTest").value;
    for (let i = 0; i < numMa; i++) {
        majors[i] = document.getElementById("ma" + i).value;
    }
    for (let i = 0; i < numMi; i++) {
        minors[i] = document.getElementById("mi" + i).value;
    }

    
        if (isTest == "Test" || isTest == "test") {
        let miAvg = avg(minors);
        for (let i = 0; i < 130; i++) {
            majors.push(i);
            if ((miAvg * miP) + (avg(majors) * maP) + (100 * otP) >= want) {
                gNeed = i;
                break;
            }
            majors.pop();
        }
    }

        if (isTest == "Quiz" || isTest == "quiz") {
        let maAvg = avg(majors);
        for (let i = 0; i < 130; i++) {
            minors.push(i);
            if ((avg(minors) * miP) + (maAvg * maP) + (100 * otP) >= want) {
                gNeed = i;
                break;
            }
            minors.pop();
        }
    }
    
    var grade = document.getElementById("grade");
    if (grade.hasChildNodes()) {
        grade.removeChild(grade.lastChild);
    }
    grade.appendChild(document.createTextNode(gNeed));
}

function avg(grades) {
    let sum = 0.0;
    for (let i = 0; i < grades.length; i++) {
        sum += parseInt(grades[i]);
    }
    return sum / grades.length;
}
