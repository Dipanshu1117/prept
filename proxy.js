import arcjet, { detectBot, shield } from '@arcjet/next';
import { auth } from '@clerk/nextjs';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

//hum protected rout yha create karta ha

const isProtectedRoute = createRouteMatcher([
  "/appointments(.*)",
  "/explore(.*)",
  "/dashboard(.*)",
  "/onboarding(.*)",
])

const isWebhookRoute = createRouteMatcher(["/api/webhooks/stream(.*)"]);

const aj = arcjet({
  key:process.env.ARCJET_KEY,
  rules:[shield({mode:"LIVE"}),
    detectBot({
      mode:"LIVE",
      allow:["CATEGORY:SEARCH_ENGINE","CATEGORY:PREVIEW"]
    })
  ]
})

export default clerkMiddleware(async (auth,req)=>{

  //Apply arcjet protect First (before clerk auth check)
  if(!isWebhookRoute(req)){
  const decision = await aj.protect(req);
  if(decision.isDenied()){
    return NextResponse.json({error:"Forbidden"},{status:403});
  }
}


  const {userId} = await auth();
  if(!userId && isProtectedRoute(req)){
    const {redirectToSignIn} = await auth();
    return redirectToSignIn();
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/(.*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};