"use client";

import requests from "./api/requests";
import NavBar from "./components/NavBar";
import Row from "./components/Row";
import Suggestion from "./components/Suggestion";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Suggestion />
      <Row rowID="1" title="Up Coming" fetchURL={requests.requestUpcoming} />
      <Row rowID="2" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID="3" title="Top Rated" fetchURL={requests.requestTopRated} />
    </main>
  );
}
