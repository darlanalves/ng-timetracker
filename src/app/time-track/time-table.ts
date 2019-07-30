export class TimeTable {
  lastUpdated = Date.now();
  date: string;
  current: string;
  hours: { [category: string]: string | number; } = {};

  constructor(properties: Partial<TimeTable>) {
    Object.assign(this, properties);
    Object.keys(this.hours).forEach(category => {
      this.hours[category] = Number(this.hours[category]);
    });
  }

  get elapsedTime(): number {
    const elapsedSeconds = Math.floor((Date.now() - this.lastUpdated) / 1000);
    const hours = Math.round(elapsedSeconds / 3600 * 10) / 10;
    
    return hours > 0.25 ? hours : 0;
  }

  get total() {
    return Object.keys(this.hours).reduce((sum, category, hoursOf) => sum + hoursOf[category], 0);
  }

  toJSON() {
    const hours = Object.keys(this.hours).reduce((target, category, hoursOf) => {
      target[category] = hoursOf[category].toFixed(2);
      return target;
    }, {});

    return {
      lastUpdated: this.lastUpdated,
      date: this.date,
      current: this.current,
      hours
    };
  }
}