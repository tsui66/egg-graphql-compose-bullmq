'use strict';

const { ApolloServer } = require('apollo-server-koa');

module.exports = (_, app) => {
  const options = app.config.graphqlComposeBullmq;
  const graphqlComposeBullmqRouter = options.router;
  let graphiql = true;

  if (options.graphiql === false) {
    graphiql = false;
  }

  return async (ctx, next) => {
    /* istanbul ignore else */
    if (ctx.path === graphqlComposeBullmqRouter) {
      const server = new ApolloServer({
        schema: app.graphqlBullSchema,
        context: ({ ctx }) => (ctx),
        plugins: options.plugins || [],
        playground: graphiql,
        introspection: options.introspection,
      });
      server.applyMiddleware({ app, path: graphqlComposeBullmqRouter });
    }
    await next();
  };
};
