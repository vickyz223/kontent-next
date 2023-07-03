'use client'
import { useState, useEffect } from "react";
import { client } from "@/utils/kontent";
import Fact from "./fact";

export default function About() {
    const [about, setAbout] = useState([]);
    useEffect(() => {
      async function initializeArticles() {
        const initial = await client.items().type("about_us").toPromise();
        setAbout(initial.data.linkedItems);
        console.log("about", initial.data.linkedItems);
      }
      initializeArticles();
    }, []);

    return (
      <div>
        {Object.keys(about).map((key, index) => (
          <Fact key={index} codename={about[key].system.codename} />
        ))}
      </div>
    );
}