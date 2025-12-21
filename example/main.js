import { MailZeetClient } from "../../dist/index.js";

const mailzeet = new MailZeetClient({
  apiKey: "lz97im6jqpf8:01KD1268HXFEHZR5EJA6J0HQNB"
});

document
  .getElementById("email-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const result = document.getElementById("result");
    result.textContent = "Sending...";

    try {
      const res = await mailzeet.emails.send({
        sender: {
          email: "hello@mailzeet.com",
          name: "Mailzeet"
        },
        recipients: [
          {
            email: document.getElementById("to").value,
            name: "Test User"
          }
        ],
        subject: "Hello from {company}",
        html: "<b>Hello from {company}</b>",
        params: {
          company: "Mailzeet"
        }
      });

      result.textContent = JSON.stringify(res, null, 2);
    } catch (err) {
      result.textContent = err.message;
    }
  });
