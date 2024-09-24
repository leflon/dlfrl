/* eslint-disable */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { createInterface } from 'readline/promises';
import {stdin as input, stdout as output} from 'node:process'

const rl = createInterface({ input, output });
const prisma = new PrismaClient();

const username = await rl.question('Username: ');
const password = await rl.question('Password: ');
const hash = await bcrypt.hash(password, 4);

const user = await prisma.user.create({
	data: {
		username,
		password: hash
	}
});

console.log(`Sucessfully generated new user: ${user.username} #${user.id}`);
process.exit(0);