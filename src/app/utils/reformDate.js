export function reformDate(time) {
  const publishedTime = new Date(+time);
  const atMoment = Date.now();
  const difference = atMoment - publishedTime;
  // console.log(atMoment);

  if (difference < 60000) {
    return "1 минуту назад";
  } else if (difference < 300000) {
    return "5 минут назад";
  } else if (difference < 600000) {
    return "10 минут назад";
  } else if (difference < 1800000) {
    return "30 минут назад";
  } else if (
    new Date(atMoment).getFullYear() ===
      new Date(publishedTime).getFullYear() &&
    new Date(atMoment).getMonth() === new Date(publishedTime).getMonth() &&
    new Date(atMoment).getDate() === new Date(publishedTime).getDate() // today
  ) {
    const options = { hour: "numeric", minute: "numeric" };
    return "Сегодня в " + new Date(publishedTime).toLocaleString("ru", options); // hours.minutes
  } else if (
    new Date(atMoment).getFullYear() === new Date(publishedTime).getFullYear() // this year
  ) {
    const options = { day: "numeric", month: "long" };
    return new Date(publishedTime).toLocaleString("ru", options); // day.month
  } else {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(publishedTime).toLocaleString("ru", options); // day.moth.year
  }
}

export function displayDate(time) {
  const date = new Date(+time);
  const dateNow = new Date();
  const yearDif = dateNow.getFullYear() - date.getFullYear();

  if (yearDif === 0) {
    const dayDif = dateNow.getDate() - date.getDate();
    if (dayDif === 0) {
      const hoursDif = dateNow.getHours() - date.getHours();
      if (hoursDif === 0) {
        const minutesDif = dateNow.getMinutes() - date.getMinutes();

        if (minutesDif >= 0 && minutesDif < 5) {
          return "1 минуту назад";
        }
        if (minutesDif >= 5 && minutesDif < 10) {
          return "5 минут назад";
        }
        if (minutesDif >= 10 && minutesDif < 30) {
          return "10 минут назад";
        }
        return "30 минут назад";
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    return `${date.toLocaleString("ru", {
      day: "numeric",
      month: "long"
    })}`;
  }
  return `${date.toLocaleString("ru", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  })}`;
}
