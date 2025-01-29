require("dotenv").config()
const sgMail = require('@sendgrid/mail')
const express = require("express")
const path = require("path")
const app = express()

app.use('/src', express.static(path.join(__dirname, 'src')))
app.use('/img', express.static(path.join(__dirname, 'img')))
app.use(express.json())

sgMail.setApiKey(process.env.SG_API_KEY)

async function sendEmail(to, subject, text) {
    const message = {
        to: to, 
        from: 'michael@complexitytech.com', 
        subject: subject,
        text: text,
        html: text
    }
      
    sgMail
        .send(message)
        .then(() => {
            return { message: "Successfully sent email" }
        })
        .catch((error) => {
            console.error("Error: ", error)
            return { error: error }
        })
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/public/about.html")
})

app.get("/services", (req, res) => {
    res.sendFile(__dirname + "/public/services.html")
})

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/public/contact.html")
})

app.post("/api/form", (req, res) => {
    try {
        const { name, email, message } = req.body

        sendEmail(
            "michael@complexitytech.com",
            "New Form Submission",
            `
                <h1>New Form Submission</h1>
                <p>Someone has sent a message on the Complexity Tech website</p>
                <ul>
                    <li><strong>Name: </strong>${name}</li>
                    <li><strong>Email: </strong>${email}</li>
                    <li><strong>Message: </strong>${message}</li>
                </ul>
            `
        )

        res.json({ message: "Form submitted successfully" })
    } catch (error) {
        console.error("Error: ", error)
        res.json({ error: error }).status(500)
    }
})

app.listen(1000)
console.log("Listening : http://localhost:1000")