let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (valueSearch.value != '') {
        searchWeather();
    }
});

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        });
}

const initApp = () => {
    valueSearch.value = 'Kolkata';
    searchWeather();
}
initApp();

// Chat Assistant
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    addChatBubble(message, "user");

    const msgLower = message.toLowerCase();

    // Weather query
    if (msgLower.includes("weather in")) {
        const cityMatch = msgLower.match(/weather in (.+)/);
        const city = cityMatch ? cityMatch[1] : "";
        if (city) {
            fetch(`${url}&q=${city}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.cod === 200) {
                        addChatBubble(`Weather in ${data.name}? It's ${data.weather[0].description} and ${data.main.temp}°C. Dress wisely.`, "assistant");
                    } else {
                        addChatBubble("City not found. Did you just make up a name? 😂", "assistant");
                    }
                });
        } else {
            addChatBubble("At least give me a city name. I'm not a mind reader. 🙄", "assistant");
        }
    }

    // Raining check
    else if (msgLower.includes("is it raining in")) {
        const city = msgLower.split("is it raining in")[1].trim();
        fetch(`${url}&q=${city}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.cod === 200) {
                    const desc = data.weather[0].description;
                    const raining = desc.includes("rain") ? "Yep, it's raining. Take an umbrella ☔" : "Nah, dry skies there.";
                    addChatBubble(`${raining} ${data.name} is currently ${desc}, ${data.main.temp}°C.`, "assistant");
                } else {
                    addChatBubble("Can't find that place. Are you sure it's not on Mars?", "assistant");
                }
            });
    }

    // Fun & savage responses
    else if (msgLower.includes("picnic")) {
        addChatBubble("You? Picnic? Better check the weather first, drama queen. 😂", "assistant");
    }

    else if (msgLower.includes("good weather")) {
        addChatBubble("Every place is good unless you bring your bad vibes there. 😏", "assistant");
    }

    else if (msgLower.includes("tripura")) {
        fetch(`${url}&q=Tripura`)
            .then((res) => res.json())
            .then((data) => {
                if (data.cod === 200) {
                    addChatBubble(`Tripura's weather is ${data.weather[0].description}, ${data.main.temp}°C. Not bad, unlike your last joke.`, "assistant");
                } else {
                    addChatBubble("Tripura? Either the servers are lazy or your spelling is. 🤷‍♂️", "assistant");
                }
            });
    }

    else if (
        msgLower.includes("no girlfriend") ||
        msgLower.includes("single") ||
        msgLower.includes("refreshment")
    ) {
        addChatBubble("Single life? Go outside. Nature won’t ghost you. 🌳", "assistant");
    }

    else if (msgLower.includes("should i go outside")) {
        addChatBubble("Only if you can handle the truth... I mean the weather. 😎", "assistant");
    }

    else if (msgLower.includes("can i go gym")) {
        addChatBubble("Sure. The gym won't lift those weights by itself — unlike your excuses. 💪", "assistant");
    }

    else if (msgLower.includes("hot or cold")) {
        addChatBubble("You asking about the weather or your attitude? 😏", "assistant");
    }

    else if (msgLower.includes("wear today")) {
        addChatBubble("Wear confidence. And maybe check the temperature first, genius. 😎", "assistant");
    }

    else if (msgLower.includes("boring") || msgLower.includes("bored")) {
        addChatBubble("If you're bored, go outside and fight a tree or something. 🌳🥊", "assistant");
    }

    else if (msgLower.includes("what can i do")) {
        addChatBubble("You can start by asking smarter questions. 😏", "assistant");
    }

    else {
        addChatBubble("Try asking stuff like:\n- 'What's the weather in Delhi?'\n- 'Is it raining in Bangalore?'\n- Or just complain, I’ll roast you anyway. 🔥", "assistant");
    }
    
    chatInput.value = '';
});

function addChatBubble(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = `${text} ${sender === "assistant" ? '<span class="tick">✔✔</span>' : ''}`;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
