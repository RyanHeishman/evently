"use client";
 
import * as React from "react";
import { useAuth } from "@clerk/nextjs";
 
export default function ExternalDataPage() {
  const [data, setData] = React.useState<object>({});
  const { getToken, isLoaded, isSignedIn } = useAuth();
  
  // In this case, /api/example is a Next.js Route Handler
  const fetchData = async () => {
    fetch("/api/example", {
      headers: { Authorization: `Bearer ${await getToken()}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setData(data);
      });
    return;
  };
 
  React.useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      // You can handle the loading or signed state separately
    }
    
    fetchData();
  }, []);
 
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}