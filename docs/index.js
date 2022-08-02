let maP;
let miP;
let otP;
let want;
let isTest;
let numMa;
let numMi;
let isOther;
let numOt;

// ADDING GRADES
function addGradesDiv() {
    numMa = document.getElementById("numMa").value;
    numMi = document.getElementById("numMi").value;

    if (numMa == 0 && numMi == 0) {
        document.getElementById("contain").style.visibility = "hidden";
        return;
    }
    
    document.getElementById("contain").style.visibility = "visible";

    var majors = document.getElementById("majors");
    var minors = document.getElementById("minors");
    
    while (majors.hasChildNodes()) {
        majors.removeChild(majors.lastChild);
    }

    while (minors.hasChildNodes()) {
        minors.removeChild(minors.lastChild);
    }

    for (let i = 0; i < numMa; i++) {
        var p = majors.appendChild(document.createElement("label"));
            p.textContent = "Major Grade " + (i + 1);
            p.className = "label";
            majors.appendChild(p);
        majors.appendChild(document.createElement("br"));

        var input = document.createElement("input");
        input.type = "number";
        input.id = "ma" + i;
        input.className = "input";
        input.placeholder = "Major Grade " + (i + 1);

        majors.appendChild(input);
        majors.appendChild(document.createElement("br"));
        if (i + 1 == numMa) {
            majors.appendChild(document.createElement("br"));
        }
    }
    for (let i = 0; i < numMi; i++) {
        var p = minors.appendChild(document.createElement("label"));
            p.textContent = "Minor Grade " + (i + 1);
            p.className = "label";
            minors.appendChild(p);
        minors.appendChild(document.createElement("br"));

        var input = document.createElement("input");
        input.type = "number";
        input.id = "mi" + i;
        input.className = "input";
        input.placeholder = "Minor Grade " + (i + 1);

        minors.appendChild(input);
        minors.appendChild(document.createElement("br"));
    }
}

//OTHER DIV
function addOtherDiv() {
    isOther = true;
    document.getElementById("containOther").style.visibility = "visible";
    var addOther = document.getElementById("addOther");

    while (addOther.hasChildNodes()) {
        addOther.removeChild(addOther.lastChild);
    }

    var inputOther = document.createElement("input");
    inputOther.type = "number";
    inputOther.id = "numOt";
    inputOther.className = "input";
    inputOther.placeholder = "Number of Other Grades";

    addOther.appendChild(inputOther);
    addOther.appendChild(document.createElement("br"));

    var submit = document.createElement("BUTTON");
    submit.id = "submitNumOther";
    submit.textContent = "Add Others";
    submit.onclick = function() {
        numOt = document.getElementById("numOt").value;

        var others = document.getElementById("others");
    
        while (others.hasChildNodes()) {
            others.removeChild(others.lastChild);
        }
    
        for (let i = 0; i < numOt; i++) {
            var p = others.appendChild(document.createElement("label"));
            p.textContent = "Other Grade " + (i + 1);
            p.className = "label";
            others.appendChild(p);
            others.appendChild(document.createElement("br"));
    
            var input = document.createElement("input");
            input.type = "number";
            input.id = "ot" + i;
            input.className = "input";
            input.placeholder = "Other Grade " + (i + 1);
    
            others.appendChild(input);
            others.appendChild(document.createElement("br"));
            if (i + 1 == numOt) {
                others.appendChild(document.createElement("br"));
            }
        }

        

        
    }

    addOther.appendChild(submit);
    addOther.appendChild(document.createElement("br"));
    addOther.appendChild(document.createElement("br"));

    var remove = document.createElement("BUTTON");
    remove.textContent = "Remove Others"; 
    remove.onclick = function() {
        document.getElementById("containOther").style.visibility = "hidden";
        isOther = false;
        while (others.hasChildNodes()) {
            others.removeChild(others.lastChild);
        }
        while (addOther.hasChildNodes()) {
            addOther.removeChild(addOther.lastChild);
        }
    }
    addOther.appendChild(remove);
    addOther.appendChild(document.createElement("br"));
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

    if (isOther) {
        let others = [numOt];
        for (let i = 0; i < numOt; i++) {
            others[i] = document.getElementById("ot" + i).value;
        }
        otP = avg(others) * 0.001
    }

        if (isTest == "test") {
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

        if (isTest == "quiz") {
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
    document.getElementById("gNeeded").style.visibility = "visible";
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
