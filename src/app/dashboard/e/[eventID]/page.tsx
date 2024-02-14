"use client";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const id = params.eventID;
  return <div>{id}</div>;
};

export default Page;
