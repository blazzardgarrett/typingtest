function startTypingTest() {
  // Hide the start form
  document.getElementById("startForm").style.display = "none";

  // Show the typing test screen
  document.getElementById("typingTestScreen").style.display = "block";

  // Display the user's name on the typing test screen
  const userName = document.getElementById("userName").value;
  document.getElementById("typedUserName").innerText = userName;

  // Display the current test number
  document.getElementById("testCount" ).innerText = `Timing ${testCounter}`;

  // Record the start time
  startTime = new Date().getTime();
}

function handleTabKey(event) {
  // Handle the Tab key press
  if (event.key === "Tab") {
    event.preventDefault(); // Prevent the default Tab behavior (e.g., moving focus)

    // Get the current cursor position
    const cursorPosition = document.getElementById("userInput").selectionStart;

    // Get the text before and after the cursor position
    const textBeforeCursor = document.getElementById("userInput").value.substring(0, cursorPosition);
    const textAfterCursor = document.getElementById("userInput").value.substring(cursorPosition);

    // Insert an indent (e.g., four spaces)
    const updatedText = textBeforeCursor + "    " + textAfterCursor;

    // Update the textarea value with the modified text
    document.getElementById("userInput").value = updatedText;

    // Move the cursor to the position after the inserted indent
    document.getElementById("userInput").setSelectionRange(cursorPosition + 4, cursorPosition + 4);
  }
}

function startTimer() {
  // Start the timer only if it hasn't started yet
  if (!timer) {
    timer = setTimeout(submitTypingTest, 60000); // One minute (60,000 milliseconds)
  }
}

function submitTypingTest() {
  // Clear the timer
  clearTimeout(timer);

  // Retrieve the user's typing input
  const userInput = document.getElementById("userInput").value;

  const data = {
    userName: document.getElementById("userName").value,
    teacherName: document.getElementById("teacherName").value,
    userInput: document.getElementById("userInput").value,
    testCount: testCounter
  }

  postData(url, data);

  // If there are more tests, reset the timer and allow the user to start the next test
  if (testCounter < maxTests) {
    testCounter++;
    timer = null; // Reset the timer
    document.getElementById("userInput").value = ""; // Clear the user input
    document.getElementById("results").style.display = "none"; // Hide the results
    alert("Times up! Get ready for your next timing.")
    startTypingTest(); // Start the next test
  } else {
    // If all tests are completed, show a message or perform any additional actions
    alert("Congratulations! Thank you for keyboarding today.");
    location.reload();
  }
}

async function postData(url, data) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await response.text();
    console.log(text);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example usage


