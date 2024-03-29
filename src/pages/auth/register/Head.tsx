import { memo } from "react";
import { Helmet } from "react-helmet";

const Head = memo(() => {
  return (
    <Helmet>
      <title>
        Jeyran | Register for Rock Paper Scissors Online - Join the Fun!
      </title>
      <meta
        name="description"
        content="Sign up now and become part of the Rock Paper Scissors community! Register for free to create games, challenge friends, and enjoy endless entertainment. Join us today and start playing!"
      />
    </Helmet>
  );
});
export default Head;
