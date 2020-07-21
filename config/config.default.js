'use strict';

/**
 * egg-graphql-compose-bullmq default config
 * @member Config#graphqlComposeBullmq
 * @property {String} SOME_KEY - some description
 */
exports.graphqlComposeBullmq = {
  router: '/bull',
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
  // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
  graphiql: true,
  introspection: true,
  // 是否设置默认的Query和Mutation, 默认关闭
  defaultEmptySchema: true,
  // graphQL 路由前的拦截器
  // * onPreGraphQL() {},
  // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
  // * onPreGraphiQL() {},

  // reference https://github.com/graphql-compose/graphql-compose-bullmq
  typePrefix: 'Prefix',
  // eslint-disable-next-line quotes
  jobDataTC: `type MyJobData { fieldA: String! fieldB: String }`,
  queue: {
    name: 'fetch_metrics',
    prefix: 'bull.demo',
  },
  redis: 'redis://127.0.0.1:6379', // redisio options or egg-redis instance name
};
