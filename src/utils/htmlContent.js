const ticketContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Train Ticket</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 900px;
            margin: 20px auto;
            padding-left: 30px;
            padding-right: 30px;
            background: #ffffff;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            width: 150px;
        }
        .header h1 {
            margin: 10px 0;
            color: #333;
        }
        .ticket-info, .train-info, .schedule-info, .passenger-info {
            border-bottom: 2px solid #ddd;
            padding-bottom: 15px;
            margin-bottom: 15px;
        }
        .ticket-info h2, .train-info h2, .schedule-info h2, .passenger-info h2 {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            border-radius: 8px;
            font-size: 18px;
            margin: 0;
        }
        .info {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f1f1f1;
        }
        .info span {
            font-size: 16px;
        }
        .info .label {
            font-weight: bold;
            color: #333;
        }
        .info .value {
            text-align: right;
            color: #555;
        }
        .passenger-info {
            padding: 0;
        }
        .passenger-info h2 {
            margin: 0;
        }
        .passenger-grid {
            display: grid;
            grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
        }
        .passenger-item {
            background: #f9f9f9;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .passenger-item .info {
            border-bottom: none;
            padding-bottom: 5px;
        }
        .footer {
            text-align: center;
            padding-top: 15px;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Train Ticket</h1>
        </div>

        <div class="ticket-info">
            <h2>Ticket Information</h2>
            <div class="info">
                <span class="label">PNR:</span>
                <span class="value">{{pnr}}</span>
            </div>
            <div class="info">
                <span class="label">Status:</span>
                <span class="value">{{status}}</span>
            </div>
            <div class="info">
                <span class="label">Class:</span>
                <span class="value">{{class}}</span>
            </div>
            <div class="info">
                <span class="label">Category:</span>
                <span class="value">{{category}}</span>
            </div>
            <div class="info">
                <span class="label">Total Cost:</span>
                <span class="value">₹{{total_cost}}</span>
            </div>
            <div class="info">
                <span class="label">Booked On:</span>
                <span class="value">{{booked}}</span>
            </div>
        </div>

        <div class="train-info">
            <h2>Train Information</h2>
            <div class="info">
                <span class="label">Train Number:</span>
                <span class="value">{{number}}</span>
            </div>
            <div class="info">
                <span class="label">Train Name:</span>
                <span class="value">{{name}}</span>
            </div>
        </div>

        <div class="schedule-info">
            <h2>Schedule</h2>
            <div class="info">
                <span class="label">From Station:</span>
                <span class="value">{{from_station_name}} ({{from_station_code}})</span>
            </div>
            <div class="info">
                <span class="label">To Station:</span>
                <span class="value">{{to_station_name}} ({{to_station_code}})</span>
            </div>
            <div class="info">
                <span class="label">Departure:</span>
                <span class="value">{{departure}}</span>
            </div>
            <div class="info">
                <span class="label">Arrival:</span>
                <span class="value">{{arrival}}</span>
            </div>
        </div>

        <div class="passenger-info">
            <h2>Passenger Information</h2>
            <div class="passenger-grid">
                {{passengers}}  
            </div>
        </div>

        <div class="footer">
            <p>Thank you for choosing our service. We wish you a pleasant journey!</p>
        </div>
    </div>
</body>
</html>

`;

const passengerContent = `
<div class="passenger-item">
    <div class="info">
        <span class="label">Name:</span>
        <span class="value">{{p_name}}</span>
    </div>
    <div class="info">
        <span class="label">Age:</span>
        <span class="value">{{p_age}}</span>
    </div>
    <div class="info">
        <span class="label">Gender:</span>
        <span class="value">{{p_gender}}</span>
    </div>
    <div class="info">
        <span class="label">Status:</span>
        <span class="value">{{p_status}}</span>
    </div>
</div>
`;

const createTicketEmailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ticket Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      font-size: 16px;
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      padding: 10px;
      background-color: #f4f4f4;
      font-size: 14px;
      color: #777;
      border-radius: 0 0 5px 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <h1>Thank you for your purchase!</h1>
      <p>Dear {{fullName}},</p>
      <p>Your ticket has been successfully booked. Please find your booking details with attached document in this email!</p>
      <p>Your PNR is {{pnr}}.</p>
      <p>We hope you have a pleasant journey!</p>
      <p>Best regards,<br>Noorudd.in</p>
    </div>
    <div class="footer">
      <p>This is an automated email. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;

const cancelTicketEmailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ticket Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      font-size: 16px;
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      padding: 10px;
      background-color: #f4f4f4;
      font-size: 14px;
      color: #777;
      border-radius: 0 0 5px 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <h1>Your ticket has been cancelled!</h1>
      <p>Dear {{fullName}},</p>
      <p>We wish to inform you that your ticket againt PNR Number: {{pnr}} has been cancelled successfully as per your request. The refund amount of Rs. {{refund}} will be refunded back to your respective account shortly.</p>
      <p>Best regards,<br>Noorudd.in</p>
    </div>
    <div class="footer">
      <p>This is an automated email. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  ticketContent,
  passengerContent,
  createTicketEmailBody,
  cancelTicketEmailBody,
};
