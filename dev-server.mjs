// Import the framework and instantiate it
import { parse } from 'node:url'
import Fastify from 'fastify'
import fastifyNextjs from '@fastify/nextjs'
import httpProxy from '@fastify/http-proxy'
import 'dotenv/config'

const fastify = Fastify({
  logger: false,
})
const API_PROXY = process.env.API_PROXY // The actual URL of your API

fastify.register(httpProxy, {
  upstream: API_PROXY,
  prefix: '/api',
})

fastify.register(fastifyNextjs).after(() => {
  fastify.next('*', (app, req, reply) => {
    // `app` is the Next instance
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    app.render(req.raw, reply.raw, pathname, query, {})
  })
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err
  console.log('Server listening on http://localhost:3000')
})
