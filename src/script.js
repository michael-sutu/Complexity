if (document.getElementById("faq")) {
    const questions = document.querySelectorAll("#faq #question")
    questions.forEach((question) => {
        question.addEventListener("click", () => {
            let answer = question.querySelector("p")
            let icon = question.querySelector("span")

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null
                icon.textContent = "add"
            } else {
                questions.forEach((q) => {
                    let otherAnswer = q.querySelector("p")
                    let otherIcon = q.querySelector("span")
                    otherAnswer.style.maxHeight = null
                    otherIcon.textContent = "add"
                })

                answer.style.maxHeight = answer.scrollHeight + "px"
                icon.textContent = "remove"
            }
        })
    })
}

if (document.querySelector(".submit-form")) {
    document.querySelector(".submit-form").addEventListener("click", (e) => {
        e.preventDefault()

        const nameInput = document.querySelector(".name-input")
        const emailInput = document.querySelector(".email-input")
        const messageInput = document.querySelector(".message-input")
        const errorElement = document.querySelector(".form-error")
        const submitButton = document.querySelector(".submit-form")

        const name = nameInput.value.trim()
        const email = emailInput.value.trim()
        const message = messageInput.value.trim()

        errorElement.textContent = ""
        errorElement.style.display = "none"

        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

        if (!name) {
            errorElement.textContent = "Please enter your name."
            errorElement.style.display = "block"
            nameInput.focus()
            return
        }

        if (!email) {
            errorElement.textContent = "Please enter your email."
            errorElement.style.display = "block"
            emailInput.focus()
            return
        }

        if (!emailIsValid) {
            errorElement.textContent = "Please enter a valid email address."
            errorElement.style.display = "block"
            emailInput.focus()
            return
        }

        if (!message) {
            errorElement.textContent = "Please enter a message."
            errorElement.style.display = "block"
            messageInput.focus()
            return
        }

        submitButton.disabled = true
        submitButton.textContent = "Sending..."

        fetch("../api/form", ({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        }))
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll("form > *").forEach((element) => {
                    if (element.id == "finished") {
                        element.style.display = "block"
                    } else {
                        element.remove()
                    }
                })

                const url = new URL(window.location.href)
                url.searchParams.set('g', 'success')
                window.history.pushState({}, '', url)
            })
            .catch(error => {
                console.error("Error: ", error)
                errorElement.textContent = "Something went wrong. Please try again."
                errorElement.style.display = "block"
                submitButton.disabled = false
                submitButton.textContent = "Submit"
            })
    })
}

const elementsToAnimate = document.querySelectorAll('.scroll-hidden')

const handleScroll = () => {
    elementsToAnimate.forEach(el => {
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top <= window.innerHeight - 100
        if (isVisible) {
            el.classList.add('scroll-visible')
            el.classList.remove('scroll-hidden')
        }
    })
}

window.addEventListener('scroll', handleScroll)

handleScroll()

document.getElementById("hamburger-menu").addEventListener("click", function () {
    let menu = document.getElementById("navigation")
    if (menu.classList.contains("active")) {
        menu.style.maxHeight = "0px"
        menu.style.padding = "0px"
        setTimeout(() => menu.classList.remove("active"), 300)
    } else {
        menu.classList.add("active")
        menu.style.maxHeight = "250px"
        menu.style.padding = "15px 0px"
    }
})