import { fastify } from 'fastify';
import fastifyCors from '@fastify/cors';
import connectDB from './db/connection.js';
import bookRoutes from './routes/routes.js';

export class Main {
    constructor() {
        this.init();
    }

    async init() {
        await connectDB();

        const server = fastify();

        server.register(fastifyCors, {
            origin: '*',
            methods: '*',
        });

        bookRoutes(server);

        server.listen({ port: 3000 }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Servidor rodando em ${address}`);
        });

    }
}
