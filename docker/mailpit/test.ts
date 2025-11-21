import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});

async function sendTestEmail() {
  const info = await transporter.sendMail({
    from: '"Test Sender" <noreply@mailpit.com>', // sender
    to: "aj@mailpit.dev", // receiver
    subject: "Hello from Mailpit!",
    text: "This is a test email sent through Mailpit.",
    html: "<p>This is a <b>test</b> email sent through Mailpit.</p>",
  });

  console.log("Message sent:", info);
}

sendTestEmail().catch(console.error);