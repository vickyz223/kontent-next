"use client";
import { client } from "@/utils/kontent";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Fact({ codename }) {
  const [fact, setFact] = useState({});
  useEffect(() => {
    async function init() {
      const initial = await client
        .items()
        .type("fact_about_us")
        .equalsFilter("system.codename", codename)
        .toPromise();
      setFact(initial.data.items[0].elements);
      console.log("fact", initial.data.items[0]);
    }
    init();
  }, []);

  if (fact.title) {
    return (
      <div>
        <h3>{fact.title.value}</h3>
        <p>{fact.description.value}</p>
        <Image src={fact.image.value[0].url} width={200} height={200} />
      </div>
    );
  }
}
