import type { NextApiRequest, NextApiResponse } from "next";

// We only keep this in for testing purposes.
const handler = (_: NextApiRequest, res: NextApiResponse) => {
  return res.send("Hello World");
};

export default handler;
