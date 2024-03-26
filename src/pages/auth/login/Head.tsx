import { memo } from "react";
import { Helmet } from "react-helmet";

const Head = memo(() => {
  console.log("rendering loginpage head");
  return (
    <Helmet>
      <title>Jeyran | Log in to Play Rock Paper Scissors Online</title>
      <meta
        name="description"
        content="Log in to your account and access all the features of our Rock Paper Scissors platform. Join games, challenge friends, and track your progress. Log in now and let the fun begin!"
      />
    </Helmet>
  );
});
export default Head;
