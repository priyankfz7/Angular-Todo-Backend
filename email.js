const htmlContent = (otp) => `<!DOCTYPE html>
<html>
  <head>
    <title>OTP For Registration</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #333333;
      }

      p {
        margin-bottom: 20px;
      }

      .otp {
        font-size: 24px;
        color: #333333;
        background-color: #f5f5f5;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
      }

      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: white;
        border:2px solid blue;
        text-decoration: none;
        border-radius: 5px;
        
      }

      .button:hover {
        background-color: blue;
        color:white
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>OTP For Registration</h1>
      <p>Please use the following OTP to Register your account:</p>
      <div class="otp">${otp}</div>

      <p>Thanks for exploring my projects!</p>
      <p>Regards</p>
      <p>Priyank Gupta</p>

      <a class="button" href="https://priyankfz7.github.io/" target="_blank"
        >checkout other projects</a
      >
    </div>
  </body>
</html>
`;
module.exports = htmlContent;
