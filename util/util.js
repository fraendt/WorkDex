export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const timeFormat = (d) => {
  let a = d.getHours()
  if (a > 12) {
    return `${a % 12}:${zeroPad(d.getMinutes(), 2)} PM`
  } else if (a == 12) {
    return `${a}:${zeroPad(d.getMinutes(), 2)} PM`
  } else if (a < 12 && a > 0) {
    return `${a}:${zeroPad(d.getMinutes(), 2)} AM`
  } else {
    return `${12}:${zeroPad(d.getMinutes(), 2)} AM`
  }
}

export const dateFormat = (d) => {
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
