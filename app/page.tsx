"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Button } from '@/components/ui/button';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  return (
    <div>
      <div>
        Hello world
      </div>
      <Button variant="default">shadcn button</Button>
    </div>
  );
}
