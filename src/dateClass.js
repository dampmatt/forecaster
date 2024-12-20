export class weatherDetails {
  constructor(
    windSpeed,
    temp,
    time,
    date,
    address,
    conditions,
    iconName,
    dayname
  ) {
    this.windSpeed = windSpeed;
    this.temp = temp;
    this.time = time;
    this.date = date;
    this.address = address;
    this.conditions = conditions;
    this.iconName = iconName;
    this.dayName = dayname;
  }

  get details() {
    return {
      windSpeed: this.windSpeed,
      temp: this.temp,
      address: this.address,
      conditions: this.conditions,
      time: this.time,
      date: this.date,
    };
  }
}
