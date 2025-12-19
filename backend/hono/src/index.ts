import 'reflect-metadata';

import { Hono } from 'hono'
import ExampleController from './controllers/example-controller'
import Container from 'typedi'

const app = new Hono()

function C<T>(controller: new () => T): T {
  return Container.get(controller)
}

app.get('/', C(ExampleController).getExample)
app.get('/2', C(ExampleController).getExample2)

export default app