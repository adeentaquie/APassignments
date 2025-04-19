function processCandidates(candidates, requiredSkills) {
    function hasRequiredSkills(candidateSkills, requiredSkills) {
        return candidateSkills.some(skill => requiredSkills.includes(skill));
    }

    function getTestDate(applyDate) {
        let testDate = new Date(applyDate);
        let daysAdded = 0;

        while (daysAdded < 5) {
            testDate.setDate(testDate.getDate() + 1);
            let day = testDate.getDay();
            if (day !== 0 && day !== 6) {
                daysAdded++;
            }
        }

        return testDate.toISOString().split("T")[0]; 
    }
    let selectedCandidates = candidates.filter(candidate => 
        candidate.gpa >= 3.0 && hasRequiredSkills(candidate.skills, requiredSkills)
    );

    selectedCandidates = selectedCandidates.map(candidate => ({
        ...candidate,
        testDate: getTestDate(candidate.applyDate)
    }));

    let result = selectedCandidates.reduce((acc, candidate) => {
        acc[candidate.name] = candidate.testDate;
        return acc;
    }, {});

    return result;
}

const candidates = [
    { name: "Alice", gpa: 3.5, skills: ["JavaScript", "React"], applyDate: "2024-02-01" },
    { name: "Bob", gpa: 2.9, skills: ["Java", "Spring Boot"], applyDate: "2024-02-02" },
    { name: "Charlie", gpa: 3.2, skills: ["Node.js", "MongoDB"], applyDate: "2024-02-03" },
    { name: "David", gpa: 3.8, skills: ["C++", "Python"], applyDate: "2024-02-04" },
    { name: "Eve", gpa: 2.5, skills: ["JavaScript", "CSS"], applyDate: "2024-02-05" }
];

const requiredSkills = ["JavaScript", "React", "Node.js", "MongoDB"];

const selectedCandidates = processCandidates(candidates, requiredSkills);
console.log(selectedCandidates);
