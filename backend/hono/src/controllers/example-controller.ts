import { Context } from "hono";
import { Service } from "typedi";


@Service()
export default class ExampleController {
  constructor() {
    console.log('ExampleController constructor');
  }

  async getExample(c: Context) {
    return c.text('Hello World');
  }

  async getExample2(c: Context) {
    return c.text('Hello World 2');
  }
}