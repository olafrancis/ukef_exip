import { format } from 'date-fns';
import formatDate from '.';

describe('api/generate-csv/map-application-to-csv/helpers/format-date', () => {
  const mockTimestamp = new Date();

  it('should return a formatted date', () => {
    const result = formatDate(mockTimestamp);

    const expected = format(new Date(mockTimestamp), 'd MMMM yyyy');

    expect(result).toEqual(expected);
  });
});
