const { SEARCH_SERVICE_URL } = require("../config/constants");
const { TicketRepository } = require("../repositories/index");
const PassengerService = require("./passengerService");
const passengerService = new PassengerService();
const axios = require("axios");
class TicketService {
  constructor() {
    this.ticketRepository = new TicketRepository();
  }

  async #getSeats(body, header) {
    let category = body.category;
    const seats = await axios.post(
      `${SEARCH_SERVICE_URL}/seats/${body.train_number}`,
      {
        user_id: body.user_id,
      },
      {
        headers: {
          authtoken: header.authtoken,
        },
      }
    );
    if (category == "general") {
      return seats.data.data[body.class];
    }
    return seats.data.data[category];
  }

  async #updateSeats(body, header, new_seats) {
    const type = body.category == "general" ? body.class : body.category;
    const updatedSeats = await axios.post(
      `${SEARCH_SERVICE_URL}/train/${body.train_number}`,
      {
        user_id: body.user_id,
        type: type,
        new_seats: new_seats,
      },
      {
        headers: {
          authtoken: header.authtoken,
        },
      }
    );
    return updatedSeats;
  }

  async #createPassenger(body, seats) {
    let remainingSeats = seats;
    let passengers = {
      p1_name: body.p1_name,
      p1_age: body.p1_age,
      p1_gender: body.p1_gender,
      p1_status: this.#createStatus(remainingSeats, body.class),
    };
    remainingSeats -= 1;
    if (body.p2_name) {
      passengers = {
        ...passengers,
        p2_name: body.p2_name,
        p2_age: body.p2_age,
        p2_gender: body.p2_gender,
        p2_status: this.#createStatus(remainingSeats, body.class),
      };
      remainingSeats -= 1;
    }
    if (body.p3_name) {
      passengers = {
        ...passengers,
        p3_name: body.p3_name,
        p3_age: body.p3_age,
        p3_gender: body.p3_gender,
        p3_status: this.#createStatus(remainingSeats, body.class),
      };
      remainingSeats -= 1;
    }
    if (body.p4_name) {
      passengers = {
        ...passengers,
        p4_name: body.p4_name,
        p4_age: body.p4_age,
        p4_gender: body.p4_gender,
        p4_status: this.#createStatus(remainingSeats, body.class),
      };
      remainingSeats -= 1;
    }
    if (body.p5_name) {
      passengers = {
        ...passengers,
        p5_name: body.p5_name,
        p5_age: body.p5_age,
        p5_gender: body.p5_gender,
        p5_status: this.#createStatus(remainingSeats, body.class),
      };
      remainingSeats -= 1;
    }
    if (body.p6_name) {
      passengers = {
        ...passengers,
        p6_name: body.p6_name,
        p6_age: body.p6_age,
        p6_gender: body.p6_gender,
        p6_status: this.#createStatus(remainingSeats, body.class),
      };
      remainingSeats -= 1;
    }
    return { seats: remainingSeats, passengers: passengers };
  }

  #getSLSeats(seatno) {
    const remainder = seatno % 8;
    if (remainder === 1 || remainder === 4) {
      return "LOWER";
    } else if (remainder === 2 || remainder === 5) {
      return "MIDDLE";
    } else if (remainder === 3 || remainder === 6) {
      return "UPPER";
    } else if (remainder === 7) {
      return "SIDE LOWER";
    } else if (remainder === 0) {
      return "SIDE UPPER";
    }
  }

  #get2ASeats(seatno) {
    if ((seatno - 1) % 6 === 0 || (seatno - 3) % 6 === 0) {
      return "LOWER";
    } else if ((seatno - 2) % 6 === 0 || (seatno - 4) % 6 === 0) {
      return "UPPER";
    } else if ((seatno - 5) % 6 === 0) {
      return "SIDE LOWER";
    } else if (seatno % 6 === 0) {
      return "SIDE UPPER";
    }
  }

  #get1ASeats(seatno) {
    if (seatno % 2 == 0) {
      return "UPPER";
    } else {
      return "LOWER";
    }
  }

  #createStatus(currentSeats, className) {
    let status = currentSeats < 1 ? "WL" : "CNF";
    let berth;
    if (status == "CNF" && ["SL", "3E", "3A"].includes(className)) {
      berth = this.#getSLSeats(currentSeats);
    }
    if (status == "CNF" && className == "2A") {
      berth = this.#get2ASeats(currentSeats);
    }
    if (status == "CNF" && className == "1A") {
      berth = this.#get1ASeats(currentSeats);
    }

    if (status == "WL") {
      return `${status}/${className}`;
    }
    return `${status}/${className}/${currentSeats}/${berth}`;
  }

  async #fetchPassengers(id) {
    const data = await passengerService.get(id);
    let details = {
      p1_name: data.p1_name,
      p1_age: data.p1_age,
      p1_gender: data.p1_gender,
      p1_status: data.p1_status,
    };
    for (let i = 2; i <= 6; i++) {
      if (data[`p${i}_name`]) {
        details = {
          ...details,
          [`p${i}_name`]: data[`p${i}_name`],
          [`p${i}_age`]: data[`p${i}_age`],
          [`p${i}_gender`]: data[`p${i}_gender`],
          [`p${i}_status`]: data[`p${i}_status`],
        };
      }
    }
    return details;
  }

  async #fetchSchedule(id, user_id, authtoken) {
    const schedule = await axios.post(
      `${SEARCH_SERVICE_URL}/schedule/${id}`,
      {
        user_id: user_id,
      },
      {
        headers: {
          authtoken: authtoken,
        },
      }
    );

    return schedule?.data?.data;
  }

  async #fetchTrain(id) {
    const train = await axios.get(`${SEARCH_SERVICE_URL}/train/${id}`);
    return train?.data?.data;
  }
  async #fetchStation(id) {
    const station = await axios.get(`${SEARCH_SERVICE_URL}/station/${id}`);
    return station?.data?.data;
  }

  #getTotalCost(sleeperCost, bookedClass, totalPassenger){
    let cost = sleeperCost;
    if (bookedClass == '3E') {
      cost = cost * 2.5
    }
    if (bookedClass == '3A') {
      cost = cost * 3
    }
    if (bookedClass == '2A') {
      cost = cost * 4
    }
    if (bookedClass == '1A') {
      cost = cost * 6
    }
    return cost * totalPassenger
  }

  async create(body, header) {
    try {
      // Get seats
      const seats = await this.#getSeats(body, header);
      // Create Passenger
      const passengers = await this.#createPassenger(body, seats);
      const passengerResponse = await passengerService.create(
        passengers.passengers
      );
      // Create ticket
      const newTicket = {
        user_id: body.user_id,
        pnr: Date.now(),
        from_schedule_id: body.from_schedule_id,
        to_schedule_id: body.to_schedule_id,
        status: "booked",
        class: body.class,
        category: body.category,
        passenger_id: passengerResponse.id,
        booked: new Date(),
      };
      console.log("ok till 183", newTicket);
      const result = await this.ticketRepository.create(newTicket);
      console.log("ok till 183", result);
      // Update seats
      const updatesSeats = await this.#updateSeats(
        body,
        header,
        passengers.seats
      );
      return result;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }

  async cancelTicket(pnr) {
    try {
      const result = await this.ticketRepository.cancelTicket(pnr);
      return result;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }

  async getTicket(data) {
    try {
      const result = await this.ticketRepository.getTicket(data);
      const passengers = await this.#fetchPassengers(result["passenger_id"]);
      const fromSchedule = await this.#fetchSchedule(
        result["from_schedule_id"],
        data["user_id"],
        data.authtoken
      );
      const toSchedule = await this.#fetchSchedule(
        result["to_schedule_id"],
        data["user_id"],
        data.authtoken
      );
      const train = await this.#fetchTrain(fromSchedule["train_id"]);
      const totalCost = this.#getTotalCost(train.cost, data.class, Object.keys(passengers).length / 4)
      const fromStation = await this.#fetchStation(fromSchedule["station_id"]);
      const toStation = await this.#fetchStation(toSchedule["station_id"]);
      return {
        id: result.id,
        pnr: result.pnr,
        status: result.status,
        class: result.class,
        category: result.category,
        total_cost: totalCost,
        booked: result.booked,
        cancelled: result.cancelled,
        train: {
          number: train.number,
          name: train.name
        },
        schedule: {
          from_station_name: fromStation.name,
          from_station_code: fromStation.code,
          to_station_name: toStation.name,
          to_station_code: toStation.code,
          departure: fromSchedule.departure,
          arrival: toSchedule.arrival
        },
        passengers: passengers
      };
    } catch (error) {
      console.log("Something went wrong at service layer");
      console.log(error);
      throw { error };
    }
  }
}
module.exports = TicketService;
