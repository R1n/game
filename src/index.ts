import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import * as dotenv from 'dotenv'
dotenv.config()

import { sequelize } from "./database";

const PORT = process.env.PORT || 4000;

const main = async () => {
    const schema = await buildSchema({
        resolvers: [__dirname + '/**/*.resolver.ts'],
    });

    const apolloServer = new ApolloServer({
        schema,
        introspection: true,
        // cacheControl: true,
    });

    await apolloServer.listen(PORT, async () => {
        try {
            await sequelize.authenticate();
            console.log(`🚀 started http://localhost:${PORT}/graphql`);
        } catch (e) {
            console.error("Unable to connect to the database:", e)
        }
    });
};

main().catch((error) => {
    console.error(error);

    // kill process if service fails to initialize
    process.exit(1);
});
