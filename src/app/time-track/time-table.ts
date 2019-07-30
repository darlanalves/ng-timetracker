export class TimeTable {
  lastUpdated = Date.now();
  date: string;
  current: string;
  
  admin = 0;
  develop = 0;
  refactor = 0;
  release = 0;
  other = 0;

  constructor(properties: Partial<TimeTable>) {
    Object.assign(this, properties);
    
    this.admin = Number(this.admin);
    this.develop = Number(this.develop);
    this.refactor = Number(this.refactor);
    this.release = Number(this.release);
    this.other = Number(this.other);
  }

  get elapsedTime(): number {
    const elapsedSeconds = Math.floor((Date.now() - this.lastUpdated) / 1000);
    const hours = Math.round(elapsedSeconds / 3600 * 10) / 10;
    
    return hours > 0.25 ? hours : 0;
  }

  toJSON() {
    return {
      lastUpdated: this.lastUpdated,
      date: this.date,
      admin: this.admin.toFixed(2),
      develop: this.develop.toFixed(2),
      refactor: this.refactor.toFixed(2),
      release: this.release.toFixed(2),
      other: this.other.toFixed(2),
      current: this.current,
    }
  }
}