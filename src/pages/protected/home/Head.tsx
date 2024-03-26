import { memo } from "react";
import { Helmet } from "react-helmet";

const Head = memo(() => {
  console.log("rendering homepage head");
  return (
    <Helmet>
      <title>
        Jeyran | Play Rock Paper Scissors Online - Create or Join Games
      </title>
      <meta
        name="description"
        content="Start playing Rock Paper Scissors online with friends! Create a new game or enter a game code to join friends and challenge them to exciting matches. Join the fun now!"
      />
    </Helmet>
  );
});
export default Head;
