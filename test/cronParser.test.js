describe('Cron Parser', () => {
  let chai;
  let expect;
  let cronParser;

  before(async () => {
    chai = await import('chai');
    expect = chai.expect;
    cronParser = await import('../cronParser.js');
  });

  it('should expand minute field correctly', () => {
    expect(cronParser.expandCronField('*/15', 0, 59)).to.deep.equal([0, 15, 30, 45]);
  });

  it('should expand hour field correctly', () => {
    expect(cronParser.expandCronField('0', 0, 23)).to.deep.equal([0]);
  });

  it('should expand day of month field correctly', () => {
    expect(cronParser.expandCronField('1,15', 1, 31)).to.deep.equal([1, 15]);
  });

  it('should expand month field correctly', () => {
    expect(cronParser.expandCronField('*', 1, 12)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('should expand day of week field correctly', () => {
    expect(cronParser.expandCronField('1-5', 0, 6)).to.deep.equal([1, 2, 3, 4, 5]);
  });

  it('should parse cron string correctly', () => {
    const cronString = '*/15 0 1,15 * 1-5 /usr/bin/find';
    const parsed = cronParser.parseCronString(cronString);
    expect(parsed.minute).to.deep.equal([0, 15, 30, 45]);
    expect(parsed.hour).to.deep.equal([0]);
    expect(parsed['day of month']).to.deep.equal([1, 15]);
    expect(parsed.month).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(parsed['day of week']).to.deep.equal([1, 2, 3, 4, 5]);
    expect(parsed.command).to.equal('/usr/bin/find');
  });

  it('should format output correctly', () => {
    const parsedCron = {
      minute: [0, 15, 30, 45],
      hour: [0],
      'day of month': [1, 15],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      'day of week': [1, 2, 3, 4, 5],
      command: '/usr/bin/find'
    };
    const formatted = cronParser.formatOutput(parsedCron);
    const expectedOutput = `minute        0 15 30 45\nhour          0\nday of month  1 15\nmonth         1 2 3 4 5 6 7 8 9 10 11 12\nday of week   1 2 3 4 5\ncommand       /usr/bin/find\n`;
    expect(formatted).to.equal(expectedOutput);
  });
});
