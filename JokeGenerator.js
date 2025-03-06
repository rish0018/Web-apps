const chat = document.getElementById("_chat");
const jokeBtn = document.getElementById("jokeBtn");

generateJoke();

jokeBtn.addEventListener("click", generateJoke);

async function generateJoke() {
    jokeBtn.disabled = true;

    const message = createMessageElement("Hey Robot, Could you tell me a joke?");
    appendMessage(message);

    const joke = createMessageElement();
    setElementContent(joke, `<i class="fa-solid fa-ellipsis"></i>`);
    appendMessage(joke);

    try {
        const res = await fetch("https://icanhazdadjoke.com", {
            headers: {
                Accept: "application/json",
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            setElementContent(joke, data.joke);
        } else {
            setElementContent(joke, "Oops! I couldn't fetch a joke. Try again.");
        }
    } catch (error) {
        setElementContent(joke, "An error occurred. Please try again.");
        console.error(error);
    }

    jokeBtn.disabled = false;
}

function createMessageElement(content = "") {
    const element = document.createElement("div");
    element.classList.add("message");
    if (content) {
        element.classList.add("response");
        setElementContent(element, content);
    } else {
        element.classList.add("joke");
    }
    return element;  // Fixed: Return the created element
}

function setElementContent(element, content) {
    element.innerHTML = content;
}

function appendMessage(element) {  // Fixed: Parameter name should match
    chat.appendChild(element);
}
