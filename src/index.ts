import * as express from 'express';
import { Request, Response } from 'express';
import * as depd from 'depd';

const app = express();
const port = 3000;

interface SuccessResponse {
  type: string;
  good: boolean;
}

const deprecate = depd('deprecate-namespace');
let deprecatedBut200 = (req: Request, res: Response): void => {
  res.json({
    type: 'success response',
    good: true,
  } as SuccessResponse);
};
deprecatedBut200 = deprecate.function(deprecatedBut200);

app.get('/success', deprecatedBut200);

app.get('/exceptional', (req, res): void => {
  if (req) {
    throw Error('my stack trace stinks');
  } else {
    res.json({
      type: 'success response',
      good: false,
    } as SuccessResponse);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
