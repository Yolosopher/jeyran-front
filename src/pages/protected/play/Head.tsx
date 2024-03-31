import { memo } from "react";
import { Helmet } from "react-helmet";

type HeadProps = {
  roomCode: string;
};

const Head = memo(({ roomCode }: HeadProps) => {
  return (
    <Helmet>
      <title>
        Jeyran - {roomCode ? roomCode : ""} | Play Rock Paper Scissors with
        Friends
      </title>
      <meta
        name="description"
        content={`Get ready for action! Click the link to enter the Rock Paper Scissors room with the unique code ${roomCode} and join the fun. Challenge your friends and show off your skills in this classic game. Enter now and start playing!`}
      />
    </Helmet>
  );
});
export default Head;
