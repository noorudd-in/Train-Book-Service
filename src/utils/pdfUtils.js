const puppeteer = require("puppeteer");
const { ticketContent, passengerContent } = require("./htmlContent");

const createHTML = (data, ticket, passenger) => {
  let content = ticket;
  content = content
    .replace("{{pnr}}", data.pnr)
    .replace("{{status}}", data.status)
    .replace("{{class}}", data.class)
    .replace("{{category}}", data.category)
    .replace("{{total_cost}}", data.total_cost)
    .replace("{{booked}}", data.booked)
    .replace("{{number}}", data.train.number)
    .replace("{{name}}", data.train.name)
    .replace("{{from_station_name}}", data.schedule.from_station_name)
    .replace("{{from_station_code}}", data.schedule.from_station_code)
    .replace("{{to_station_name}}", data.schedule.to_station_name)
    .replace("{{to_station_code}}", data.schedule.to_station_code)
    .replace("{{departure}}", data.schedule.departure)
    .replace("{{arrival}}", data.schedule.arrival);

  let passengerContent = passenger
    .replace("{{p_name}}", data.passengers.p1_name)
    .replace("{{p_age}}", data.passengers.p1_age)
    .replace("{{p_gender}}", data.passengers.p1_gender)
    .replace("{{p_status}}", data.passengers.p1_status);

  for (let i = 2; i <= 6; i++) {
    if (data.passengers[`p${i}_name`]) {
      passengerContent += passenger;
      passengerContent = passengerContent
        .replace("{{p_name}}", data.passengers[`p${i}_name`])
        .replace("{{p_age}}", data.passengers[`p${i}_age`])
        .replace("{{p_gender}}", data.passengers[`p${i}_gender`])
        .replace("{{p_status}}", data.passengers[`p${i}_status`]);
    }
  }
  content = content.replace('{{passengers}}', passengerContent)
  return content;
};

const generatePDF = async (data, outputPath) => {
  let htmlContent = createHTML(data, ticketContent, passengerContent);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: outputPath, format: "A4", printBackground: true });
  await browser.close();
};

module.exports = { generatePDF };
