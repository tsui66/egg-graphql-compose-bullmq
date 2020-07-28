'use strict';

const assert = require('assert');
const GraphqlCompose = require('graphql-compose');
const { composeBull } = require('graphql-compose-bullmq');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async configWillLoad() {
    // this.app.config.coreMiddleware.unshift('graphqlBull');
  }

  async didLoad() {
    const { typePrefix, jobDataTC, queue, redis } = this.app.config.graphqlComposeBullmq;
    assert(typePrefix, '[egg-graphql-compose-bullmq] missing typePrefix options for Bullmq');
    // assert(queue.name, '[egg-graphql-compose-bullmq] missing queue.name options for Bullmq');
    // assert(queue.prefix, '[egg-graphql-compose-bullmq] missing queue.prefix options for Bullmq');
    assert(redis, '[egg-graphql-compose-bullmq] missing redis options for Bullmq');

    const { sc, SchemaComposer } = GraphqlCompose;
    // create a new SchemaComposer instance or share global instance with other graphql-compose-plugins 
    const schemaComposer = this.app.config.graphqlComposeBullmq.signalton ? sc : new SchemaComposer();
    const composeBullConfig = {
      schemaComposer,
      typePrefix,
      jobDataTC,
      redis,
    };
    if (queue.name && queue.prefix) {
      Object.assign(composeBullConfig, {
        queue: {
          name: queue.name,
          prefix: queue.prefix,
        }
      })
    }
    const { queryFields, mutationFields, subscriptionFields } = composeBull(composeBullConfig);
    schemaComposer.Query.addFields({
      ...queryFields,
    });
    schemaComposer.Mutation.addFields({
      ...mutationFields,
    });
    schemaComposer.Subscription.addFields({
      ...subscriptionFields,
    });
    const graphqlBullSchema = schemaComposer.buildSchema();
    this.app.graphqlBullSchema = graphqlBullSchema;
    this.app.coreLogger.info('[egg-graphql-compose-bullmq] build Bullmq graphql schema successfully');
  }
}

module.exports = AppBootHook;
