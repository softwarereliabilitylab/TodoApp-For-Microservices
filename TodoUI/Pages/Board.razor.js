export function clientDateTime(date) {
    return date.setTime(date.getTime() + 1000 * 60 * 60 * 9);
}