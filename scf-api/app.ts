import "dotenv/config";

import express from "express";
import { PrismaClient } from "./lib/generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";


const app = express();

app.use(express.json());


const databaseUrl = process.env.DATABASE_URL;


if (!databaseUrl) {

  throw new Error(
    "DATABASE_URL is missing"
  );

}


const url = new URL(databaseUrl);


const adapter = new PrismaMariaDb({

  host:
    url.hostname,

  port:
    Number(url.port || 3306),

  user:
    decodeURIComponent(
      url.username
    ),

  password:
    decodeURIComponent(
      url.password
    ),

  database:
    url.pathname.replace(
      /^\//,
      ""
    ),

  connectionLimit: 5,

});


const prisma = new PrismaClient({
  adapter,
});



app.get(
  "/",
  (_req, res) => {

    res.json({

      ok: true,

      message:
        "acatar-api is running",

    });

  }
);



app.get(
  "/test-db",
  async (_req, res) => {

    try {


      const user =
        await prisma.user.findUnique({

          where: {

            account:
              "YLMGK2",

          },


          select: {

            id: true,

            account: true,


            nfts: {

              where: {

                type:
                  "INITIAL",

              },


              select: {

                name: true,

                imageUrl: true,

                type: true,

              },

            },

          },

        });



      res.json({

        ok: true,

        user,

      });


    } catch (error) {


      console.error(error);


      res.status(500).json({

        ok: false,

        error:
          error instanceof Error
            ? error.message
            : String(error),

      });


    }

  }
);



app.listen(
  9000,
  "0.0.0.0",
  () => {

    console.log(
      "acatar-api listening on port 9000"
    );

  }
);