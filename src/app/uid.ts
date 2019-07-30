function random() {
  return Math.floor(Math.random() * 1e17).toString(36);
}

export function uid(): string {
  return [
    random(),
    random(),
    random(),
    random(),
  ].join('-');
}