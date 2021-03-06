/*import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      // prisma: PrismaClient | any | globalThis
    }
  }
}

// let prisma: PrismaClient;

// declare global {
//   let prisma: PrismaClient | undefined
// }

let prisma

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
}

export default prisma */

/*import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma */

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma