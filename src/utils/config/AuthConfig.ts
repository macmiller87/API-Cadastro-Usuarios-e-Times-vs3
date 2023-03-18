import 'dotenv/config';

export default {
  jwt: {
    secret_token: process.env.SECRET_TOKEN,
    expiresIn: process.env.EXPIRES_IN,
  },
};
