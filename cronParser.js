const expandCronField = (field, min, max) => {
  const result = [];
  if (field === '*') {
    for (let i = min; i <= max; i++) result.push(i);
  } else if (field.includes('/')) {
    const [range, step] = field.split('/');
    const stepNum = parseInt(step, 10);
    if (range === '*') {
      for (let i = min; i <= max; i += stepNum) result.push(i);
    } else {
      const [rangeMin, rangeMax] = range.split('-').map(Number);
      for (let i = rangeMin; i <= rangeMax; i += stepNum) result.push(i);
    }
  } else if (field.includes(',')) {
    result.push(...field.split(',').map(Number));
  } else if (field.includes('-')) {
    const [rangeMin, rangeMax] = field.split('-').map(Number);
    for (let i = rangeMin; i <= rangeMax; i++) result.push(i);
  } else {
    result.push(parseInt(field, 10));
  }
  return result;
};

const parseCronString = (cronString) => {
  const [minute, hour, dayOfMonth, month, dayOfWeek, ...command] = cronString.split(' ');
  return {
    minute: expandCronField(minute, 0, 59),
    hour: expandCronField(hour, 0, 23),
    'day of month': expandCronField(dayOfMonth, 1, 31),
    month: expandCronField(month, 1, 12),
    'day of week': expandCronField(dayOfWeek, 0, 6),
    command: command.join(' ')
  };
};

const formatOutput = (parsedCron) => {
  let output = '';
  for (const [field, values] of Object.entries(parsedCron)) {
    if (Array.isArray(values)) {
      output += `${field.padEnd(13)} ${values.join(' ')}\n`;
    } else {
      output += `${field.padEnd(13)} ${values}\n`;
    }
  }
  return output;
};

const main = (cronString) => {
  const parsedCron = parseCronString(cronString);
  console.log(formatOutput(parsedCron));
};

if (require.main === module) {
  const cronString = process.argv[2];
  if (cronString) {
    main(cronString);
  } else {
    console.error('Please provide a cron string as an argument.');
    process.exit(1);
  }
};

module.exports = {
  expandCronField,
  parseCronString,
  formatOutput
};
