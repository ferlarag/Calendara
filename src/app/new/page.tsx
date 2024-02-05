"use client";

import { useEventData } from "@/context/useEventData";
import React from "react";

const Page = () => {
  const { currentWindow } = useEventData();
  return <div>{currentWindow}</div>;
};

export default Page;
