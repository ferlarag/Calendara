"use client";

import { useEventData } from "@/hooks/useEventData/useEventData";
import React from "react";

const Page = () => {
  const { currentWindow } = useEventData();
  return <div>{currentWindow}</div>;
};

export default Page;
