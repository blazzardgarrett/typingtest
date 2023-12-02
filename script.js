let startTime, endTime, timerInterval;
let personName, teacherName, masterText;

function startTest() {
    // Get person's name and teacher's name
    personName = document.getElementById("personName").value;
    teacherName = document.getElementById("teacherName").value;

    // Set up master text (you can update this based on the selected teacher or other criteria)
    masterText = "This is your master text. Replace it with the actual content.";

    // Show the test container and hide the pre-test form
    document.getElementById("preTestForm").style.display = "none";
    document.getElementById("testContainer").style.display = "block";

    // Rest of your code for starting the timer
    startTime = new Date();
    endTime = new Date(startTime);
    endTime.setSeconds(endTime.getSeconds() + 60);

    timerInterval = setInterval(function() {
        const remainingTime = Math.max(0, Math.floor((endTime - new Date()) / 1000));
        document.getElementById("timer").innerHTML = `Time remaining: ${remainingTime} seconds`;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            document.getElementById("timer").innerHTML = "Time's up!";
            submitText(); // Auto submit when time is up
        }
    }, 1000);
}

function onKeyPress() {
    // Your existing code for keypress event
}

async function submitText() {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById("userInput").disabled = true; // Disable further input
    const userText = document.getElementById("userInput").value;

    const characterCount = userText.length;
    const errors = calculateErrors(userText, masterText);

    const result = `Person's Name: ${personName}<br>Teacher's Name: ${teacherName}<br>Character count divided by 5: ${characterCount / 5}<br>Errors: ${errors}`;
    document.getElementById("result").innerHTML = result;

    // Send data to Google Sheets
    try {
        await appendDataToSheet(personName, teacherName, characterCount / 5, errors);
        console.log("Data sent to Google Sheets successfully!");
    } catch (error) {
        console.error("Error sending data to Google Sheets:", error);
    }
}

async function appendDataToSheet(personName, teacherName, characterCountDividedBy5, errors) {
    // Replace 'YOUR_SPREADSHEET_ID' and 'YOUR_SHEET_NAME' with your actual values
    const spreadsheetId = '1C6-G6qs6HeVDUsA3UtgosWZjj97Dr47sKbHZviuP26M';
    const sheetName = 'TypingData';

    const values = [[personName, teacherName, characterCountDividedBy5, errors]];

    await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: sheetName,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: values
        }
    });
}
