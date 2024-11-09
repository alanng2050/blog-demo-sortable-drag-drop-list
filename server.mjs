import { parse } from 'url'
import next from 'next'

import Fastify from 'fastify'
import fastifyHelmet from '@fastify/helmet'

const fastify = Fastify({
  logger: false,
})

// fastify.register(fastifyStatic, { root: rootDir, prefix: '/' })
fastify.register(fastifyHelmet, {
  contentSecurityPolicy: {
    directives: {
      'default-src': ["'self'",
        "https://www.google-analytics.com/"
      ],
      'style-src': ["'self'", "'unsafe-inline'"],
      'script-src': ["'self'", "'unsafe-inline'",  "https://www.googletagmanager.com/"],
    },
  },
})

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

await app.prepare()

fastify.all('*', (req, reply) => {
  const parsedUrl = parse(req.url, true)
  handle(req.raw, reply.raw, parsedUrl)
})

fastify.listen({ port }, (err) => {
  if (err) console.error(err)
  else console.log('listening on 3000')
})
