export class TimeTable {
  lastUpdated = Date.now();
  date: string;
  current: string;
  hours: { [category: string]: number; } = {};

  constructor(properties: Partial<TimeTable>) {
    Object.assign(this, properties);
    Object.keys(this.hours).forEach(category => {
      this.hours[category] = parseFloat(String(properties.hours[category] || '0'));
    });
  }

  get elapsedTime(): number {
    const elapsedSeconds = Math.floor((Date.now() - this.lastUpdated) / 1000);
    const hours = Math.round(elapsedSeconds / 3600 * 10) / 10;
    
    return hours > 0.25 ? hours : 0;
  }

  get total() {
    return Object.keys(this.hours)
      .reduce((sum, category) => sum + this.hours[category], 0)
      .toFixed(2);
  }

  toJSON() {
    const hours = {};
    Object.keys(this.hours).reduce((target, category) => {
      target[category] = Number(this.hours[category]).toFixed(2);
      return target;
    }, hours);

    return {
      lastUpdated: this.lastUpdated,
      date: this.date,
      current: this.current,
      hours
    };
  }
}