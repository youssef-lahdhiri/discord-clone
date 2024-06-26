import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';
import { authMiddleware } from '@clerk/nextjs/server';


const publicRoutes=createRouteMatcher(['/api/uploadthing']);
export default clerkMiddleware()

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
