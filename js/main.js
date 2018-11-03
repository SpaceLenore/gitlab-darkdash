"use strict";

const createIssueBox = (issue, target) => {
    let targetDiv = document.getElementById(target);
    let issuebox = document.createElement("div");
    let isssueIdName = document.createElement("h3");
    let assignee = document.createElement("h4");


    issuebox.classList = "issuebox " + target;
    assignee.classList += "issueinfo";

    isssueIdName.innerText = issue.title;

    if (issue.assignee) {
        let left = document.createElement("span");
        let right = document.createElement("span");

        left.innerText = issue.project_id + "#" + issue.iid;
        right.innerText = issue.assignee.name;
        assignee.appendChild(left);
        assignee.appendChild(right);
    } else {
        assignee.innerText = issue.project_id + "#" + issue.iid;
    }

    issuebox.appendChild(isssueIdName);
    issuebox.appendChild(assignee);

    targetDiv.appendChild(issuebox);
};

const createIssueBoxesFromArray = (target) => {
    document.getElementById(target).innerHTML = "";
    config.issues.forEach((issue) => {
        createIssueBox(issue, target);
    });
};

const fetchLabelIssues = () => {
    config.labels.forEach((label) => {
        fetch(config.apiURL + "/groups/" + config.group + "/issues?milestone=" + config.milestone + "&state=opened&labels=" + label)
        .then((response) => {
            return response.json();
        }).then((issues) => {
            issues.forEach((issue) => {
                config.issues.push(issue);
            });
            createIssueBoxesFromArray(label);
            config.issues = [];
        });
    });
}

const recursiveLoader = () => {
    setTimeout(function () {
        console.log("RELOADING");
        fetchLabelIssues();
        recursiveLoader();
    }, 1000*config.refreshRate);
}

fetchLabelIssues();
recursiveLoader();
