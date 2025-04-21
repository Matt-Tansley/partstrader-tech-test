export default async () => {
  console.log("Running global setup");

  if (!process.env.ENV) {
    console.log(`process.env.ENV is undefined, using 'dev' by default`);
    process.env.ENV = "dev";
  }

  try {
    await fetch(process.env.BASE_URL);
    console.log(
      `Using ${process.env.ENV}, with this URL: ${process.env.BASE_URL} `,
    );
  } catch {
    console.error(
      `${process.env.ENV} environment is down. Cannot reach ${process.env.BASE_URL}`,
    );
    process.exit(1);
  }
};
