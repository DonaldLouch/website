'use client'
import { Stack } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import LoadingComponent from "../(Config)/ContentLoading";

export default function Page() {
  return (
    <Stack alignItems="center" justifyContent="center" w="100%" h="90vh">
      <Suspense fallback={<LoadingComponent />}><SignIn redirectUrl={"/portal"} /></Suspense>
    </Stack>
  )
}