import type { NextApiRequest, NextApiResponse } from "next";

// We only keep this in for testing purposes.
export default (_: NextApiRequest, res: NextApiResponse) => {
  return res.send("Hello World")
}
