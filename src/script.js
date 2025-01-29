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

if(document.querySelector(".submit-form")) {
    document.querySelector(".submit-form").addEventListener("click", (e) => {
        e.preventDefault()

        const name = document.querySelector(".name-input").value
        const email = document.querySelector(".email-input").value
        const message = document.querySelector(".message-input").value

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
                    if(element.id == "finished") {
                        element.style.display = "block"
                    } else {
                        element.remove()
                    }
                })
            })
            .catch(error => {
                console.error("Error: ", error)
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